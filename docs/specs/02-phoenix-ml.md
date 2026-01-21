# Phoenix ML モデル仕様書

## 1. 概要

Phoenix は X (旧 Twitter) のレコメンデーションシステムの中核となる機械学習モデルです。Grok ベースの Transformer アーキテクチャを採用し、ユーザーの過去の行動履歴と候補投稿から、最適なコンテンツをランキング・検索します。

### 1.1 システム構成

Phoenix は以下の 2 つの主要コンポーネントで構成されています：

| コンポーネント | 役割 | 主要ファイル |
|---------------|------|-------------|
| **Two-Tower Retrieval Model** | 大規模候補プールからの高速検索 | `recsys_retrieval_model.py` |
| **Ranking Transformer** | 候補投稿の精密なランキング | `recsys_model.py` |

### 1.2 処理フロー

```
[候補プール (数百万件)]
        |
        v
[Two-Tower Retrieval] ─── ANN検索 ───> [候補 (数百〜数千件)]
        |
        v
[Ranking Transformer] ─── スコアリング ───> [ランキング結果]
        |
        v
[ユーザーフィード表示]
```

---

## 2. Two-Tower Retrieval Model

Two-Tower アーキテクチャは、ユーザーと候補アイテムを別々のタワー（エンコーダー）で埋め込み、内積類似度で高速検索を実現します。

### 2.1 アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Two-Tower Retrieval Model                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────┐         ┌─────────────────────┐            │
│  │     User Tower      │         │   Candidate Tower   │            │
│  │                     │         │                     │            │
│  │  Phoenix Transformer│         │    MLP Projection   │            │
│  │  + Mean Pooling     │         │    (2-layer)        │            │
│  │  + L2 Normalization │         │  + L2 Normalization │            │
│  └──────────┬──────────┘         └──────────┬──────────┘            │
│             │                               │                        │
│             v                               v                        │
│      [B, D] normalized             [N, D] normalized                 │
│             │                               │                        │
│             └───────────┬───────────────────┘                        │
│                         │                                            │
│                         v                                            │
│                  Dot Product Similarity                              │
│                  scores = user @ corpus.T                            │
│                         │                                            │
│                         v                                            │
│                   Top-K Selection                                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 User Tower

User Tower は Phoenix Transformer を使用してユーザー表現を生成します。

#### 入力シーケンス構成

```
[User Embedding] + [History Embeddings (S tokens)]
     1 token              S tokens (default: 128)
```

#### 処理フロー

```python
# 1. ユーザー埋め込みの生成
user_embeddings, user_padding_mask = block_user_reduce(
    user_hashes,           # [B, num_user_hashes]
    user_embeddings,       # [B, num_user_hashes, D]
    num_user_hashes,       # 2
    emb_size,             # 128
)
# Output: [B, 1, D]

# 2. 履歴埋め込みの生成
history_embeddings, history_padding_mask = block_history_reduce(
    history_post_hashes,        # [B, S, num_item_hashes]
    history_post_embeddings,    # [B, S, num_item_hashes, D]
    history_author_embeddings,  # [B, S, num_author_hashes, D]
    history_product_surface_embeddings,  # [B, S, D]
    history_actions_embeddings,          # [B, S, D]
    num_item_hashes,   # 2
    num_author_hashes, # 2
)
# Output: [B, S, D]

# 3. シーケンス連結
embeddings = concat([user_embeddings, history_embeddings], axis=1)
# Shape: [B, 1+S, D]

# 4. Transformer エンコーディング（因果的アテンション）
model_output = transformer(embeddings, padding_mask)

# 5. Mean Pooling + L2 正規化
user_representation = mean_pool(model_output, padding_mask)
user_representation = l2_normalize(user_representation)
# Output: [B, D]
```

#### コード実装（`recsys_retrieval_model.py`）

```python
def build_user_representation(
    self,
    batch: RecsysBatch,
    recsys_embeddings: RecsysEmbeddings,
) -> Tuple[jax.Array, jax.Array]:
    """ユーザー表現の構築

    Returns:
        user_representation: L2正規化されたユーザー埋め込み [B, D]
        user_norm: 正規化前のL2ノルム [B, 1]
    """
    # Transformer でエンコード
    model_output = self.model(
        embeddings.astype(self.fprop_dtype),
        padding_mask,
        candidate_start_offset=None,  # 因果的アテンション
    )

    # Mean Pooling
    mask_float = padding_mask.astype(jnp.float32)[:, :, None]
    user_embeddings_masked = user_outputs * mask_float
    user_embedding_sum = jnp.sum(user_embeddings_masked, axis=1)
    mask_sum = jnp.sum(mask_float, axis=1)
    user_representation = user_embedding_sum / jnp.maximum(mask_sum, 1.0)

    # L2 正規化
    user_norm_sq = jnp.sum(user_representation**2, axis=-1, keepdims=True)
    user_norm = jnp.sqrt(jnp.maximum(user_norm_sq, EPS))
    user_representation = user_representation / user_norm

    return user_representation, user_norm
```

