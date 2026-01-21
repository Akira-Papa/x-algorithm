'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

// カテゴリ定義
const categories = [
  { id: 'ml', label: '機械学習', color: 'blue' },
  { id: 'scoring', label: 'スコアリング', color: 'green' },
  { id: 'filtering', label: 'フィルター', color: 'orange' },
  { id: 'engagement', label: 'エンゲージメント', color: 'purple' },
  { id: 'system', label: 'システム', color: 'slate' },
  { id: 'content', label: 'コンテンツ', color: 'pink' },
];

interface GlossaryTerm {
  id: string;
  term: string;
  reading?: string;
  category: string;
  description: string;
  relatedTerms?: string[];
  relatedChapters?: number[];
}

// 用語データ
const glossaryTerms: GlossaryTerm[] = [
  // 機械学習カテゴリ
  {
    id: 'two-tower',
    term: 'Two-Tower',
    reading: 'ツータワー',
    category: 'ml',
    description: `Xの推薦システムの根幹をなす機械学習アーキテクチャ。「ユーザータワー」と「コンテンツタワー」という2つの独立したニューラルネットワークで構成されています。ユーザータワーは、あなたの過去の行動（いいね、リプライ、フォローなど）を分析し、「あなたがどんな人か」を数百次元のベクトルで表現します。コンテンツタワーは、各ツイートのテキスト、画像、投稿者情報などを分析し、「このツイートがどんな内容か」を同様にベクトル化します。この2つのベクトルの類似度を計算することで、「このユーザーにこのツイートはどれくらい合うか」を高速に算出できます。毎秒数億件の候補から瞬時にあなたに合うコンテンツを選び出せるのは、この仕組みのおかげです。`,
    relatedTerms: ['phoenix', 'embedding', 'candidate-generation'],
    relatedChapters: [3],
  },
  {
    id: 'phoenix',
    term: 'Phoenix',
    reading: 'フェニックス',
    category: 'ml',
    description: `Xの推薦システムで使用される主力機械学習モデル。ユーザーが「次にどんなアクションを取るか」を予測します。具体的には、あるツイートを見たときに「いいねする確率」「リプライする確率」「リポストする確率」など、19種類のエンゲージメント行動の発生確率を予測します。この予測結果は、weighted_scorer.rsで定義された重み（リプライ13.5、プロフィールクリック12.0、いいね0.5など）と掛け合わされ、最終スコアが決まります。Phoenixの予測精度がタイムラインの質を大きく左右します。名前の「Phoenix（不死鳥）」は、モデルが継続的に学習・進化し続けることを表しています。`,
    relatedTerms: ['two-tower', 'engagement'],
    relatedChapters: [4],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    reading: 'エンベディング',
    category: 'ml',
    description: `テキスト、画像、ユーザー行動などの複雑なデータを、コンピュータが計算しやすい「ベクトル（数値の配列）」に変換する技術。例えば「猫の写真」と「犬の写真」は、人間には「動物の写真」として似ていますが、コンピュータには単なるピクセルの羅列です。Embeddingを使うと、両者が数百個の数値配列に変換され、「動物」という概念が近い位置に配置されるよう学習されます。Xでは、ツイート内容とユーザーの興味をそれぞれEmbeddingに変換することで、「このツイートはこのユーザーに合うか？」を数学的に計算できます。Two-Tower検索やSimClusterの基盤技術です。`,
    relatedTerms: ['two-tower', 'simcluster'],
    relatedChapters: [3, 4],
  },
  {
    id: 'simcluster',
    term: 'SimCluster',
    reading: 'シムクラスター',
    category: 'ml',
    description: `「似た興味を持つユーザー」と「似た内容のツイート」を自動的にグループ化するシステム。数億人のユーザーと毎日数億件のツイートを約15万個の「クラスター」に分類します。例えば「日本のアニメ好き」「米国の政治に関心がある人」などのグループが自動形成されます。フォローしていない人のツイートでも、あなたと同じクラスターに属する人が多くエンゲージしていれば「おすすめ」として表示される可能性が高くなります。これがOON（Out of Network）推薦の核心部分です。`,
    relatedTerms: ['oon', 'topical-authority'],
    relatedChapters: [7],
  },

  // エンゲージメントカテゴリ
  {
    id: 'engagement',
    term: 'Engagement',
    reading: 'エンゲージメント',
    category: 'engagement',
    description: `ユーザーがツイートに対して行うすべてのアクション（反応）の総称で、アルゴリズムが最も重視する指標です。ソースコードでは15種類のポジティブと4種類のネガティブなエンゲージメントが定義されています。【ポジティブ】リプライ(13.5)、プロフィールクリック(12.0)、フォロー(4.0)、通知オン(2.0)、動画品質視聴(1.5)、外部共有(1.2)、引用RT(1.1)、リンククリック(1.1)、リポスト(1.0)、ブックマーク(1.0)、いいね(0.5)など。【ネガティブ】通報(-10.0)、ブロック(-10.0)、ミュート(-5.0)、興味なし(-1.5)。`,
    relatedTerms: ['fav', 'repost', 'reply', 'bookmark'],
    relatedChapters: [2],
  },
  {
    id: 'fav',
    term: 'Fav (いいね)',
    reading: 'ファボ',
    category: 'engagement',
    description: `ツイートに対する最も基本的な好意的反応で、ハートマークをタップして行います。意外にもアルゴリズムでは最も軽い重み(0.5ポイント)で、リプライ(13.5)の27分の1の価値しかありません。これは「いいねは気軽にできるアクション」だからです。アルゴリズムはより深いコミットメントを示すアクション（リプライ、プロフィール閲覧、フォロー）を高く評価します。「いいね稼ぎ」より「リプライが付く投稿」「プロフィールを見たくなる投稿」を意識した方がアルゴリズム的に有利です。`,
    relatedTerms: ['engagement', 'reply', 'repost'],
    relatedChapters: [2, 5],
  },
  {
    id: 'repost',
    term: 'Repost (リポスト)',
    reading: 'リポスト',
    category: 'engagement',
    description: `他の人のツイートを自分のフォロワーのタイムラインに共有するアクション。旧称は「リツイート（RT）」。スコア計算では1.0ポイントで、いいね（0.5）の2倍の重み。「このツイートは自分のフォロワーにも見せたい」という積極的な意思表示として評価されます。リポストされたツイートはリポストした人のフォロワー全員のタイムラインに表示候補となるため、拡散力が非常に高いアクションです。なお、引用RT（1.1）はリポスト（1.0）よりわずかに高い重みがあり、コメントを付ける分より深い関与と見なされます。`,
    relatedTerms: ['engagement', 'fav', 'quote'],
    relatedChapters: [2, 5],
  },
  {
    id: 'reply',
    term: 'Reply (リプライ)',
    reading: 'リプライ',
    category: 'engagement',
    description: `ツイートへの返信コメント。Xアルゴリズムで最も高く評価されるエンゲージメントです。スコア計算では13.5ポイントと、いいね（0.5）の27倍の重み。リプライが「会話」を生み出すアクションだからです。Xは会話が生まれるプラットフォームを目指しており、会話を促進するコンテンツを強く優遇しています。バズりたいなら「リプライが付く投稿」を目指すべきです。質問で終わる投稿、意見が分かれるテーマ、体験共有を促す投稿が効果的。注意点として、自分のリプライではなく「他の人からもらうリプライ」が重要です。`,
    relatedTerms: ['engagement', 'conversation'],
    relatedChapters: [2, 5],
  },
  {
    id: 'bookmark',
    term: 'Bookmark (ブックマーク)',
    reading: 'ブックマーク',
    category: 'engagement',
    description: `ツイートを自分だけの「保存リスト」に追加するアクション。他ユーザーからは見えないプライベート機能です。スコア計算では1.0ポイントでリポストと同じ重み。「後で読み返したい」という深い興味の表れとして評価されます。他人に見えないため「人に見られたくないけど保存したい」という本音の興味を反映しており、アルゴリズムはこの「隠れた興味」も重要なシグナルとして活用しています。「まとめ系」「チェックリスト」「ノウハウ集」などのコンテンツはブックマークを獲得しやすいです。`,
    relatedTerms: ['engagement', 'fav'],
    relatedChapters: [2, 5],
  },
  {
    id: 'dwell-time',
    term: 'Dwell Time',
    reading: 'ドウェルタイム',
    category: 'engagement',
    description: `ユーザーがツイートを画面に表示した状態で過ごした時間（滞在時間）。長いDwell Timeは「興味を持って読んでいる」シグナルとして扱われ、すぐにスクロールで通り過ぎると「興味がなかった」と判断されます。Xはミリ秒単位で計測し、動的にスコアに反映。長文や画像・動画付きツイートは自然とDwell Timeが長くなりやすいですが、無理に長くする必要はありません。内容に見合わない長さは途中離脱を招き、かえってネガティブなシグナルになる可能性があります。`,
    relatedTerms: ['engagement', 'vqv'],
    relatedChapters: [2, 9],
  },

  // スコアリングカテゴリ
  {
    id: 'trust-score',
    term: 'Trust Score',
    reading: 'トラストスコア',
    category: 'scoring',
    description: `アカウントの信頼性を0〜1で示す内部スコア。スパムや悪質アカウントを見分けるために使用されます。算出要素：アカウント年齢（古いほど高い）、認証ステータス（青・金バッジで加点）、プロフィール完成度、電話番号/メール認証、過去の通報・ブロック・ミュート回数（多いほど減点）。低スコアだと投稿のリーチが制限され、おすすめに表示されにくくなります。特に「フォロワー購入」は危険で、不自然なフォロワー増加はTrust Scoreを壊滅させます。一度壊れたスコアの回復は極めて困難です。`,
    relatedTerms: ['topical-authority', 'reputation'],
    relatedChapters: [10],
  },
  {
    id: 'topical-authority',
    term: 'Topical Authority',
    reading: 'トピカルオーソリティ',
    category: 'scoring',
    description: `特定のトピックにおいて、アカウントがどれだけ「専門家」として認められているかを示す指標。例えば料理の話題で多くのエンゲージメントを獲得すると、「料理」トピックでのAuthorityが高まり、料理に興味があるユーザーにおすすめされやすくなります。高めるには：一貫したテーマで継続発信、そのテーマでリプライやリポストを獲得、同テーマの権威あるアカウントとの交流。テーマを頻繁に変えるとどのトピックでもAuthorityが蓄積されず、おすすめに載りにくくなります。「何でも屋」より「専門家」がアルゴリズム的に有利です。`,
    relatedTerms: ['trust-score', 'simcluster'],
    relatedChapters: [8, 10],
  },
  {
    id: 'real-graph-weight',
    term: 'RealGraphWeight',
    reading: 'リアルグラフウェイト',
    category: 'scoring',
    description: `フォロー関係の「強さ」を数値化した指標。単にフォローしているだけでなく、実際の交流量を測定します。例えば、Aさんをフォローしていても投稿に反応していなければRealGraphWeightは低く、頻繁にいいねやリプライをしていれば高くなります。この値が高いアカウントの投稿はタイムラインで上位表示されやすく、交流がないアカウントは表示されにくくなります。「フォローしているけど見ていない」関係を検出し、本当に興味があるコンテンツを優先するための仕組みです。`,
    relatedTerms: ['inn', 'oon'],
    relatedChapters: [7],
  },
  {
    id: 'vqv',
    term: 'VQV (Video Quality View)',
    reading: 'ブイキューブイ',
    category: 'scoring',
    description: `動画の「品質視聴」を判定する指標。単なる再生ではなく「意図的に視聴された」かを測定します。VQVの条件：10秒以上の視聴、音声ON、画面中央付近での再生、40%以上の視聴完了率。スコアは1.5ポイントでいいね（0.5）の3倍の重み。単純な再生（0.005）はほぼ価値がありません。「見られた回数」より「ちゃんと見られた回数」が重要で、冒頭3秒で引き込む、字幕を付ける、適切な長さにするなど最後まで見てもらう工夫が必要です。`,
    relatedTerms: ['dwell-time', 'engagement'],
    relatedChapters: [9],
  },

  // フィルターカテゴリ
  {
    id: 'safety-filter',
    term: 'SafetyFilter',
    reading: 'セーフティフィルター',
    category: 'filtering',
    description: `暴力、ヘイトスピーチ、テロリズム、違法行為などの危険コンテンツを検出・分類するフィルター。3段階分類：SAFE（問題なし、通常表示）、SENSITIVE（警告表示や制限付き）、UNSAFE（完全除外）。UNSAFEコンテンツはエンゲージメントが高くても一切表示されず、繰り返し判定されるとアカウント凍結リスクが高まります。機械学習による自動検出とユーザー通報で判定されます。「炎上商法」は短期的注目を集めても長期的にはアカウントにダメージを与えます。`,
    relatedTerms: ['nsfw-filter', 'spam-filter'],
    relatedChapters: [6],
  },
  {
    id: 'nsfw-filter',
    term: 'NsfwFilter',
    reading: 'エヌエスエフダブリューフィルター',
    category: 'filtering',
    description: `NSFW（Not Safe For Work＝職場で見るのに適さない）コンテンツ、つまり性的・成人向けコンテンツを検出するフィルター。検出されると年齢確認が必要になる、「センシティブな内容」として警告表示される、一部ユーザー設定では非表示になる、といった制限を受けます。明確に禁止されているコンテンツ（児童ポルノなど）は完全除外され、投稿者はアカウント停止処分となります。医療画像や芸術作品が誤検出されることもありますが、その場合は異議申し立てが可能です。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'spam-filter',
    term: 'SpamFilter',
    reading: 'スパムフィルター',
    category: 'filtering',
    description: `スパム行為（迷惑行為）を検出するフィルター。Xの「やってはいけない」ランキング1位の原因です。検出対象：短時間での大量投稿、自動化ツールによる不自然な行動、同一内容の繰り返し、大量の不自然なリンク、大量フォロー/アンフォロー。判定されると投稿のリーチが大幅制限され、最悪アカウント凍結となります。重要：「外部リンクを含む投稿」自体はペナルティ対象ではありません。対象は「大量の不自然なリンク」であり、単一の外部リンクは問題ありません。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'quality-filter',
    term: 'QualityFilter',
    reading: 'クオリティフィルター',
    category: 'filtering',
    description: `コンテンツの情報価値やオリジナリティを判定するフィルター。低品質コンテンツのリーチを制限します。低品質と判定されやすい例：意味のないテキスト、他ツイートの丸コピー、情報価値のない短文、スパム的フォーマット。高品質と判定されやすい例：オリジナルの意見・分析、有用な情報、適切な長さと構成、画像・動画の効果的使用。タイムライン全体の質を維持するための仕組みです。`,
    relatedTerms: ['spam-filter', 'visibility-filter'],
    relatedChapters: [6],
  },
  {
    id: 'visibility-filter',
    term: 'VisibilityFilter',
    reading: 'ビジビリティフィルター',
    category: 'filtering',
    description: `コンテンツの「表示範囲」を制御する総合フィルター。主なサブフィルター：LanguageFilter（フォロワーと異なる言語は0.1倍で実質非表示）、FreshnessFilter（48時間超の投稿は除外）、DuplicateFilter（重複コンテンツ除外）、BlockedFilter（ブロック関係は非表示）、MutedFilter（ミュート設定で非表示）。これらは「ユーザー体験の質」維持のために存在し、古い投稿が延々と表示されることを防ぎます。`,
    relatedTerms: ['quality-filter', 'author-diversity'],
    relatedChapters: [6],
  },
  {
    id: 'author-diversity',
    term: 'Author Diversity',
    reading: 'オーサーダイバーシティ',
    category: 'filtering',
    description: `タイムラインに同一著者のツイートが連続表示されることを防ぐ仕組み。同一著者の1番目は100%、2番目は55%、3番目は32.5%、5番目以降は約10%のスコアになります。重要：これは「投稿自体へのペナルティ」ではなく「タイムライン表示時の調整」です。連続投稿しても投稿自体のスコアは下がらず、同じ人の投稿が連続表示されないよう順序調整されるだけ。4-6時間でリセットされるため「連続投稿は絶対NG」という説は誤解です。`,
    relatedTerms: ['visibility-filter', 'timeline'],
    relatedChapters: [5, 8],
  },

  // システムカテゴリ
  {
    id: 'inn',
    term: 'In-Network (IN)',
    reading: 'インネットワーク',
    category: 'system',
    description: `フォローしているアカウントからのコンテンツで「フォロー中」タブに表示されます。In-NetworkツイートはOut-of-Network（非フォロー）より優先され、OONには0.85倍のペナルティがかかります。ただしフォローしているだけでは不十分で、RealGraphWeight（交流頻度）が低いとタイムラインに表示されにくくなります。「フォローしているのに見かけない」アカウントはRealGraphWeightが下がっている証拠。積極的にいいねやリプライをすることで表示頻度を上げられます。`,
    relatedTerms: ['oon', 'real-graph-weight'],
    relatedChapters: [7],
  },
  {
    id: 'oon',
    term: 'Out-of-Network (OON)',
    reading: 'アウトオブネットワーク',
    category: 'system',
    description: `フォローしていないアカウントからのコンテンツで「For You」タブの「おすすめ」に表示されます。推薦理由は主に3つ：SimClusterで同じ興味グループの人がエンゲージした、フォロー中の人がリポスト/いいねした、過去の行動から興味ありと予測された。OONはIn-Networkより15%低いスコア（0.85倍）からスタートするため、表示されているOONツイートは高いエンゲージメントを獲得しています。非フォロワーに届けるにはSimClusterで同グループのユーザーからのエンゲージメントが重要です。`,
    relatedTerms: ['inn', 'simcluster'],
    relatedChapters: [7],
  },
  {
    id: 'candidate-generation',
    term: 'Candidate Generation',
    reading: 'キャンディデートジェネレーション',
    category: 'system',
    description: `推薦システムの最初のステップで、膨大なツイートから「表示候補」を数千〜数万件に絞り込むプロセスです。毎日数億件のツイートすべてを評価することは不可能なため、まず候補を選び、その後Rankingで詳細スコアリングを行います。主な候補生成方法：In-Network（フォロー中の最新ツイート）、SimCluster（似た興味のユーザーがエンゲージしたツイート）、トピックベース（興味を示したトピック）。この段階で候補に入らないと表示されないため、投稿直後のエンゲージメント（初動）が重要です。`,
    relatedTerms: ['two-tower', 'ranking'],
    relatedChapters: [1, 3],
  },
  {
    id: 'ranking',
    term: 'Ranking',
    reading: 'ランキング',
    category: 'system',
    description: `Candidate Generationで選ばれた候補ツイートを、スコアに基づいて表示順を決定するプロセス。各ツイートに対してPhoenixによるエンゲージメント予測、weighted_scorer.rsの重み付け、Trust ScoreやTopical Authorityなどの信頼性スコア、各種フィルターによる調整が計算され、総合スコアが高いほどタイムライン上位に表示されます。Rankingはリアルタイムで行われ、同じツイートでも時間経過とともにスコアは変化します（FreshnessFilterの影響など）。`,
    relatedTerms: ['candidate-generation', 'scoring'],
    relatedChapters: [1, 5],
  },
  {
    id: 'timeline',
    term: 'Timeline (For You)',
    reading: 'タイムライン',
    category: 'system',
    description: `ユーザーに表示されるパーソナライズされたコンテンツフィード。「For You」タイムラインはIn-Network（フォロー中）約50-70%、Out-of-Network（おすすめ）約30-50%、広告で構成されます。構成はユーザーの行動に応じて動的に変化し、OONツイートへのエンゲージメントが多い人にはOON割合が増えます。「フォロー中」タブはフォローしている人のツイートのみが時系列で表示され、アルゴリズムの影響を受けません。`,
    relatedTerms: ['inn', 'oon', 'ranking'],
    relatedChapters: [1, 7],
  },

  // コンテンツカテゴリ
  {
    id: 'hook',
    term: 'Hook (フック)',
    reading: 'フック',
    category: 'content',
    description: `ツイートや動画の冒頭でユーザーの注意を引き「続きを見たい」と思わせる要素。釣り針のように読者を引っ掛けることが由来。効果的な例：意外性のある事実、問題提起、数字を使った具体性、緊急性、共感。動画では最初の3秒が勝負で、ここで興味を引けないとユーザーは次へスクロールします。VQV獲得のためにも冒頭のHookは非常に重要です。`,
    relatedTerms: ['cta', 'dwell-time'],
    relatedChapters: [9, 10],
  },
  {
    id: 'cta',
    term: 'CTA (Call to Action)',
    reading: 'シーティーエー',
    category: 'content',
    description: `ユーザーに具体的なアクションを促す「行動喚起」要素。例：「役に立ったらリポストお願いします」「経験をリプライで教えてください」「続きはプロフィールのリンクから」。ただし過度なCTAは「エンゲージメントベイト」と見なされ嫌われる原因に。「いいねしたら〇〇プレゼント」のような露骨な誘導は避けましょう。ユーザーからの通報やミュートで結果的にスコアが下がる可能性があります。`,
    relatedTerms: ['hook', 'engagement'],
    relatedChapters: [10],
  },
  {
    id: 'thread',
    term: 'Thread (スレッド)',
    reading: 'スレッド',
    category: 'content',
    description: `複数のツイートを連続投稿し長文コンテンツを構成する形式。メリット：Dwell Timeが長くなりやすい、続きを読みたい興味を喚起、各ツイートが個別にリポストされる可能性、ブックマークされやすい。構成は1ツイート目で強力なHook、中間で価値ある情報を段階的に提供、最後にCTA。スレッドは1回の投稿扱いでAuthor Diversityの影響を受けませんが、短時間に複数スレッド投稿すると対象になります。`,
    relatedTerms: ['engagement', 'dwell-time'],
    relatedChapters: [10],
  },
  {
    id: 'pinned-tweet',
    term: 'Pinned Tweet',
    reading: 'ピンドツイート',
    category: 'content',
    description: `プロフィール最上部に固定表示されるツイート。新規訪問者が最初に目にする「自己紹介」の役割。効果的な例：自己紹介と提供価値の明示、最も人気のあった投稿、現在のキャンペーン告知、代表的な実績。プロフィールクリック（12.0ポイント）からフォロー（4.0ポイント）につなげるには魅力的なPinned Tweetが重要。定期的に更新し、古いまま放置すると「活動していないアカウント」という印象を与えます。`,
    relatedTerms: ['trust-score', 'profile'],
    relatedChapters: [10],
  },
];

