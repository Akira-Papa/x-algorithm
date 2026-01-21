/**
 * パーソナル・自己開示系テンプレート
 * 自分自身について共有し、フォロワーとの距離を縮める投稿パターン
 */

import { Template } from '../types';

export const personalTemplates: Template[] = [
  {
    id: 'personal-01',
    category: 'personal',
    title: '自己紹介・再紹介',
    description: '自分のことを改めて紹介し、新規フォロワーとの接点を作る',
    effects: [
      '新規フォロワーへの認知',
      'アカウントの方向性の明確化',
      'フォローする理由の提示',
    ],
    example: `改めて自己紹介します。

【基本情報】
・30代会社員
・副業でX運用支援
・妻と子供2人の4人家族

【発信内容】
・X運用のコツ
・副業で稼ぐ方法
・時間管理術

【実績】
・フォロワー1万人
・X運用で月収50万円
・クライアント30社以上

気軽にフォローしてください！`,
    explanation: '基本情報、発信内容、実績を整理して紹介。箇条書きで読みやすく、フォローする理由が明確になっています。',
    points: [
      '基本情報・発信内容・実績の3要素を入れる',
      '箇条書きで読みやすく整理',
      '定期的に（月1回程度）再紹介する',
      '新規フォロワーが増えた時に効果的',
    ],
    cautions: [
      '実績は誇張しない',
      '頻繁すぎると「また自己紹介？」と思われる',
      'プライバシーに関わる情報は慎重に',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['cta-03', 'personal-02', 'community-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'personal-02',
    category: 'personal',
    title: '価値観・信念シェア',
    description: '自分が大切にしている価値観や信念を共有する',
    effects: [
      '共感による深い繋がり',
      '同じ価値観を持つ人の引き寄せ',
      'ブランドイメージの確立',
    ],
    example: `大切にしている3つの信念。

①「継続は才能を超える」
毎日コツコツが最強。
才能がなくても続ければ勝てる。

②「与える人が受け取る」
先に価値を提供する。
見返りは後からついてくる。

③「失敗は学びの機会」
失敗を恐れない。
やらない後悔よりやる後悔。

この3つを軸に発信しています。`,
    explanation: '3つの信念を具体的に示し、それぞれに簡潔な説明を加えています。発信の軸として示すことで一貫性をアピール。',
    points: [
      '3〜5つ程度に絞って伝える',
      '各信念に具体的な説明を加える',
      '自分の行動と一致させる',
      '共感を得やすい普遍的な価値観を',
    ],
    cautions: [
      '押し付けがましくならない',
      '言っていることと行動が矛盾しないよう注意',
      '極端な価値観は避ける',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-01', 'personal-08', 'opinion-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'personal-03',
    category: 'personal',
    title: '趣味・プライベート',
    description: '仕事以外の趣味やプライベートな一面を共有する',
    effects: [
      '親近感の醸成',
      '人間味のアピール',
      '同じ趣味の人との繋がり',
    ],
    example: `休日は完全にオフモード。

今日は趣味のカメラを持って
近所の公園で撮影会。

子供の成長を記録するために
始めたカメラだけど、
今では自分の癒しの時間に。

仕事とプライベートのメリハリ、
大事にしています。

皆さんの趣味は何ですか？`,
    explanation: '趣味を通じて家族への愛情や価値観も伝えています。質問で交流を促し、同じ趣味の人との繋がりも期待できます。',
    points: [
      '専門外の一面を見せる',
      '趣味を始めたきっかけも添える',
      '写真があるとより効果的',
      '質問で同じ趣味の人と繋がる',
    ],
    cautions: [
      '仕事の投稿とのバランスを考える',
      'プライバシーの線引きを意識',
      '贅沢自慢にならないよう注意',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['timing-04', 'personal-07', 'visual-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'personal-04',
    category: 'personal',
    title: '目標・抱負宣言',
    description: '達成したい目標や抱負を公に宣言する',
    effects: [
      '目標達成へのコミットメント',
      '応援してくれる人の獲得',
      '同じ目標を持つ人との繋がり',
    ],
    example: `宣言します。

今年中にフォロワー3万人を達成します。

現在：10,000人
目標：30,000人
期限：12月31日

やること：
・毎日5投稿
・週2回のスペース開催
・コミュニティの活性化

言い訳できないように
ここで宣言しておきます。

応援してくれたら嬉しいです！`,
    explanation: '具体的な数字と期限を示し、達成のための行動計画も公開。公に宣言することで自分へのプレッシャーをかけています。',
    points: [
      '具体的な数字と期限を設定',
      '達成のための行動計画も示す',
      '公に宣言することでコミットメント',
      '応援をお願いして巻き込む',
    ],
    cautions: [
      '達成不可能な目標は設定しない',
      '達成できなかった場合の報告も必要',
      '目標ばかりで行動が伴わないとNG',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['timing-05', 'timing-08', 'personal-10'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'personal-05',
    category: 'personal',
    title: '弱み・悩み開示',
    description: '自分の弱みや悩みを正直に共有する',
    effects: [
      '親近感と信頼感の獲得',
      '同じ悩みを持つ人との共感',
      '完璧じゃない人間味のアピール',
    ],
    example: `正直に言います。

最近、投稿のネタが尽きてきた。

毎日発信してると
「もう全部言った」感覚になる。

同じ悩みの人、いませんか？

今やっている対策：
・他の人の投稿からヒントを得る
・過去の投稿をリメイク
・フォロワーさんに質問

完璧じゃないけど、
試行錯誤しながら続けています。`,
    explanation: '正直に悩みを打ち明けつつ、対策も示すことで前向きな印象に。共感と同時に解決策の共有にもなっています。',
    points: [
      '正直に弱みや悩みを打ち明ける',
      '対策や工夫も一緒に示す',
      '質問で同じ悩みの人と繋がる',
      '弱みを見せた後のフォローも大切',
    ],
    cautions: [
      '愚痴だけで終わらない',
      'ネガティブすぎると敬遠される',
      '解決策や前向きな姿勢も示す',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-06', 'question-05', 'story-04'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'personal-06',
    category: 'personal',
    title: '感情・気持ちシェア',
    description: '今感じている感情や気持ちを素直に共有する',
    effects: [
      'リアルタイムな人間味',
      '感情の共有による共感',
      '応援や励ましの獲得',
    ],
    example: `今日、めちゃくちゃ嬉しいことがあった。

ずっと目標にしていた
月収100万円を達成しました。

正直、信じられない。

3年前は副業で月1万円稼ぐのも
必死だったのに。

諦めずに続けてよかった。

支えてくれた皆さん、
本当にありがとうございます。

涙が出るほど嬉しいです。`,
    explanation: '嬉しい感情を素直に表現し、過去との対比で成長を示しています。感謝の気持ちで締めくくることで好印象に。',
    points: [
      '感情を素直に表現する',
      '感情の理由や背景も説明',
      '過去との対比で変化を見せる',
      '感謝の気持ちを添える',
    ],
    cautions: [
      'ネガティブな感情は慎重に',
      '感情の起伏が激しすぎると不安定に見える',
      '自慢にならないよう注意（嬉しい報告の場合）',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-05', 'story-03', 'community-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'personal-07',
    category: 'personal',
    title: 'ルーティン公開',
    description: '日常のルーティンや習慣を公開する',
    effects: [
      '実践的な参考情報の提供',
      '一貫性と信頼性のアピール',
      '同じルーティンを持つ人との共感',
    ],
    example: `1日のルーティンを公開します。

5:00 起床
5:30 朝活（X投稿3本作成）
7:00 朝食・準備
8:30 本業開始
12:00 ランチ（X確認・いいね周り）
13:00 本業再開
18:00 本業終了
19:00 夕食・家族時間
21:00 副業（ブログ・コンテンツ作成）
23:00 就寝

朝と夜の時間を副業に使っています。

皆さんのルーティンも教えてください！`,
    explanation: '具体的な時間とともにルーティンを公開。副業と本業の両立方法が参考になり、質問で交流も促しています。',
    points: [
      '具体的な時間を示す',
      'なぜそのルーティンなのか理由も添える',
      '無理なく続けられる内容に',
      '質問で他の人のルーティンも聞く',
    ],
    cautions: [
      '現実離れしたルーティンは逆効果',
      '毎日同じルーティンである必要はない',
      'プライベートの時間も入れてバランスを',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['timing-01', 'personal-03', 'value-06'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'personal-08',
    category: 'personal',
    title: '好き・嫌い表明',
    description: '自分の好みや価値観を明確に表明する',
    effects: [
      '同じ価値観の人との繋がり',
      '明確な立場によるブランディング',
      '議論や交流のきっかけ',
    ],
    example: `はっきり言います。

【好きなこと】
・コツコツ地道に続ける人
・素直に学ぶ姿勢がある人
・他人の成功を喜べる人

【苦手なこと】
・楽して稼ぎたいという考え
・他人を批判ばかりする人
・約束を守らない人

こういう価値観で発信しています。

合う人だけフォローしてください。`,
    explanation: '好き・嫌いを明確に示すことで、価値観の合う人を引き寄せています。「合う人だけ」で質の高いフォロワーを選別。',
    points: [
      '好きと嫌いを対比させる',
      '具体的な例を挙げる',
      '批判ではなく価値観として伝える',
      '合わない人を無理に引き留めない',
    ],
    cautions: [
      '特定の個人や団体を批判しない',
      '極端な表現は避ける',
      '嫌いなことへの言及は最小限に',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-02', 'opinion-01', 'opinion-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'personal-09',
    category: 'personal',
    title: '過去の自分への手紙',
    description: '過去の自分に向けてメッセージを書く形式の投稿',
    effects: [
      '成長の軌跡の可視化',
      '同じ状況の人への励まし',
      '感情的な共感の獲得',
    ],
    example: `3年前の自分へ。

副業で月1万円も稼げず
「自分には無理かも」と
諦めかけてるよね。

でも大丈夫。

3年後、月収100万円達成してる。
フォロワー1万人超えてる。
本も出版してる。

今やってることは無駄じゃない。

だから諦めないで。
続けた先に答えがあるから。

3年後の自分より`,
    explanation: '過去の自分に語りかける形式で、当時の苦しみと今の成功を対比。同じ状況の読者への励ましにもなっています。',
    points: [
      '当時の苦しみや悩みをリアルに描写',
      '今の成功や成長を対比させる',
      '同じ状況の人への励ましになるように',
      '具体的な数字や実績を入れる',
    ],
    cautions: [
      '自慢話にならないよう注意',
      '嘘の実績は書かない',
      '上から目線にならない',
    ],
    relatedChapters: [4, 6, 7],
    relatedTemplates: ['story-02', 'story-04', 'personal-10'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'personal-10',
    category: 'personal',
    title: '未来の自分への宣言',
    description: '未来の自分に向けて目標や決意を宣言する',
    effects: [
      '目標達成へのコミットメント',
      '成長への意欲アピール',
      '応援者の獲得',
    ],
    example: `1年後の自分へ。

今日、ここに宣言します。

【1年後の目標】
・フォロワー5万人
・月収300万円
・出版する本がベストセラー

正直、今の自分には
遠く感じる目標。

でも、毎日コツコツ積み重ねれば
必ず届くと信じてる。

1年後、この投稿を見返した時、
「達成したよ」って言えるように
今日から全力で頑張る。

見届けてくれたら嬉しいです。`,
    explanation: '1年後の自分に向けて具体的な目標を宣言。現在との差を認めつつも、達成への意志を示しています。フォロワーを巻き込む締めくくり。',
    points: [
      '具体的な期限と数字を設定',
      '現在との差を正直に認める',
      '達成への意志と行動を示す',
      'フォロワーに見届けてもらう',
    ],
    cautions: [
      '達成不可能な目標は設定しない',
      '1年後に振り返る投稿も忘れずに',
      '目標未達の場合も正直に報告',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-04', 'personal-09', 'timing-08'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
];