### 2.3 Candidate Tower

Candidate Tower は軽量な MLP で候補投稿を埋め込み空間にマッピングします。

#### アーキテクチャ

```
Input: [post_embeddings, author_embeddings]
          concat → [B, C, (num_item_hashes + num_author_hashes) * D]
             |
             v
    ┌─────────────────────┐
    │  Linear (in → 2*D)  │
    │      + SiLU         │
    └──────────┬──────────┘
               |
               v
    ┌─────────────────────┐
    │  Linear (2*D → D)   │
    └──────────┬──────────┘
               |
               v
        L2 Normalization
               |
               v
        Output: [B, C, D]
```

#### コード実装（`recsys_retrieval_model.py`）

```python
@dataclass
class CandidateTower(hk.Module):
    """候補タワー：投稿+著者埋め込みを共有埋め込み空間に射影"""

    emb_size: int

    def __call__(self, post_author_embedding: jax.Array) -> jax.Array:
        # 2層MLPによる射影
        proj_1 = hk.get_parameter(
            "candidate_tower_projection_1",
            [post_author_embedding.shape[-1], self.emb_size * 2],
            dtype=jnp.float32,
            init=embed_init,
        )
        proj_2 = hk.get_parameter(
            "candidate_tower_projection_2",
            [self.emb_size * 2, self.emb_size],
            dtype=jnp.float32,
            init=embed_init,
        )

        hidden = jnp.dot(post_author_embedding, proj_1)
        hidden = jax.nn.silu(hidden)
        candidate_embeddings = jnp.dot(hidden, proj_2)

        # L2正規化
        candidate_norm = jnp.sqrt(jnp.sum(candidate_embeddings**2, axis=-1, keepdims=True))
        candidate_representation = candidate_embeddings / candidate_norm

        return candidate_representation
```

### 2.4 Similarity Search

正規化された埋め込みベクトル間の内積により、コサイン類似度を計算します。

```python
def _retrieve_top_k(
    self,
    user_representation: jax.Array,   # [B, D]
    corpus_embeddings: jax.Array,     # [N, D]
    top_k: int,
    corpus_mask: Optional[jax.Array] = None,
) -> Tuple[jax.Array, jax.Array]:
    """Top-K候補の検索

    Returns:
        top_k_indices: [B, K] 上位K件のインデックス
        top_k_scores: [B, K] 類似度スコア
    """
    # 内積による類似度計算
    scores = jnp.matmul(user_representation, corpus_embeddings.T)

    # マスク適用（無効な候補を除外）
    if corpus_mask is not None:
        scores = jnp.where(corpus_mask[None, :], scores, -INF)

    # Top-K選択
    top_k_scores, top_k_indices = jax.lax.top_k(scores, top_k)

    return top_k_indices, top_k_scores
```

**Note**: 本番環境では、FAISS や ScaNN などの近似最近傍探索（ANN）ライブラリを使用して、数十億件規模のコーパスから高速に検索を行います。

---

## 3. Ranking Transformer

Ranking Transformer は、検索された候補投稿を精密にスコアリングし、最終的なランキングを決定します。

### 3.1 アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Ranking Transformer                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Input Sequence:                                                     │
│  [User (1)] + [History (S)] + [Candidates (C)]                      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Attention Mask                             │   │
│  │                                                               │   │
│  │  User+History: Causal Attention (下三角行列)                   │   │
│  │  Candidates:   User+History への attend + Self-attention      │   │
│  │                (他の候補には attend しない)                     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              v                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Phoenix Transformer Layers                       │   │
│  │                                                               │   │
│  │  for layer in range(num_layers):                             │   │
│  │      h = h + LayerNorm(MHA(LayerNorm(h)))                    │   │
│  │      h = h + LayerNorm(FFN(LayerNorm(h)))                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              v                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Output Projection                                │   │
│  │                                                               │   │
│  │  candidate_embeddings = output[:, candidate_start:]          │   │
│  │  logits = candidate_embeddings @ unembedding                 │   │
│  │  # Shape: [B, C, num_actions]                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Candidate Isolation（候補分離アテンションマスク）

各候補投稿が独立してスコアリングされることを保証するため、特別なアテンションマスクを使用します。

