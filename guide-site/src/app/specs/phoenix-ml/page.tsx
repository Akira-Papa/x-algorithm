'use client';

import Link from 'next/link';
import {
  ChevronLeftIcon,
  CpuChipIcon,
  DocumentTextIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';

// セクションヘッダーコンポーネント
function SectionHeader({ id, number, title, icon: Icon }: { id: string; number: string; title: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3 pt-8 border-t border-gray-200 dark:border-gray-700 mt-8 first:mt-0 first:border-t-0 first:pt-0">
      <span className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      </span>
      <span className="text-gray-400 dark:text-gray-500 font-normal">{number}.</span>
      {title}
    </h2>
  );
}

// サブセクションヘッダーコンポーネント
function SubSectionHeader({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <h3 id={id} className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8 flex items-center gap-2">
      <span className="text-gray-400 dark:text-gray-500 font-normal text-lg">{number}</span>
      {title}
    </h3>
  );
}

// コードブロックコンポーネント
function CodeBlock({ children, title, language }: { children: string; title?: string; language?: string }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {(title || language) && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span>{title}</span>
          {language && <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">{language}</span>}
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto"
        style={{ background: '#1e293b', color: '#e2e8f0' }}
      >
        <code className="text-sm whitespace-pre font-mono">{children}</code>
      </pre>
    </div>
  );
}

// テーブルコンポーネント
function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-800/50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 図表ボックスコンポーネント
function DiagramBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{title}</span>
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
}

// インフォボックスコンポーネント
function InfoBox({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'note'; title?: string; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
    warning: 'border-amber-400 bg-amber-50 dark:bg-amber-900/20',
    note: 'border-purple-400 bg-purple-50 dark:bg-purple-900/20',
  };
  const textStyles = {
    info: 'text-blue-800 dark:text-blue-300',
    warning: 'text-amber-800 dark:text-amber-300',
    note: 'text-purple-800 dark:text-purple-300',
  };

  return (
    <div className={`my-6 border-l-4 rounded-r-lg p-4 ${styles[type]}`}>
      {title && <p className={`font-semibold mb-2 ${textStyles[type]}`}>{title}</p>}
      <div className={`text-sm ${textStyles[type]}`}>{children}</div>
    </div>
  );
}

// 目次コンポーネント
function TableOfContents() {
  const sections = [
    { id: 'overview', number: '1', title: '概要' },
    { id: 'two-tower', number: '2', title: 'Two-Tower Retrieval Model' },
    { id: 'ranking-transformer', number: '3', title: 'Ranking Transformer' },
    { id: 'input-features', number: '4', title: '入力特徴量' },
    { id: 'hash-embeddings', number: '5', title: 'Hash-Based Embeddings' },
    { id: 'model-config', number: '6', title: 'モデル設定' },
    { id: 'transformer-arch', number: '7', title: 'Transformer アーキテクチャ詳細' },
    { id: 'inference', number: '8', title: '推論パイプライン' },
    { id: 'parameters', number: '9', title: 'パラメータサマリー' },
    { id: 'files', number: '10', title: '関連ファイル' },
  ];

  return (
    <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <DocumentTextIcon className="w-5 h-5 text-purple-500" />
        目次
      </h2>
      <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-1"
          >
            <span className="text-gray-400 mr-2">{section.number}.</span>
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function PhoenixMLPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>ガイドに戻る</span>
          </Link>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <CpuChipIcon className="w-4 h-4" />
            技術仕様書
          </span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* タイトルセクション */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
              SPEC DOCUMENT
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Phoenix ML モデル仕様書
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            X (旧 Twitter) のレコメンデーションシステムの中核となる機械学習モデルの技術仕様
          </p>
        </div>

        {/* 目次 */}
        <TableOfContents />

        {/* セクション1: 概要 */}
        <SectionHeader id="overview" number="1" title="概要" icon={CubeIcon} />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Phoenix は X (旧 Twitter) のレコメンデーションシステムの中核となる機械学習モデルです。Grok ベースの Transformer アーキテクチャを採用し、ユーザーの過去の行動履歴と候補投稿から、最適なコンテンツをランキング・検索します。
        </p>

        <SubSectionHeader id="system-components" number="1.1" title="システム構成" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Phoenix は以下の 2 つの主要コンポーネントで構成されています：
        </p>

        <DataTable
          headers={['コンポーネント', '役割', '主要ファイル']}
          rows={[
            [<strong key="1" className="text-purple-600 dark:text-purple-400">Two-Tower Retrieval Model</strong>, '大規模候補プールからの高速検索', <code key="c1" className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">recsys_retrieval_model.py</code>],
            [<strong key="2" className="text-purple-600 dark:text-purple-400">Ranking Transformer</strong>, '候補投稿の精密なランキング', <code key="c2" className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">recsys_model.py</code>],
          ]}
        />

        <SubSectionHeader id="processing-flow" number="1.2" title="処理フロー" />

        <DiagramBox title="Phoenix 処理フロー">
          <div className="font-mono text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-700 dark:text-blue-300">候補プール (数百万件)</span>
            </div>
            <div className="text-gray-400 pl-6">|</div>
            <div className="text-gray-400 pl-6">v</div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-700 dark:text-purple-300">Two-Tower Retrieval</span>
              <span className="text-gray-400">--- ANN検索 ---&gt;</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">候補 (数百〜数千件)</span>
            </div>
            <div className="text-gray-400 pl-6">|</div>
            <div className="text-gray-400 pl-6">v</div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-700 dark:text-purple-300">Ranking Transformer</span>
              <span className="text-gray-400">--- スコアリング ---&gt;</span>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded text-amber-700 dark:text-amber-300">ランキング結果</span>
            </div>
            <div className="text-gray-400 pl-6">|</div>
            <div className="text-gray-400 pl-6">v</div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">ユーザーフィード表示</span>
            </div>
          </div>
        </DiagramBox>

        {/* セクション2: Two-Tower Retrieval Model */}
        <SectionHeader id="two-tower" number="2" title="Two-Tower Retrieval Model" icon={ArrowsRightLeftIcon} />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Two-Tower アーキテクチャは、ユーザーと候補アイテムを別々のタワー（エンコーダー）で埋め込み、内積類似度で高速検索を実現します。
        </p>

        <SubSectionHeader id="two-tower-arch" number="2.1" title="アーキテクチャ概要" />

        <DiagramBox title="Two-Tower Retrieval Model アーキテクチャ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">User Tower</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>- Phoenix Transformer</li>
                <li>- Mean Pooling</li>
                <li>- L2 Normalization</li>
              </ul>
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-500">Output: [B, D] normalized</p>
            </div>
            <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Candidate Tower</h4>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>- MLP Projection (2-layer)</li>
                <li>- L2 Normalization</li>
              </ul>
              <p className="mt-2 text-xs text-green-600 dark:text-green-500">Output: [N, D] normalized</p>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-block border border-purple-200 dark:border-purple-800 rounded-lg p-3 bg-purple-50 dark:bg-purple-900/20">
              <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">Dot Product Similarity</p>
              <code className="text-xs text-purple-600 dark:text-purple-400">scores = user @ corpus.T</code>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">→ Top-K Selection</p>
            </div>
          </div>
        </DiagramBox>

        <SubSectionHeader id="user-tower" number="2.2" title="User Tower" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          User Tower は Phoenix Transformer を使用してユーザー表現を生成します。
        </p>

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">入力シーケンス構成</h4>

        <CodeBlock title="入力シーケンス">{`[User Embedding] + [History Embeddings (S tokens)]
     1 token              S tokens (default: 128)`}</CodeBlock>

        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-6">処理フロー</h4>

        <CodeBlock language="python" title="User Tower 処理フロー">{`# 1. ユーザー埋め込みの生成
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
# Output: [B, D]`}</CodeBlock>

        <SubSectionHeader id="candidate-tower" number="2.3" title="Candidate Tower" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Candidate Tower は軽量な MLP で候補投稿を埋め込み空間にマッピングします。
        </p>

        <DiagramBox title="Candidate Tower アーキテクチャ">
          <div className="font-mono text-sm text-center space-y-2">
            <div><span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">Input: [post_embeddings, author_embeddings]</span></div>
            <div className="text-gray-400">concat → [B, C, (num_item_hashes + num_author_hashes) * D]</div>
            <div className="text-gray-400">↓</div>
            <div className="border border-gray-300 dark:border-gray-600 rounded p-2 mx-auto max-w-xs">
              <p>Linear (in → 2*D)</p>
              <p className="text-purple-600 dark:text-purple-400">+ SiLU</p>
            </div>
            <div className="text-gray-400">↓</div>
            <div className="border border-gray-300 dark:border-gray-600 rounded p-2 mx-auto max-w-xs">
              <p>Linear (2*D → D)</p>
            </div>
            <div className="text-gray-400">↓</div>
            <div><span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded text-purple-700 dark:text-purple-300">L2 Normalization</span></div>
            <div className="text-gray-400">↓</div>
            <div><span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">Output: [B, C, D]</span></div>
          </div>
        </DiagramBox>

        <SubSectionHeader id="similarity-search" number="2.4" title="Similarity Search" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          正規化された埋め込みベクトル間の内積により、コサイン類似度を計算します。
        </p>

        <CodeBlock language="python" title="Top-K 検索">{`def _retrieve_top_k(
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

    return top_k_indices, top_k_scores`}</CodeBlock>

        <InfoBox type="note" title="Note">
          本番環境では、FAISS や ScaNN などの近似最近傍探索（ANN）ライブラリを使用して、数十億件規模のコーパスから高速に検索を行います。
        </InfoBox>

        {/* セクション3: Ranking Transformer */}
        <SectionHeader id="ranking-transformer" number="3" title="Ranking Transformer" icon={TableCellsIcon} />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Ranking Transformer は、検索された候補投稿を精密にスコアリングし、最終的なランキングを決定します。
        </p>

        <SubSectionHeader id="ranking-arch" number="3.1" title="アーキテクチャ概要" />

        <DiagramBox title="Ranking Transformer アーキテクチャ">
          <div className="space-y-4 font-mono text-sm">
            <div className="border border-gray-300 dark:border-gray-600 rounded p-3 bg-gray-50 dark:bg-gray-800">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Input Sequence:</p>
              <code className="text-purple-600 dark:text-purple-400">[User (1)] + [History (S)] + [Candidates (C)]</code>
            </div>
            <div className="border border-blue-200 dark:border-blue-800 rounded p-3 bg-blue-50 dark:bg-blue-900/20">
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Attention Mask</p>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>User+History: Causal Attention (下三角行列)</li>
                <li>Candidates: User+History への attend + Self-attention</li>
                <li className="text-blue-600 dark:text-blue-500">(他の候補には attend しない)</li>
              </ul>
            </div>
            <div className="text-center text-gray-400">↓</div>
            <div className="border border-purple-200 dark:border-purple-800 rounded p-3 bg-purple-50 dark:bg-purple-900/20">
              <p className="font-semibold text-purple-800 dark:text-purple-300">Phoenix Transformer Layers</p>
              <code className="text-xs text-purple-600 dark:text-purple-400">h = h + LayerNorm(MHA(LayerNorm(h)))</code>
              <br />
              <code className="text-xs text-purple-600 dark:text-purple-400">h = h + LayerNorm(FFN(LayerNorm(h)))</code>
            </div>
            <div className="text-center text-gray-400">↓</div>
            <div className="border border-green-200 dark:border-green-800 rounded p-3 bg-green-50 dark:bg-green-900/20">
              <p className="font-semibold text-green-800 dark:text-green-300">Output Projection</p>
              <code className="text-xs text-green-600 dark:text-green-400">logits = candidate_embeddings @ unembedding</code>
              <p className="text-xs text-green-600 dark:text-green-400">Shape: [B, C, num_actions]</p>
            </div>
          </div>
        </DiagramBox>

        <SubSectionHeader id="candidate-isolation" number="3.2" title="Candidate Isolation（候補分離アテンションマスク）" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          各候補投稿が独立してスコアリングされることを保証するため、特別なアテンションマスクを使用します。
        </p>

        <DiagramBox title="アテンションマスク構造">
          <div className="overflow-x-auto">
            <pre className="text-xs font-mono text-gray-700 dark:text-gray-300">{`シーケンス: [user, h1, h2, c1, c2, c3]
位置:        0     1   2   3   4   5

アテンションマスク:
            Keys:  u   h1  h2  c1  c2  c3
Query u   :        1   0   0   0   0   0   <- 因果的
Query h1  :        1   1   0   0   0   0   <- 因果的
Query h2  :        1   1   1   0   0   0   <- 因果的
Query c1  :        1   1   1   1   0   0   <- user+history + 自己
Query c2  :        1   1   1   0   1   0   <- user+history + 自己
Query c3  :        1   1   1   0   0   1   <- user+history + 自己`}</pre>
          </div>
        </DiagramBox>

        <SubSectionHeader id="multi-action" number="3.3" title="Multi-Action Prediction（マルチアクション予測）" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Phoenix は 19 種類のユーザーアクションを同時に予測します。
        </p>

        <DataTable
          headers={['インデックス', 'アクション名', '説明']}
          rows={[
            ['0', <code key="a0" className="text-purple-600 dark:text-purple-400">favorite_score</code>, 'いいね確率'],
            ['1', <code key="a1" className="text-purple-600 dark:text-purple-400">reply_score</code>, '返信確率'],
            ['2', <code key="a2" className="text-purple-600 dark:text-purple-400">repost_score</code>, 'リポスト確率'],
            ['3', <code key="a3" className="text-purple-600 dark:text-purple-400">photo_expand_score</code>, '画像展開確率'],
            ['4', <code key="a4" className="text-purple-600 dark:text-purple-400">click_score</code>, 'クリック確率'],
            ['5', <code key="a5" className="text-purple-600 dark:text-purple-400">profile_click_score</code>, 'プロフィールクリック確率'],
            ['6', <code key="a6" className="text-purple-600 dark:text-purple-400">vqv_score</code>, '動画視聴完了確率'],
            ['7', <code key="a7" className="text-purple-600 dark:text-purple-400">share_score</code>, '共有確率'],
            ['8', <code key="a8" className="text-purple-600 dark:text-purple-400">share_via_dm_score</code>, 'DM共有確率'],
            ['9', <code key="a9" className="text-purple-600 dark:text-purple-400">share_via_copy_link_score</code>, 'リンクコピー確率'],
            ['10', <code key="a10" className="text-purple-600 dark:text-purple-400">dwell_score</code>, '滞在確率'],
            ['11', <code key="a11" className="text-purple-600 dark:text-purple-400">quote_score</code>, '引用確率'],
            ['12', <code key="a12" className="text-purple-600 dark:text-purple-400">quoted_click_score</code>, '引用クリック確率'],
            ['13', <code key="a13" className="text-purple-600 dark:text-purple-400">follow_author_score</code>, '著者フォロー確率'],
            ['14', <code key="a14" className="text-red-600 dark:text-red-400">not_interested_score</code>, '興味なし確率'],
            ['15', <code key="a15" className="text-red-600 dark:text-red-400">block_author_score</code>, '著者ブロック確率'],
            ['16', <code key="a16" className="text-red-600 dark:text-red-400">mute_author_score</code>, '著者ミュート確率'],
            ['17', <code key="a17" className="text-red-600 dark:text-red-400">report_score</code>, '通報確率'],
            ['18', <code key="a18" className="text-purple-600 dark:text-purple-400">dwell_time</code>, '滞在時間予測'],
          ]}
        />

        {/* セクション4: 入力特徴量 */}
        <SectionHeader id="input-features" number="4" title="入力特徴量" icon={CircleStackIcon} />

        <SubSectionHeader id="feature-types" number="4.1" title="特徴量の種類" />

        <DiagramBox title="入力特徴量の構造">
          <div className="space-y-4 text-sm">
            <div className="border border-blue-200 dark:border-blue-800 rounded p-3 bg-blue-50 dark:bg-blue-900/20">
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">1. ユーザーハッシュ埋め込み</p>
              <code className="text-xs text-blue-600 dark:text-blue-400 block">user_hashes: [B, num_user_hashes]</code>
              <code className="text-xs text-blue-600 dark:text-blue-400 block">user_embeddings: [B, num_user_hashes, D]</code>
            </div>
            <div className="border border-green-200 dark:border-green-800 rounded p-3 bg-green-50 dark:bg-green-900/20">
              <p className="font-semibold text-green-800 dark:text-green-300 mb-2">2. 履歴埋め込み</p>
              <code className="text-xs text-green-600 dark:text-green-400 block">history_post_hashes: [B, S, num_item_hashes]</code>
              <code className="text-xs text-green-600 dark:text-green-400 block">history_post_embeddings: [B, S, num_item_hashes, D]</code>
              <code className="text-xs text-green-600 dark:text-green-400 block">history_author_embeddings: [B, S, num_author_hashes, D]</code>
              <code className="text-xs text-green-600 dark:text-green-400 block">history_actions: [B, S, num_actions]</code>
              <code className="text-xs text-green-600 dark:text-green-400 block">history_product_surface: [B, S]</code>
            </div>
            <div className="border border-purple-200 dark:border-purple-800 rounded p-3 bg-purple-50 dark:bg-purple-900/20">
              <p className="font-semibold text-purple-800 dark:text-purple-300 mb-2">3. 候補埋め込み</p>
              <code className="text-xs text-purple-600 dark:text-purple-400 block">candidate_post_hashes: [B, C, num_item_hashes]</code>
              <code className="text-xs text-purple-600 dark:text-purple-400 block">candidate_post_embeddings: [B, C, num_item_hashes, D]</code>
              <code className="text-xs text-purple-600 dark:text-purple-400 block">candidate_author_embeddings: [B, C, num_author_hashes, D]</code>
              <code className="text-xs text-purple-600 dark:text-purple-400 block">candidate_product_surface: [B, C]</code>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <p>B: バッチサイズ | S: 履歴シーケンス長 (default: 128) | C: 候補数 (default: 32) | D: 埋め込み次元 (default: 128)</p>
          </div>
        </DiagramBox>

        <SubSectionHeader id="product-surface" number="4.2" title="Product Surface" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Product Surface は、ユーザーがコンテンツとインタラクションした場所を示すカテゴリ特徴量です。
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
          {['ホームタイムライン', '検索結果', '通知', 'プロフィールページ', '引用リポスト', 'など'].map((item, i) => (
            <span key={i} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-700 dark:text-gray-300 text-center">
              {item}
            </span>
          ))}
        </div>

        <CodeBlock language="python">{`product_surface_vocab_size: int = 16  # サーフェスの種類数`}</CodeBlock>

        {/* セクション5: Hash-Based Embeddings */}
        <SectionHeader id="hash-embeddings" number="5" title="Hash-Based Embeddings" icon={CubeIcon} />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Phoenix は、メモリ効率とスケーラビリティのためにハッシュベースの埋め込みを採用しています。
        </p>

        <DiagramBox title="Hash-Based Embedding System">
          <div className="space-y-4">
            <div className="border border-gray-300 dark:border-gray-600 rounded p-3">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">従来の埋め込み:</p>
              <code className="text-sm text-gray-600 dark:text-gray-400">entity_id → embedding_table[entity_id]</code>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">問題: 数十億のユニークIDに対して巨大なテーブルが必要</p>
            </div>
            <div className="border border-green-200 dark:border-green-800 rounded p-3 bg-green-50 dark:bg-green-900/20">
              <p className="font-semibold text-green-800 dark:text-green-300 mb-2">ハッシュベース埋め込み:</p>
              <code className="text-sm text-green-600 dark:text-green-400">entity_id → [hash_1(id), hash_2(id), ...] → lookup → combine</code>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">利点: 固定サイズのテーブルで任意のIDを処理可能</p>
            </div>
          </div>
        </DiagramBox>

        <SubSectionHeader id="hash-config" number="5.1" title="HashConfig" />

        <CodeBlock language="python" title="HashConfig">{`@dataclass
class HashConfig:
    """ハッシュベース埋め込みの設定"""

    num_user_hashes: int = 2     # ユーザーIDに使用するハッシュ関数の数
    num_item_hashes: int = 2     # 投稿IDに使用するハッシュ関数の数
    num_author_hashes: int = 2   # 著者IDに使用するハッシュ関数の数`}</CodeBlock>

        {/* セクション6: モデル設定 */}
        <SectionHeader id="model-config" number="6" title="モデル設定" icon={Cog6ToothIcon} />

        <SubSectionHeader id="transformer-config" number="6.1" title="TransformerConfig" />

        <CodeBlock language="python" title="TransformerConfig (grok.py)">{`@dataclass
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
        )`}</CodeBlock>

        <SubSectionHeader id="default-config" number="6.2" title="デフォルト設定例" />

        <CodeBlock language="python" title="run_ranker.py より">{`emb_size = 128
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
)`}</CodeBlock>

        {/* セクション7: Transformer アーキテクチャ詳細 */}
        <SectionHeader id="transformer-arch" number="7" title="Transformer アーキテクチャ詳細" icon={CpuChipIcon} />

        <SubSectionHeader id="overall-structure" number="7.1" title="全体構造" />

        <DiagramBox title="Transformer 全体構造">
          <div className="font-mono text-sm space-y-2">
            <p className="text-gray-600 dark:text-gray-400">Input: embeddings [B, T, D], padding_mask [B, T]</p>
            <div className="border border-purple-200 dark:border-purple-800 rounded p-3 bg-purple-50 dark:bg-purple-900/20 my-2">
              <p className="font-semibold text-purple-800 dark:text-purple-300 mb-2">for layer_idx in range(num_layers):</p>
              <div className="pl-4 text-purple-700 dark:text-purple-400 text-xs space-y-1">
                <p>h = inputs</p>
                <p className="text-purple-600 dark:text-purple-500"># Self-Attention Block</p>
                <p>h_attn = MHABlock(RMSNorm(h), mask)</p>
                <p>h_attn = RMSNorm(h_attn)</p>
                <p>h = h + h_attn</p>
                <p className="text-purple-600 dark:text-purple-500"># Feed-Forward Block</p>
                <p>h_dense = DenseBlock(RMSNorm(h))</p>
                <p>h_dense = RMSNorm(h_dense)</p>
                <p>h = h + h_dense</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Output: embeddings [B, T, D]</p>
          </div>
        </DiagramBox>

        <SubSectionHeader id="mha" number="7.2" title="Multi-Head Attention" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Grouped Query Attention (GQA) 対応のマルチヘッドアテンションを使用しています。
        </p>

        <CodeBlock language="python" title="Multi-Head Attention の主要処理">{`# Q/K/V 射影
query_heads = self._linear_projection(query, self.key_size, self.num_q_heads)
key_heads = self._linear_projection(key, self.key_size, self.num_kv_heads)
value_heads = self._linear_projection(value, self.value_size, self.num_kv_heads)

# Rotary Position Embedding (RoPE) 適用
rotate = RotaryEmbedding(dim=self.key_size)
key_heads = rotate(key_heads, seq_dim=1, offset=0)
query_heads = rotate(query_heads, seq_dim=1, offset=0)

# GQA: query heads をグループ化
query_heads = query_heads.reshape((b, t, kv_h, h // kv_h, d))

# アテンションスコア計算
attn_logits = jnp.einsum("...thHd,...Thd->...hHtT", query_heads, key_heads)
attn_logits *= self.attn_output_multiplier

# Soft-capping（数値安定性のため）
max_attn_val = 30.0
attn_logits = max_attn_val * jnp.tanh(attn_logits / max_attn_val)

# マスク適用 + Softmax
attn_logits = jnp.where(mask, attn_logits, -1e30)
attn_weights = jax.nn.softmax(attn_logits)`}</CodeBlock>

        <SubSectionHeader id="ffn" number="7.3" title="Feed-Forward Network (DenseBlock)" />

        <CodeBlock language="python" title="SwiGLU 活性化を使用した FFN">{`@dataclass
class DenseBlock(hk.Module):
    """SwiGLU 活性化を使用した FFN"""

    widening_factor: float = 4.0

    def __call__(self, inputs: jax.Array) -> jax.Array:
        _, _, model_size = inputs.shape

        # SwiGLU: gate * GELU(x)
        h_v = Linear(ffn_size)(inputs)           # Value branch
        h_w1 = jax.nn.gelu(Linear(ffn_size)(inputs))  # Gate branch

        h_dense = Linear(model_size)(h_w1 * h_v)  # Output projection

        return h_dense`}</CodeBlock>

        <SubSectionHeader id="rope" number="7.4" title="Rotary Position Embedding (RoPE)" />

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          位置情報を回転行列として埋め込み、相対位置関係を効率的にエンコードします。
        </p>

        <CodeBlock language="python" title="RoPE 実装">{`class RotaryEmbedding(hk.Module):
    """回転位置埋め込み（RoPE）
    参考: https://arxiv.org/abs/2104.09864
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

        return x`}</CodeBlock>

        {/* セクション8: 推論パイプライン */}
        <SectionHeader id="inference" number="8" title="推論パイプライン" icon={CommandLineIcon} />

        <SubSectionHeader id="ranking-inference" number="8.1" title="ランキング推論" />

        <CodeBlock language="python" title="run_ranker.py の使用例">{`# 1. モデル設定
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
p_favorite = ranking_output.p_favorite_score    # [B, C]`}</CodeBlock>

        <SubSectionHeader id="retrieval-inference" number="8.2" title="検索推論" />

        <CodeBlock language="python" title="run_retrieval.py の使用例">{`# 1. モデル設定
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
user_representation = retrieval_output.user_representation  # [B, D]`}</CodeBlock>

        {/* セクション9: パラメータサマリー */}
        <SectionHeader id="parameters" number="9" title="パラメータサマリー" icon={TableCellsIcon} />

        <DataTable
          headers={['パラメータ', 'デフォルト値', '説明']}
          rows={[
            [<code key="p1" className="text-purple-600 dark:text-purple-400">emb_size</code>, '128', '埋め込み次元'],
            [<code key="p2" className="text-purple-600 dark:text-purple-400">num_layers</code>, '2', 'Transformer レイヤー数'],
            [<code key="p3" className="text-purple-600 dark:text-purple-400">num_q_heads</code>, '2', 'クエリヘッド数'],
            [<code key="p4" className="text-purple-600 dark:text-purple-400">num_kv_heads</code>, '2', 'キー/バリューヘッド数'],
            [<code key="p5" className="text-purple-600 dark:text-purple-400">key_size</code>, '64', 'アテンションキー次元'],
            [<code key="p6" className="text-purple-600 dark:text-purple-400">widening_factor</code>, '2.0', 'FFN拡張係数'],
            [<code key="p7" className="text-purple-600 dark:text-purple-400">attn_output_multiplier</code>, '0.125', 'アテンション出力スケール'],
            [<code key="p8" className="text-purple-600 dark:text-purple-400">history_seq_len</code>, '128', '最大履歴シーケンス長'],
            [<code key="p9" className="text-purple-600 dark:text-purple-400">candidate_seq_len</code>, '32', '最大候補数'],
            [<code key="p10" className="text-purple-600 dark:text-purple-400">num_actions</code>, '19', '予測アクション数'],
            [<code key="p11" className="text-purple-600 dark:text-purple-400">num_user_hashes</code>, '2', 'ユーザーハッシュ数'],
            [<code key="p12" className="text-purple-600 dark:text-purple-400">num_item_hashes</code>, '2', 'アイテムハッシュ数'],
            [<code key="p13" className="text-purple-600 dark:text-purple-400">num_author_hashes</code>, '2', '著者ハッシュ数'],
            [<code key="p14" className="text-purple-600 dark:text-purple-400">product_surface_vocab_size</code>, '16', 'プロダクトサーフェス種類数'],
            [<code key="p15" className="text-purple-600 dark:text-purple-400">fprop_dtype</code>, 'bfloat16', '推論時データ型'],
          ]}
        />

        {/* セクション10: 関連ファイル */}
        <SectionHeader id="files" number="10" title="関連ファイル" icon={DocumentTextIcon} />

        <DataTable
          headers={['ファイル', '説明']}
          rows={[
            [<code key="f1" className="text-purple-600 dark:text-purple-400">/phoenix/grok.py</code>, 'Transformer コアアーキテクチャ'],
            [<code key="f2" className="text-purple-600 dark:text-purple-400">/phoenix/recsys_model.py</code>, 'Ranking モデル実装'],
            [<code key="f3" className="text-purple-600 dark:text-purple-400">/phoenix/recsys_retrieval_model.py</code>, 'Retrieval モデル実装'],
            [<code key="f4" className="text-purple-600 dark:text-purple-400">/phoenix/runners.py</code>, '推論ランナーとユーティリティ'],
            [<code key="f5" className="text-purple-600 dark:text-purple-400">/phoenix/run_ranker.py</code>, 'ランキングデモスクリプト'],
            [<code key="f6" className="text-purple-600 dark:text-purple-400">/phoenix/run_retrieval.py</code>, '検索デモスクリプト'],
            [<code key="f7" className="text-purple-600 dark:text-purple-400">/phoenix/test_recsys_model.py</code>, 'アテンションマスクのテスト'],
          ]}
        />

        {/* フッターナビゲーション */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Link
              href="/specs/scoring"
              className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">関連仕様書</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">スコアリングシステム仕様書</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              <span className="font-semibold text-purple-700 dark:text-purple-300">ガイドに戻る</span>
            </Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          X レコメンドアルゴリズム - オープンソース技術仕様書
        </div>
      </footer>
    </div>
  );
}
