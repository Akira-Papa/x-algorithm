/**
 * Xアルゴリズム ランキングデータ
 * やったほうがいい・やってはいけない行動のランキング
 *
 * データソース:
 * - 第2章: エンゲージメント19種類の重み（weighted_scorer.rs）
 * - 第6章: 12種類のフィルター
 * - 第12章: 総まとめと実践ロードマップ
 */

export interface RankingItem {
  rank: number;
  title: string;
  description: string;
  impact: string;
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  relatedChapters: number[];
  tips?: string;
  sourceWeight?: string; // ソースコードの重み値
}

export interface MisconceptionItem {
  title: string;
  myth: string;
  reality: string;
  type: 'do' | 'dont';
  relatedChapters: number[];
}

export interface RankingData {
  dos: RankingItem[];
  donts: RankingItem[];
  misconceptions: MisconceptionItem[];
}

export const rankingData: RankingData = {
  // やったほうがいい TOP 10
  // ソース: weighted_scorer.rs のエンゲージメント重み順
  // いいね(liked: 0.5)を基準(1倍)として、各エンゲージメントの相対価値を表示
  dos: [
    {
      rank: 1,
      title: 'リプライを獲得する投稿を作る',
      description: 'リプライはXアルゴリズムで最も重視されるエンゲージメント。会話を生む投稿が圧倒的に有利。',
      impact: 'いいねの27倍',
      impactLevel: 'critical',
      relatedChapters: [2, 3, 7],
      tips: '質問で終わる、意見が分かれるテーマを選ぶ、体験の共有を促す',
      sourceWeight: 'replied: 13.5（いいね: 0.5）',
    },
    {
      rank: 2,
      title: 'プロフィールクリックを誘発する',
      description: 'プロフィールクリックはリプライに次ぐ高価値。「この人をもっと知りたい」という強い興味の表れ。',
      impact: 'いいねの24倍',
      impactLevel: 'critical',
      relatedChapters: [2, 10],
      tips: '実績の断片を見せる、希少情報の予告、専門性のアピール',
      sourceWeight: 'profile_clicked: 12.0（いいね: 0.5）',
    },
    {
      rank: 3,
      title: 'フォローを獲得する',
      description: 'フォローは継続的な関係構築の始まり。1フォローがいいね8回分の価値を持つ。',
      impact: 'いいねの8倍',
      impactLevel: 'high',
      relatedChapters: [2, 10],
      tips: 'プロフィールを充実させ、一貫したテーマで発信する',
      sourceWeight: 'followed: 4.0（いいね: 0.5）',
    },
    {
      rank: 4,
      title: '通知オンを獲得する',
      description: '通知オンは「この人の投稿を見逃したくない」という非常に強い興味表示。',
      impact: 'いいねの4倍',
      impactLevel: 'high',
      relatedChapters: [2, 10],
      tips: '継続的に価値ある情報を提供し、ファンを育てる',
      sourceWeight: 'notification_enabled: 2.0（いいね: 0.5）',
    },
    {
      rank: 5,
      title: 'VQV（動画品質視聴）を獲得する',
      description: 'VQVは10秒以上・音声ON・意図的な視聴。単純な再生の300倍重要。',
      impact: 'いいねの3倍',
      impactLevel: 'high',
      relatedChapters: [2, 9],
      tips: '冒頭3秒で引き込む、字幕をつける、40%以上視聴を目指す',
      sourceWeight: 'video_quality_view: 1.5（いいね: 0.5）',
    },
    {
      rank: 6,
      title: '外部共有を獲得する',
      description: '外部共有はX外へのシェア。Xのコンテンツを外部に広める価値として評価される。',
      impact: 'いいねの2.4倍',
      impactLevel: 'medium',
      relatedChapters: [2],
      tips: '保存したくなる有益な情報、シェアしたくなる面白いコンテンツ',
      sourceWeight: 'shared_externally: 1.2（いいね: 0.5）',
    },
    {
      rank: 7,
      title: '引用RTを獲得する',
      description: '引用RTはリポストよりわずかに高い。自分の意見を付加している＝より深い関与。',
      impact: 'いいねの2.2倍',
      impactLevel: 'medium',
      relatedChapters: [2, 7],
      tips: '議論を呼ぶ内容、意見を述べたくなるコンテンツ',
      sourceWeight: 'quoted: 1.1（いいね: 0.5）',
    },
    {
      rank: 8,
      title: 'リポストを獲得する',
      description: 'リポストは「自分のフォロワーにも見せたい」という意思表示。拡散の基本。',
      impact: 'いいねの2倍',
      impactLevel: 'medium',
      relatedChapters: [2],
      tips: '価値ある情報、共感できる内容、拡散したくなる面白さ',
      sourceWeight: 'retweeted: 1.0（いいね: 0.5）',
    },
    {
      rank: 9,
      title: 'ブックマークを獲得する',
      description: 'ブックマークは「後で見返したい」という評価。非公開だが重要なシグナル。',
      impact: 'いいねの2倍',
      impactLevel: 'medium',
      relatedChapters: [2],
      tips: '保存価値のある情報、まとめ系コンテンツ、チェックリスト',
      sourceWeight: 'bookmark_added: 1.0（いいね: 0.5）',
    },
    {
      rank: 10,
      title: 'フォロワーのアクティブ時間に投稿する',
      description: '投稿直後のエンゲージメントが最も重要。フォロワーがオンラインの時間帯に投稿することで初動を最大化。',
      impact: '初動ブースト',
      impactLevel: 'medium',
      relatedChapters: [5, 8],
      tips: '平日7-9時、12-13時、19-22時が一般的に有効',
    },
  ],

  // やってはいけない TOP 10
  // ソース: weighted_scorer.rs のネガティブ重み + フィルターシステム
  // 順位基準: アカウント凍結 > Trust壊滅 > 完全除外 > スコアペナルティ
  // 注: ソースコードで確認できない項目は削除済み（2026-01-21解析会議）
  donts: [
    {
      rank: 1,
      title: 'スパム判定を受ける',
      description: 'SpamFilterにより、大量投稿・自動化・リンク乱用などがスパム判定されるとアカウント凍結。全てが終わる最悪の結末。',
      impact: 'アカウント凍結',
      impactLevel: 'critical',
      relatedChapters: [6],
      tips: '自然な投稿頻度を保つ、自動化ツールの乱用を避ける',
      sourceWeight: 'SpamFilter: スパム→凍結',
    },
    {
      rank: 2,
      title: '暴力・ヘイト表現をする',
      description: 'SafetyFilterにより、暴力・ヘイト・テロ・違法コンテンツはUNSAFE判定で完全除外。アカウント凍結リスクも極めて高い。',
      impact: '完全除外+凍結',
      impactLevel: 'critical',
      relatedChapters: [6],
      tips: '批判するなら建設的に、暴力的・差別的表現は絶対NG',
      sourceWeight: 'SafetyFilter: UNSAFE→完全除外+凍結リスク',
    },
    {
      rank: 3,
      title: 'フォロワーを購入する',
      description: 'Trust Scoreが壊滅し、長期的にアカウント成長が不能に。一度壊れたTrustは回復が極めて困難。',
      impact: 'Trust壊滅',
      impactLevel: 'critical',
      relatedChapters: [10],
      tips: '地道に価値を提供してオーガニックにフォロワーを増やす',
      sourceWeight: 'Trust Score システム',
    },
    {
      rank: 4,
      title: '通報されるコンテンツを投稿する',
      description: '通報は最も重いスコアペナルティ。1件の通報でいいね20回分の価値が消える。繰り返すと凍結リスク。',
      impact: 'いいねの-20倍',
      impactLevel: 'critical',
      relatedChapters: [2, 6],
      tips: '炎上狙いや過激な内容は絶対に避ける',
      sourceWeight: 'reported: -10.0（いいね: 0.5）',
    },
    {
      rank: 5,
      title: 'ブロックされる行為をする',
      description: 'ブロックは通報と同等のペナルティ。この投稿主との関係を完全に断つ意思表示として重く評価される。',
      impact: 'いいねの-20倍',
      impactLevel: 'critical',
      relatedChapters: [2, 6],
      tips: '攻撃的なリプライ、スパム的な行為を避ける',
      sourceWeight: 'blocked: -10.0（いいね: 0.5）',
    },
    {
      rank: 6,
      title: 'ミュートされるコンテンツを投稿する',
      description: 'ミュートはブロックより軽いが重大。「見たくないが関係は断たない」という消極的な拒否。',
      impact: 'いいねの-10倍',
      impactLevel: 'high',
      relatedChapters: [2, 6],
      tips: '同じ内容の繰り返し、過度な自己宣伝、興味と乖離した内容を避ける',
      sourceWeight: 'muted: -5.0（いいね: 0.5）',
    },
    {
      rank: 7,
      title: '「興味なし」を押されるコンテンツを投稿',
      description: '興味なしは最も軽いネガティブシグナルだが、継続的に押されるとリーチが制限される。',
      impact: 'いいねの-3倍',
      impactLevel: 'medium',
      relatedChapters: [2, 6],
      tips: 'ターゲット層を明確にし、関連性の高いコンテンツを投稿',
      sourceWeight: 'not_interested: -1.5（いいね: 0.5）',
    },
    {
      rank: 8,
      title: '投稿から48時間以上経過する',
      description: 'FreshnessFilterにより、投稿してから48時間を超えるとタイムライン候補から除外される。Xは新鮮なコンテンツを優先する。',
      impact: '候補から除外',
      impactLevel: 'high',
      relatedChapters: [5, 6],
      tips: '常に新しいコンテンツを投稿し、古い投稿は引用RTで再活用',
      sourceWeight: 'FreshnessFilter: 48h超→除外',
    },
    {
      rank: 9,
      title: 'フォロワーと違う言語で投稿する',
      description: '日本語ユーザーに英語で投稿するなど、フォロワーの言語設定と異なる言語で投稿すると0.1倍（ほぼ表示されない）。',
      impact: '0.1倍（ほぼ非表示）',
      impactLevel: 'high',
      relatedChapters: [6],
      tips: 'フォロワーの言語に合わせて投稿。多言語発信ならアカウントを分ける',
      sourceWeight: 'LanguageFilter: 言語不一致→0.1倍',
    },
    {
      rank: 10,
      title: '重複コンテンツを投稿する',
      description: 'DuplicateFilterにより、同一内容の後続投稿は候補から除外される。コピペ投稿は無意味。',
      impact: '候補から除外',
      impactLevel: 'high',
      relatedChapters: [6],
      tips: '毎回オリジナルのコンテンツを作成、過去の投稿は引用RTで活用',
      sourceWeight: 'DuplicateFilter: 重複→除外',
    },
  ],

  // よくある誤解
  // ソースコードを網羅的に解析した結果、以下の「常識」にはアルゴリズム上の根拠がありませんでした
  // 解析日: 2026-01-21
  misconceptions: [
    // やったほうがいいの誤解
    {
      title: 'いいねを大量に獲得すればバズる',
      myth: 'いいねが多ければ多いほどアルゴリズムに優遇される',
      reality: 'いいね（favorited: 0.5）は全エンゲージメントの中で最低レベルの重み。リプライ（13.5）の27分の1の価値しかない。いいね狙いより会話を生むコンテンツが効果的。',
      type: 'do',
      relatedChapters: [2],
    },
    {
      title: 'ハッシュタグをたくさんつけると拡散される',
      myth: 'ハッシュタグが多いほどリーチが広がる',
      reality: 'ソースコードにハッシュタグの数による加点・減点の重みは存在しない。むしろ大量のタグはSpamFilterの対象になるリスクがある。',
      type: 'do',
      relatedChapters: [6],
    },
    {
      title: 'インプレッション数が重要',
      myth: 'インプレッションが多い投稿はアルゴリズムに評価される',
      reality: 'インプレッション自体へのスコア重みは存在しない。アルゴリズムが評価するのはエンゲージメント（リプライ、プロフィールクリック、フォローなど）の質と量。',
      type: 'do',
      relatedChapters: [2, 3],
    },
    // やってはいけないの誤解
    {
      title: '外部リンクを本文に入れるとリーチが下がる',
      myth: '外部リンク付き投稿は大幅にリーチが制限される',
      reality: 'weighted_scorer.rsに外部リンクへの直接ペナルティ重みは存在しない。link_clicked（1.1）はむしろポジティブな重み。SpamFilterの「リンク乱用」は大量の不自然なリンクが対象であり、単一リンクへのペナルティではない。',
      type: 'dont',
      relatedChapters: [2, 6],
    },
    {
      title: '連続投稿するとペナルティを受ける',
      myth: '短時間に連続投稿するとAuthor Diversityペナルティで全投稿が埋もれる',
      reality: 'Author Diversityはタイムライン表示時の調整機能であり、投稿自体へのペナルティではない。同一著者の投稿が連続表示されないよう順序を調整するだけで、4-6時間でリセットされる。',
      type: 'dont',
      relatedChapters: [5, 8],
    },
    {
      title: 'エンゲージメントベイトはML検出される',
      myth: '「いいねしたら〇〇」のような誘導はMLモデルが検出してペナルティ',
      reality: 'Phoenix MLは19種類のエンゲージメント確率を予測するのみ。「ベイト検出」専用のスコアラーやフィルターはソースコードで確認できない。',
      type: 'dont',
      relatedChapters: [2, 4],
    },
    {
      title: 'ハッシュタグ乱用は即スパム判定',
      myth: '関係ないハッシュタグを使うとすぐにスパム判定される',
      reality: 'SpamFilterにハッシュタグ数への具体的な重みやしきい値は確認できない。SpamFilterの主な対象は大量投稿、自動化、不自然なリンクパターン。',
      type: 'dont',
      relatedChapters: [6],
    },
  ],
};

// インパクトレベルのラベル取得
export function getImpactLabel(level: RankingItem['impactLevel']): string {
  const labels = {
    critical: '最重要',
    high: '重要',
    medium: '普通',
    low: '軽微',
  };
  return labels[level];
}

// インパクトレベルの色クラス取得
export function getImpactColorClass(level: RankingItem['impactLevel'], type: 'do' | 'dont'): string {
  if (type === 'do') {
    const colors = {
      critical: 'bg-green-500 text-white',
      high: 'bg-green-400 text-white',
      medium: 'bg-green-300 text-green-900',
      low: 'bg-green-200 text-green-800',
    };
    return colors[level];
  } else {
    const colors = {
      critical: 'bg-red-500 text-white',
      high: 'bg-red-400 text-white',
      medium: 'bg-orange-300 text-orange-900',
      low: 'bg-orange-200 text-orange-800',
    };
    return colors[level];
  }
}
