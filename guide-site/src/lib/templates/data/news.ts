/**
 * News Templates - ニュース・速報系テンプレート
 * 最新情報や速報を効果的に伝えるテンプレート集
 */

import type { Template } from '../types';

export const newsTemplates: Template[] = [
  {
    id: 'news-01',
    category: 'news',
    title: '速報・第一報',
    description: '最新情報を即座に共有するテンプレート。スピードが命。正確性と速報性のバランスが重要。',
    effects: [
      '情報源としての認知',
      '高いリポスト率',
      'フォロワー増加',
      'トレンド入りの可能性',
    ],
    example: `【速報】OpenAI、GPT-5を発表

・マルチモーダル対応が大幅強化
・処理速度が2倍に
・価格は据え置き

公式発表から5分。
詳細は分かり次第追って投稿します。

#GPT5 #OpenAI #AI`,
    explanation: '【速報】で注目を集め、要点を箇条書きで簡潔に。「5分」でスピード感を示し、「追って投稿」で続報を予告。ハッシュタグで検索性を高めている。',
    points: [
      'スピードが最優先',
      '要点を簡潔に箇条書き',
      '情報の出典を明確に',
      '続報を予告して期待を持たせる',
    ],
    cautions: [
      '誤報は信頼を大きく損なう',
      '公式情報を確認してから発信',
      'デマの拡散に注意',
      '不確定情報は「未確認」と明記',
    ],
    relatedChapters: [2, 8],
    relatedTemplates: ['news-09', 'news-04', 'viral-01'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'news-02',
    category: 'news',
    title: '解説・分析投稿',
    description: 'ニュースの深掘り解説を行うテンプレート。専門家視点での分析が価値を生む。',
    effects: [
      '専門家としての認知',
      'ブックマーク率アップ',
      'フォロワーの理解促進',
      'メディア露出のきっかけ',
    ],
    example: `OpenAIのGPT-5発表、何が変わる？

エンジニア視点で解説します。

1. マルチモーダル強化の意味
→ 画像・音声・動画を統合処理
→ これまで別々だったAIが1つに

2. 開発者への影響
→ API統合が楽になる
→ コスト削減の可能性

3. ユーザーへの影響
→ より自然な対話が可能に
→ 使い分けが不要に

結論: これは「進化」ではなく「革命」`,
    explanation: 'ニュースの「だから何？」を解説。1.2.3.と構造化し、ターゲット別（開発者/ユーザー）に影響を整理。最後に結論で印象づける。',
    points: [
      '自分の専門性を活かした視点',
      '構造化して分かりやすく',
      'ターゲット別に影響を整理',
      '結論で印象的に締める',
    ],
    cautions: [
      '事実と意見を分ける',
      '専門外の分野は慎重に',
      '他の専門家の意見も参考に',
      '誤りがあれば即訂正',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['value-10', 'news-03', 'opinion-02'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'news-03',
    category: 'news',
    title: '影響予測',
    description: '今後の展開や影響を予測するテンプレート。先を読む力を示すことで、信頼を獲得。',
    effects: [
      '先見性のアピール',
      '議論の活性化',
      'フォロワーの意思決定支援',
      'ブックマーク率アップ',
    ],
    example: `GPT-5発表を受けて、今後3ヶ月で起きること（予測）

1. 競合の動き
→ GoogleがGemini 2.0を前倒し発表
→ Anthropicも対抗策を発表

2. 市場の変化
→ AI関連株が乱高下
→ スタートアップの淘汰が加速

3. 働き方の変化
→ 「AIを使えない人」が明確に遅れをとる
→ プロンプトエンジニアの需要増

あくまで予測。答え合わせは3ヶ月後`,
    explanation: '「今後3ヶ月」と具体的な期間を設定し、複数の観点から予測を展開。「あくまで予測」と注釈を入れ、「答え合わせ」で継続的なエンゲージメントを促す。',
    points: [
      '具体的な期間を設定',
      '複数の観点から予測',
      '予測の根拠も示す',
      '「予測」であることを明記',
    ],
    cautions: [
      '断定的な表現は避ける',
      '外れても受け入れる姿勢',
      '根拠のない予測は避ける',
      'ネガティブな予測は慎重に',
    ],
    relatedChapters: [2, 11],
    relatedTemplates: ['news-02', 'opinion-02', 'value-10'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'news-04',
    category: 'news',
    title: 'まとめ・要約',
    description: '情報を整理してまとめるテンプレート。忙しい人向けに価値を提供。',
    effects: [
      '高いブックマーク率',
      '情報キュレーターとしての認知',
      'リポストされやすい',
      '時間がない人への価値提供',
    ],
    example: `【3分で分かる】GPT-5発表まとめ

発表日: 2024年3月15日

新機能:
□ マルチモーダル対応強化
□ 処理速度2倍
□ 長文コンテキスト対応
□ 多言語対応強化

価格:
□ API: 据え置き
□ Plus: $20/月のまま

リリース:
□ 一般公開: 来月予定

これで会話についていける`,
    explanation: '【3分で分かる】で手軽さをアピール。箇条書きとチェックボックスで見やすく整理。最後の一文でユーモアを加えつつ、まとめの価値を示す。',
    points: [
      '簡潔さを最優先',
      '視覚的に見やすく整理',
      '重要な情報を漏れなく',
      '情報の出典を明記',
    ],
    cautions: [
      '重要な情報を省略しすぎない',
      '誤った要約は信頼を損なう',
      '更新情報はすぐに反映',
      '著作権に注意（引用の範囲内で）',
    ],
    relatedChapters: [2],
    relatedTemplates: ['news-01', 'value-08', 'thread-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'low',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'news-05',
    category: 'news',
    title: '反応・コメント',
    description: 'ニュースへの自分の見解を述べるテンプレート。意見を明確にすることで議論が生まれる。',
    effects: [
      '議論の活性化',
      '立場の明確化',
      'フォロワーとの対話',
      '専門家としての見解発信',
    ],
    example: `GPT-5の発表を見て、正直な感想。

「すごい」より「怖い」が先に来た。

1年前にGPT-4が出た時、
「これ以上進化するのか？」と思った。
それがもう次世代。

進化のスピードが速すぎて、
追いつくのに必死。

でも、ここで止まるわけにはいかない。
使いこなす側でいたい。

みなさんはどう感じました？`,
    explanation: '「正直な感想」で本音であることを示し、感情（怖い）を素直に表現。自分の変化を描写しつつ、最後に質問で読者の意見を求める。',
    points: [
      '正直な感想を述べる',
      '感情も含めて表現',
      '自分の立場を明確に',
      '読者にも意見を求める',
    ],
    cautions: [
      '過激な意見は炎上リスク',
      '事実と感想を区別',
      '他の意見も尊重',
      '感情的になりすぎない',
    ],
    relatedChapters: [2],
    relatedTemplates: ['opinion-01', 'question-04', 'news-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'news-06',
    category: 'news',
    title: '比較・過去事例',
    description: '類似の過去事例と比較するテンプレート。歴史的文脈で理解を深める。',
    effects: [
      '深い理解の提供',
      '専門性のアピール',
      'ブックマーク率アップ',
      '長期的な視点の共有',
    ],
    example: `GPT-5発表、過去のAI革命と比較してみた。

2017年: Transformer論文発表
→ 当時は研究者以外注目なし

2020年: GPT-3登場
→ 「AIすごい」がSNSで話題に

2022年: ChatGPT公開
→ 一般ユーザーが使い始める

2024年: GPT-5発表
→ AIが「当たり前」になる転換点？

振り返ると、2年ごとに革命が起きてる。
2026年に何が来るか、今から怖い`,
    explanation: '時系列で過去の出来事を整理し、今回の発表を文脈の中に位置づける。最後に未来への展望を示すことで、議論や想像を促す。',
    points: [
      '過去の重要な出来事をピックアップ',
      '時系列で整理',
      '比較の観点を明確に',
      '未来への示唆で締める',
    ],
    cautions: [
      '過去の事実は正確に',
      '単純比較できない場合は注意',
      '自分の記憶だけに頼らない',
      '専門家の見解も参照',
    ],
    relatedChapters: [2],
    relatedTemplates: ['news-02', 'news-03', 'value-10'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'news-07',
    category: 'news',
    title: '専門家視点',
    description: 'プロフェッショナルとしての分析を提供するテンプレート。専門性を活かした独自の視点が価値。',
    effects: [
      '専門家としての認知',
      'メディア露出のきっかけ',
      '質の高いフォロワー獲得',
      'ブランディング強化',
    ],
    example: `【エンジニア視点】GPT-5で現場が変わること

7年間AIエンジニアをやってきた立場から。

変わること:
1. コードレビューがAIに置き換わる
2. テスト生成が自動化される
3. ドキュメント作成が秒で終わる

変わらないこと:
1. 設計思想は人間が決める
2. ビジネス要件の理解
3. チームコミュニケーション

AIは「道具」。使う人間が変わらないと意味がない`,
    explanation: '経験年数（7年）で信頼性を担保し、「変わること/変わらないこと」という構造で整理。最後に本質的なメッセージで締める。',
    points: [
      '自分の専門性を明示',
      '具体的な経験年数や実績',
      '一般論ではない独自視点',
      '現場感のある分析',
    ],
    cautions: [
      '専門外の分野は謙虚に',
      '断定しすぎない',
      '他の専門家の意見も尊重',
      '現場の声を代表する責任',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['value-03', 'news-02', 'opinion-02'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'news-08',
    category: 'news',
    title: '一般人視点',
    description: '当事者や一般ユーザーとしての感想を共有するテンプレート。共感を得やすい身近な視点。',
    effects: [
      '共感を得やすい',
      '親しみやすさ',
      '幅広い層へのリーチ',
      '議論のきっかけ',
    ],
    example: `GPT-5の発表を見た、普通の会社員の感想。

正直、「またか...」って思った。

半年前にGPT-4使い始めて、
やっと慣れてきたところなのに。

・覚えたプロンプトがまた変わる？
・また新しい使い方を勉強？
・ついていけるか不安...

専門家は「革命だ」と言うけど、
現場は「また変化か」が本音。

同じ気持ちの人、いませんか？`,
    explanation: '「普通の会社員」という立場を明示し、専門家とは違う「素朴な感想」を共有。不安や戸惑いを正直に表現することで、同じ立場の人からの共感を得る。',
    points: [
      '自分の立場を明示',
      '素朴な感想を大切に',
      '専門家とは違う視点',
      '同じ立場の人に共感を求める',
    ],
    cautions: [
      '卑下しすぎない',
      'ネガティブすぎない',
      '情報の正確性は確保',
      '専門家を批判しない',
    ],
    relatedChapters: [2],
    relatedTemplates: ['news-05', 'question-10', 'personal-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'news-09',
    category: 'news',
    title: '続報・アップデート',
    description: '追加情報や最新の動向を伝えるテンプレート。継続的なフォローで信頼を獲得。',
    effects: [
      '情報源としての信頼',
      '継続的なエンゲージメント',
      'フォロワーの期待値向上',
      'リピート訪問の促進',
    ],
    example: `【続報】GPT-5、追加情報が判明

先ほどの発表に追加情報です。

新たに分かったこと:
・日本語対応が大幅強化
・企業向けプランに新機能
・開発者向けAPIは来週公開

訂正:
・価格は一部値上げの可能性
（最初の投稿で「据え置き」としましたが、公式から訂正がありました）

引き続き情報を追っていきます`,
    explanation: '【続報】で前の投稿との連続性を示し、「新たに分かったこと」と「訂正」を分けて整理。誠実に訂正することで信頼性を高めている。',
    points: [
      '前の投稿との連続性を示す',
      '新情報と訂正を分ける',
      '誤りは素直に訂正',
      '継続フォローを予告',
    ],
    cautions: [
      '誤報の訂正は迅速に',
      '前の投稿を削除しない（訂正で対応）',
      '情報源を明確に',
      '続報を出しすぎて疲れさせない',
    ],
    relatedChapters: [2, 8],
    relatedTemplates: ['news-01', 'news-04', 'thread-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'news-10',
    category: 'news',
    title: '振り返り・総括',
    description: '出来事を時間が経ってから振り返るテンプレート。冷静な分析と学びを提供。',
    effects: [
      '深い分析の提供',
      '学びの共有',
      '長期的な視点の育成',
      'ブックマーク率アップ',
    ],
    example: `GPT-5発表から1ヶ月。振り返り。

当初の予想と現実:

予想: 「AI開発者の需要が激増」
→ 現実: まだ様子見の企業が多い

予想: 「競合がすぐ対抗策」
→ 現実: Googleは沈黙、Anthropic動き出し

予想: 「学習方法が変わる」
→ 現実: 思ったより変化は緩やか

学び: 技術の進化と社会の適応にはギャップがある。
焦らなくていい、でも準備は必要。`,
    explanation: '「1ヶ月」という期間を設定し、当初の予想と現実を比較。自分の予想の検証を行い、そこから学びを抽出する誠実な姿勢を見せる。',
    points: [
      '一定期間後に振り返る',
      '予想と現実を比較',
      '自分の予想の検証を行う',
      '学びや教訓を抽出',
    ],
    cautions: [
      '予想が外れても誠実に報告',
      '言い訳をしない',
      '結果論で批判しない',
      '次に活かす姿勢を見せる',
    ],
    relatedChapters: [2, 11],
    relatedTemplates: ['news-03', 'news-06', 'story-10'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
];
