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
    description: `【一言で言うと】
「あなた」と「ツイート」を数値化して相性を瞬時に判定する、Xの頭脳とも言える仕組みです。

【仕組み】
Two-Towerは「2つの塔」という名前の通り、独立した2つの計算システムで構成されています。1つ目の「ユーザータワー」は、あなたの過去の行動（いいね、リプライ、フォローなど）を分析し、あなたの興味や好みを数百個の数値の組み合わせ（ベクトル）で表現します。2つ目の「コンテンツタワー」は、各ツイートの文章、画像、投稿者の情報を分析し、同じく数値の組み合わせに変換します。この2つの数値を比較することで、「あなたにこのツイートがどれくらい合うか」をスコア化できます。

【なぜ重要か】
Xには毎秒何億ものツイートが存在しますが、Two-Towerのおかげで一瞬であなたに合うコンテンツを絞り込めます。

【ポイント】
・あなたの「好み」とツイートの「特徴」を同じ形式の数値に変換するのがミソ
・数値同士の「距離」が近いほど相性が良いと判断される
・高速処理と精度のバランスを両立する推薦システムの土台技術`,
    relatedTerms: ['phoenix', 'embedding', 'candidate-generation'],
    relatedChapters: [3],
  },
  {
    id: 'phoenix',
    term: 'Phoenix',
    reading: 'フェニックス',
    category: 'ml',
    description: `【一言で言うと】
あなたが次にどんな行動を取るかを予測する、Xの「行動予測AI」です。

【仕組み】
Phoenixは、あるツイートを見たときに「いいねする確率」「リプライする確率」「リポストする確率」など、19種類の行動パターンの発生確率を予測します。例えば、あるツイートに対して「いいね確率80%、リプライ確率5%、リポスト確率2%」のように数値化します。この予測値は、Xが設定した「重み」（リプライは13.5点、いいねは0.5点など）と掛け合わされ、最終的なスコアになります。スコアが高いツイートほど、あなたのタイムライン上位に表示されます。

【なぜ重要か】
Phoenixの予測が正確であるほど、あなたが興味を持つツイートが上位に来ます。逆に予測がズレると、見たくないツイートばかり表示されてしまいます。Phoenixはタイムラインの「質」を決める最重要パーツです。

【ポイント】
・「Phoenix（不死鳥）」の名は、常に学習し進化し続けることを表す
・単なる閲覧ではなく「深い関わり」（リプライなど）を重視する設計
・あなたの過去の行動データを元に、日々予測精度を向上させている`,
    relatedTerms: ['two-tower', 'engagement'],
    relatedChapters: [4],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    reading: 'エンベディング',
    category: 'ml',
    description: `【一言で言うと】
文章や画像などの複雑な情報を、コンピュータが計算できる「数値の列」に変換する技術です。

【仕組み】
人間は「猫の写真」と「犬の写真」を見れば「どちらも動物」と理解できますが、コンピュータにとっては単なる色の点の集まりです。Embeddingは、AIに大量のデータを学習させることで、「猫」と「犬」を数百個の数値の組み合わせ（例：[0.8, 0.3, -0.5, ...]）に変換します。学習の結果、意味が似ているものは数値も近くなるよう調整されます。つまり「猫」と「犬」の数値は近く、「猫」と「車」の数値は遠くなります。

【なぜ重要か】
Xでは、ツイートの内容とあなたの興味をそれぞれEmbeddingに変換することで、「このツイートはあなたに合うか？」を数学的に計算できます。Two-TowerやSimClusterなど、Xの推薦機能の多くがこの技術を土台にしています。

【ポイント】
・「意味が近いもの＝数値も近い」というルールで変換される
・文章、画像、ユーザー行動など、あらゆる情報に適用可能
・Xの推薦精度を支える最も基礎的な技術の一つ`,
    relatedTerms: ['two-tower', 'simcluster'],
    relatedChapters: [3, 4],
  },
  {
    id: 'simcluster',
    term: 'SimCluster',
    reading: 'シムクラスター',
    category: 'ml',
    description: `【一言で言うと】
あなたと似た興味を持つ人たちを自動的にグループ分けして、そのグループで人気の投稿をあなたにおすすめしてくれるシステムです。

【仕組み】
Xには数億人のユーザーがいますが、SimClusterは全員を約15万個の「興味グループ」に自動で分類します。例えば「日本のアニメが好きな人」「サッカーに詳しい人」「料理レシピに興味がある人」といったグループが機械学習によって作られます。あなたの「いいね」「リポスト」「フォロー」などの行動パターンから、どのグループに近いかが判定されます。

【なぜ重要か】
フォローしていない人の投稿が「おすすめ」に表示される仕組みの核心がSimClusterです。あなたと同じグループに属する人たちが「いいね」や「リプライ」をした投稿は、あなたにも表示されやすくなります。

【ポイント】
特定のジャンルで継続的に投稿し、そのジャンルに興味がある人からエンゲージメントを獲得することで、同じSimClusterに属する多くのユーザーのタイムラインに表示されるチャンスが広がります。`,
    relatedTerms: ['oon', 'topical-authority'],
    relatedChapters: [7],
  },

  // エンゲージメントカテゴリ
  {
    id: 'engagement',
    term: 'Engagement',
    reading: 'エンゲージメント',
    category: 'engagement',
    description: `【一言で言うと】
ユーザーが投稿に対して行う「反応」の総称で、Xのアルゴリズムが投稿の価値を判断する最も重要な指標です。

【仕組み】
Xでは19種類のエンゲージメントが定義されており、それぞれに「重み」が設定されています。重要度の高い順に、リプライ（返信）が13.5ポイント、プロフィールを見る行動が12.0ポイント、フォローが4.0ポイント、動画の品質視聴が1.5ポイント、リポストとブックマークが各1.0ポイント、いいねが0.5ポイントです。一方、通報やブロックは-10.0ポイント、ミュートは-5.0ポイントとマイナス評価されます。

【なぜ重要か】
アルゴリズムはエンゲージメントの量と質を見て「この投稿は価値があるか」を判断します。ポイントが高い投稿ほど多くの人のタイムラインに表示されます。

【ポイント】
「いいね」は最も軽いエンゲージメントで、リプライの27分の1の価値しかありません。質問を投げかける、議論を呼ぶ内容、体験談を求めるなど「返信したくなる投稿」を意識すると、アルゴリズムに高く評価されやすくなります。`,
    relatedTerms: ['fav', 'repost', 'reply', 'bookmark'],
    relatedChapters: [2],
  },
  {
    id: 'fav',
    term: 'Fav (いいね)',
    reading: 'ファボ',
    category: 'engagement',
    description: `【一言で言うと】
ハートマークをタップして投稿に「好き」と伝える最も手軽なリアクションですが、実はアルゴリズム的には最も軽い評価です。

【仕組み】
いいね（旧称：ファボ／Fav）はエンゲージメントの中で最も低い0.5ポイントの重みが付けられています。これはリプライ（13.5ポイント）の27分の1、プロフィール閲覧（12.0ポイント）の24分の1の価値しかありません。なぜかというと、いいねは「ワンタップで気軽にできるアクション」だからです。

【なぜ重要か】
Xのアルゴリズムは「どれだけ深く関わったか」を重視します。いいねは「気に入った」という軽い意思表示ですが、リプライは「わざわざ文章を書いて返信した」という深い関与を示します。

【ポイント】
投稿者として「いいね数」を気にしがちですが、実はアルゴリズム的にはリプライの数の方がはるかに重要です。「いいねが100個の投稿」より「リプライが10個の投稿」の方が高く評価される可能性があります。いいねを狙うより「返信したくなる投稿」を心がけましょう。`,
    relatedTerms: ['engagement', 'reply', 'repost'],
    relatedChapters: [2, 5],
  },
  {
    id: 'repost',
    term: 'Repost (リポスト)',
    reading: 'リポスト',
    category: 'engagement',
    description: `【一言で言うと】
他の人の投稿を、自分のフォロワー全員に「これ見て！」と共有するボタンです。以前は「リツイート（RT）」と呼ばれていました。

【仕組み】
リポストを押すと、その投稿があなたのフォロワー全員のタイムライン（投稿が流れる画面）に表示される候補になります。Xのアルゴリズム（投稿の表示順を決める仕組み）では、リポストは1.0ポイントとして計算されます。これは「いいね」の0.5ポイントの2倍にあたります。

【なぜ重要か】
リポストは「この投稿は価値がある」という強い意思表示です。いいねは「良いね」という軽い反応ですが、リポストは「自分のフォロワーにも届けたい」という積極的な行動。そのため、アルゴリズムはリポストを高く評価します。

【ポイント】
・リポストされやすい投稿＝拡散されやすい投稿
・役立つ情報、共感できる内容、面白いネタがリポストされやすい
・引用リポスト（コメント付きで共有）は1.1ポイントとやや高評価
・自分の投稿がリポストされると、フォロワー外にも届く大チャンス`,
    relatedTerms: ['engagement', 'fav', 'quote'],
    relatedChapters: [2, 5],
  },
  {
    id: 'reply',
    term: 'Reply (リプライ)',
    reading: 'リプライ',
    category: 'engagement',
    description: `【一言で言うと】
投稿に対するコメント返信のこと。Xアルゴリズムで最も高く評価されるアクションで、いいねの27倍も重要視されています。

【仕組み】
リプライのスコアは13.5ポイント。いいね（0.5ポイント）と比べると圧倒的に高い数値です。なぜこんなに高いのでしょうか？それはXが「会話が生まれる場所」を目指しているからです。リプライは一方通行ではなく、投稿者と読者の間に「対話」を生み出します。

【なぜ重要か】
Xは単なる情報発信の場ではなく、人と人が会話でつながるプラットフォームを理想としています。リプライが多い投稿は「会話を生み出すコンテンツ」と判断され、アルゴリズムが強く後押しします。

【ポイント】
・重要なのは「自分がリプライする」ことではなく「リプライをもらう」こと
・質問で終わる投稿、意見が分かれるテーマ、体験談を募る投稿が効果的
・「あなたはどう思いますか？」「皆さんの経験を教えてください」などの問いかけが有効
・もらったリプライに返信すると、さらに会話が続き評価アップ`,
    relatedTerms: ['engagement', 'conversation'],
    relatedChapters: [2, 5],
  },
  {
    id: 'bookmark',
    term: 'Bookmark (ブックマーク)',
    reading: 'ブックマーク',
    category: 'engagement',
    description: `【一言で言うと】
投稿を自分だけの「お気に入りリスト」に保存する機能。他の人からは見えないプライベートな保存ですが、アルゴリズムはしっかり評価しています。

【仕組み】
ブックマークのスコアは1.0ポイントで、リポストと同じ重みがあります。「後で読み返したい」「保存しておきたい」という行動は、その投稿に深い興味を持っている証拠。Xはこの「隠れた興味」を重要なシグナル（判断材料）として活用しています。

【なぜ重要か】
ブックマークの特徴は「他人に見えない」こと。いいねやリポストは周りの人に見られますが、ブックマークは完全に非公開です。つまり、人目を気にせず「本当に価値があると思った投稿」だけを保存します。この「本音の興味」こそ、アルゴリズムが知りたい情報なのです。

【ポイント】
・ブックマークされやすいコンテンツ：ノウハウ集、チェックリスト、まとめ情報、保存版○選
・「保存しておくと後で役立つ」と思わせる投稿が効果的
・ブックマーク数は投稿者本人も確認できるので、どんな投稿が保存されやすいか分析可能`,
    relatedTerms: ['engagement', 'fav'],
    relatedChapters: [2, 5],
  },
  {
    id: 'dwell-time',
    term: 'Dwell Time',
    reading: 'ドウェルタイム',
    category: 'engagement',
    description: `【一言で言うと】
あなたがツイートの前で「立ち止まった時間」のこと。Xはこの時間を見て、あなたが本当にその投稿に興味があったかを判断しています。

【仕組み】
Xはあなたがタイムラインをスクロールする動きを常に監視しています。ある投稿が画面に表示されてから、次にスクロールするまでの時間をミリ秒（1000分の1秒）単位で計測しています。例えば、ある投稿の前で3秒立ち止まった場合、Xは「この人はこの投稿に興味がある」と判断します。逆に0.5秒でスルーされた投稿は「興味なし」と判断されます。

【なぜ重要か】
Dwell Timeが長い投稿は「読む価値がある」とXに評価され、より多くの人のタイムラインに表示されやすくなります。いいねやリプライがなくても、多くの人が立ち止まって読んでいれば、その投稿は価値があると判断されるのです。

【ポイント】
長文や画像・動画付きの投稿は自然とDwell Timeが長くなります。ただし「長ければ良い」わけではありません。内容がつまらないのに無理に長くすると、途中で離脱されてしまい逆効果です。大切なのは「最後まで読みたい」と思わせる内容にすることです。`,
    relatedTerms: ['engagement', 'vqv'],
    relatedChapters: [2, 9],
  },

  // スコアリングカテゴリ
  {
    id: 'trust-score',
    term: 'Trust Score',
    reading: 'トラストスコア',
    category: 'scoring',
    description: `【一言で言うと】
Xがあなたのアカウントを「どれくらい信頼できるか」を0から1の数値で評価したもの。この点数が低いと、投稿が多くの人に届きにくくなります。

【仕組み】
Trust Scoreは主に以下の要素で決まります。プラス要因：アカウントの年齢（古いほど高い）、認証バッジ（青や金のマーク）の有無、プロフィールの完成度、電話番号やメールアドレスの認証。マイナス要因：他ユーザーからの通報回数、ブロックやミュートされた回数、スパム行為の履歴。これらを総合してXが自動計算しています。

【なぜ重要か】
Trust Scoreが低いアカウントの投稿は、「おすすめ」タブに表示されにくくなります。フォロワーが多くても、信頼度が低ければ投稿のリーチ（届く範囲）が大幅に制限されてしまいます。

【ポイント】
絶対に避けるべきなのが「フォロワー購入」です。不自然なフォロワー増加はXに検知され、Trust Scoreを壊滅的に下げます。一度下がったスコアの回復は非常に困難です。地道にプロフィールを充実させ、健全な運用を続けることが最も確実な方法です。`,
    relatedTerms: ['topical-authority', 'reputation'],
    relatedChapters: [10],
  },
  {
    id: 'topical-authority',
    term: 'Topical Authority',
    reading: 'トピカルオーソリティ',
    category: 'scoring',
    description: `【一言で言うと】
特定のジャンル・話題において、あなたが「その道の専門家」としてXに認められているかを示す指標です。高いほど、そのジャンルに興味がある人に投稿が届きやすくなります。

【仕組み】
Xはあなたの投稿内容と、その投稿への反応を分析しています。例えば、料理に関する投稿を続けて、その投稿に多くのいいねやリプライがつくと、Xは「この人は料理の専門家だ」と学習します。すると、料理に興味がある他のユーザーの「おすすめ」タブにあなたの投稿が表示されやすくなるのです。

【なぜ重要か】
Xのアルゴリズムは「何でも投稿する人」より「特定ジャンルの専門家」を優遇します。一つのテーマで継続的に発信し、そのテーマでエンゲージメント（反応）を獲得することで、同じ興味を持つユーザーに効率的にリーチできるようになります。

【ポイント】
高めるコツは3つ。(1)一貫したテーマで継続発信する、(2)そのテーマでリプライやリポストを獲得する、(3)同じテーマの有力アカウントと交流する。テーマを頻繁に変えると、どのジャンルでも「専門家」として認められず、おすすめに載りにくくなります。`,
    relatedTerms: ['trust-score', 'simcluster'],
    relatedChapters: [8, 10],
  },
  {
    id: 'real-graph-weight',
    term: 'RealGraphWeight',
    reading: 'リアルグラフウェイト',
    category: 'scoring',
    description: `【一言で言うと】
フォローしている人との「仲良し度」を数値化したものです。フォローしているだけでは意味がなく、実際にどれくらい交流しているかで決まります。

【仕組み】
Xは、あなたがフォローしている各アカウントとの「交流の深さ」を常に計測しています。具体的には、いいねをした回数、リプライ（返信）した回数、そのアカウントの投稿をどれくらい見ているかなどを総合して「RealGraphWeight（リアルグラフウェイト）」という数値を算出します。例えば、Aさんをフォローしていても一度も投稿に反応していなければ、この数値は低くなります。逆に、Bさんの投稿には毎回いいねをしていれば、Bさんとの数値は高くなります。

【なぜ重要か】
この数値が高いアカウントの投稿は、あなたのタイムライン（投稿が流れてくる画面）で上の方に表示されやすくなります。反対に、フォローしていても交流がないアカウントの投稿は、下の方に押しやられて見逃しやすくなります。つまり、Xは「フォローしているけど実際には見ていない関係」を見抜いて、本当に興味があるアカウントを優先表示しているのです。

【ポイント】
・「フォローしているのに最近見かけない」と感じるアカウントは、交流が減ってRealGraphWeightが下がっている可能性があります
・見たいアカウントには積極的にいいねやリプライをすることで、表示頻度を上げられます
・フォロワーに自分の投稿を見てもらいたいなら、日頃からフォロワーと交流しておくことが大切です`,
    relatedTerms: ['inn', 'oon'],
    relatedChapters: [7],
  },
  {
    id: 'vqv',
    term: 'VQV (Video Quality View)',
    reading: 'ブイキューブイ',
    category: 'scoring',
    description: `【一言で言うと】
動画が「ちゃんと見られたか」を測る指標です。単に再生されただけでは評価されず、しっかり視聴されたかどうかで判断されます。

【仕組み】
VQVは「Video Quality View（ビデオ・クオリティ・ビュー）」の略で、以下の条件を満たした視聴だけがカウントされます。

・10秒以上視聴された
・音声がONになっている
・画面の中央付近で再生されている
・動画全体の40%以上を見た

これらを満たすと1.5ポイントが付与されます。一方、ただ再生されただけ（すぐにスクロールされた場合など）は0.005ポイントとほぼ価値がありません。ちなみに「いいね」は0.5ポイントなので、VQVはいいねの3倍の価値があります。

【なぜ重要か】
Xのアルゴリズム（投稿を表示する順番を決める仕組み）は、「再生回数」ではなく「質の高い視聴回数」を重視しています。つまり、10万回再生されてもほとんどの人がすぐにスキップしていれば評価は低く、1万回でも最後まで見てもらえた動画の方が高く評価されます。

【ポイント】
・冒頭3秒で視聴者の興味を引く工夫が必須です
・音声なしでも内容がわかるよう字幕を付けると、音声ONにしてもらいやすくなります
・無駄に長い動画より、内容に見合った適切な長さにして最後まで見てもらうことが重要です
・「再生回数」より「完了率」を意識して動画を作りましょう`,
    relatedTerms: ['dwell-time', 'engagement'],
    relatedChapters: [9],
  },

  // フィルターカテゴリ
  {
    id: 'safety-filter',
    term: 'SafetyFilter',
    reading: 'セーフティフィルター',
    category: 'filtering',
    description: `【一言で言うと】
危険なコンテンツや不適切な投稿を自動で検出し、表示を制限するシステムです。機械学習（AIの一種）とユーザーからの通報によって判定されます。

【仕組み】
SafetyFilter（セーフティフィルター）は、すべての投稿を3段階で分類します。

・SAFE（セーフ）：問題なし。通常どおり表示されます
・SENSITIVE（センシティブ）：警告表示付きで表示されるか、一部制限がかかります
・UNSAFE（アンセーフ）：完全に表示されません。いくら「いいね」が付いていても、誰のタイムラインにも出てこなくなります

検出対象となるのは、暴力、ヘイトスピーチ（特定の人々への憎悪表現）、テロリズム、違法行為などです。AIが自動で判定するほか、他のユーザーからの通報も判定材料になります。

【なぜ重要か】
一度UNSAFEと判定されると、その投稿は完全に「見えなくなる」だけでなく、繰り返しUNSAFE判定を受けるとアカウント自体が凍結（使えなくなる）されるリスクが高まります。どれだけフォロワーが多くても、バズりそうな内容でも関係ありません。

【ポイント】
・過激な表現で注目を集める「炎上商法」は、短期的には目立てても、長期的にはアカウントにダメージを与えます
・自分では問題ないと思っていても、AIが誤判定することもあります。疑わしい表現は避けましょう
・他ユーザーからの通報が多いと判定が厳しくなるため、不快感を与える投稿は控えることが大切です`,
    relatedTerms: ['nsfw-filter', 'spam-filter'],
    relatedChapters: [6],
  },
  {
    id: 'nsfw-filter',
    term: 'NsfwFilter',
    reading: 'エヌエスエフダブリューフィルター',
    category: 'filtering',
    description: `【一言で言うと】
性的・暴力的など「職場で見るのに適さない」コンテンツを自動検出し、閲覧制限をかける仕組みです。

【仕組み】
NSFWとは「Not Safe For Work」の略で、直訳すると「仕事中に見るのは危険」という意味です。Xでは画像や動画をAI（人工知能）が分析し、成人向けコンテンツかどうかを判定します。検出されると「センシティブな内容を含む可能性があります」という警告が表示され、ユーザーが自分でクリックしないと見られなくなります。また、年齢確認が必要になったり、設定によっては完全に非表示になることもあります。

【なぜ重要か】
未成年のユーザーを不適切なコンテンツから守り、誰もが安心して使えるプラットフォームを維持するためです。また、法律で禁止されているコンテンツは完全に削除され、投稿者はアカウント停止となります。

【ポイント】
医療関係の画像や美術作品が誤って検出されることがあります。その場合は異議申し立てができるので、正当なコンテンツが制限された場合は申請しましょう。逆に、自分の投稿が成人向け内容を含む場合は、事前に「センシティブ設定」をオンにしておくとペナルティを避けられます。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'spam-filter',
    term: 'SpamFilter',
    reading: 'スパムフィルター',
    category: 'filtering',
    description: `【一言で言うと】
迷惑行為や不自然な自動投稿を検出し、アカウントの信頼性を下げたり凍結したりする仕組みです。

【仕組み】
スパムとは「迷惑な大量送信行為」のことです。Xでは以下のような行動パターンを監視しています。短時間での大量投稿、ボット（自動プログラム）による不自然な動き、同じ内容の繰り返し投稿、怪しいリンクの大量共有、短期間での大量フォロー・アンフォローなどです。これらが検出されると、まず投稿が他のユーザーに表示されにくくなり（シャドウバン）、悪質な場合はアカウント凍結となります。

【なぜ重要か】
Xで最も厳しく取り締まられる違反行為がスパムです。一度スパム判定を受けると、アカウントの信頼スコアが大きく下がり、回復に長い時間がかかります。普通に使っているつもりでも、熱心すぎる投稿活動がスパムと誤認されることがあります。

【ポイント】
よくある誤解ですが「外部リンクを貼るとペナルティ」ではありません。問題なのは「大量の不自然なリンク」であり、ブログや記事への単発リンクは全く問題ありません。投稿は1日数十件程度に抑え、同じ内容の繰り返しは避けましょう。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'quality-filter',
    term: 'QualityFilter',
    reading: 'クオリティフィルター',
    category: 'filtering',
    description: `【一言で言うと】
投稿の「情報としての価値」を判定し、低品質なコンテンツの拡散を抑える仕組みです。

【仕組み】
XのAIが投稿内容を分析し、ユーザーにとって有益かどうかを評価します。低品質と判定されやすいのは、意味のない文字の羅列、他人の投稿の丸コピー、「おはよう」だけのような情報価値のない短文、絵文字や記号だけの投稿などです。逆に高品質と評価されるのは、自分なりの意見や分析がある投稿、役立つ情報を含む投稿、適度な長さで読みやすい投稿、画像や動画を効果的に使った投稿です。

【なぜ重要か】
タイムライン（投稿一覧）の質を保つためです。低品質な投稿ばかりが流れると、ユーザーがXを使わなくなってしまいます。このフィルターにより、価値ある情報が見つけやすくなっています。

【ポイント】
投稿する前に「これを読んだ人にとって何か得るものがあるか？」と考えてみましょう。自分の体験談、役立つ知識、独自の視点を加えるだけで、品質スコアは大きく向上します。短文でも、しっかり意味が伝わる内容であれば問題ありません。`,
    relatedTerms: ['spam-filter', 'visibility-filter'],
    relatedChapters: [6],
  },
  {
    id: 'visibility-filter',
    term: 'VisibilityFilter',
    reading: 'ビジビリティフィルター',
    category: 'filtering',
    description: `【一言で言うと】
投稿が「誰に見えるか」を自動調整する仕組みです。いくつかの条件をチェックして、あなたのタイムラインに表示すべきかどうかを判断します。

【仕組み】
VisibilityFilterは複数の小さなフィルターの集合体です。主なものは以下の5つです。

1. 言語フィルター：あなたのフォロワーと異なる言語の投稿は、表示されにくくなります（スコアが0.1倍に）。例えば日本語ユーザーに英語の投稿は届きにくいということです。

2. 鮮度フィルター：投稿から48時間を超えると、タイムラインから除外されます。古い情報より新しい情報を優先する仕組みです。

3. 重複フィルター：同じ内容が何度も表示されないよう、重複を検出して除外します。

4. ブロック・ミュートフィルター：あなたがブロックまたはミュートした相手の投稿は一切表示されません。

【なぜ重要か】
このフィルターがないと、タイムラインは古い投稿や読めない言語の投稿で溢れてしまいます。「今、自分が見たい情報」を届けるために、自動的に整理してくれているのです。

【ポイント】
・投稿は48時間以内が勝負。それ以降は表示されにくくなります
・フォロワーの言語層に合わせた投稿が効果的です
・同じ内容の繰り返し投稿は意味がありません`,
    relatedTerms: ['quality-filter', 'author-diversity'],
    relatedChapters: [6],
  },
  {
    id: 'author-diversity',
    term: 'Author Diversity',
    reading: 'オーサーダイバーシティ',
    category: 'filtering',
    description: `【一言で言うと】
タイムラインが「同じ人の投稿だらけ」にならないよう、表示順を調整する仕組みです。投稿自体の評価を下げるわけではありません。

【仕組み】
あなたのタイムラインに同じ人の投稿が並ぶとき、表示される順番のスコアが自動調整されます。具体的には以下のような割合です。

・1番目の投稿：100%のスコアで表示
・2番目の投稿：55%のスコア（他の投稿が間に入りやすくなる）
・3番目の投稿：32.5%のスコア
・5番目以降：約10%のスコア

重要な誤解ポイント：これは「連続投稿するとペナルティを受ける」という意味ではありません。投稿そのものの価値は変わらず、「タイムライン上で連続表示されにくくなる」だけです。また、この調整は4〜6時間でリセットされます。

【なぜ重要か】
もしこの仕組みがなければ、大量に投稿する人のツイートでタイムラインが埋め尽くされてしまいます。色々な人の情報を見られるよう、多様性を保つための仕組みです。

【ポイント】
・「連続投稿は絶対ダメ」は誤解です
・投稿の質は下がりません。表示順が調整されるだけ
・4〜6時間空ければリセットされるので、長時間スパンで投稿する戦略は有効です`,
    relatedTerms: ['visibility-filter', 'timeline'],
    relatedChapters: [5, 8],
  },

  // システムカテゴリ
  {
    id: 'inn',
    term: 'In-Network (IN)',
    reading: 'インネットワーク',
    category: 'system',
    description: `【一言で言うと】
あなたが「フォローしている人」からの投稿のことです。「フォロー中」タブに表示され、おすすめ（Out-of-Network）より優先されます。

【仕組み】
Xのタイムラインは、大きく2種類の投稿で構成されています。

・In-Network（インネットワーク）：フォロー中の人の投稿
・Out-of-Network（アウトオブネットワーク）：フォローしていない人の投稿（おすすめ）

In-Networkは基本的に優先表示されます。Out-of-Networkには「0.85倍」のペナルティがかかるため、同じスコアならIn-Networkが上に来ます。

ただし、フォローしているだけでは不十分です。「RealGraphWeight（リアルグラフウェイト）」という指標があり、これは「実際にどれだけ交流しているか」を測定します。いいねやリプライをしていないと、フォローしていても表示頻度が下がります。

【なぜ重要か】
「フォローしているはずなのに、あの人の投稿を最近見ない」という経験はありませんか？それはRealGraphWeightが下がっているサインです。フォローは「見る権利」であり、「必ず見られる保証」ではありません。

【ポイント】
・見たい人の投稿には積極的にいいね・リプライを
・交流がないとフォローしていても表示されにくくなります
・「フォロー中」タブなら時系列で確実に見られます`,
    relatedTerms: ['oon', 'real-graph-weight'],
    relatedChapters: [7],
  },
  {
    id: 'oon',
    term: 'Out-of-Network (OON)',
    reading: 'アウトオブネットワーク',
    category: 'system',
    description: `【一言で言うと】
フォローしていない人の投稿があなたの「おすすめ」に表示される仕組みのことです。Xが「この人の投稿、あなたも気に入るかも！」と判断して届けてくれます。

【仕組み】
Xはあなたがフォローしていない人の投稿も分析し、以下の条件に当てはまると「おすすめ」として表示します。

1. SimCluster（シムクラスター）という技術で、あなたと「似た興味を持つグループ」に属する人々がその投稿に反応した場合
2. あなたがフォローしている人がリポストやいいねをした場合
3. あなたの過去の行動パターンから「興味がありそう」とXが予測した場合

【なぜ重要か】
この仕組みがあるからこそ、フォロワーが少なくても良い投稿は多くの人に届く可能性があります。ただし、OONの投稿はフォロー中の人の投稿より15%低いスコア（0.85倍）からスタートするため、表示されるためにはそれを上回る魅力が必要です。

【ポイント】
非フォロワーに届けたいなら、あなたと同じ興味グループの人からの反応（いいねやリプライ）を得ることが重要です。同じテーマで継続的に発信し、そのジャンルのファンに見つけてもらいましょう。`,
    relatedTerms: ['inn', 'simcluster'],
    relatedChapters: [7],
  },
  {
    id: 'candidate-generation',
    term: 'Candidate Generation',
    reading: 'キャンディデートジェネレーション',
    category: 'system',
    description: `【一言で言うと】
毎日投稿される数億件のツイートから「あなたに見せる候補」を数千〜数万件に絞り込む、推薦システムの最初のステップです。いわば「一次選考」のようなものです。

【仕組み】
Xには毎日膨大な数の投稿が流れます。すべてを一つ一つ評価するのは技術的に不可能なため、まず大まかに候補を選びます。候補は主に3つの方法で集められます。

1. In-Network：あなたがフォローしている人の最新投稿
2. SimCluster：あなたと似た興味を持つ人々が反応した投稿
3. トピックベース：あなたが過去に興味を示したトピックに関連する投稿

この段階で選ばれた候補だけが、次の「Ranking（ランキング）」という詳細な評価に進めます。

【なぜ重要か】
どんなに素晴らしい投稿でも、この「候補生成」の段階で選ばれなければ、誰のタイムラインにも表示されません。つまり、投稿が世に出た瞬間に「候補入り」できるかどうかが勝負です。

【ポイント】
投稿直後の反応（いわゆる「初動」）が極めて重要です。投稿してすぐにいいねやリプライがつくと、候補として選ばれやすくなります。フォロワーがアクティブな時間帯に投稿するのが効果的です。`,
    relatedTerms: ['two-tower', 'ranking'],
    relatedChapters: [1, 3],
  },
  {
    id: 'ranking',
    term: 'Ranking',
    reading: 'ランキング',
    category: 'system',
    description: `【一言で言うと】
候補生成で選ばれた投稿を「スコア順に並べ替える」プロセスです。この順位が高いほど、タイムラインの上の方に表示されます。

【仕組み】
Rankingでは、各投稿に対して以下の計算が行われます。

1. Phoenix（フェニックス）という機械学習モデルが「この人はいいねしそう」「リプライしそう」などの確率を予測
2. 各アクションに設定された「重み」と掛け算（リプライは13.5点、いいねは0.5点など）
3. 投稿者の信頼度（Trust Score）や専門性（Topical Authority）も加味
4. 各種フィルターで最終調整

これらを総合したスコアが高いほど、あなたのタイムラインで上位に表示されます。

【なぜ重要か】
Rankingは「リアルタイム」で行われます。同じ投稿でも、時間が経つと「新しさ」のスコアが下がり、順位が落ちていきます。また、反応が増えればスコアが上がり、再び上位に浮上することもあります。

【ポイント】
いいね（0.5点）よりリプライ（13.5点）の方が27倍も価値があります。「いいねされる投稿」より「リプライがつく投稿」を意識しましょう。質問を投げかけたり、意見を求める投稿が効果的です。`,
    relatedTerms: ['candidate-generation', 'scoring'],
    relatedChapters: [1, 5],
  },
  {
    id: 'timeline',
    term: 'Timeline (For You)',
    reading: 'タイムライン',
    category: 'system',
    description: `【一言で言うと】
あなた専用にカスタマイズされた投稿の表示画面です。Xを開いたときに最初に目にする、投稿が並んでいる場所のことを指します。

【仕組み】
タイムラインには2種類あります。「おすすめ」タブは、フォローしている人の投稿が約50〜70%、フォローしていない人からのおすすめ投稿が約30〜50%、そして広告で構成されています。この割合はあなたの行動によって変化し、おすすめ投稿によく反応する人には、おすすめの割合が増えていきます。一方「フォロー中」タブは、フォローしている人の投稿だけが新しい順に並び、アルゴリズム（自動選別の仕組み）の影響を受けません。

【なぜ重要か】
発信者にとって、自分の投稿がフォロワー以外のタイムラインにも表示されるかどうかが、拡散力を大きく左右します。おすすめタブに載ることで、フォロワー以外の多くの人に見てもらえるチャンスが生まれます。

【ポイント】
おすすめタブに表示されるには、いいねやリポストなどの反応を多く集めることが重要です。フォロワーとの関係性を深めつつ、新規ユーザーにも届く投稿を心がけましょう。`,
    relatedTerms: ['inn', 'oon', 'ranking'],
    relatedChapters: [1, 7],
  },

  // コンテンツカテゴリ
  {
    id: 'hook',
    term: 'Hook (フック)',
    reading: 'フック',
    category: 'content',
    description: `【一言で言うと】
投稿の冒頭で「続きが気になる！」と思わせる仕掛けのことです。釣り針（フック）のように読者の興味を引っ掛けることが名前の由来です。

【仕組み】
ユーザーはタイムラインを高速でスクロールしているため、投稿の最初の1〜2行で興味を引けないと、すぐに次へ流されてしまいます。動画の場合は最初の3秒が勝負です。効果的なフックには、意外性のある事実（「実は○○は逆効果」）、問題提起（「なぜ○○は失敗するのか？」）、具体的な数字（「3日で1万人が実践」）、共感を呼ぶ悩み（「これ、あるあるですよね」）などがあります。

【なぜ重要か】
どんなに良い内容でも、最後まで読んでもらえなければ意味がありません。フックが弱いと、投稿の滞在時間（ユーザーがその投稿を見ている時間）が短くなり、アルゴリズムからの評価も下がってしまいます。

【ポイント】
結論を最初に持ってくる、読者の常識を覆す、「あなた」に語りかける、といった工夫が有効です。ただし、釣りタイトルで期待を裏切ると信頼を失うので、内容との一貫性も大切にしましょう。`,
    relatedTerms: ['cta', 'dwell-time'],
    relatedChapters: [9, 10],
  },
  {
    id: 'cta',
    term: 'CTA (Call to Action)',
    reading: 'シーティーエー',
    category: 'content',
    description: `【一言で言うと】
「リポストお願いします」「感想を教えてください」など、読者に具体的な行動を促す呼びかけのことです。Call To Action（行動への呼びかけ）の略称です。

【仕組み】
人は明確に頼まれないと行動しないことが多いため、投稿の最後などに具体的なお願いを入れることで、いいねやリポスト、リプライなどの反応を得やすくなります。例えば「参考になったらいいねで教えてください」「あなたの経験もリプライで聞かせてください」「詳しくはプロフィールのリンクから」といった形で使います。

【なぜ重要か】
エンゲージメント（いいね・リポスト・リプライなどの反応）が増えると、アルゴリズムに「価値のある投稿」と判断され、より多くの人に表示されやすくなります。適切なCTAは、読者との対話のきっかけにもなります。

【ポイント】
やりすぎは逆効果です。「いいねしたら○○プレゼント」のような露骨な誘導は、エンゲージメントベイト（反応を不正に集める行為）と見なされ、通報やミュートの原因になります。自然な流れで、読者にとってもメリットがある形でお願いするのがコツです。`,
    relatedTerms: ['hook', 'engagement'],
    relatedChapters: [10],
  },
  {
    id: 'thread',
    term: 'Thread (スレッド)',
    reading: 'スレッド',
    category: 'content',
    description: `【一言で言うと】
複数のツイートをつなげて、1つの長いストーリーや解説を投稿する方法です。本で言えば「章」をつなげて1冊にするようなイメージです。

【仕組み】
スレッドを作成するには、最初のツイートを投稿した後、自分のツイートに返信する形で続きを書いていきます。すると「1/10」「2/10」のように連続したコンテンツとして表示されます。Xのアルゴリズム上、スレッド全体は「1回の投稿」として扱われるため、連続投稿のペナルティ（Author Diversity＝同一著者の投稿を減らす調整）を受けません。

【なぜ重要か】
スレッドには4つの大きなメリットがあります。まず「滞在時間（Dwell Time）」が長くなりやすく、アルゴリズムに好評価されます。次に「続きが気になる」という心理を刺激できます。また、各ツイートが個別にリポストやいいねされる可能性があり、拡散力が高いです。さらに「後で読み返したい」とブックマークされやすい形式です。

【ポイント】
効果的なスレッドの作り方は3ステップ。1ツイート目で読者の興味を引く「フック」を入れ、中間で価値ある情報を段階的に提供し、最後に「リプライで感想を聞かせてください」などの行動喚起（CTA）で締めます。`,
    relatedTerms: ['engagement', 'dwell-time'],
    relatedChapters: [10],
  },
  {
    id: 'pinned-tweet',
    term: 'Pinned Tweet',
    reading: 'ピンドツイート',
    category: 'content',
    description: `【一言で言うと】
あなたのプロフィールページの一番上に固定表示されるツイートです。お店の「看板」や「入口の案内板」のような役割を果たします。

【仕組み】
任意のツイートを選んで「ピン留め」すると、プロフィールを訪れた人が最初に目にするツイートとして固定されます。通常ツイートは新しい順に並びますが、ピン留めしたツイートは常に最上部に表示されます。設定はツイート右上の「...」メニューから「プロフィールに固定する」を選ぶだけです。

【なぜ重要か】
誰かがあなたに興味を持ってプロフィールを見に来たとき（これは12.0ポイントと高い評価を受ける行動です）、ピンドツイートが最初の印象を決めます。ここで「フォローしたい」と思わせられるかどうかが、フォロワー獲得（4.0ポイント）につながる分岐点です。

【ポイント】
効果的なピンドツイートの例は4パターンあります。①自己紹介と提供価値の明示、②過去に最も反響があった投稿、③現在進行中のキャンペーン告知、④代表的な実績や成果の紹介。また、定期的な更新も大切です。古いままのピンドツイートは「このアカウントは活動していない」という印象を与えます。`,
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
          <p className="text-xs text-muted-foreground mt-2">
            📚 ソース: <a href="https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">twitter/the-algorithm-ml</a>（2023年4月公開）。
            ※ 2026年1月公開の <a href="https://github.com/xai-org/x-algorithm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">xai-org/x-algorithm</a> では、Grokベースのスコアリングに移行しています。
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