#### マスク構造の視覚化

```
シーケンス: [user, h1, h2, c1, c2, c3]
位置:        0     1   2   3   4   5

アテンションマスク:
            Keys:  u   h1  h2  c1  c2  c3
Query u   :        1   0   0   0   0   0   <- 因果的
Query h1  :        1   1   0   0   0   0   <- 因果的
Query h2  :        1   1   1   0   0   0   <- 因果的
Query c1  :        1   1   1   1   0   0   <- user+history + 自己
Query c2  :        1   1   1   0   1   0   <- user+history + 自己
Query c3  :        1   1   1   0   0   1   <- user+history + 自己
```

#### コード実装（`grok.py`）

```python
def make_recsys_attn_mask(
    seq_len: int,
    candidate_start_offset: int,
    dtype: jnp.dtype = jnp.float32,
) -> jax.Array:
    """レコメンデーションシステム推論用のアテンションマスクを生成

    マスクの特性:
    - 位置 0 〜 candidate_start_offset-1 (user+history): 因果的アテンション
    - 位置 candidate_start_offset 以降 (candidates): user+history と自分自身にのみ attend
      他の候補には attend しない

    これにより、各候補が user+history コンテキストに基づいて独立にスコアリングされる。

    Args:
        seq_len: 全シーケンス長 (user + history + candidates)
        candidate_start_offset: 候補が始まる位置
        dtype: マスクのデータ型

    Returns:
        アテンションマスク [1, 1, seq_len, seq_len] (1 = attend 可能)
    """
    # 因果的マスクで開始
    causal_mask = jnp.tril(jnp.ones((1, 1, seq_len, seq_len), dtype=dtype))

    # 候補間のアテンションをゼロに（右下ブロック）
    attn_mask = causal_mask.at[:, :, candidate_start_offset:, candidate_start_offset:].set(0)

    # 候補の自己アテンションを復元（対角成分）
    candidate_indices = jnp.arange(candidate_start_offset, seq_len)
    attn_mask = attn_mask.at[:, :, candidate_indices, candidate_indices].set(1)

    return attn_mask
```

### 3.3 Multi-Action Prediction（マルチアクション予測）

Phoenix は 19 種類のユーザーアクションを同時に予測します。

#### 予測対象アクション一覧

| インデックス | アクション名 | 説明 |
|-------------|-------------|------|
| 0 | `favorite_score` | いいね確率 |
| 1 | `reply_score` | 返信確率 |
| 2 | `repost_score` | リポスト確率 |
| 3 | `photo_expand_score` | 画像展開確率 |
| 4 | `click_score` | クリック確率 |
| 5 | `profile_click_score` | プロフィールクリック確率 |
| 6 | `vqv_score` | 動画視聴完了確率 |
| 7 | `share_score` | 共有確率 |
| 8 | `share_via_dm_score` | DM共有確率 |
| 9 | `share_via_copy_link_score` | リンクコピー確率 |
| 10 | `dwell_score` | 滞在確率 |
| 11 | `quote_score` | 引用確率 |
| 12 | `quoted_click_score` | 引用クリック確率 |
| 13 | `follow_author_score` | 著者フォロー確率 |
| 14 | `not_interested_score` | 興味なし確率 |
| 15 | `block_author_score` | 著者ブロック確率 |
| 16 | `mute_author_score` | 著者ミュート確率 |
| 17 | `report_score` | 通報確率 |
| 18 | `dwell_time` | 滞在時間予測 |

#### 出力計算

```python
def __call__(
    self,
    batch: RecsysBatch,
    recsys_embeddings: RecsysEmbeddings,
) -> RecsysModelOutput:
    """ランキングのためのフォワードパス

    Returns:
        RecsysModelOutput: 各候補の logits [B, num_candidates, num_actions]
    """
    embeddings, padding_mask, candidate_start_offset = self.build_inputs(
        batch, recsys_embeddings
    )

    # Transformer エンコーディング
    model_output = self.model(
        embeddings,
        padding_mask,
        candidate_start_offset=candidate_start_offset,
    )

    out_embeddings = model_output.embeddings
    out_embeddings = layer_norm(out_embeddings)

    # 候補埋め込みを抽出
    candidate_embeddings = out_embeddings[:, candidate_start_offset:, :]

    # アクション logits を計算
    unembeddings = self._get_unembedding()  # [D, num_actions]
    logits = jnp.dot(candidate_embeddings, unembeddings)
    # Shape: [B, C, num_actions]

    return RecsysModelOutput(logits=logits)
```

#### スコアリングとランキング（`runners.py`）

