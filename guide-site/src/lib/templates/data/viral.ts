/**
 * バイラル拡散カテゴリのテンプレート
 */

import { Template } from '../types';

export const viralTemplates: Template[] = [
  {
    id: 'viral-01',
    category: 'viral',
    title: '衝撃の事実暴露型',
    description: '意外な真実や知られざる事実を共有し、驚きと共有を促進',
    effects: ['リポスト増加', 'インプレッション拡大', '新規フォロワー獲得'],
    example: `99%の人が知らない事実。

Xのアルゴリズムは「いいね」より「リプライ」を重視している。

具体的には：
・いいね → 0.5倍
・リポスト → 1倍
・リプライ → 13.5倍

つまり「いいね稼ぎ」より「会話を生む投稿」の方が圧倒的に有利。

これ知ってるだけで運用が変わる。`,
    explanation: '「99%が知らない」という強い冒頭で注目を集め、具体的な数字で信頼性を担保。新しい知識を得た人は共有したくなる。',
    points: [
      '冒頭で「意外性」を強調する',
      '具体的な数字やデータを示す',
      '「知らないと損」という切迫感を出す',
      'すぐに使える実用的な情報にする',
    ],
    cautions: [
      '誇張や嘘は信頼を失う',
      '出典が求められる場合は準備しておく',
      '炎上リスクのある内容は避ける',
    ],
    relatedChapters: [2, 5, 7],
    relatedTemplates: ['value-01', 'news-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'viral-02',
    category: 'viral',
    title: 'リスト・ランキング型',
    description: '〇選・ランキング形式で読みやすく共有しやすい構成',
    effects: ['ブックマーク増加', 'リポスト増加', '滞在時間向上'],
    example: `【保存推奨】人生を変えた本5選

1. 「7つの習慣」→ 時間管理が劇的に改善
2. 「嫌われる勇気」→ 人間関係のストレス激減
3. 「FACTFULNESS」→ 物事を正しく見れるように
4. 「エッセンシャル思考」→ やらないことを決められた
5. 「影響力の武器」→ 人の心理が理解できた

全部読んでる人いいね！
1つでも読んだ人はリプで教えて📚`,
    explanation: 'リスト形式は読みやすく、保存価値も高い。各項目に「得られた効果」を添えることで具体性が増す。最後のCTAでエンゲージメントを促進。',
    points: [
      '5〜10個程度のリストが読みやすい',
      '各項目に一言解説を添える',
      '「保存推奨」でブックマークを促す',
      'リプライを促すCTAを入れる',
    ],
    cautions: [
      '多すぎると読まれない',
      '定番すぎるものばかりだと新鮮味がない',
      '自分が本当に価値を感じたものを選ぶ',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-02', 'thread-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'viral-03',
    category: 'viral',
    title: '逆説・反常識型',
    description: '常識を覆す視点で注目を集め、議論を促進',
    effects: ['引用リポスト増加', '議論活性化', '新規リーチ拡大'],
    example: `「毎日投稿しろ」は嘘。

X運用の正解は「週3回の高品質投稿」だと思う。

理由：
・毎日投稿するとネタ切れで質が下がる
・アルゴリズムは「量」より「質」を評価
・フォロワーも毎日読んでない

実際、週3投稿に減らしてから
エンゲージメント率が2倍になった。

「とにかく量を出せ」に違和感ある人、いません？`,
    explanation: '「毎日投稿」という常識に疑問を投げかけ、別の視点を提示。自分の実体験を根拠にしつつ、最後に問いかけで議論を促している。',
    points: [
      '常識や定説を明確に否定する',
      '否定する理由を論理的に説明',
      '自分の実体験や数字を根拠にする',
      '問いかけで議論を促す',
    ],
    cautions: [
      '根拠なき否定は炎上リスク',
      '攻撃的な言い方は避ける',
      '「自分の場合」という留保を付ける',
    ],
    relatedChapters: [2, 8],
    relatedTemplates: ['opinion-01', 'question-01'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'viral-04',
    category: 'viral',
    title: 'トレンド便乗型',
    description: 'トレンドトピックに自分の専門性を絡めて発信',
    effects: ['トレンド流入', 'インプレッション拡大', '新規フォロワー獲得'],
    example: `ChatGPTがトレンド入りしてるけど、

実はXのアルゴリズムにも
AIが深く関わってるの知ってた？

「Phoenix」という機械学習モデルが
あなたのタイムラインを決めてる。

19種類のエンゲージメントを予測して
「この人はこの投稿に反応する」を計算。

AIに「良い投稿」と判断されるかどうかで
あなたの投稿の運命が決まる。`,
    explanation: 'トレンドワード（ChatGPT）を入り口に、自分の専門領域（Xアルゴリズム）に話を展開。トレンド検索からの流入を狙いつつ、価値ある情報を提供。',
    points: [
      'トレンドを自然に取り入れる',
      '自分の専門領域と絡める',
      'トレンドを入り口に独自の価値を提供',
      'トレンドワードは冒頭に入れる',
    ],
    cautions: [
      '無理やりな便乗は逆効果',
      'センシティブなトレンドは避ける',
      '専門性がないトレンドには乗らない',
    ],
    relatedChapters: [2, 7, 8],
    relatedTemplates: ['timing-01', 'news-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'viral-05',
    category: 'viral',
    title: '共感×ユーモア型',
    description: '共感できる内容をユーモラスに表現し、シェアを促進',
    effects: ['リポスト増加', '親近感向上', 'フォロワー増加'],
    example: `社会人になって学んだこと

・「検討します」は「やりません」
・「お忙しいところ」は「返事遅くてすみません」
・「前向きに」は「多分無理」
・「ご確認ください」は「ちゃんと読め」
・「お手すきの際に」は「今すぐやれ」

日本語、難しすぎない？笑`,
    explanation: 'ビジネスシーンの「あるある」をユーモラスに言語化。共感した人が「わかる！」と思わずシェアしたくなる構成。最後の軽い問いかけで親しみやすさを演出。',
    points: [
      '広く共感できるテーマを選ぶ',
      'ユーモアを交えて表現する',
      '対比構造で分かりやすく',
      '最後は軽く締める',
    ],
    cautions: [
      '特定の人を馬鹿にしない',
      'センシティブな話題は避ける',
      'ウケ狙いすぎて滑らないよう注意',
    ],
    relatedChapters: [2, 7],
    relatedTemplates: ['engagement-02', 'community-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'viral-06',
    category: 'viral',
    title: '比較・対比型',
    description: '2つの対象を比較して違いを際立たせる',
    effects: ['議論促進', 'リポスト増加', 'インプレッション拡大'],
    example: `【成功する人と停滞する人の違い】

成功する人：
・毎日1%の改善
・失敗を学びに変える
・他人の成功を祝福する

停滞する人：
・現状維持が目標
・失敗を他人のせいにする
・他人の成功を妬む

どちらになりたいかは、今日の行動で決まる。`,
    explanation: '対比構造で違いを明確化。読者は自然と「自分はどちらか」を考え、成功する側になりたいと思う。最後の一文で行動を促している。',
    points: [
      '対比は3つ程度がベスト',
      '明確に対照的な内容にする',
      '読者が「こうなりたい」と思える方を詳しく',
      '最後に行動を促す一言を添える',
    ],
    cautions: [
      '上から目線にならないよう注意',
      '片方を極端に悪く書きすぎない',
      '自分も完璧ではない謙虚さを',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['value-03', 'opinion-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'viral-07',
    category: 'viral',
    title: 'ストーリー仕立て型',
    description: '物語形式で感情を動かし、共有を促進',
    effects: ['感情移入', '滞在時間向上', 'リポスト増加'],
    example: `5年前、上司に言われた一言が今でも忘れられない。

「お前、向いてないよ」

その日、帰りの電車で泣いた。

でも、悔しくて副業を始めた。
毎日2時間、必死で勉強した。

3年後、その副業が本業の収入を超えた。

今、その上司はまだ同じポジションにいる。

「向いてない」と言われたことが、人生で一番のギフトだった。`,
    explanation: '感情を揺さぶるストーリー展開。逆境→努力→成功という王道構成。最後の「ギフト」という言葉で前向きに締めている。',
    points: [
      '具体的なセリフやシーンから始める',
      '感情の動きを描写する',
      '逆境から成功への転換を描く',
      '最後に学びや気づきを添える',
    ],
    cautions: [
      '嘘のストーリーは信頼を失う',
      '自慢話にならないよう注意',
      '長すぎると離脱される',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['story-01', 'engagement-05'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'viral-08',
    category: 'viral',
    title: '保存版まとめ型',
    description: '特定テーマの情報を網羅的にまとめて保存価値を高める',
    effects: ['ブックマーク増加', 'リポスト増加', '権威性向上'],
    example: `【永久保存版】X運用で絶対やってはいけないこと10選

1. 投稿直後にいいね周り
2. フォロバ目的の大量フォロー
3. 毎回同じ文言のリプライ
4. 外部リンクを本文に入れる
5. ハッシュタグの乱用
6. ネガティブな話題ばかり
7. 他人の投稿を無断でパクる
8. 炎上している話題に便乗
9. 投稿時間を考えない
10. 分析せずに続ける

これ全部避けるだけで伸びる。
保存して定期的に見返してね。`,
    explanation: '「永久保存版」「絶対」「10選」など強い言葉で注目を集める。網羅的な内容で保存価値を高め、最後に保存を直接促している。',
    points: [
      '「永久保存版」「完全版」など強調する',
      '数字を明示して網羅感を出す',
      '実用的で何度も見返したくなる内容に',
      '保存を直接促すCTAを入れる',
    ],
    cautions: [
      '中身が薄いと逆効果',
      '既出情報ばかりだと価値が下がる',
      '長すぎると最後まで読まれない',
    ],
    relatedChapters: [2, 6],
    relatedTemplates: ['value-04', 'thread-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'viral-09',
    category: 'viral',
    title: '問題提起型',
    description: '社会や業界の問題を提起し、議論を巻き起こす',
    effects: ['引用リポスト増加', '議論活性化', '新規リーチ拡大'],
    example: `日本の働き方、おかしくない？

・有給取ると「すみません」と謝る
・定時退社すると白い目で見られる
・育休取ると「戻ってこれるかな」と心配される

海外の友人に話したら「それ、異常だよ」と言われた。

「みんなやってるから」で済ませていいのかな。

変えていきたいよね。`,
    explanation: '多くの人が感じている問題を言語化。海外との比較で「異常さ」を客観視。最後の問いかけで共感と議論を促している。',
    points: [
      '多くの人が感じている問題を選ぶ',
      '具体的な場面を列挙する',
      '客観的な視点を入れる（海外比較など）',
      '問いかけで議論を促す',
    ],
    cautions: [
      '政治的に偏らないよう注意',
      '攻撃的になりすぎない',
      '解決策がない批判は避ける',
    ],
    relatedChapters: [2, 7],
    relatedTemplates: ['opinion-03', 'community-02'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'viral-10',
    category: 'viral',
    title: '予告・ティザー型',
    description: '今後の発表や公開を予告して期待感を高める',
    effects: ['通知オン促進', 'フォロー増加', '期待感醸成'],
    example: `【重大発表】

1年かけて作ってきた
「Xアルゴリズム完全攻略ガイド」

来週、無料公開します。

内容：
・19種類のエンゲージメント完全解説
・スコアリングの仕組み
・具体的な投稿テンプレート50選
・よくある失敗とその対策

見逃したくない人は
通知オンにしておいてね🔔`,
    explanation: '「重大発表」「1年かけた」で注目を集め、具体的な内容をチラ見せして期待感を醸成。「無料」というキーワードと通知オンへの誘導でアクションを促す。',
    points: [
      '「重大発表」など強い言葉で始める',
      '制作にかけた時間や労力を示す',
      '内容の一部を具体的に見せる',
      '通知オンなど次のアクションを促す',
    ],
    cautions: [
      '期待を煽りすぎて内容が追いつかないと逆効果',
      '予告だけで終わらせない',
      '頻繁に使うと効果が薄れる',
    ],
    relatedChapters: [2, 8],
    relatedTemplates: ['cta-01', 'engagement-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
];

export default viralTemplates;
