/**
 * Value Templates - 価値提供・教育系テンプレート
 * フォロワーに実用的な情報や知識を提供するテンプレート集
 */

import type { Template } from '../types';

export const valueTemplates: Template[] = [
  {
    id: 'value-01',
    category: 'value',
    title: 'ノウハウ・Tips投稿',
    description: '実践的なコツやテクニックを共有するテンプレート。すぐに使える具体的な情報が、ブックマーク率を高める。',
    effects: [
      'ブックマーク率アップ',
      '専門家としての信頼構築',
      'フォロワー増加',
      'リポストによる拡散',
    ],
    example: `【保存推奨】Xで伸びる投稿の共通点

1. 1行目で興味を引く
2. 読みやすい改行を入れる
3. 具体的な数字を入れる
4. 最後に行動を促す
5. 投稿時間を最適化する

これだけで反応が2倍変わった。

詳しく知りたい方はリプください`,
    explanation: '【保存推奨】で保存を促し、番号リストで読みやすくしている。「2倍変わった」という具体的な成果と、「リプください」という行動喚起で追加のエンゲージメントも狙う。',
    points: [
      '具体的な数字やステップを示す',
      '自分の実体験に基づく内容',
      '【保存推奨】などの保存促進ワード',
      'すぐに実践できるレベルの具体性',
    ],
    cautions: [
      '当たり前すぎる内容は避ける',
      '根拠のない情報は信頼を失う',
      'パクリだと思われない工夫',
      '古い情報は更新して発信',
    ],
    relatedChapters: [2, 5],
    relatedTemplates: ['value-06', 'thread-01', 'engagement-04'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-02',
    category: 'value',
    title: 'ツール・リソース紹介',
    description: '便利なツールやリソースを紹介するテンプレート。実用的な情報は保存価値が高く、シェアもされやすい。',
    effects: [
      '高いブックマーク率',
      '実用的な情報提供者として認知',
      'リポストによる拡散',
      'フォロワーからの感謝',
    ],
    example: `無料なのに有料級。

エンジニア必携の神ツール5選

1. Notion - ドキュメント管理
2. Figma - デザイン・プロトタイプ
3. GitHub Copilot - AIコード補完
4. Raycast - Mac効率化
5. Linear - プロジェクト管理

全部無料プランで十分使える。

他におすすめあったら教えて`,
    explanation: '「無料なのに有料級」で価値を強調し、5つに絞って紹介。各ツールの用途を一言で説明することで、読者が自分に必要なものを判断しやすい。最後の問いかけでリプライも促進。',
    points: [
      '自分が実際に使っているツールを紹介',
      '無料 or 低コストのものが喜ばれる',
      '用途や特徴を簡潔に説明',
      'リンクは別リプでまとめる',
    ],
    cautions: [
      'アフィリエイト目的だと思われない',
      '紹介料をもらっている場合は明示',
      '古いツールは避ける',
      '特定ツールの過度な宣伝は避ける',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-01', 'question-06', 'thread-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-03',
    category: 'value',
    title: '業界知識シェア',
    description: '専門的な業界知識を共有するテンプレート。専門家としてのポジションを確立し、フォロワーの信頼を獲得。',
    effects: [
      '専門家としての認知',
      '質の高いフォロワー獲得',
      'メディア露出のきっかけ',
      '同業者とのつながり',
    ],
    example: `Web業界10年いて分かったこと。

「コードが書ける」だけじゃ年収上がらない。

大事なのは:
- 要件を正しく理解する力
- 技術を非エンジニアに説明する力
- 事業への貢献を可視化する力

技術力は前提。差がつくのはここ。`,
    explanation: '「10年」という経験年数で信頼性を担保し、一般的な認識（コードが書ける＝価値）に対する異なる視点を提示。具体的な3つのスキルを挙げることで実用性を高めている。',
    points: [
      '自分の経験年数や実績を示す',
      '一般的な認識に対する独自の視点',
      '具体的なアクションに落とし込む',
      '偉そうにならないトーン',
    ],
    cautions: [
      '上から目線にならない',
      '業界批判は炎上リスクあり',
      '機密情報は絶対に漏らさない',
      '自慢話に聞こえないよう注意',
    ],
    relatedChapters: [2, 10],
    relatedTemplates: ['value-01', 'story-06', 'opinion-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-04',
    category: 'value',
    title: '初心者向け解説',
    description: '入門者向けにわかりやすく説明するテンプレート。幅広い層へのリーチと、教育者としての信頼を獲得。',
    effects: [
      '幅広いフォロワー層の獲得',
      '教育者としてのポジション確立',
      '入門者からの感謝',
      '高いリポスト率',
    ],
    example: `「API」って何？

レストランで例えると:

あなた（アプリ）= お客さん
API = ウェイター
厨房（サーバー）= 料理を作る人

お客さんは厨房に直接入れない。
ウェイターを通して注文→料理が届く。

これがAPIの役割。
システム同士の「通訳」なんです。`,
    explanation: 'レストランという身近な例え話で難しい概念を説明。「通訳」という一言でAPIの本質を伝えている。初心者が「分かった！」と感じられる構成。',
    points: [
      '身近な例えを使う',
      '専門用語は最小限に',
      '1投稿1テーマに絞る',
      '「分かった！」と感じさせるゴール設定',
    ],
    cautions: [
      '過度な簡略化で誤解を与えない',
      '例え話が適切か確認',
      '「初心者向け」と明示',
      '上級者からの指摘に真摯に対応',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-09', 'question-01', 'thread-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-05',
    category: 'value',
    title: 'よくある間違い指摘',
    description: '陥りがちな罠や間違いを指摘するテンプレート。「自分も！」という共感と、正しい方法の学びを同時に提供。',
    effects: [
      '共感によるエンゲージメント',
      '学びの提供',
      'ブックマーク率アップ',
      '信頼性の向上',
    ],
    example: `X運用でよく見る間違い3選

❌ フォロワー数だけを追う
→ 数より質。100人の濃いファンの方が価値がある

❌ 毎日投稿にこだわる
→ 週3回の高品質投稿の方が伸びる

❌ バズだけを狙う
→ 地道な価値提供が長期的な成長につながる

心当たりある人、意外と多いはず`,
    explanation: '❌マークで視覚的に「間違い」と分かりやすくし、→で正しい方法を提示。「心当たりある人」という問いかけで、共感したフォロワーのリアクションを促す。',
    points: [
      '自分も過去に経験した間違いを共有',
      '間違いと正解をセットで提示',
      '批判ではなく学びとして伝える',
      '視覚的に分かりやすく整理',
    ],
    cautions: [
      '特定の人を攻撃しない',
      '「間違い」の根拠を示す',
      '偉そうにならない伝え方',
      '絶対的な正解がないテーマは注意',
    ],
    relatedChapters: [2, 6],
    relatedTemplates: ['value-01', 'value-08', 'opinion-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-06',
    category: 'value',
    title: 'ショートカット・効率化',
    description: '時短テクニックや効率化の方法を共有するテンプレート。すぐに使える実用的な情報が高いエンゲージメントを生む。',
    effects: [
      '即実践可能な価値提供',
      '高いブックマーク率',
      'リポストによる拡散',
      '生産性向上への貢献',
    ],
    example: `Macユーザーなら絶対覚えて。

⌘ + Shift + 4 → 範囲スクショ
⌘ + Shift + 5 → 画面収録
⌘ + Space → Spotlight検索
⌘ + Tab → アプリ切替
⌘ + \` → 同アプリ内ウィンドウ切替

特に最後の「同アプリ内切替」知らない人多い。

これで作業効率30%上がる`,
    explanation: 'ショートカットキーを具体的に列挙し、「知らない人多い」というフックで読者の興味を引く。「30%上がる」という具体的な効果で価値を訴求。',
    points: [
      '具体的なキーやコマンドを示す',
      '知られていないテクニックを含める',
      '効果を数字で示す',
      '実際に使って効果を確認済みのもの',
    ],
    cautions: [
      'OSやツールのバージョンを明記',
      '環境依存の情報は注釈を入れる',
      '基本的すぎると価値が薄い',
      '情報の正確性を確認',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-01', 'value-02', 'thread-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-07',
    category: 'value',
    title: 'テンプレート提供',
    description: 'すぐに使えるフォーマットやテンプレートを提供するテンプレート。実用性が高く、保存・シェアされやすい。',
    effects: [
      '最高レベルのブックマーク率',
      '実用的な価値の提供',
      'リポストによる拡散',
      'フォロワーからの感謝',
    ],
    example: `【コピペOK】仕事の依頼を断る時のテンプレ

「ご依頼ありがとうございます。
大変魅力的なお話ですが、
現在他の案件で手一杯のため、
今回は見送らせていただきます。

またの機会がございましたら、
ぜひお声がけください」

角を立てずに断れる。保存しておいて`,
    explanation: '【コピペOK】で即使用可能であることを明示。ビジネスでよくある「断る」場面のテンプレートは実用性が高い。「保存しておいて」で行動を促進。',
    points: [
      'そのまま使えるレベルの完成度',
      '汎用性の高いシーンを選ぶ',
      '【コピペOK】など使いやすさをアピール',
      'カスタマイズポイントを示すとなお良い',
    ],
    cautions: [
      '形式的すぎて心がこもらないと逆効果',
      '法律や契約に関わるものは注意',
      'パクリだと思われない工夫',
      'TPOに合わせた調整の必要性を示す',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-01', 'value-08', 'thread-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-08',
    category: 'value',
    title: 'チェックリスト',
    description: '確認項目をリスト化したテンプレート。抜け漏れ防止に役立ち、実務で重宝される。',
    effects: [
      '実務での活用価値が高い',
      'ブックマーク率最高レベル',
      'リポストによる拡散',
      '専門家としての信頼構築',
    ],
    example: `【保存必須】Webサイト公開前チェックリスト

□ 全ページのリンク確認
□ お問い合わせフォームの動作確認
□ OGP設定（SNSシェア時の表示）
□ アナリティクス設置
□ SSL証明書の確認
□ モバイル表示の確認
□ 表示速度の確認
□ 404ページの設定
□ sitemap.xmlの設置
□ robots.txtの確認

抜けがちな項目ばかり。保存推奨`,
    explanation: '□マークでチェックリスト感を演出。「抜けがちな項目」という表現で、プロでも見落としがちな実用的な内容であることを示す。',
    points: [
      '実務で本当に使えるレベル',
      '項目は10個前後が最適',
      '優先度順に並べる',
      '業界やシーンを明確に',
    ],
    cautions: [
      '当たり前すぎる項目は省く',
      '情報が古くならないよう更新',
      '完璧を求めすぎない',
      '業界特有の項目は解説を加える',
    ],
    relatedChapters: [2, 11],
    relatedTemplates: ['value-01', 'value-07', 'thread-01'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'low',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-09',
    category: 'value',
    title: '用語解説',
    description: '専門用語をわかりやすく解説するテンプレート。初心者からの支持を得やすく、教育コンテンツとして機能。',
    effects: [
      '初心者層の獲得',
      '教育者としてのポジション',
      'ブックマーク率アップ',
      'シリーズ化しやすい',
    ],
    example: `「SaaS」って結局なに？

Software as a Service の略。

簡単に言うと:
「インストール不要、ブラウザで使えるソフト」

例:
・Gmail（メール）
・Slack（チャット）
・Notion（メモ・管理）
・Canva（デザイン）

昔→ソフトを買ってPCにインストール
今→月額払ってブラウザで使う

これがSaaS`,
    explanation: '略語の正式名称→簡単な説明→具体例→ビフォーアフター、という流れで段階的に理解を深める構成。身近なサービス例を挙げることで「あ、それか！」と腑に落ちる。',
    points: [
      '正式名称と略語をセットで',
      '身近な例を複数挙げる',
      '昔と今の比較で変化を示す',
      '一言でまとめる',
    ],
    cautions: [
      '過度な簡略化で誤解を与えない',
      '定義が曖昧な用語は注意',
      '最新の定義を確認',
      '専門家からの指摘に備える',
    ],
    relatedChapters: [2],
    relatedTemplates: ['value-04', 'question-09', 'thread-03'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'high',
      replies: 'medium',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
  {
    id: 'value-10',
    category: 'value',
    title: 'トレンド解説',
    description: '最新の動向やトレンドを解説するテンプレート。時事性があり、情報感度の高いフォロワーを獲得できる。',
    effects: [
      '時事性による拡散',
      '情報通としての認知',
      'フォロワーの信頼獲得',
      'メディア露出のきっかけ',
    ],
    example: `2024年、AIツールはここまで来た。

・ChatGPT: 会話から動画生成まで
・Midjourney: 写真と見分けつかない画像生成
・Suno: 歌詞から本格的な楽曲生成
・Runway: 映像制作の革命
・Cursor: AI駆動のコードエディタ

1年前は「すごいね」で終わってたのが、
今は「仕事で使わないと損」のレベル。

乗り遅れると本当にマズい`,
    explanation: '「ここまで来た」で進化の速さを強調し、具体的なツール名と用途を列挙。1年前との比較で変化の大きさを示し、「乗り遅れると」という危機感で行動を促す。',
    points: [
      '最新の正確な情報',
      '具体的なサービス名やデータ',
      '過去との比較で変化を可視化',
      '今後の展望も示す',
    ],
    cautions: [
      '情報の鮮度を確認',
      '予測は外れる可能性を示す',
      '過度な煽りは信頼を失う',
      '情報源を明示できるようにする',
    ],
    relatedChapters: [2, 11],
    relatedTemplates: ['news-02', 'news-03', 'opinion-02'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'high',
      bookmarks: 'high',
    },
  },
];