// カテゴリの色を取得
function getCategoryColor(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId);
  return category?.color || 'slate';
}

// カテゴリラベルを取得
function getCategoryLabel(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId);
  return category?.label || categoryId;
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // フィルタリングとソート
  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter((term) => {
        // カテゴリフィルター
        if (selectedCategory && term.category !== selectedCategory) {
          return false;
        }
        // テキスト検索
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            term.term.toLowerCase().includes(query) ||
            term.reading?.toLowerCase().includes(query) ||
            term.description.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const readingA = a.reading || a.term;
        const readingB = b.reading || b.term;
        return readingA.localeCompare(readingB, 'ja');
      });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            目次に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ページタイトル */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">用語集</h1>
          </div>
          <p className="text-muted-foreground">
            Xアルゴリズムの専門用語を解説します。検索やカテゴリで絞り込むことができます。
          </p>
        </div>

        {/* 検索バー */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="用語を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="用語を検索"
          />
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                selectedCategory === cat.id
                  ? cat.color === 'blue'
                    ? 'bg-blue-500 text-white'
                    : cat.color === 'green'
                    ? 'bg-green-500 text-white'
                    : cat.color === 'orange'
                    ? 'bg-orange-500 text-white'
                    : cat.color === 'purple'
                    ? 'bg-purple-500 text-white'
                    : cat.color === 'pink'
                    ? 'bg-pink-500 text-white'
                    : 'bg-slate-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 検索結果件数 */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredTerms.length}件の用語
        </div>
        <div aria-live="polite" className="sr-only">
          {filteredTerms.length}件の用語が見つかりました
        </div>

        {/* 用語一覧 */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTerms.map((term) => {
            const color = getCategoryColor(term.category);

            return (
              <div
                key={term.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{term.term}</h3>
                    {term.reading && (
                      <span className="text-sm text-muted-foreground">
                        （{term.reading}）
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium whitespace-nowrap',
                      color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                      color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                      color === 'orange' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                      color === 'purple' && 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                      color === 'pink' && 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
                      color === 'slate' && 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    )}
                  >
                    {getCategoryLabel(term.category)}
                  </span>
                </div>

                {/* 詳細説明 */}
                <div className="mt-3">
                  <p className="text-sm whitespace-pre-wrap">{term.description}</p>
                </div>

                {/* 関連章リンク */}
                {term.relatedChapters && term.relatedChapters.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {term.relatedChapters.map((ch) => (
                        <Link
                          key={ch}
                          href={`/chapters/${ch}`}
                          className="text-xs text-primary hover:underline"
                        >
                          第{ch}章
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 結果なしの場合 */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              該当する用語が見つかりませんでした。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 text-primary hover:underline"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
