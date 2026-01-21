/**
 * スレッド・長文カテゴリのテンプレート
 */

import { Template } from '../types';

export const threadTemplates: Template[] = [
  {
    id: 'thread-01',
    category: 'thread',
    title: '教育コンテンツスレッド',
    description: '特定のテーマを段階的に解説する教育型スレッド',
    effects: ['滞在時間向上', 'ブックマーク増加', 'フォロー増加'],
    example: `Xのアルゴリズムを完全理解するスレッド🧵

「なぜあの人の投稿は伸びて、自分のは伸びないのか」

この疑問に、オープンソースのコードから答えます。

保存必須の内容です。`,
    explanation: 'スレッドの冒頭で「何が学べるか」を明確にし、「保存必須」で価値を示唆。🧵マークでスレッドであることを明示。',
    points: [
      '冒頭で「何が学べるか」を明示する',
      '🧵マークでスレッドを示す',
      '「保存必須」でブックマークを促す',
      '各ツイートが単体でも価値があるように',
      '最後に全体のまとめとCTAを入れる',
    ],
    cautions: [
      '長すぎると離脱される（5-10ツイートが目安）',
      '途中で飽きさせない工夫を',
      'スレッドの繋がりを明確に（1/10など）',
    ],
    relatedChapters: [2, 9, 10],
    relatedTemplates: ['value-01', 'thread-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-02',
    category: 'thread',
    title: 'ステップバイステップガイド',
    description: '手順を順番に解説する実践的なスレッド',
    effects: ['実用価値提供', 'ブックマーク増加', '信頼性向上'],
    example: `【保存版】X運用を始めて1ヶ月で1000フォロワー獲得した方法🧵

1ヶ月で0→1000人になった全手順を公開します。

再現性100%の方法なので、これから始める人は必見です。`,
    explanation: '具体的な数字（1000フォロワー）で期待感を持たせ、「再現性100%」で実用性を強調。「これから始める人」とターゲットを明確化。',
    points: [
      '具体的な成果を数字で示す',
      '「再現性がある」ことを強調',
      'ターゲットを明確にする',
      '各ステップを番号付きで解説',
      '最後に行動を促す',
    ],
    cautions: [
      '過度な数字の誇張は信頼を失う',
      '手順が多すぎると挫折される',
      '実際に自分が試した方法を書く',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['value-02', 'thread-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-03',
    category: 'thread',
    title: 'ケーススタディスレッド',
    description: '具体的な事例を分析して学びを提供するスレッド',
    effects: ['説得力向上', '学習効果', 'ブックマーク増加'],
    example: `フォロワー10万人のアカウントを分析してわかった「伸びる投稿」の共通点🧵

100アカウントを徹底分析。

伸びてるアカウントには、明確なパターンがあった。`,
    explanation: '具体的な分析（100アカウント）で信頼性を担保。「パターンがあった」で続きを読みたくなる構成。',
    points: [
      '分析対象と規模を明示する',
      '「パターン」「共通点」で興味を引く',
      '各事例を具体的に解説',
      '学びを一般化して応用可能に',
    ],
    cautions: [
      '分析の根拠を示せるようにする',
      '特定のアカウントを批判しない',
      '客観的なデータに基づく',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['value-03', 'engagement-06'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-04',
    category: 'thread',
    title: 'Q&A形式スレッド',
    description: 'よくある質問に答える形式のスレッド',
    effects: ['疑問解消', 'ブックマーク増加', '信頼性向上'],
    example: `X運用でよく聞かれる質問にまとめて答えます🧵

Q1. 投稿は毎日すべき？
Q2. 最適な投稿時間は？
Q3. ハッシュタグは使うべき？
Q4. リプ周りは効果ある？
Q5. 外部リンクは貼っていい？`,
    explanation: '冒頭で質問一覧を見せ、読者が知りたい内容があれば続きを読む構成。FAQ形式で読みやすい。',
    points: [
      '冒頭に質問一覧を載せる',
      'よく聞かれる質問を選ぶ',
      '各回答を1ツイートで完結させる',
      '根拠を添えて回答する',
    ],
    cautions: [
      '質問が多すぎると長くなる',
      '曖昧な回答は避ける',
      '「場合による」だけで終わらせない',
    ],
    relatedChapters: [2, 8, 10],
    relatedTemplates: ['question-02', 'value-04'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-05',
    category: 'thread',
    title: 'タイムライン形式スレッド',
    description: '時系列で物事の変遷を解説するスレッド',
    effects: ['理解促進', '滞在時間向上', 'ブックマーク増加'],
    example: `Xのアルゴリズムはどう進化してきたのか🧵

2006年 → Twitter誕生、時系列TL
2016年 → アルゴリズムTL導入
2023年 → コード公開
2024年 → Grok統合

各年で何が変わったのか、解説します`,
    explanation: '時系列で整理することで歴史や変遷が分かりやすくなる。「現在」まで含めることで実用性も担保。',
    points: [
      '年代や日付を明確に示す',
      '各時点での変化を簡潔に',
      '「今」との繋がりを示す',
      '最後に「これからどうなるか」を添える',
    ],
    cautions: [
      '正確な情報を調べる',
      '細かすぎる年表は読まれない',
      '重要なポイントに絞る',
    ],
    relatedChapters: [1, 2, 4],
    relatedTemplates: ['news-02', 'value-05'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-06',
    category: 'thread',
    title: '比較分析スレッド',
    description: '複数の選択肢を比較して最適解を示すスレッド',
    effects: ['意思決定支援', 'ブックマーク増加', '信頼性向上'],
    example: `X vs Instagram vs TikTok

どのSNSを頑張るべきか、徹底比較🧵

・ユーザー層
・拡散力
・収益化
・労力対効果

それぞれ解説していきます`,
    explanation: '比較軸を明示して読者の選択を支援。「どれを頑張るべきか」という実用的な問いに答える構成。',
    points: [
      '比較対象を明確にする',
      '比較軸を先に提示する',
      '各項目を公平に評価',
      '最後に「こんな人には〇〇」と結論を',
    ],
    cautions: [
      '特定のサービスを過度に推さない',
      '根拠のある比較を心がける',
      '最新情報に基づく',
    ],
    relatedChapters: [2, 7, 10],
    relatedTemplates: ['value-06', 'viral-06'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-07',
    category: 'thread',
    title: 'チェックリストスレッド',
    description: '確認項目をリスト化して実践を促すスレッド',
    effects: ['実用価値提供', 'ブックマーク増加', '行動促進'],
    example: `【保存推奨】投稿前に確認すべきチェックリスト🧵

毎回これを確認するだけでエンゲージメントが変わる。

10項目のチェックリストを公開します`,
    explanation: 'チェックリスト形式で実践しやすくする。「毎回確認」で繰り返し使える価値を示唆。',
    points: [
      '実際に使えるチェック項目を',
      '項目は10個以内に絞る',
      '各項目に理由を添える',
      '印刷やメモしやすいフォーマットで',
    ],
    cautions: [
      '項目が多すぎると使われない',
      '当たり前すぎる項目は避ける',
      '実践的な内容に絞る',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['value-07', 'viral-08'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'low',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-08',
    category: 'thread',
    title: '失敗から学ぶスレッド',
    description: '失敗事例を分析して教訓を共有するスレッド',
    effects: ['親近感向上', '学習効果', '信頼性向上'],
    example: `X運用で犯した7つの失敗とその教訓🧵

正直に言うと、最初の半年は失敗だらけでした。

同じ失敗をしないように、全部公開します`,
    explanation: '失敗を正直に共有することで親近感と信頼を獲得。「同じ失敗をしないように」で読者にとっての価値を示す。',
    points: [
      '具体的な失敗を正直に書く',
      '各失敗からの学びを明示',
      '今どう改善したかを示す',
      '読者が避けられるようアドバイス',
    ],
    cautions: [
      '他責にしない',
      'ネガティブすぎないバランスを',
      '学びに繋げることを忘れない',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['engagement-05', 'story-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-09',
    category: 'thread',
    title: '用語解説スレッド',
    description: '専門用語を分かりやすく解説するスレッド',
    effects: ['教育価値提供', 'ブックマーク増加', '権威性向上'],
    example: `Xのアルゴリズム用語を完全解説🧵

「エンゲージメント」「インプレッション」「リーチ」...

よく使うけど、正確に理解してますか？

全部解説します`,
    explanation: 'よく使われるが正確に理解されていない用語を解説。「正確に理解してますか？」で読者の興味を引く。',
    points: [
      'よく使われる用語を選ぶ',
      '専門用語を噛み砕いて説明',
      '具体例を添えて分かりやすく',
      '実践での使い方も示す',
    ],
    cautions: [
      '上から目線にならない',
      '正確な定義を調べる',
      '難しすぎる説明は避ける',
    ],
    relatedChapters: [1, 2, 5],
    relatedTemplates: ['value-08', 'question-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'thread-10',
    category: 'thread',
    title: 'マインドセットスレッド',
    description: '考え方や心構えを共有するスレッド',
    effects: ['価値観共有', 'ファン化促進', '共感獲得'],
    example: `X運用を3年続けて変わった考え方🧵

最初は「フォロワー数」ばかり気にしてた。

今は全く違う指標を見てる。

考え方の変化を共有します`,
    explanation: '経験に基づく考え方の変化を共有。「今は違う」で読者の興味を引き、共感と学びを提供。',
    points: [
      '過去と現在の考え方を対比',
      '変化のきっかけを示す',
      '新しい考え方のメリットを説明',
      '読者も変われることを示唆',
    ],
    cautions: [
      '説教臭くならないよう注意',
      '押し付けにならないよう「自分の場合」と',
      '具体的な変化を示す',
    ],
    relatedChapters: [10, 11, 12],
    relatedTemplates: ['personal-03', 'story-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
];

export default threadTemplates;