```python
def hk_rank_candidates(
    batch: RecsysBatch, recsys_embeddings: RecsysEmbeddings
) -> RankingOutput:
    """候補投稿を予測エンゲージメントスコアでランキング"""
    output = hk_forward(batch, recsys_embeddings)
    logits = output.logits

    # Sigmoid で確率に変換
    probs = jax.nn.sigmoid(logits)

    # プライマリスコア（favorite_score）でソート
    primary_scores = probs[:, :, 0]
    ranked_indices = jnp.argsort(-primary_scores, axis=-1)

    return RankingOutput(
        scores=probs,
        ranked_indices=ranked_indices,
        p_favorite_score=probs[:, :, 0],
        p_reply_score=probs[:, :, 1],
        # ... 他のアクション
    )
```

---

## 4. 入力特徴量

### 4.1 特徴量の種類

Phoenix は以下の特徴量を入力として受け取ります。

```
┌─────────────────────────────────────────────────────────────────────┐
│                         入力特徴量                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. ユーザーハッシュ埋め込み                                          │
│     user_hashes: [B, num_user_hashes]                               │
│     user_embeddings: [B, num_user_hashes, D]                        │
│                                                                      │
│  2. 履歴埋め込み                                                     │
│     ├── history_post_hashes: [B, S, num_item_hashes]               │
│     ├── history_post_embeddings: [B, S, num_item_hashes, D]        │
│     ├── history_author_hashes: [B, S, num_author_hashes]           │
│     ├── history_author_embeddings: [B, S, num_author_hashes, D]    │
│     ├── history_actions: [B, S, num_actions]                        │
│     └── history_product_surface: [B, S]                             │
│                                                                      │
│  3. 候補埋め込み                                                     │
│     ├── candidate_post_hashes: [B, C, num_item_hashes]             │
│     ├── candidate_post_embeddings: [B, C, num_item_hashes, D]      │
│     ├── candidate_author_hashes: [B, C, num_author_hashes]         │
│     ├── candidate_author_embeddings: [B, C, num_author_hashes, D]  │
│     └── candidate_product_surface: [B, C]                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

B: バッチサイズ
S: 履歴シーケンス長 (default: 128)
C: 候補数 (default: 32)
D: 埋め込み次元 (default: 128)
```

### 4.2 データ構造

#### RecsysBatch（`recsys_model.py`）

```python
class RecsysBatch(NamedTuple):
    """レコメンデーションモデルの入力バッチ

    特徴データ（ハッシュ、アクション、プロダクトサーフェス）を含む。
    埋め込みは RecsysEmbeddings で別途渡される。
    """
    user_hashes: jax.typing.ArrayLike              # [B, num_user_hashes]
    history_post_hashes: jax.typing.ArrayLike      # [B, S, num_item_hashes]
    history_author_hashes: jax.typing.ArrayLike    # [B, S, num_author_hashes]
    history_actions: jax.typing.ArrayLike          # [B, S, num_actions]
    history_product_surface: jax.typing.ArrayLike  # [B, S]
    candidate_post_hashes: jax.typing.ArrayLike    # [B, C, num_item_hashes]
    candidate_author_hashes: jax.typing.ArrayLike  # [B, C, num_author_hashes]
    candidate_product_surface: jax.typing.ArrayLike # [B, C]
```

#### RecsysEmbeddings（`recsys_model.py`）

```python
@dataclass
class RecsysEmbeddings:
    """埋め込みテーブルから事前にルックアップされた埋め込みのコンテナ

    これらの埋め込みはモデルに渡される前にハッシュテーブルからルックアップされる。
    block_*_reduce 関数が複数のハッシュ埋め込みを単一の表現に結合する。
    """
    user_embeddings: jax.typing.ArrayLike          # [B, num_user_hashes, D]
    history_post_embeddings: jax.typing.ArrayLike  # [B, S, num_item_hashes, D]
    candidate_post_embeddings: jax.typing.ArrayLike # [B, C, num_item_hashes, D]
    history_author_embeddings: jax.typing.ArrayLike # [B, S, num_author_hashes, D]
    candidate_author_embeddings: jax.typing.ArrayLike # [B, C, num_author_hashes, D]
```

### 4.3 Product Surface

Product Surface は、ユーザーがコンテンツとインタラクションした場所を示すカテゴリ特徴量です。

```python
product_surface_vocab_size: int = 16  # サーフェスの種類数
```

例：
- ホームタイムライン
- 検索結果
- 通知
- プロフィールページ
- 引用リポスト
- など

### 4.4 Action Embeddings

履歴内の各投稿に対するユーザーアクションは、マルチホットベクトルとして表現され、学習済み射影行列で埋め込みに変換されます。

