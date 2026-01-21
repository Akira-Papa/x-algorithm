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
    description: `Xの推薦システムの根幹をなす機械学習アーキテクチャ。「ユーザータワー」と「コンテンツタワー」という2つの独立したニューラルネットワークで構成されています。

ユーザータワーは、あなたの過去の行動（いいね、リプライ、フォローなど）や興味関心を分析し、「あなたがどんな人か」を数百次元のベクトル（数値の配列）で表現します。一方、コンテンツタワーは、各ツイートのテキスト、画像、投稿者情報などを分析し、「このツイートがどんな内容か」を同じく数百次元のベクトルで表現します。

最終的に、この2つのベクトルの「近さ（類似度）」を計算することで、「このユーザーにこのツイートはどれくらい合うか」というマッチングスコアを高速に算出できます。毎秒数億件の候補から瞬時にあなたに合うコンテンツを選び出せるのは、この仕組みのおかげです。`,
    relatedTerms: ['phoenix', 'embedding', 'candidate-generation'],
    relatedChapters: [3],
  },
  {
    id: 'phoenix',
    term: 'Phoenix',
    reading: 'フェニックス',
    category: 'ml',
    description: `Xの推薦システムで使用される主力機械学習モデル。ユーザーが「次にどんなアクションを取るか」を予測する役割を担っています。

具体的には、あるツイートを見たときに、あなたが「いいねする確率」「リプライする確率」「リポストする確率」「プロフィールをクリックする確率」など、19種類のエンゲージメント行動それぞれの発生確率を予測します。

この予測結果は、weighted_scorer.rsで定義された重み（リプライ13.5、プロフィールクリック12.0、いいね0.5など）と掛け合わされ、最終的なスコアが決まります。つまり、Phoenixの予測精度がタイムラインの質を大きく左右するのです。

名前の「Phoenix（不死鳥）」は、モデルが継続的に学習・進化し続けることを表しています。`,
    relatedTerms: ['two-tower', 'engagement'],
    relatedChapters: [4],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    reading: 'エンベディング',
    category: 'ml',
    description: `テキスト、画像、ユーザー行動などの複雑なデータを、コンピュータが計算しやすい「ベクトル（数値の配列）」に変換する技術。

例えば、「猫の写真」と「犬の写真」は、人間から見れば「動物の写真」という点で似ていますが、コンピュータにとっては単なるピクセルの羅列です。Embeddingを使うと、「猫」も「犬」も数百個の数値の配列に変換され、しかも「動物」という概念が近い位置に配置されるように学習されます。

Xでは、ツイートの内容をEmbeddingに変換し、ユーザーの興味もEmbeddingに変換することで、「このツイートはこのユーザーに合うか？」を数学的に計算できるようになります。これがTwo-Tower検索やSimClusterの基盤技術です。`,
    relatedTerms: ['two-tower', 'simcluster'],
    relatedChapters: [3, 4],
  },
  {
    id: 'simcluster',
    term: 'SimCluster',
    reading: 'シムクラスター',
    category: 'ml',
    description: `「似た興味を持つユーザー」と「似た内容のツイート」を自動的にグループ化（クラスタリング）するシステム。

Xには数億人のユーザーと毎日数億件のツイートがありますが、SimClusterはこれらを約15万個の「クラスター（グループ）」に分類します。例えば「日本のアニメ好き」「米国の政治に関心がある人」「テック系スタートアップに興味がある人」のようなグループが自動的に形成されます。

あなたがフォローしていない人のツイートでも、あなたと同じクラスターに属する人が多くエンゲージしていれば、「おすすめ」として表示される可能性が高くなります。これがOON（Out of Network）推薦の仕組みの核心部分です。`,
    relatedTerms: ['oon', 'topical-authority'],
    relatedChapters: [7],
  },

  // エンゲージメントカテゴリ
  {
    id: 'engagement',
    term: 'Engagement',
    reading: 'エンゲージメント',
    category: 'engagement',
    description: `ユーザーがツイートに対して行うすべてのアクション（反応）の総称。Xのアルゴリズムは、このエンゲージメントを最も重要な指標として扱っています。

Xのソースコード（weighted_scorer.rs）では、15種類のポジティブなエンゲージメントと4種類のネガティブなエンゲージメントが定義されています。

【ポジティブ（スコアが上がる）】
・リプライ（replied: 13.5） ・プロフィールクリック（profile_clicked: 12.0） ・フォロー（followed: 4.0） ・通知オン（notification_enabled: 2.0） ・動画品質視聴（video_quality_view: 1.5） ・外部共有（shared_externally: 1.2） ・引用RT（quoted: 1.1） ・リンククリック（link_clicked: 1.1） ・リポスト（retweeted: 1.0） ・ブックマーク（bookmark_added: 1.0） ・いいね（favorited: 0.5）など

【ネガティブ（スコアが下がる）】
・通報（reported: -10.0） ・ブロック（blocked: -10.0） ・ミュート（muted: -5.0） ・興味なし（not_interested: -1.5）`,
    relatedTerms: ['fav', 'repost', 'reply', 'bookmark'],
    relatedChapters: [2],
  },
  {
    id: 'fav',
    term: 'Fav (いいね)',
    reading: 'ファボ',
    category: 'engagement',
    description: `ツイートに対する最も基本的な好意的反応。ハートマークをタップすることで行います。

意外かもしれませんが、いいねはXのアルゴリズムでは最も軽い重み（0.5ポイント）しかありません。リプライ（13.5）の27分の1、プロフィールクリック（12.0）の24分の1の価値です。

これは「いいねは気軽にできるアクション」だからです。アルゴリズムは、より深いコミットメントを示すアクション（リプライして会話する、プロフィールを見に行く、フォローする）を高く評価します。

したがって、「いいね稼ぎ」に注力するよりも、「リプライが付くような投稿」「プロフィールを見たくなるような投稿」を意識した方が、アルゴリズム的には有利です。`,
    relatedTerms: ['engagement', 'reply', 'repost'],
    relatedChapters: [2, 5],
  },
  {
    id: 'repost',
    term: 'Repost (リポスト)',
    reading: 'リポスト',
    category: 'engagement',
    description: `他の人のツイートを、自分のフォロワーのタイムラインに共有するアクション。旧称は「リツイート（RT）」。

スコア計算では1.0ポイントで、いいね（0.5）の2倍の重みがあります。「このツイートは自分のフォロワーにも見せたい」という積極的な意思表示として評価されるためです。

リポストされたツイートは、リポストした人のフォロワー全員のタイムラインに表示される候補になるため、拡散力が非常に高いアクションです。

なお、引用RT（quoted: 1.1）はリポスト（1.0）よりわずかに高い重みがあります。自分のコメントを付けている分、より深い関与と見なされるためです。`,
    relatedTerms: ['engagement', 'fav', 'quote'],
    relatedChapters: [2, 5],
  },
  {
    id: 'reply',
    term: 'Reply (リプライ)',
    reading: 'リプライ',
    category: 'engagement',
    description: `ツイートに対する返信コメント。Xアルゴリズムで最も高く評価されるエンゲージメントです。

スコア計算では13.5ポイントと、いいね（0.5）の27倍もの重みがあります。これは、リプライが「会話」を生み出すアクションだからです。Xは「会話が生まれるプラットフォーム」を目指しており、会話を促進するコンテンツを強く優遇しています。

つまり、バズりたいなら「いいねが付く投稿」ではなく「リプライが付く投稿」を目指すべきです。質問で終わる投稿、意見が分かれるテーマ、体験の共有を促す投稿などが効果的です。

注意点として、自分のリプライではなく「他の人からもらうリプライ」が重要です。自分で自分にリプライしても意味がありません。`,
    relatedTerms: ['engagement', 'conversation'],
    relatedChapters: [2, 5],
  },
  {
    id: 'bookmark',
    term: 'Bookmark (ブックマーク)',
    reading: 'ブックマーク',
    category: 'engagement',
    description: `ツイートを自分だけの「保存リスト」に追加するアクション。他のユーザーからは見えないプライベートな機能です。

スコア計算では1.0ポイントで、リポストと同じ重みがあります。「後で読み返したい」「保存しておきたい」という深い興味の表れとして評価されます。

ブックマークは他人に見えないため、「人に見られたくないけど保存したい」という本音の興味を反映しています。アルゴリズムはこの「隠れた興味」も重要なシグナルとして活用しています。

保存したくなるような「まとめ系」「チェックリスト」「ノウハウ集」などのコンテンツは、ブックマークを獲得しやすいです。`,
    relatedTerms: ['engagement', 'fav'],
    relatedChapters: [2, 5],
  },
  {
    id: 'dwell-time',
    term: 'Dwell Time',
    reading: 'ドウェルタイム',
    category: 'engagement',
    description: `ユーザーがあるツイートを画面に表示した状態で過ごした時間。「滞在時間」とも呼ばれます。

長いDwell Timeは「このツイートに興味を持って読んでいる」シグナルとして扱われます。逆に、すぐにスクロールで通り過ぎたツイートは「興味がなかった」と判断されます。

Xはミリ秒単位でDwell Timeを計測しており、動的にスコアに反映しています。長文ツイートや画像・動画付きツイートは、自然とDwell Timeが長くなりやすいです。

ただし、無理に長くする必要はありません。内容に見合わない長さは、途中離脱を招き、かえってネガティブなシグナルになる可能性があります。`,
    relatedTerms: ['engagement', 'vqv'],
    relatedChapters: [2, 9],
  },

  // スコアリングカテゴリ
  {
    id: 'trust-score',
    term: 'Trust Score',
    reading: 'トラストスコア',
    category: 'scoring',
    description: `アカウントの「信頼性」を0〜1の範囲で示す内部スコア。スパムアカウントや悪質アカウントを見分けるために使われます。

Trust Scoreは以下の要素から算出されます：
・アカウント年齢（古いほど高い）
・認証ステータス（青バッジ、金バッジで加点）
・プロフィールの完成度（アイコン、ヘッダー、自己紹介文）
・電話番号/メールアドレスの認証
・過去の通報・ブロック・ミュートされた回数（多いほど減点）

Trust Scoreが低いアカウントは、投稿のリーチが制限されたり、おすすめに表示されにくくなります。

特に危険なのは「フォロワー購入」です。不自然なフォロワー増加はTrust Scoreを壊滅させ、長期的なアカウント成長が不可能になります。一度壊れたTrust Scoreの回復は極めて困難です。`,
    relatedTerms: ['topical-authority', 'reputation'],
    relatedChapters: [10],
  },
  {
    id: 'topical-authority',
    term: 'Topical Authority',
    reading: 'トピカルオーソリティ',
    category: 'scoring',
    description: `特定のトピック（話題）において、そのアカウントがどれだけ「専門家」「権威」として認められているかを示す指標。

例えば、料理の話題で多くのエンゲージメントを獲得しているアカウントは、「料理」トピックでの Topical Authority が高くなります。すると、料理に興味があるユーザーに、そのアカウントの投稿がおすすめされやすくなります。

Topical Authorityを高めるには：
・一貫したテーマで継続的に発信する
・そのテーマでリプライやリポストを獲得する
・同じテーマの権威あるアカウントとの交流（相互リプライなど）

逆に、テーマを頻繁に変えると、どのトピックでもAuthorityが蓄積されず、おすすめに載りにくくなります。「何でも屋」より「専門家」の方がアルゴリズム的に有利です。`,
    relatedTerms: ['trust-score', 'simcluster'],
    relatedChapters: [8, 10],
  },
  {
    id: 'real-graph-weight',
    term: 'RealGraphWeight',
    reading: 'リアルグラフウェイト',
    category: 'scoring',
    description: `フォロー関係の「強さ」を数値化した指標。単にフォローしているだけでなく、実際にどれだけ交流があるかを測定します。

例えば、あなたがAさんをフォローしていても：
・Aさんの投稿にいいねやリプライをしていない → RealGraphWeight低
・Aさんの投稿に頻繁に反応している → RealGraphWeight高

RealGraphWeightが高いアカウントの投稿は、あなたのタイムラインで上位に表示されやすくなります。逆に、フォローしていても交流がないアカウントは、タイムラインに表示されにくくなります。

これは「フォローしているけど見ていない」関係を検出し、本当に興味があるコンテンツを優先するための仕組みです。`,
    relatedTerms: ['inn', 'oon'],
    relatedChapters: [7],
  },
  {
    id: 'vqv',
    term: 'VQV (Video Quality View)',
    reading: 'ブイキューブイ',
    category: 'scoring',
    description: `動画の「品質視聴」を判定する指標。単に動画が再生されただけでなく、「意図的に視聴された」かどうかを測定します。

VQVとしてカウントされる条件：
・10秒以上の視聴
・音声がONの状態
・画面の中央付近で再生（スクロール中の端っこではない）
・40%以上の視聴完了率

スコア計算では1.5ポイントで、いいね（0.5）の3倍の重みがあります。一方、単純な動画再生（video_playback_50: 0.005）はほとんど価値がありません。

つまり、「見られた回数」より「ちゃんと見られた回数」が重要です。冒頭3秒で引き込む、字幕を付ける、適切な長さにするなど、最後まで見てもらう工夫が必要です。`,
    relatedTerms: ['dwell-time', 'engagement'],
    relatedChapters: [9],
  },

  // フィルターカテゴリ
  {
    id: 'safety-filter',
    term: 'SafetyFilter',
    reading: 'セーフティフィルター',
    category: 'filtering',
    description: `暴力、ヘイトスピーチ、テロリズム、違法行為などの危険なコンテンツを検出・分類するフィルター。

コンテンツは3段階で分類されます：
・SAFE: 問題なし、通常表示
・SENSITIVE: 注意が必要、警告表示や制限付き表示
・UNSAFE: 危険、完全に除外（タイムラインに表示されない）

UNSAFEと判定されたコンテンツは、どれだけエンゲージメントが高くても一切表示されません。さらに、繰り返しUNSAFE判定を受けると、アカウント凍結のリスクが高まります。

機械学習による自動検出に加え、ユーザーからの通報も判定に影響します。「炎上商法」は短期的に注目を集めても、長期的にはSafetyFilterに引っかかり、アカウントにダメージを与えます。`,
    relatedTerms: ['nsfw-filter', 'spam-filter'],
    relatedChapters: [6],
  },
  {
    id: 'nsfw-filter',
    term: 'NsfwFilter',
    reading: 'エヌエスエフダブリューフィルター',
    category: 'filtering',
    description: `NSFW（Not Safe For Work＝職場で見るのに適さない）、つまり性的コンテンツや成人向けコンテンツを検出するフィルター。

検出されたコンテンツは：
・年齢確認が必要になる
・「センシティブな内容」として警告が表示される
・一部のユーザー設定では非表示になる

明確に禁止されているコンテンツ（児童ポルノなど）は完全に除外され、投稿者はアカウント停止処分を受けます。

意図せずNSFW判定を受けることもあります。例えば、医療的な画像や芸術作品が誤検出されるケースです。その場合は異議申し立てが可能です。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'spam-filter',
    term: 'SpamFilter',
    reading: 'スパムフィルター',
    category: 'filtering',
    description: `スパム行為（迷惑行為）を検出するフィルター。Xの「やってはいけない」ランキング1位の原因となるフィルターです。

SpamFilterが検出する主な行為：
・短時間での大量投稿
・自動化ツールによる不自然な行動
・同一内容の繰り返し投稿
・大量の不自然なリンク
・大量フォロー/アンフォロー

スパムと判定されると、投稿のリーチが大幅に制限されるか、最悪の場合アカウント凍結となります。

重要：「外部リンクを含む投稿」自体はペナルティ対象ではありません。SpamFilterが対象とするのは「大量の不自然なリンク」であり、単一の外部リンクは問題ありません（ソースコードで確認済み）。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'quality-filter',
    term: 'QualityFilter',
    reading: 'クオリティフィルター',
    category: 'filtering',
    description: `コンテンツの「情報価値」や「オリジナリティ」を判定するフィルター。低品質なコンテンツのリーチを制限します。

低品質と判定されやすいコンテンツ：
・意味のないテキスト（「あああ」など）
・他のツイートの丸コピー
・情報価値がほとんどない短文
・スパム的なフォーマット

高品質と判定されやすいコンテンツ：
・オリジナルの意見や分析
・有用な情報を含む
・適切な長さと構成
・画像や動画を効果的に使用

QualityFilterは、タイムラインに表示されるコンテンツ全体の質を維持するための仕組みです。`,
    relatedTerms: ['spam-filter', 'visibility-filter'],
    relatedChapters: [6],
  },
  {
    id: 'visibility-filter',
    term: 'VisibilityFilter',
    reading: 'ビジビリティフィルター',
    category: 'filtering',
    description: `コンテンツの「表示範囲」を制御する総合的なフィルター。複数のサブフィルターで構成されています。

主なサブフィルター：
・LanguageFilter: フォロワーと異なる言語の投稿は0.1倍（実質非表示）
・FreshnessFilter: 48時間超の投稿は候補から除外
・DuplicateFilter: 重複コンテンツは除外
・BlockedFilter: ブロック関係にあるユーザー間は非表示
・MutedFilter: ミュート設定に基づき非表示

これらのフィルターは「ユーザー体験の質」を維持するために存在します。例えば、48時間以上前の投稿が延々と表示されたら、ユーザーは新鮮な情報を得られなくなります。`,
    relatedTerms: ['quality-filter', 'author-diversity'],
    relatedChapters: [6],
  },
  {
    id: 'author-diversity',
    term: 'Author Diversity',
    reading: 'オーサーダイバーシティ',
    category: 'filtering',
    description: `タイムラインに同一著者のツイートが連続して表示されることを防ぐ仕組み。「著者多様性」とも呼ばれます。

具体的な動作：
・同一著者の1番目のツイート: 100%のスコア
・同一著者の2番目のツイート: 55%のスコア（-45%）
・同一著者の3番目のツイート: 32.5%のスコア（-67.5%）
・同一著者の5番目以降: 約10%のスコア（-90%）

重要な誤解：これは「投稿自体へのペナルティ」ではなく、「タイムライン表示時の調整」です。連続投稿しても、投稿自体のスコアは下がりません。単に、同じ人の投稿が連続表示されないよう順序が調整されるだけです。

また、4-6時間経過するとリセットされます。「連続投稿は絶対NG」という説は、このAuthor Diversityの仕組みを誤解したものです。`,
    relatedTerms: ['visibility-filter', 'timeline'],
    relatedChapters: [5, 8],
  },

  // システムカテゴリ
  {
    id: 'inn',
    term: 'In-Network (IN)',
    reading: 'インネットワーク',
    category: 'system',
    description: `あなたが「フォローしている」アカウントからのコンテンツ。「フォロー中」タブに表示されるツイートが該当します。

In-Networkのツイートは、Out-of-Network（フォローしていないアカウント）よりも基本的に優先されます。スコア計算では、OONツイートには0.85倍のペナルティ（15%減）がかかります。

ただし、単にフォローしているだけでは不十分です。RealGraphWeight（実際の交流頻度）が低いと、フォローしていてもタイムラインに表示されにくくなります。

「フォローしているのに最近見かけない」アカウントがいたら、それはRealGraphWeightが下がっている証拠です。積極的にいいねやリプライをすることで、表示頻度を上げられます。`,
    relatedTerms: ['oon', 'real-graph-weight'],
    relatedChapters: [7],
  },
  {
    id: 'oon',
    term: 'Out-of-Network (OON)',
    reading: 'アウトオブネットワーク',
    category: 'system',
    description: `あなたが「フォローしていない」アカウントからのコンテンツ。「For You」タブで「おすすめ」として表示されるツイートの多くがこれに該当します。

OONツイートがあなたに推薦される主な理由：
・SimClusterで、あなたと同じ興味グループの人がエンゲージしている
・あなたがフォローしている人がリポスト/いいねした
・あなたの過去の行動から、興味がありそうと予測された

OONツイートは、In-Networkより15%低いスコアからスタートします（0.85倍）。それでもタイムラインに表示されるということは、それだけ高いエンゲージメントを獲得しているということです。

あなたの投稿をOONユーザー（非フォロワー）に届けるには、SimClusterで同じグループに属するユーザーからのエンゲージメントが重要です。`,
    relatedTerms: ['inn', 'simcluster'],
    relatedChapters: [7],
  },
  {
    id: 'candidate-generation',
    term: 'Candidate Generation',
    reading: 'キャンディデートジェネレーション',
    category: 'system',
    description: `推薦システムの最初のステップ。膨大なツイートの中から「あなたに見せる候補」を数千〜数万件に絞り込むプロセスです。

Xには毎日数億件のツイートが投稿されますが、すべてを詳細に評価することは不可能です。そこで、Candidate Generationで大まかに「候補」を選び、その後のRanking段階で詳細なスコアリングを行います。

候補生成の主な方法：
・In-Network: フォローしている人の最新ツイート
・SimCluster: 似た興味を持つユーザーがエンゲージしたツイート
・トピックベース: あなたが興味を示したトピックのツイート

この段階で候補に入らないと、どれだけ良いツイートでもあなたには表示されません。だからこそ、投稿直後のエンゲージメント（初動）が重要なのです。`,
    relatedTerms: ['two-tower', 'ranking'],
    relatedChapters: [1, 3],
  },
  {
    id: 'ranking',
    term: 'Ranking',
    reading: 'ランキング',
    category: 'system',
    description: `Candidate Generationで選ばれた候補ツイートを、スコアに基づいて「表示順」を決定するプロセス。最終的なタイムラインの並び順を決める重要な段階です。

Rankingでは、各ツイートに対して複数のスコアが計算されます：
・Phoenixによるエンゲージメント予測スコア
・weighted_scorer.rsで定義された重み付けスコア
・Trust Score、Topical Authorityなどの信頼性スコア
・各種フィルターによる調整

これらを総合して、最終的なスコアが決まります。スコアが高いツイートほど、タイムラインの上位に表示されます。

重要なのは、Rankingは「リアルタイム」で行われることです。同じツイートでも、時間経過とともにスコアは変化します（FreshnessFilterの影響など）。`,
    relatedTerms: ['candidate-generation', 'scoring'],
    relatedChapters: [1, 5],
  },
  {
    id: 'timeline',
    term: 'Timeline (For You)',
    reading: 'タイムライン',
    category: 'system',
    description: `ユーザーに表示されるパーソナライズされたコンテンツフィード。Xアプリを開いたときに最初に見る画面です。

「For You」タイムラインは、以下のコンテンツで構成されます：
・In-Network（フォロー中）: 約50-70%
・Out-of-Network（おすすめ）: 約30-50%
・広告: 一定割合で挿入

タイムラインの構成は、ユーザーの行動に応じて動的に変化します。OONツイートに多くエンゲージする人には、OONの割合が増えます。

「フォロー中」タブは、純粋にフォローしている人のツイートだけが時系列で表示されます。アルゴリズムの影響を受けたくない場合はこちらを使用できます。`,
    relatedTerms: ['inn', 'oon', 'ranking'],
    relatedChapters: [1, 7],
  },

  // コンテンツカテゴリ
  {
    id: 'hook',
    term: 'Hook (フック)',
    reading: 'フック',
    category: 'content',
    description: `ツイートや動画の冒頭で、ユーザーの注意を引きつけ「続きを見たい」と思わせる要素。釣り針（hook）のように読者を引っ掛けることからこの名前がついています。

効果的なHookの例：
・意外性のある事実「〇〇は実は△△だった」
・問題提起「なぜ〇〇は△△なのか？」
・数字を使った具体性「3年で100万円貯めた方法」
・緊急性「今すぐやめるべき〇〇」
・共感「〇〇あるあるが辛すぎる」

動画の場合、最初の3秒が勝負です。ここで興味を引けないと、ユーザーはスクロールして次のコンテンツに移ってしまいます。VQV（品質視聴）を獲得するためにも、冒頭のHookは非常に重要です。`,
    relatedTerms: ['cta', 'dwell-time'],
    relatedChapters: [9, 10],
  },
  {
    id: 'cta',
    term: 'CTA (Call to Action)',
    reading: 'シーティーエー',
    category: 'content',
    description: `ユーザーに具体的なアクションを促す要素。「行動喚起」とも呼ばれます。

効果的なCTAの例：
・「この投稿が役に立ったらリポストお願いします」
・「あなたの経験もリプライで教えてください」
・「続きはプロフィールのリンクから」
・「フォローすると毎日〇〇の情報が届きます」

ただし注意：過度なCTAは「エンゲージメントベイト」と見なされ、ユーザーに嫌われる原因になります。「いいねしたら〇〇をプレゼント」のような露骨な誘導は避けましょう。

ソースコード上、エンゲージメントベイトを自動検出するML機構は確認できませんでしたが、ユーザーからの通報やミュートによって、結果的にスコアが下がる可能性があります。`,
    relatedTerms: ['hook', 'engagement'],
    relatedChapters: [10],
  },
  {
    id: 'thread',
    term: 'Thread (スレッド)',
    reading: 'スレッド',
    category: 'content',
    description: `複数のツイートを連続して投稿し、長文コンテンツを構成する形式。140文字では伝えきれない内容を、複数のツイートに分けて投稿します。

スレッドのメリット：
・Dwell Time（滞在時間）が長くなりやすい
・「続きを読みたい」という興味を喚起しやすい
・各ツイートが個別にリポストされる可能性がある
・ブックマークされやすい

効果的なスレッドの構成：
・1ツイート目: 強力なHookで興味を引く
・中間: 価値ある情報を段階的に提供
・最後: CTAで行動を促す

注意点として、スレッドは「投稿」としては1回の扱いなので、Author Diversityの影響は受けません。ただし、短時間に複数のスレッドを投稿すると、Author Diversityの対象になります。`,
    relatedTerms: ['engagement', 'dwell-time'],
    relatedChapters: [10],
  },
  {
    id: 'pinned-tweet',
    term: 'Pinned Tweet',
    reading: 'ピンドツイート',
    category: 'content',
    description: `プロフィールページの最上部に固定表示されるツイート。新規訪問者が最初に目にするコンテンツであり、「自己紹介」の役割を果たします。

効果的なPinned Tweetの例：
・自己紹介と提供価値の明示
・最も人気のあった投稿
・現在のキャンペーンや告知
・代表的な実績やポートフォリオ

Pinned Tweetは、プロフィールクリック後のフォロー率に大きく影響します。プロフィールクリック（12.0ポイント）は非常に高い価値がありますが、そこからフォロー（4.0ポイント）につなげるには、魅力的なPinned Tweetが重要です。

定期的に更新することで、常に最新の情報を訪問者に伝えられます。古いPinned Tweetを放置すると、「活動していないアカウント」という印象を与えかねません。`,
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
