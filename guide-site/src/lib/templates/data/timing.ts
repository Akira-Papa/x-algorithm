/**
 * タイミング・トレンド系テンプレート
 * 時間帯や季節、トレンドに合わせた投稿パターン
 */

import { Template } from '../types';

export const timingTemplates: Template[] = [
  {
    id: 'timing-01',
    category: 'timing',
    title: '朝活・モーニング投稿',
    description: '朝の時間帯に合わせた活動報告や意気込みの投稿',
    effects: [
      '朝アクティブなユーザーへのリーチ',
      '意識高い層との接点',
      '1日の始まりをポジティブに',
    ],
    example: `おはようございます。

今日も5時起きで朝活中。

朝の1時間で：
・X投稿の下書き3本
・ブログ記事の構成作成
・昨日のデータ分析

朝は頭がクリアで
生産性が2倍になる気がする。

皆さんの朝のルーティンは？`,
    explanation: '早起きの実践と具体的な成果を示しながら、最後に質問で交流を促しています。朝活層への共感と具体性がポイント。',
    points: [
      '具体的な時間を示す（5時起きなど）',
      '朝に何をしたか具体的に書く',
      '朝活のメリットを伝える',
      '質問で他のユーザーと交流を促す',
    ],
    cautions: [
      '投稿時間が実際の朝でないと違和感',
      '毎日同じ内容だと飽きられる',
      '自慢っぽくなりすぎない',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-05', 'personal-07', 'question-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'timing-02',
    category: 'timing',
    title: 'ランチタイム投稿',
    description: '昼休みの時間帯に合わせた軽めの投稿',
    effects: [
      '昼休み中のユーザーへのリーチ',
      'リラックスした雰囲気での交流',
      '日中のエンゲージメント獲得',
    ],
    example: `ランチタイム。

今日は近くのラーメン屋へ。

並んでる間にX見てたら
自分の投稿が1万インプ超えてて
テンション上がった。

昼休みのこの時間、
皆さんは何してますか？

午後も頑張りましょう！`,
    explanation: 'ランチの日常と仕事の成果を軽く織り交ぜ、気軽に読める内容に。質問と激励で締めくくり、交流を促しています。',
    points: [
      '堅すぎない、リラックスした内容',
      '日常の一コマを切り取る',
      '午後への活力になるポジティブさ',
      '短めでサクッと読める長さ',
    ],
    cautions: [
      '投稿時間は12時〜13時頃が効果的',
      '重たい内容は避ける',
      '愚痴っぽくならない',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-01', 'timing-03', 'personal-06'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'timing-03',
    category: 'timing',
    title: '夜のリラックス投稿',
    description: '夜の時間帯に合わせた振り返りやリラックス投稿',
    effects: [
      '夜アクティブなユーザーへのリーチ',
      '1日の振り返りによる共感',
      'リラックスした雰囲気での交流',
    ],
    example: `お疲れ様です。

今日も1日が終わりますね。

今日やったこと：
✅ 投稿5本作成
✅ ブログ1記事公開
✅ DM返信10件
✅ コミュニティ対応

充実した1日でした。

明日は朝イチで
新しい企画の打ち合わせ。

皆さんも今日1日お疲れ様でした！
ゆっくり休んでくださいね。`,
    explanation: '1日の成果を振り返りながら、労いの言葉で締めくくっています。チェックマークで達成感を視覚的に表現。',
    points: [
      '1日の成果を具体的に振り返る',
      'フォロワーへの労いの言葉を入れる',
      '翌日への期待感も示す',
      '温かみのある締めくくり',
    ],
    cautions: [
      '投稿時間は20時〜23時頃が効果的',
      '愚痴や不満は避ける',
      '自慢しすぎない',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-01', 'timing-06', 'personal-06'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'timing-04',
    category: 'timing',
    title: '週末投稿',
    description: '週末の過ごし方や特別な活動を共有する投稿',
    effects: [
      '週末アクティブなユーザーへのリーチ',
      'プライベート面での親近感',
      'リラックスした交流',
    ],
    example: `週末の過ごし方。

土曜日は完全オフにしてる。

・家族と過ごす時間
・趣味の読書
・ジムでリフレッシュ

日曜日に来週の準備をして
月曜からまた全力で頑張る。

このメリハリが
長く続けるコツかも。

皆さんの週末の過ごし方は？`,
    explanation: 'オンオフの切り替えを大切にしていることを示しながら、長く続けるコツとして一般化しています。質問で交流も促進。',
    points: [
      '週末の過ごし方を具体的に',
      'オンオフの切り替えの大切さを伝える',
      'プライベートな面を見せて親近感',
      '質問で他のユーザーの週末にも興味を示す',
    ],
    cautions: [
      '平日と週末で投稿トーンを変える',
      '仕事の話ばかりにならない',
      '贅沢自慢にならないよう注意',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-02', 'personal-03', 'personal-07'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'timing-05',
    category: 'timing',
    title: '月曜モチベーション',
    description: '週の始まりにモチベーションを高める投稿',
    effects: [
      '週始めのモチベーション提供',
      'ポジティブな印象の形成',
      '同じ気持ちの人との共感',
    ],
    example: `月曜日。

また新しい1週間が始まる。

今週の目標：
・フォロワー+500人
・投稿30本
・ブログ3記事

目標を明確にすると
やるべきことが見えてくる。

今週も頑張っていきましょう！

皆さんの今週の目標は？`,
    explanation: '週の始まりに具体的な目標を示し、行動の明確化というノウハウも提供。質問で他のユーザーの目標も引き出しています。',
    points: [
      '具体的な数値目標を示す',
      '目標設定の重要性を伝える',
      'ポジティブなエネルギーを発信',
      '質問で他のユーザーの目標も聞く',
    ],
    cautions: [
      '月曜の朝〜午前中に投稿すると効果的',
      '達成不可能な目標は設定しない',
      '毎週同じ内容にならないよう工夫',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-01', 'timing-06', 'personal-04'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'timing-06',
    category: 'timing',
    title: '金曜振り返り',
    description: '週の終わりに1週間を振り返る投稿',
    effects: [
      '達成感の共有',
      '週末に向けたリラックスムード',
      '定期コンテンツとしての定着',
    ],
    example: `金曜日。今週もお疲れ様でした。

【今週の振り返り】

✅ フォロワー+800人（目標達成！）
✅ 投稿35本（目標30本クリア）
△ ブログ2記事（目標3本で未達）

達成率：80%

ブログが足りなかったのは
投稿作成に時間をかけすぎたから。

来週は時間配分を見直します。

皆さんの今週はどうでしたか？`,
    explanation: '週初めの目標に対する結果を示し、反省点と改善策も共有。透明性のある振り返りで信頼感を高めています。',
    points: [
      '週初めの目標と結果を対比',
      '達成・未達を正直に報告',
      '反省点と改善策も示す',
      '質問で他のユーザーの振り返りも促す',
    ],
    cautions: [
      '金曜の夕方〜夜に投稿すると効果的',
      '目標未達でも前向きに',
      '毎週の定期コンテンツにすると効果的',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-05', 'timing-03', 'personal-04'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'timing-07',
    category: 'timing',
    title: '月初・月末投稿',
    description: '月の節目に合わせた目標設定や振り返りの投稿',
    effects: [
      '月単位での成長の可視化',
      '目標設定の習慣化アピール',
      '区切りのタイミングでの注目獲得',
    ],
    example: `【月末報告】2024年1月の成果

フォロワー：5,000人→8,000人（+3,000人）
インプレッション：300万（月間）
収益：15万円（過去最高）

特に効果があったこと：
・毎日の投稿継続
・スレッド投稿の強化
・コミュニティとの交流

2月の目標：
・フォロワー1万人達成
・月間収益20万円

引き続き頑張ります！`,
    explanation: '月間の成果を数字で示し、何が効果的だったかも分析。次月の目標も示すことで成長への意欲をアピールしています。',
    points: [
      '月間の成果を具体的な数字で示す',
      '効果があったことを分析・共有',
      '次月の目標も設定する',
      '月末または月初に投稿',
    ],
    cautions: [
      '数字の水増しは絶対NG',
      '成果が出ていない月も正直に',
      '毎月の定期コンテンツとして定着させる',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-06', 'community-03', 'story-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'timing-08',
    category: 'timing',
    title: '季節イベント',
    description: '季節の変わり目やイベントに合わせた投稿',
    effects: [
      '季節感のある親しみやすさ',
      'トレンドとの連動',
      '共通の話題での共感',
    ],
    example: `新年あけましておめでとうございます。

2024年の抱負：
・フォロワー3万人達成
・書籍出版
・オンラインスクール開設

去年は「発信する」年でした。
今年は「形にする」年にします。

皆さんの今年の目標は何ですか？

今年もよろしくお願いします！`,
    explanation: '新年の挨拶と具体的な抱負を組み合わせ、去年と今年のテーマを対比させています。質問で交流も促進。',
    points: [
      '季節の挨拶を入れる',
      '季節に合わせた目標や抱負を示す',
      '去年との対比で成長を見せる',
      '質問で交流を促す',
    ],
    cautions: [
      'タイミングを逃さない（元日、GW、お盆など）',
      '季節感のない投稿にならないよう注意',
      '毎年使い回せるテンプレートにしない',
    ],
    relatedChapters: [5, 6, 9],
    relatedTemplates: ['timing-07', 'timing-10', 'personal-04'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'timing-09',
    category: 'timing',
    title: 'トレンドハッシュタグ活用',
    description: 'トレンドのハッシュタグを活用した投稿',
    effects: [
      'トレンドからの流入獲得',
      '新規ユーザーへのリーチ',
      'タイムリーな印象',
    ],
    example: `#新社会人へ

X運用を今から始めておくと
3年後に大きな差がつきます。

理由：
・副業の選択肢が広がる
・情報発信力が身につく
・人脈が広がる

私も新卒3年目で始めて
今では本業の収入を超えました。

新社会人の方、
今日からぜひ始めてみてください。`,
    explanation: 'トレンドハッシュタグを使いながら、自分の専門性と絡めた価値提供をしています。実体験で説得力を高めています。',
    points: [
      'トレンドのハッシュタグをチェック',
      '自分の専門性と絡めた内容にする',
      '無理やり感がないよう自然に',
      'タイムリーに投稿する',
    ],
    cautions: [
      '関係ないハッシュタグは使わない',
      'センシティブなトレンドは避ける',
      '乗り遅れると効果が薄い',
    ],
    relatedChapters: [5, 6, 9],
    relatedTemplates: ['timing-08', 'news-03', 'value-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'timing-10',
    category: 'timing',
    title: '記念日・周年投稿',
    description: '個人的な記念日や活動の周年を祝う投稿',
    effects: [
      'マイルストーンの可視化',
      '継続の信頼性アピール',
      'お祝いムードでのエンゲージメント',
    ],
    example: `【祝】X運用1周年！

1年前の今日、このアカウントを始めました。

この1年で：
・フォロワー0人→10,000人
・総インプレッション1,000万回
・投稿数1,000本以上

最初は誰にも見られなかった投稿が
今では多くの方に届くように。

支えてくださった皆さん、
本当にありがとうございます！

2年目も頑張ります！`,
    explanation: '1年間の成果を数字で示しながら、感謝の気持ちを伝えています。ビフォーアフターで成長を強調しています。',
    points: [
      '具体的な記念日（開始日など）を設定',
      '成果を数字で振り返る',
      'フォロワーへの感謝を伝える',
      '今後の意気込みも示す',
    ],
    cautions: [
      '記念日を覚えておく（カレンダー登録）',
      '成果を誇張しない',
      '頻繁に記念日を作らない',
    ],
    relatedChapters: [5, 6, 8],
    relatedTemplates: ['timing-07', 'community-03', 'story-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
];