```python
def _get_action_embeddings(
    self,
    actions: jax.Array,  # [B, S, num_actions]
) -> jax.Array:
    """マルチホットアクションベクトルを埋め込みに変換

    符号付きアクションベクトルを埋め込み次元にマッピングする学習済み射影行列を使用。
    任意の数のアクションに対応。
    """
    _, _, num_actions = actions.shape
    D = config.emb_size

    action_projection = hk.get_parameter(
        "action_projection",
        [num_actions, D],
        dtype=jnp.float32,
        init=embed_init,
    )

    # 0/1 を -1/+1 に変換
    actions_signed = (2 * actions - 1).astype(jnp.float32)

    action_emb = jnp.dot(actions_signed, action_projection)

    # 有効なアクションのみマスク
    valid_mask = jnp.any(actions, axis=-1, keepdims=True)
    action_emb = action_emb * valid_mask

    return action_emb
```

---

## 5. Hash-Based Embeddings

Phoenix は、メモリ効率とスケーラビリティのためにハッシュベースの埋め込みを採用しています。

### 5.1 概要

```
┌─────────────────────────────────────────────────────────────────────┐
│                   Hash-Based Embedding System                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  従来の埋め込み:                                                     │
│    entity_id → embedding_table[entity_id]                           │
│    問題: 数十億のユニークIDに対して巨大なテーブルが必要               │
│                                                                      │
│  ハッシュベース埋め込み:                                             │
│    entity_id → [hash_1(id), hash_2(id), ...] → lookup → combine    │
│    利点: 固定サイズのテーブルで任意のIDを処理可能                    │
│                                                                      │
│  ┌────────────┐    ┌──────────────┐    ┌───────────────┐            │
│  │ Entity ID  │ -> │ Hash Functions│ -> │ Multiple      │            │
│  │ (uint64)   │    │ (k functions) │    │ Embeddings    │            │
│  └────────────┘    └──────────────┘    └───────────────┘            │
│                                               │                      │
│                                               v                      │
│                                    ┌───────────────────┐            │
│                                    │ Linear Projection │            │
│                                    │ (concat → D)      │            │
│                                    └───────────────────┘            │
│                                               │                      │
│                                               v                      │
│                                    Final Embedding [D]              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 HashConfig

```python
@dataclass
class HashConfig:
    """ハッシュベース埋め込みの設定"""

    num_user_hashes: int = 2     # ユーザーIDに使用するハッシュ関数の数
    num_item_hashes: int = 2     # 投稿IDに使用するハッシュ関数の数
    num_author_hashes: int = 2   # 著者IDに使用するハッシュ関数の数
```

### 5.3 埋め込み結合（Reduce）関数

複数のハッシュ埋め込みを単一の表現に結合します。

#### block_user_reduce

```python
def block_user_reduce(
    user_hashes: jnp.ndarray,     # [B, num_user_hashes]
    user_embeddings: jnp.ndarray, # [B, num_user_hashes, D]
    num_user_hashes: int,
    emb_size: int,
    embed_init_scale: float = 1.0,
) -> Tuple[jax.Array, jax.Array]:
    """複数のユーザーハッシュ埋め込みを単一のユーザー表現に結合

    Returns:
        user_embedding: [B, 1, D]
        user_padding_mask: [B, 1] (ユーザーが有効な場合 True)
    """
    B = user_embeddings.shape[0]
    D = emb_size

    # ハッシュ埋め込みを連結
    user_embedding = user_embeddings.reshape((B, 1, num_user_hashes * D))

    # 線形射影で次元を削減
    proj_mat_1 = hk.get_parameter(
        "proj_mat_1",
        [num_user_hashes * D, D],
        dtype=jnp.float32,
        init=embed_init,
    )
    user_embedding = jnp.dot(user_embedding, proj_mat_1)

    # パディングマスク（hash 0 はパディング用に予約）
    user_padding_mask = (user_hashes[:, 0] != 0).reshape(B, 1)

    return user_embedding, user_padding_mask
