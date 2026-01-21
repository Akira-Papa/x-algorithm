/**
 * Engagement Templates - エンゲージメント獲得系テンプレート
 */

import { Template } from '../types';

export const engagementTemplates: Template[] = [
  {
    id: 'engagement-01',
    category: 'engagement',
    title: '共感を呼ぶ自己体験シェア',
    description: '日常の体験から学びを共有し、フォロワーとの共感を生み出すテンプレート',
    effects: [
      'フォロワーとの心理的距離が縮まる',
      'リプライでの体験共有が増える',
      '親近感によるファン化促進',
    ],
    example: `昨日、カフェで隣の席の人が大声で電話してて集中できなかった。

でも文句を言う代わりに席を移動したら、窓際の最高の席が空いてた。

「環境は選べないけど、自分の行動は選べる」

これ、仕事でも人間関係でも同じだなって思った。

皆さんも最近「行動を変えて良かった」経験ありますか？`,
    explanation: '具体的なシーンから始めて、そこから得た学びを一般化し、最後に問いかけで対話を促している。日常の小さな出来事を通じて、人生の教訓を共有するパターン。',
    points: [
      '具体的な場面描写から始める（「昨日カフェで〜」）',
      '感情や状況を率直に表現する',
      '学びを一言でまとめる（引用風が効果的）',
      '最後に問いかけでリプライを促す',
      '共感しやすい普遍的なテーマを選ぶ',
    ],
    cautions: [
      '自慢話にならないよう謙虚さを保つ',
      '説教臭くならないよう学びは控えめに',
      '架空の話は避け、実体験を元にする',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['engagement-05', 'engagement-07', 'story-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'engagement-02',
    category: 'engagement',
    title: '「あるある」ネタ投稿',
    description: '業界や日常で共感を呼ぶ「あるある」を投稿し、共感リアクションを獲得',
    effects: [
      '「わかる！」という共感いいねが増える',
      '同業者からのフォローが増える',
      'コミュニティ感の醸成',
    ],
    example: `【フリーランスあるある】

・「ちょっと相談なんだけど」から始まる無料依頼
・打ち合わせ後の「じゃあ見積もり出して」で終わる沈黙
・「予算ないんだけど実績になるよ」という謎のメリット提示
・確定申告前の「なんでもっと早くやらなかったんだ」

全部経験ある人、いいねください`,
    explanation: '箇条書きで複数の「あるある」を並べることで、どれか一つには必ず共感できる構成。最後の「いいねください」で明確なCTAを入れている。',
    points: [
      '4〜6個程度の「あるある」を箇条書きで並べる',
      '具体的なセリフや場面を入れる',
      '共感度の高いものから並べる',
      '最後に「いいねください」などCTAを入れる',
      'ネガティブすぎず、笑えるレベルに留める',
    ],
    cautions: [
      '特定の人や企業を攻撃しない',
      'ニッチすぎる業界ネタは共感を得にくい',
      '愚痴っぽくなりすぎないよう注意',
    ],
    relatedChapters: [2, 7],
    relatedTemplates: ['engagement-10', 'community-01', 'opinion-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'low',
    },
  },
  {
    id: 'engagement-03',
    category: 'engagement',
    title: '感謝・お礼投稿',
    description: 'フォロワーや支援者への感謝を伝え、コミュニティの絆を深める',
    effects: [
      'ファンのロイヤリティが向上する',
      '感謝されたフォロワーがより積極的になる',
      '温かいコミュニティの雰囲気が生まれる',
    ],
    example: `フォロワー1万人達成しました。

正直、半年前は500人で「増えないな〜」と悩んでました。

でも「誰かの役に立つ発信をしよう」と決めてから、少しずつ反応が変わり始めた。

いいねしてくれる人
リプで応援してくれる人
シェアしてくれる人

一人ひとりの存在が、本当に大きかった。

ありがとうございます。これからも価値ある発信を続けます。`,
    explanation: 'マイルストーン達成を機に、過去の苦労と変化のきっかけを共有。「一人ひとり」という表現で、フォロワー全員に感謝が伝わるようにしている。',
    points: [
      '具体的な数字や達成事項を明示する',
      '過去の苦労や変化を正直に共有する',
      'フォロワーの具体的な行動に感謝する',
      '今後の抱負で締めくくる',
      '謙虚さを忘れない',
    ],
    cautions: [
      '自慢に聞こえないよう言葉を選ぶ',
      '頻繁すぎる感謝投稿は逆効果',
      '義務的な感じを出さない',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['engagement-04', 'personal-01', 'community-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'engagement-04',
    category: 'engagement',
    title: '達成報告・マイルストーン',
    description: '目標達成の報告を通じて、成功体験と学びを共有する',
    effects: [
      'フォロワーが一緒に喜んでくれる',
      '信頼性・実績のアピールになる',
      '同じ目標を持つ人からの関心を集める',
    ],
    example: `【ご報告】副業月収30万円達成しました

会社員しながら1年かかりましたが、ついに。

やったこと：
・毎朝5時起きで2時間作業
・週末は5時間確保
・SNSで毎日発信
・失敗を記録して改善

正直、最初の3ヶ月は収益0でした。
でも「継続は裏切らない」を信じて続けた。

これから副業始める人へ：
最初の0→1が一番キツい。でも必ず超えられる。

質問あればリプでどうぞ！`,
    explanation: '具体的な成果と、そこに至るまでの行動を明示。苦労した点を正直に共有することで、これから挑戦する人への励ましにもなっている。',
    points: [
      '具体的な数字で成果を示す',
      'どんな行動をしたか箇条書きで共有',
      '苦労した点を正直に伝える',
      'これから挑戦する人へのメッセージを添える',
      '質問を受け付けてリプライを促す',
    ],
    cautions: [
      '数字の誇張は信頼を失う',
      '再現性のない方法は書かない',
      '運や環境要因も正直に認める',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['engagement-03', 'engagement-06', 'value-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'engagement-05',
    category: 'engagement',
    title: '失敗談・学び投稿',
    description: '失敗から得た教訓を共有し、共感と学びを提供する',
    effects: [
      '「人間味」が伝わり親近感が増す',
      '同じ失敗を避けたい人からの保存が増える',
      '「自分も頑張ろう」という励ましになる',
    ],
    example: `3年前、初めてのプレゼンで大失敗した話。

準備に2週間かけたのに、本番で頭が真っ白に。

原因を分析したら：
・スライドを読み上げてただけ
・聴衆を見てなかった
・想定質問を考えてなかった

そこから変えたこと：
・スライドはキーワードだけ
・3人と目を合わせながら話す
・質問10個は事前に用意

今では100人の前でも緊張しなくなった。

失敗は「やり方を変えろ」というサイン。`,
    explanation: '具体的な失敗場面、原因分析、改善行動、現在の状態という流れで構成。最後の一言で学びを凝縮している。',
    points: [
      '具体的な失敗エピソードから始める',
      '原因を分析して箇条書きで示す',
      '改善のために変えた行動を共有',
      '現在どうなったかを示す',
      '学びを一言でまとめる',
    ],
    cautions: [
      '他責にならないよう自分の改善に焦点',
      '深刻すぎる失敗は避ける',
      '改善策なしの愚痴にならない',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['engagement-01', 'story-02', 'value-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'engagement-06',
    category: 'engagement',
    title: 'ビフォーアフター比較',
    description: '成長や変化を可視化し、説得力のある実績をアピール',
    effects: [
      '変化のインパクトが視覚的に伝わる',
      '「自分もこうなりたい」という憧れを生む',
      '説得力のある実績証明になる',
    ],
    example: `【1年間の変化】

Before（2023年1月）
・フォロワー:200人
・月収:0円
・発信頻度:週1回
・1投稿の平均いいね:5

After（2024年1月）
・フォロワー:15,000人
・月収:50万円
・発信頻度:毎日2回
・1投稿の平均いいね:300

変えたのは「量」と「継続」だけ。
特別な才能は必要なかった。`,
    explanation: 'Before/Afterを明確に分け、具体的な数字で変化を示している。最後に「誰でもできる」というメッセージで希望を与えている。',
    points: [
      'Before/Afterを明確に分ける',
      '同じ項目で比較する（数字で）',
      '期間を明示する',
      '変化の要因をシンプルに伝える',
      '再現性があることを示唆する',
    ],
    cautions: [
      '数字の水増しは絶対にNG',
      '運や環境要因も正直に',
      '比較項目は検証可能なものに',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['engagement-04', 'viral-02', 'value-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'engagement-07',
    category: 'engagement',
    title: '日常の気づき投稿',
    description: '何気ない日常から得た発見を共有し、共感を生む',
    effects: [
      '親近感が生まれフォロワーとの距離が縮まる',
      '「この人の視点が好き」というファンが増える',
      '日常的な投稿でも価値を提供できる',
    ],
    example: `コンビニで会計待ちしてたら、前の人がお釣りを募金箱に全部入れてた。

500円以上あった。

その人、見た目は普通のサラリーマン。

「余裕がある人が寄付する」って思ってたけど、違うんだな。

「心に余裕がある人が寄付する」んだ。

今日から小銭は募金しようと決めた。`,
    explanation: '日常の小さな出来事を観察し、そこから得た気づきを言語化。最後に自分の行動変化を宣言することで、読者にも影響を与えている。',
    points: [
      '具体的なシーンを描写する',
      '観察から得た気づきを言語化',
      '以前の自分の考えと対比させる',
      '新しい解釈を一言で表現',
      '自分の行動変化で締める',
    ],
    cautions: [
      '作り話はバレる（実体験を元に）',
      '説教臭くならないよう注意',
      '気づきを押し付けない',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['engagement-01', 'story-01', 'personal-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'engagement-08',
    category: 'engagement',
    title: '応援・励まし投稿',
    description: 'フォロワーへのエールを送り、ポジティブな関係性を構築',
    effects: [
      'フォロワーのモチベーション向上',
      '「この人に付いていきたい」という信頼感',
      'コミュニティ全体の活性化',
    ],
    example: `月曜日、しんどいよね。

でもこれ読んでるってことは、ちゃんと起きて、動き出そうとしてる。

それだけで十分すごい。

完璧じゃなくていい。
100%じゃなくていい。

今日は60%の力で、60%の仕事をして、
帰ったら好きなことしよう。

今週も、ぼちぼちいこう。`,
    explanation: '月曜日という共通の「しんどいタイミング」に寄り添い、ハードルを下げるメッセージで読者を肯定している。',
    points: [
      '共感できるタイミングを選ぶ（月曜朝など）',
      '読者の現状を肯定する',
      'ハードルを下げる言葉を使う',
      '具体的な行動指針を示す',
      '柔らかい言葉で締める',
    ],
    cautions: [
      '上から目線にならない',
      '頻繁すぎると軽く見える',
      '自分もしんどい時に無理して書かない',
    ],
    relatedChapters: [2, 8, 10],
    relatedTemplates: ['engagement-03', 'personal-01', 'community-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'engagement-09',
    category: 'engagement',
    title: '季節・イベント便乗',
    description: '時事ネタや季節イベントを活用してタイムリーな投稿を作る',
    effects: [
      '検索やトレンドからの流入が増える',
      'タイムリーな話題で注目度アップ',
      '普段と違う層にリーチできる',
    ],
    example: `【新年度を迎える人へ】

4月からの環境、不安だよね。

でも「最初の3ヶ月」を乗り越えれば、だいたいなんとかなる。

新入社員の時に先輩から言われた言葉：

「最初は全員ポンコツ。
でも3ヶ月後には"普通の人"になれる。
1年後には"頼れる人"になれる」

焦らなくていい。
今は「ポンコツでいい期間」だから。

新生活、応援してます。`,
    explanation: '4月という新生活シーズンに合わせた投稿。不安に寄り添いながら、具体的な時間軸と先輩の言葉で安心感を与えている。',
    points: [
      '季節やイベントに合わせたテーマ選び',
      '対象者を明確にする（〜する人へ）',
      '共感から入り、安心材料を提供',
      '具体的な数字や期間を示す',
      '応援メッセージで締める',
    ],
    cautions: [
      '時期を外すと効果半減',
      '無理やりな便乗は避ける',
      '他の人と被りやすいので独自の視点を',
    ],
    relatedChapters: [2, 8],
    relatedTemplates: ['engagement-08', 'timing-01', 'news-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'engagement-10',
    category: 'engagement',
    title: 'ユーモア・軽いジョーク',
    description: '親しみやすいユーモアで、フォロワーとの距離を縮める',
    effects: [
      '親近感が生まれファンが増える',
      '「この人面白い」というブランディング',
      '拡散されやすくなる',
    ],
    example: `【プログラマーの1日】

09:00 出社、コーヒー淹れる
09:15 メール確認
09:30 「ちょっとだけ」コード修正
12:00 まだ修正中
13:00 昼食（キーボードの上で）
14:00 「なぜ動かない...」
15:00 「あ、セミコロン...」
15:01 なおった
15:02 別のバグ発生
18:00 「明日の自分に任せる」
18:01 退社

明日の自分「なんでこんなコード書いた？」`,
    explanation: 'プログラマーの日常をユーモラスに描写。「あるある」と「自虐」を組み合わせ、最後のオチで笑いを取っている。',
    points: [
      '自虐ネタは共感を得やすい',
      '時系列形式で読みやすく',
      '最後に「オチ」を用意する',
      '特定の職業/属性に刺さる内容に',
      '誰も傷つけない笑いを心がける',
    ],
    cautions: [
      '他者を馬鹿にするネタは避ける',
      'センシティブな話題は使わない',
      'ウケ狙いすぎると寒くなる',
    ],
    relatedChapters: [2, 7],
    relatedTemplates: ['engagement-02', 'viral-05', 'community-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'low',
    },
  },
];

export default engagementTemplates;
