/**
 * Question Templates - 質問・対話系テンプレート
 * フォロワーとの対話を促進し、リプライを獲得するためのテンプレート集
 */

import type { Template } from '../types';

export const questionTemplates: Template[] = [
  {
    id: 'question-01',
    category: 'question',
    title: 'オープンクエスチョン',
    description: '自由回答を促す質問で、フォロワーの考えや経験を引き出すテンプレート。多様な意見が集まり、議論が活性化しやすい。',
    effects: [
      'リプライ数の大幅増加',
      'フォロワーとの関係構築',
      '多様な視点の収集',
      'コミュニティ活性化',
    ],
    example: `最近「AI使ってる？」って聞くと、みんな使い方が全然違って面白い。

あなたはAIをどんなことに使ってますか？

仕事でも趣味でも、意外な使い方教えてください`,
    explanation: '具体的なテーマ（AI）を設定しつつ、「どんなことに」という開かれた質問で自由な回答を促している。「意外な使い方」という追加の問いかけが、ユニークな回答を引き出す効果がある。',
    points: [
      '答えやすいテーマを選ぶ（身近で具体的なもの）',
      '質問は1つに絞る（複数だと答えにくい）',
      '自分の立場や考えも少し示す',
      'フォロワーの専門性を活かせる質問が効果的',
    ],
    cautions: [
      '曖昧すぎる質問は回答が来ない',
      '専門的すぎると参加者が限定される',
      '答えに時間がかかる質問は避ける',
      'センシティブなテーマは炎上リスクあり',
    ],
    relatedChapters: [2, 7, 10],
    relatedTemplates: ['question-04', 'question-05', 'engagement-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'question-02',
    category: 'question',
    title: '二択質問',
    description: 'AかBかの選択を問う質問。答えやすさが魅力で、気軽な参加を促せる。対立構造が自然とできるため、議論も生まれやすい。',
    effects: [
      '回答へのハードルが低く参加しやすい',
      'A派B派の議論が発生',
      'インプレッションが伸びやすい',
      '投票機能との相性が良い',
    ],
    example: `エンジニアに聞きたい。

朝型 vs 夜型

どっちの方が集中できますか？

自分は夜型で、深夜2時が一番コードが書ける`,
    explanation: '明確な二択を提示することで、回答のハードルを下げている。自分の立場を明示することで、反論や同意のリプライを誘発。ターゲット（エンジニア）を明示して専門的な議論を促進。',
    points: [
      '対等な選択肢を用意する（偏りがあると議論にならない）',
      '自分の立場を先に表明する',
      'ターゲット層を明確にする',
      '両方の意見が出やすいテーマを選ぶ',
    ],
    cautions: [
      '政治・宗教などの対立を煽るテーマは避ける',
      'どちらかが明らかに正しい質問は盛り上がらない',
      '二択以外の回答が来ても柔軟に対応',
      '結論を押し付けない',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['question-03', 'question-07', 'engagement-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'question-03',
    category: 'question',
    title: 'アンケート形式',
    description: '複数の選択肢から選んでもらう投票形式。Xの投票機能と組み合わせることで、大量の参加を得やすい。',
    effects: [
      '参加のハードルが最も低い',
      '大量のエンゲージメント獲得',
      'データとして活用可能',
      'フォロワーの傾向把握',
    ],
    example: `【アンケート】SNS運用で一番大事だと思うことは？

1. 投稿の質
2. 投稿の頻度
3. フォロワーとの交流
4. 投稿時間の最適化

理由もリプで教えてもらえると嬉しいです`,
    explanation: '4つの選択肢で投票しやすくしつつ、「理由もリプで」と追加の行動を促している。テーマがフォロワーの関心事（SNS運用）なので参加意欲が高まる。',
    points: [
      '選択肢は4つ程度が最適',
      '選択肢間の差を明確にする',
      'リプライでの補足を促す',
      '結果発表を予告すると参加率アップ',
    ],
    cautions: [
      '選択肢が偏っていると信頼性が下がる',
      '「その他」を入れると集計しにくい',
      'ネタ選択肢を入れすぎない',
      '結果を放置せず必ず共有する',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['question-02', 'community-02', 'engagement-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'medium',
      bookmarks: 'low',
    },
  },
  {
    id: 'question-04',
    category: 'question',
    title: '意見募集',
    description: '特定のテーマについてフォロワーの意見を求めるテンプレート。自分の考えを持つフォロワーからの濃いリプライが期待できる。',
    effects: [
      '深い議論の発生',
      '専門家からの回答',
      '自分の知見拡大',
      '質の高いリプライの獲得',
    ],
    example: `リモートワーク3年やって思うこと。

出社強制の会社が増えてきてるけど、これって正しい方向なんだろうか。

生産性って何で測るべき？

リモート派も出社派も、率直な意見聞かせてください`,
    explanation: '時事的なテーマ（出社回帰）を取り上げ、自分の経験（リモート3年）を示した上で問いかけ。両方の立場からの意見を求めることで、偏りのない議論を促進。',
    points: [
      '賛否両論あるテーマを選ぶ',
      '自分の立場や経験を示す',
      '両方の意見を歓迎する姿勢を見せる',
      '建設的な議論になるよう誘導',
    ],
    cautions: [
      '炎上しやすいテーマには注意',
      '特定の立場を攻撃しない',
      'リプライには丁寧に返信',
      '議論が過熱したら仲裁役に',
    ],
    relatedChapters: [2, 7, 10],
    relatedTemplates: ['question-01', 'question-07', 'opinion-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'question-05',
    category: 'question',
    title: '経験談募集',
    description: '特定のテーマについて体験のシェアを促すテンプレート。共感や学びが生まれ、コミュニティの絆が深まる。',
    effects: [
      'リアルな体験談の収集',
      'フォロワー同士の交流促進',
      'コンテンツの素材獲得',
      '共感によるエンゲージメント',
    ],
    example: `転職して「マジで良かった」と思った瞬間、ありますか？

自分は前職で毎日終電だったのが、今は18時に帰れるようになって家族との時間が増えた。

みなさんの「転職して良かったエピソード」聞かせてください`,
    explanation: '具体的な体験を自分から開示することで、フォロワーも話しやすい雰囲気を作っている。ポジティブな体験に絞ることで、前向きな投稿が集まる。',
    points: [
      'まず自分の体験を具体的に話す',
      'ポジティブ/ネガティブどちらかに絞る',
      '答えやすいテーマを選ぶ',
      'シェアしてくれた人に感謝を伝える',
    ],
    cautions: [
      'プライバシーに配慮したテーマ選び',
      'ネガティブすぎる体験は愚痴大会になりがち',
      '特定の企業や人物を批判する流れは止める',
      '体験談は引用時に許可を取る',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['question-01', 'story-01', 'community-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'question-06',
    category: 'question',
    title: 'おすすめ募集',
    description: 'ツール、本、サービスなどの推薦を求めるテンプレート。実用的な情報が集まり、保存価値が高い投稿になる。',
    effects: [
      '実用的な情報の収集',
      'ブックマーク率アップ',
      'スレッド化による情報蓄積',
      '専門家からのおすすめ獲得',
    ],
    example: `【教えて】エンジニアの皆さん

「これないと仕事できない」ってレベルで愛用してるツール、何ですか？

有料無料問わず、ガチでおすすめのやつ教えてください。

まとめてシェアします`,
    explanation: 'ターゲットを明確にし、「仕事できないレベル」という強い表現で本当におすすめのものだけを募集。「まとめてシェア」と予告することで参加メリットを示している。',
    points: [
      'ジャンルを絞りすぎず広げすぎない',
      'ターゲット層を明確に',
      '集まった情報の活用方法を示す',
      'お礼のまとめ投稿を必ず作成',
    ],
    cautions: [
      'アフィリエイトリンクの投稿が来ることがある',
      '宣伝目的のリプライは適切に対処',
      'まとめ投稿は著作権に注意',
      '特定の製品を悪く言う流れは避ける',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['value-02', 'question-01', 'thread-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'question-07',
    category: 'question',
    title: '議論テーマ提示',
    description: '議論を呼ぶ問いかけを投げかけるテンプレート。賛否両論が生まれることで、大きな盛り上がりが期待できる。',
    effects: [
      'バズの可能性が高い',
      '多様な意見の収集',
      'インプレッション大幅増',
      'フォロワー以外からの流入',
    ],
    example: `ちょっと過激かもしれないけど言わせて。

「副業禁止の会社」って、もう時代遅れじゃない？

社員のスキルアップを制限してるだけな気がする。

反論あったら聞かせてほしい`,
    explanation: '「過激かも」と前置きしつつ、議論を呼ぶ主張を展開。「反論あったら」と反対意見も歓迎することで、多様な視点が集まりやすくなる。',
    points: [
      '明確な主張を持つ',
      '反対意見も歓迎する姿勢を見せる',
      '感情的にならず論理的に',
      '炎上と議論の違いを理解する',
    ],
    cautions: [
      '人格攻撃につながるテーマは避ける',
      '炎上リスクが高いので慎重に',
      '引けない主張はしない',
      '議論が過熱したら適切に収束',
    ],
    relatedChapters: [2, 6, 10],
    relatedTemplates: ['question-04', 'opinion-03', 'viral-03'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'medium',
    },
  },
  {
    id: 'question-08',
    category: 'question',
    title: '仮説検証質問',
    description: '自分の仮説への賛否を問うテンプレート。専門家からのフィードバックや新しい視点を得られる。',
    effects: [
      '専門家からの意見獲得',
      '自分の考えのブラッシュアップ',
      '知的な議論の発生',
      '信頼性の向上',
    ],
    example: `仮説なんですが、

「毎日投稿」より「週3回の高品質投稿」の方がX伸びる説。

理由:
- アルゴリズムは品質重視
- フォロワーの飽き防止
- 自分の消耗も防げる

この考え、間違ってます？`,
    explanation: '自分の仮説を理由付きで提示し、「間違ってます？」と謙虚に問いかけ。反論を求めることで、建設的なフィードバックが得やすくなる。',
    points: [
      '仮説は具体的に、根拠も示す',
      '謙虚な姿勢で問いかける',
      'データや経験があれば添える',
      '反論を歓迎する姿勢を見せる',
    ],
    cautions: [
      '根拠のない仮説は批判される',
      '間違いを認められる準備をする',
      '専門家を馬鹿にしない',
      '議論から学ぶ姿勢が大切',
    ],
    relatedChapters: [2, 10, 12],
    relatedTemplates: ['question-04', 'value-01', 'opinion-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'question-09',
    category: 'question',
    title: 'クイズ形式',
    description: '知識を試す問題を出題するテンプレート。正解を考える過程でエンゲージメントが生まれ、学びにもなる。',
    effects: [
      'ゲーム感覚で楽しめる',
      '滞在時間の増加',
      '知識の共有',
      'リプライでの議論発生',
    ],
    example: `【エンジニアクイズ】

Gitで「直前のコミットメッセージを修正する」コマンドは？

A) git commit --edit
B) git commit --amend
C) git commit --fix
D) git reset --message

正解と解説は今夜20時に`,
    explanation: '選択式で答えやすくし、実務で使う知識を問うことで実用的な学びを提供。「今夜20時に」と予告することで、フォローやリピート訪問を促進。',
    points: [
      '難易度は中程度が最適',
      '実務で役立つ知識を出題',
      '正解発表の時間を予告',
      '解説も丁寧に行う',
    ],
    cautions: [
      '簡単すぎると盛り上がらない',
      '難しすぎると参加者が減る',
      '正解は必ず発表する',
      '間違った人を馬鹿にしない',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['value-09', 'engagement-02', 'community-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'question-10',
    category: 'question',
    title: '相談・悩み共有',
    description: '自分の悩みを打ち明けてアドバイスを求めるテンプレート。人間味を見せることで親近感が生まれ、コミュニティの絆が深まる。',
    effects: [
      '人間味のある発信',
      '共感の獲得',
      '有益なアドバイス',
      'フォロワーとの距離が縮まる',
    ],
    example: `正直に相談させてください。

フリーランス3年目、仕事は順調なんですが「孤独感」がすごい。

会社員時代の雑談が恋しくなることがある。

同じ経験ある方、どう乗り越えてますか？`,
    explanation: '「正直に」と前置きすることで本音であることを示し、具体的な悩み（孤独感）を開示。解決策を求めることで、建設的なアドバイスが集まる。',
    points: [
      '本音で語る（演出はバレる）',
      '具体的な状況を説明する',
      'アドバイスを求める姿勢を見せる',
      'もらったアドバイスには感謝を伝える',
    ],
    cautions: [
      '深刻すぎる悩みは専門家に相談',
      '愚痴だけにならないようにする',
      '特定の人や会社を批判しない',
      'アドバイスを全部実行する必要はない',
    ],
    relatedChapters: [2, 10, 11],
    relatedTemplates: ['question-05', 'story-02', 'personal-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
];