```

#### block_history_reduce

```python
def block_history_reduce(
    history_post_hashes: jnp.ndarray,           # [B, S, num_item_hashes]
    history_post_embeddings: jnp.ndarray,       # [B, S, num_item_hashes, D]
    history_author_embeddings: jnp.ndarray,     # [B, S, num_author_hashes, D]
    history_product_surface_embeddings: jnp.ndarray,  # [B, S, D]
    history_actions_embeddings: jnp.ndarray,    # [B, S, D]
    num_item_hashes: int,
    num_author_hashes: int,
    embed_init_scale: float = 1.0,
) -> Tuple[jax.Array, jax.Array]:
    """履歴埋め込みを結合

    投稿、著者、アクション、プロダクトサーフェスを連結して射影。

    Returns:
        history_embeddings: [B, S, D]
        history_padding_mask: [B, S]
    """
    B, S, _, D = history_post_embeddings.shape

    # 各タイプの埋め込みをリシェイプして連結
    history_post_embeddings_reshaped = history_post_embeddings.reshape(
        (B, S, num_item_hashes * D)
    )
    history_author_embeddings_reshaped = history_author_embeddings.reshape(
        (B, S, num_author_hashes * D)
    )

    post_author_embedding = jnp.concatenate([
        history_post_embeddings_reshaped,
        history_author_embeddings_reshaped,
        history_actions_embeddings,
        history_product_surface_embeddings,
    ], axis=-1)

    # 線形射影
    proj_mat_3 = hk.get_parameter(
        "proj_mat_3",
        [post_author_embedding.shape[-1], D],
        dtype=jnp.float32,
        init=embed_init,
    )
    history_embedding = jnp.dot(post_author_embedding, proj_mat_3)

    history_padding_mask = (history_post_hashes[:, :, 0] != 0)

    return history_embedding, history_padding_mask
```

---

## 6. モデル設定

### 6.1 TransformerConfig（`grok.py`）

```python
@dataclass
class TransformerConfig:
    emb_size: int           # 埋め込み次元
    key_size: int           # アテンションキーの次元
    num_q_heads: int        # クエリヘッド数
    num_kv_heads: int       # キー/バリューヘッド数（GQA対応）
    num_layers: int         # Transformer レイヤー数
    widening_factor: float = 4.0          # FFN拡張係数
    attn_output_multiplier: float = 1.0   # アテンション出力スケール

    name: Optional[str] = None

    def make(self) -> "Transformer":
        return Transformer(
            num_q_heads=self.num_q_heads,
            num_kv_heads=self.num_kv_heads,
            widening_factor=self.widening_factor,
            key_size=self.key_size,
            attn_output_multiplier=self.attn_output_multiplier,
            num_layers=self.num_layers,
        )
```

### 6.2 PhoenixModelConfig（Ranking）

```python
@dataclass
class PhoenixModelConfig:
    """ランキングモデルの設定"""

    model: TransformerConfig      # Transformer設定
    emb_size: int                 # 埋め込み次元
    num_actions: int              # 予測するアクション数 (default: 19)
    history_seq_len: int = 128    # 最大履歴長
    candidate_seq_len: int = 32   # 最大候補数

    name: Optional[str] = None
    fprop_dtype: Any = jnp.bfloat16   # 推論時のデータ型

    hash_config: HashConfig = None
    product_surface_vocab_size: int = 16
```

### 6.3 PhoenixRetrievalModelConfig（Retrieval）

```python
@dataclass
class PhoenixRetrievalModelConfig:
    """検索モデルの設定

    ランキングモデルと同じ Transformer アーキテクチャを使用。
    """

    model: TransformerConfig
    emb_size: int
    history_seq_len: int = 128
    candidate_seq_len: int = 32

    name: Optional[str] = None
    fprop_dtype: Any = jnp.bfloat16

    hash_config: HashConfig = None
    product_surface_vocab_size: int = 16
```

### 6.4 デフォルト設定例

```python
# run_ranker.py より
emb_size = 128
num_actions = 19
history_seq_len = 32
candidate_seq_len = 8

hash_config = HashConfig(
    num_user_hashes=2,
    num_item_hashes=2,
    num_author_hashes=2,
)

