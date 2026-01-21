/**
 * コミュニティ・交流系テンプレート
 * 他ユーザーとの関係構築やコミュニティ形成を促す投稿パターン
 */

import { Template } from '../types';

export const communityTemplates: Template[] = [
  {
    id: 'community-01',
    category: 'community',
    title: 'メンション・紹介',
    description: '他のユーザーを投稿内でメンションして紹介し、関係性を構築する',
    effects: [
      '紹介相手との関係強化',
      '相手のフォロワーへの露出',
      '相互紹介の機会創出',
    ],
    example: `X運用を学ぶなら
この3人は絶対フォローすべき。

@〇〇さん
→ アルゴリズムの解説が神

@△△さん
→ 投稿の作り方が参考になる

@□□さん
→ マネタイズの知識が豊富

この3人の投稿を見れば
X運用の基礎は完璧です。`,
    explanation: '複数の人を具体的な理由とともに紹介することで、見ている人にも紹介相手にも価値を提供しています。紹介理由が明確なので説得力があります。',
    points: [
      '紹介する理由を具体的に書く',
      '本当に価値があると思う人を紹介する',
      '事前に紹介することを伝えておくとベター',
      '紹介された人がRPしやすい内容にする',
    ],
    cautions: [
      '無許可で紹介しすぎると迷惑になることも',
      '紹介する人数は3〜5人が適切',
      '自分より格上の人を紹介する姿勢が大切',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['community-05', 'community-08', 'engagement-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'community-02',
    category: 'community',
    title: 'コラボ報告',
    description: '他のユーザーとの共同作業や成果を報告する',
    effects: [
      'コラボ相手のフォロワーへの露出',
      '実績のアピール',
      '新しいコラボの機会創出',
    ],
    example: `【コラボ報告】

@〇〇さんと一緒に
X運用の電子書籍を作りました！

・アルゴリズム解説（〇〇さん担当）
・投稿テンプレート（私担当）
・フォロワー獲得戦略（共同執筆）

3ヶ月かけて作った自信作です。

〇〇さん、ありがとうございました！

書籍の詳細は固定ポストから`,
    explanation: 'コラボ相手をメンションし、お互いの役割分担と成果物を紹介しています。感謝の気持ちを添えることで関係性の良さも伝わります。',
    points: [
      'コラボ相手を必ずメンションする',
      '役割分担を明確にして貢献をアピール',
      '感謝の気持ちを添える',
      '成果物へのアクセス方法を示す',
    ],
    cautions: [
      '相手の許可なく詳細を公開しない',
      '自分の貢献ばかり強調しない',
      'トラブルがあった場合は公開しない',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['community-01', 'cta-09', 'story-05'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'community-03',
    category: 'community',
    title: 'ファン・フォロワー感謝',
    description: 'フォロワーや支持者への感謝を伝え、関係を深める',
    effects: [
      'フォロワーとの絆の深化',
      'コミュニティ意識の醸成',
      'ロイヤルファンの育成',
    ],
    example: `フォロワー1万人達成しました。

本当にありがとうございます。

1年前は100人だったのに...

いつも見てくれる方
いいねしてくれる方
リプをくれる方
RTしてくれる方

全員に感謝しています。

これからも毎日
価値ある情報を発信します。

引き続きよろしくお願いします！`,
    explanation: 'マイルストーン達成を報告しながら、具体的なアクションへの感謝を述べています。今後の決意も示すことで継続フォローの理由も提供。',
    points: [
      '具体的な数字や節目を使う',
      'いいね、リプ、RTなど具体的なアクションに感謝',
      'ビフォーアフターを示すと成長が伝わる',
      '今後の約束で継続フォローの理由を作る',
    ],
    cautions: [
      '頻繁すぎると「またか」と思われる',
      '達成した数字を誇張しない',
      '感謝の気持ちは本心で',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['personal-01', 'story-03', 'timing-07'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'community-04',
    category: 'community',
    title: 'コミュニティ告知',
    description: 'オンラインコミュニティやグループの存在を告知する',
    effects: [
      'コミュニティメンバーの獲得',
      '濃いファンの形成',
      '継続的な関係構築の場',
    ],
    example: `【コミュニティメンバー募集】

X運用を本気で学びたい人向けの
無料コミュニティを作りました。

参加特典：
・毎週のライブ配信
・投稿添削サービス
・メンバー限定の情報共有
・質問し放題の環境

現在150名が参加中。

興味ある方はプロフィールのリンクから
参加申請してください！`,
    explanation: 'コミュニティの対象者と参加特典を明確にし、現在の参加人数で社会的証明を示しています。参加方法も具体的に記載。',
    points: [
      '対象者を明確にする（誰向けか）',
      '参加するメリットを具体的に示す',
      '既存の参加人数で信頼性を高める',
      '参加方法を簡単にする',
    ],
    cautions: [
      '無料コミュニティは管理が大変になる',
      '約束した特典は必ず提供する',
      'メンバー数が少ないうちは公開しない',
    ],
    relatedChapters: [4, 6],
    relatedTemplates: ['cta-06', 'cta-08', 'community-09'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'high',
    },
  },
  {
    id: 'community-05',
    category: 'community',
    title: '相互紹介',
    description: '信頼できる相手とお互いを紹介し合う企画',
    effects: [
      '相互のフォロワーへの露出',
      '信頼できる関係のアピール',
      'Win-Winの関係構築',
    ],
    example: `【相互紹介企画】

本日は @〇〇さん と相互紹介！

〇〇さんの魅力：
・X運用歴3年のベテラン
・投稿の言語化力が神レベル
・毎日の発信が本当に参考になる

私のことを紹介してくれている
〇〇さんの投稿もぜひ見てください↓
[引用RT]

お互いをフォローすると
X運用の学びが2倍になります！`,
    explanation: '相手の魅力を具体的に紹介しながら、相手の投稿への誘導もしています。「お互いをフォロー」でWin-Winを演出。',
    points: [
      '事前に相手と企画を調整する',
      '同時に投稿することで効果最大化',
      '相手の投稿を引用RTで紹介',
      'お互いの強みが補完関係だと理想的',
    ],
    cautions: [
      'フォロワー数に大きな差があると成立しにくい',
      '同業者同士の紹介は競合に注意',
      '形だけの紹介にならないよう本心で',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['community-01', 'community-02', 'engagement-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'community-06',
    category: 'community',
    title: 'グループ活動報告',
    description: 'チームやグループでの活動内容を報告する',
    effects: [
      'チーム活動の可視化',
      'メンバー同士の結束強化',
      '新メンバー獲得の機会',
    ],
    example: `【月例報告】X運用研究会

今月の活動内容：
・アルゴリズム研究会（参加者25名）
・投稿添削会（40件の添削実施）
・成功事例共有会（10名が事例発表）

メンバーの成果：
・平均インプレッション+30%
・フォロワー増加率+25%

来月も頑張ります！

#X運用研究会`,
    explanation: '具体的な活動内容と成果を数字で示しています。ハッシュタグでコミュニティの存在感も高めています。',
    points: [
      '活動内容を具体的な数字で示す',
      'メンバーの成果をアピールする',
      '定期的な報告で活動の継続性を見せる',
      'ハッシュタグでコミュニティを可視化',
    ],
    cautions: [
      '成果の水増しは信頼を失う',
      'メンバーのプライバシーに配慮',
      '内輪ノリになりすぎない',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['community-04', 'community-08', 'story-05'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'community-07',
    category: 'community',
    title: 'オフ会・イベント報告',
    description: 'リアルイベントやオフ会の様子を報告する',
    effects: [
      'コミュニティの実在感アピール',
      '次回イベントへの期待感醸成',
      'オンライン関係のリアル化',
    ],
    example: `【オフ会報告】

東京でX運用オフ会を開催しました！

参加者15名。
3時間があっという間でした。

・自己紹介タイム
・運用ノウハウ共有
・投稿の相互添削
・フリートーク

参加してくれた皆さん
ありがとうございました！

次回は大阪で開催予定。
興味ある方はDMください！

[写真]`,
    explanation: '参加人数、開催時間、内容を具体的に報告。感謝を伝えながら次回予告で継続性も示しています。写真があるとリアリティが増します。',
    points: [
      '具体的な数字で規模感を伝える',
      '何をしたか簡潔にまとめる',
      '参加者への感謝を忘れない',
      '次回の予告で継続性をアピール',
      '写真（顔出しOKな範囲で）で臨場感',
    ],
    cautions: [
      '参加者の許可なく写真を公開しない',
      '場所の特定につながる情報に注意',
      '参加できなかった人への配慮も',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['cta-08', 'community-04', 'visual-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'community-08',
    category: 'community',
    title: 'チーム・仲間紹介',
    description: 'チームメンバーや仲間を紹介してコミュニティの魅力を伝える',
    effects: [
      'チームの信頼性向上',
      'メンバーのモチベーション向上',
      '組織としてのブランディング',
    ],
    example: `【チーム紹介】

一緒にX運用を研究している
仲間を紹介します！

@Aさん
→ データ分析担当。数字に強い

@Bさん
→ コンテンツ担当。言語化の天才

@Cさん
→ コミュニティ担当。人望がすごい

この3人がいるから
毎日頑張れています。

チームで活動すると
成長スピードが違います。`,
    explanation: '各メンバーの役割と強みを具体的に紹介し、チームで活動するメリットも伝えています。メンションで相手のモチベーションも上がります。',
    points: [
      '各メンバーの役割や強みを明確に',
      'メンションして本人に通知する',
      'チームの雰囲気の良さを伝える',
      'チーム活動のメリットを示す',
    ],
    cautions: [
      '紹介される側の許可を事前に取る',
      '特定の人だけ贔屓しない',
      '役割は本人と合意した内容で',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['community-01', 'community-06', 'personal-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'community-09',
    category: 'community',
    title: 'サポーター募集',
    description: '活動を支援してくれるサポーターを募集する',
    effects: [
      '支援者の獲得',
      '活動資金の確保',
      'コアファンとの関係深化',
    ],
    example: `【サポーター募集】

毎日のX運用情報発信を
もっと充実させたいと考えています。

サポーターになっていただくと：
・限定ニュースレター配信
・月1回のZoom交流会参加権
・投稿の先行公開
・質問優先回答

月額500円から支援可能です。

ご興味ある方は
プロフィールのリンクから
詳細をご確認ください。`,
    explanation: 'サポーターになるメリットを具体的に示し、低い金額から始められることで参加のハードルを下げています。',
    points: [
      'サポートに対する見返りを明確にする',
      '小額から参加できるようにする',
      '何のためにサポートが必要か説明する',
      '感謝の気持ちを常に示す',
    ],
    cautions: [
      '約束した特典は必ず提供する',
      '集めたお金の使途は透明に',
      'サポーター以外の人も大切にする',
    ],
    relatedChapters: [4, 6],
    relatedTemplates: ['cta-06', 'community-04', 'community-10'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'community-10',
    category: 'community',
    title: 'アンバサダー活動',
    description: '特定のサービスやブランドの代表として活動を報告する',
    effects: [
      'ブランドとの関係強化',
      '専門性のアピール',
      'コラボ機会の創出',
    ],
    example: `【アンバサダー活動報告】

〇〇サービスの公式アンバサダーに
就任してから3ヶ月が経ちました。

この3ヶ月で：
・活用術の投稿30件
・ユーザーさんからの質問対応50件
・利用者インタビュー5件

〇〇を使ったX運用のコツ、
これからも発信していきます。

使い方でお困りの方は
気軽に質問してください！`,
    explanation: '活動実績を数字で示しながら、アンバサダーとしての役割を果たしていることをアピール。質問を受け付けることで交流も促進。',
    points: [
      '活動実績を具体的な数字で示す',
      'ユーザーのメリットになる情報を発信',
      '質問や相談を受け付ける姿勢',
      'サービスの宣伝だけにならないよう注意',
    ],
    cautions: [
      'PRであることを適切に表示',
      '過度な宣伝は嫌われる',
      '本当に良いと思うサービスのみ',
    ],
    relatedChapters: [4, 6],
    relatedTemplates: ['community-02', 'cta-07', 'value-08'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
];