recsys_model = PhoenixModelConfig(
    emb_size=emb_size,
    num_actions=num_actions,
    history_seq_len=history_seq_len,
    candidate_seq_len=candidate_seq_len,
    hash_config=hash_config,
    product_surface_vocab_size=16,
    model=TransformerConfig(
        emb_size=emb_size,
        widening_factor=2,
        key_size=64,
        num_q_heads=2,
        num_kv_heads=2,
        num_layers=2,
        attn_output_multiplier=0.125,
    ),
)
```

---

## 7. Transformer アーキテクチャ詳細

### 7.1 全体構造

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Transformer                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Input: embeddings [B, T, D], padding_mask [B, T]                   │
│                                                                      │
│  for layer_idx in range(num_layers):                                │
│      ┌─────────────────────────────────────────────────────────┐    │
│      │                  DecoderLayer                            │    │
│      │                                                          │    │
│      │  h = inputs                                              │    │
│      │                                                          │    │
│      │  # Self-Attention Block                                  │    │
│      │  h_attn = MHABlock(RMSNorm(h), mask)                    │    │
│      │  h_attn = RMSNorm(h_attn)                               │    │
│      │  h = h + h_attn                                         │    │
│      │                                                          │    │
│      │  # Feed-Forward Block                                    │    │
│      │  h_dense = DenseBlock(RMSNorm(h))                       │    │
│      │  h_dense = RMSNorm(h_dense)                             │    │
│      │  h = h + h_dense                                        │    │
│      │                                                          │    │
│      └─────────────────────────────────────────────────────────┘    │
│                                                                      │
│  Output: embeddings [B, T, D]                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Multi-Head Attention

```python
class MultiHeadAttention(hk.Module):
    """Grouped Query Attention (GQA) 対応のマルチヘッドアテンション"""

    def __call__(
        self,
        query: jax.Array,   # [B, T, D]
        key: jax.Array,     # [B, T, D]
        value: jax.Array,   # [B, T, D]
        mask: jax.Array,    # [B, 1, T, T]
    ) -> MHAOutput:
        # Q/K/V 射影
        query_heads = self._linear_projection(query, self.key_size, self.num_q_heads)
        key_heads = self._linear_projection(key, self.key_size, self.num_kv_heads)
        value_heads = self._linear_projection(value, self.value_size, self.num_kv_heads)

        # Rotary Position Embedding (RoPE) 適用
        rotate = RotaryEmbedding(dim=self.key_size)
        key_heads = rotate(key_heads, seq_dim=1, offset=0)
        query_heads = rotate(query_heads, seq_dim=1, offset=0)

        # GQA: query heads をグループ化
        # num_q_heads = 8, num_kv_heads = 2 の場合、各KVヘッドに4つのQヘッドが対応
        query_heads = query_heads.reshape((b, t, kv_h, h // kv_h, d))

        # アテンションスコア計算
        attn_logits = jnp.einsum("...thHd,...Thd->...hHtT", query_heads, key_heads)
        attn_logits *= self.attn_output_multiplier

        # Soft-capping（数値安定性のため）
        max_attn_val = 30.0
        attn_logits = max_attn_val * jnp.tanh(attn_logits / max_attn_val)

        # マスク適用
        attn_logits = jnp.where(mask, attn_logits, -1e30)

        # Softmax
        attn_weights = jax.nn.softmax(attn_logits)

        # Value との重み付け和
        attn = jnp.einsum("...hHtT,...Thd->...thHd", attn_weights, value_heads)

        # 出力射影
        return MHAOutput(final_projection(attn))
```

### 7.3 Feed-Forward Network (DenseBlock)

```python
@dataclass
class DenseBlock(hk.Module):
    """SwiGLU 活性化を使用した FFN"""

    widening_factor: float = 4.0

    def __call__(self, inputs: jax.Array) -> jax.Array:
        _, _, model_size = inputs.shape

        # SwiGLU: gate * GELU(x)
        h_v = Linear(ffn_size)(inputs)           # Value branch
        h_w1 = jax.nn.gelu(Linear(ffn_size)(inputs))  # Gate branch

        h_dense = Linear(model_size)(h_w1 * h_v)  # Output projection

        return h_dense


def ffn_size(emb_size, widening_factor):
    """FFN の隠れ層サイズを計算（8の倍数に調整）"""
    _ffn_size = int(widening_factor * emb_size) * 2 // 3
    _ffn_size = _ffn_size + (8 - _ffn_size) % 8
    return _ffn_size
```

### 7.4 RMS Layer Normalization

```python
class RMSNorm(hk.RMSNorm):
    """Root Mean Square Layer Normalization

    標準的な LayerNorm より計算効率が良い。
    """

    def __call__(self, inputs: jax.Array):
        # 二乗平均を計算
        mean_squared = jnp.mean(jnp.square(inputs), axis=[-1], keepdims=True)

        # RMS で正規化
        normed_inputs = inputs * jax.lax.rsqrt(mean_squared + self.eps)

        # スケールパラメータ適用
        return scale * normed_inputs
```

### 7.5 Rotary Position Embedding (RoPE)

```python
class RotaryEmbedding(hk.Module):
    """回転位置埋め込み（RoPE）

    参考: https://arxiv.org/abs/2104.09864

    位置情報を回転行列として埋め込み、相対位置関係を効率的にエンコード。
    """

    def __init__(self, dim: int, base_exponent: int = 10000):
        self.dim = dim
        self.base_exponent = base_exponent

    def __call__(self, x: jax.Array, seq_dim: int, offset: jax.Array) -> jax.Array:
        # 周波数の計算
        exponents = jnp.arange(0, self.dim, 2, dtype=jnp.float32)
        inv_freq = 1.0 / (self.base_exponent ** (exponents / self.dim))

        # 位置インデックス
        t = jnp.arange(x.shape[seq_dim]) + offset

        # 位相角の計算
        phase = jnp.einsum("bi,j->bij", t, inv_freq)
        phase = jnp.tile(phase, reps=(1, 2))

        # 回転の適用
        x = x * jnp.cos(phase) + rotate_half(x) * jnp.sin(phase)

        return x


def rotate_half(x: jax.Array) -> jax.Array:
    """特徴量の回転対を取得"""
    x1, x2 = jnp.split(x, 2, axis=-1)
    return jnp.concatenate((-x2, x1), axis=-1)
```

---

## 8. 推論パイプライン

### 8.1 ランキング推論

```python
# run_ranker.py の使用例

# 1. モデル設定
recsys_model = PhoenixModelConfig(...)

# 2. 推論ランナーの作成と初期化
inference_runner = RecsysInferenceRunner(
    runner=ModelRunner(model=recsys_model, bs_per_device=0.125),
    name="recsys_local",
)
inference_runner.initialize()

# 3. バッチの作成
batch, embeddings = create_example_batch(
    batch_size=1,
    emb_size=emb_size,
    history_len=history_seq_len,
    num_candidates=candidate_seq_len,
    num_actions=num_actions,
    ...
)

# 4. ランキング実行
ranking_output = inference_runner.rank(batch, embeddings)

# 5. 結果の取得
scores = ranking_output.scores        # [B, C, num_actions]
ranked_indices = ranking_output.ranked_indices  # [B, C]
p_favorite = ranking_output.p_favorite_score    # [B, C]
```

### 8.2 検索推論

```python
# run_retrieval.py の使用例

# 1. モデル設定
retrieval_model_config = PhoenixRetrievalModelConfig(...)

# 2. 推論ランナーの作成と初期化
inference_runner = RecsysRetrievalInferenceRunner(
    runner=RetrievalModelRunner(model=retrieval_model_config, bs_per_device=0.125),
    name="retrieval_local",
)
inference_runner.initialize()

# 3. コーパスの設定
corpus_embeddings, corpus_post_ids = create_example_corpus(
    corpus_size=1000,
    emb_size=emb_size,
)
inference_runner.set_corpus(corpus_embeddings, corpus_post_ids)

# 4. バッチの作成
batch, embeddings = create_example_batch(...)

# 5. 検索実行
retrieval_output = inference_runner.retrieve(
    batch,
    embeddings,
    top_k=10,
)

# 6. 結果の取得
top_k_indices = retrieval_output.top_k_indices  # [B, K]
top_k_scores = retrieval_output.top_k_scores    # [B, K]
user_representation = retrieval_output.user_representation  # [B, D]
```

---

## 9. パラメータサマリー

| パラメータ | デフォルト値 | 説明 |
|-----------|-------------|------|
| `emb_size` | 128 | 埋め込み次元 |
| `num_layers` | 2 | Transformer レイヤー数 |
| `num_q_heads` | 2 | クエリヘッド数 |
| `num_kv_heads` | 2 | キー/バリューヘッド数 |
| `key_size` | 64 | アテンションキー次元 |
| `widening_factor` | 2.0 | FFN拡張係数 |
| `attn_output_multiplier` | 0.125 | アテンション出力スケール |
| `history_seq_len` | 128 | 最大履歴シーケンス長 |
| `candidate_seq_len` | 32 | 最大候補数 |
| `num_actions` | 19 | 予測アクション数 |
| `num_user_hashes` | 2 | ユーザーハッシュ数 |
| `num_item_hashes` | 2 | アイテムハッシュ数 |
| `num_author_hashes` | 2 | 著者ハッシュ数 |
| `product_surface_vocab_size` | 16 | プロダクトサーフェス種類数 |
| `fprop_dtype` | bfloat16 | 推論時データ型 |

---

## 10. 関連ファイル

| ファイル | 説明 |
|---------|------|
| `/phoenix/grok.py` | Transformer コアアーキテクチャ |
| `/phoenix/recsys_model.py` | Ranking モデル実装 |
| `/phoenix/recsys_retrieval_model.py` | Retrieval モデル実装 |
| `/phoenix/runners.py` | 推論ランナーとユーティリティ |
| `/phoenix/run_ranker.py` | ランキングデモスクリプト |
| `/phoenix/run_retrieval.py` | 検索デモスクリプト |
| `/phoenix/test_recsys_model.py` | アテンションマスクのテスト |
