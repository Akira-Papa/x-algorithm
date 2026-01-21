/**
 * CTA・誘導系テンプレート
 * フォロワーに具体的なアクションを促す投稿パターン
 */

import { Template } from '../types';

export const ctaTemplates: Template[] = [
  {
    id: 'cta-01',
    category: 'cta',
    title: 'プロフィール誘導',
    description: 'プロフィールページへの訪問を促し、フォローや他のコンテンツ閲覧につなげる',
    effects: [
      'プロフィール訪問数の増加',
      'フォロワー獲得の機会創出',
      '固定ポストや他の投稿への露出',
    ],
    example: `Xで月100万インプレッションを達成した方法を

プロフィールに全てまとめました。

・アルゴリズムの仕組み
・最適な投稿時間
・エンゲージメント率を上げるコツ
・フォロワーを増やす戦略

無料で全て公開しています。

プロフィールからどうぞ
↓`,
    explanation: '価値のある情報がプロフィールにあることを具体的に示し、見に行くべき理由を明確にしています。箇条書きで内容を予告することで期待感を高めています。',
    points: [
      'プロフィールに何があるか具体的に説明する',
      '「無料」「全て公開」など訪問のハードルを下げる言葉を使う',
      '矢印（↓）で視線を誘導する',
      '固定ポストを用意しておくと効果的',
    ],
    cautions: [
      'プロフィールの内容が伴わないと信頼を失う',
      '頻繁に使いすぎると押し売り感が出る',
      '誇大表現は避ける',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-03', 'value-01', 'value-02'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'cta-02',
    category: 'cta',
    title: 'リンク誘導',
    description: 'ブログやYouTube、商品ページなど外部リンクへの訪問を促す',
    effects: [
      '外部サイトへのトラフィック獲得',
      '他プラットフォームとの連携強化',
      'コンバージョン（購入・登録など）の獲得',
    ],
    example: `【保存版】X運用の教科書を公開しました

・アルゴリズム完全解説
・投稿の作り方テンプレート
・フォロワー1万人までのロードマップ

2万字超えの内容を無料で読めます。

今だけ特典PDFも配布中
↓
[リンク]`,
    explanation: 'リンク先の価値を具体的に示し、「今だけ」「特典」という希少性と付加価値で行動を促しています。ボリューム（2万字）を示すことで本気度も伝わります。',
    points: [
      'リンク先で得られる価値を明確にする',
      '希少性や緊急性を加える（今だけ、先着など）',
      '無料であることを強調すると行動しやすい',
      'リンクは投稿の最後に配置する',
    ],
    cautions: [
      'リンクを貼りすぎるとリーチが下がる傾向がある',
      'リンク先の内容と投稿の内容を一致させる',
      'アフィリエイトリンクは信頼を損なうリスクあり',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-06', 'cta-07', 'value-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'low',
      bookmarks: 'high',
    },
  },
  {
    id: 'cta-03',
    category: 'cta',
    title: 'フォロー促進',
    description: 'アカウントのフォローを直接的に促す投稿パターン',
    effects: [
      'フォロワー数の直接的な増加',
      'アカウントの価値の明確化',
      '継続的な関係構築のきっかけ',
    ],
    example: `このアカウントをフォローすると：

✓ 毎日のX運用のコツが学べる
✓ 最新のアルゴリズム情報が届く
✓ 実践的なテンプレートがもらえる
✓ 質問にも丁寧に回答します

フォロワー1万人目指して発信中

一緒に成長しませんか？`,
    explanation: 'フォローすることで得られるメリットを具体的に列挙し、「一緒に成長」という共感ポイントで締めくくっています。目標を共有することで応援したくなる心理も活用。',
    points: [
      'フォローするメリットを具体的に示す',
      '発信の一貫性や頻度をアピールする',
      '目標を共有して応援してもらう',
      '押し付けがましくならない表現を心がける',
    ],
    cautions: [
      '直接的すぎる「フォローお願いします」は避ける',
      '実際に提供できる価値と一致させる',
      '数字目標ばかり強調しない',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['cta-01', 'cta-04', 'personal-01'],
    difficulty: 'beginner',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'low',
    },
  },
  {
    id: 'cta-04',
    category: 'cta',
    title: '通知ON促進',
    description: '投稿の通知設定をONにしてもらい、投稿を見逃さないようにしてもらう',
    effects: [
      '投稿の初動エンゲージメント向上',
      'コアファンの可視化',
      '投稿のリーチ安定化',
    ],
    example: `【お願い】

通知ONにしてくれた方限定で
非公開のX運用ノウハウを
リプで送っています。

やり方：
①このアカウントをフォロー
②プロフィールの🔔マークをタップ
③この投稿にリプで「通知ON」と送信

先着100名まで対応します。`,
    explanation: '通知ONにする具体的な方法を示し、限定特典というインセンティブで行動を促しています。先着制で緊急性も加えています。',
    points: [
      '通知ONの具体的な手順を説明する',
      '通知ONにするメリット（特典）を用意する',
      '限定性や先着制で緊急性を出す',
      '実際に特典を送る（約束は必ず守る）',
    ],
    cautions: [
      '特典を送らないと信頼を大きく失う',
      '頻繁にやりすぎない（月1回程度）',
      '通知ONの強制はしない',
    ],
    relatedChapters: [4, 6, 8],
    relatedTemplates: ['cta-03', 'engagement-01', 'engagement-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'medium',
    },
  },
  {
    id: 'cta-05',
    category: 'cta',
    title: 'DM誘導',
    description: 'ダイレクトメッセージでの連絡を促し、より深い関係構築につなげる',
    effects: [
      '1対1のコミュニケーション機会創出',
      '見込み客との直接対話',
      '信頼関係の深化',
    ],
    example: `X運用で困っていること、ありませんか？

・フォロワーが増えない
・何を投稿すればいいかわからない
・いいねがつかない

こんなお悩み、DMで相談に乗ります。

「X相談」とDMしてください。

今週は5名限定で対応中です。`,
    explanation: '具体的な悩みを列挙して共感を得た上で、DMという行動ハードルを「X相談」というキーワードで下げています。人数限定で希少性も演出。',
    points: [
      'DMで連絡するきっかけ・理由を明確にする',
      '送信するキーワードを指定すると行動しやすい',
      '人数や期間を限定して希少性を出す',
      'DMを開放している設定を確認しておく',
    ],
    cautions: [
      'DMの返信は必ず行う（対応できる範囲で募集）',
      '個人情報の取り扱いに注意',
      '営業臭が強すぎると避けられる',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-06', 'cta-09', 'question-05'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'cta-06',
    category: 'cta',
    title: 'メルマガ・LINE誘導',
    description: 'メールマガジンやLINE公式アカウントなど他の媒体への登録を促す',
    effects: [
      '自社リストの構築',
      'プラットフォーム依存からの脱却',
      'より濃い情報提供の機会',
    ],
    example: `【無料プレゼント】

X運用の教科書（PDF50ページ）を
LINE登録者に無料で配布しています。

内容：
・アルゴリズム完全解説
・投稿テンプレート30選
・フォロワー1万人ロードマップ

受け取り方：
プロフィールのリンクからLINE登録
→自動で届きます

本日23:59まで`,
    explanation: '具体的な特典の内容とボリュームを示し、登録のハードルを下げています。期限を設けて緊急性を演出し、受け取り方も明確に説明。',
    points: [
      '登録特典を魅力的に見せる（具体的なボリュームや内容）',
      '登録から受け取りまでの流れを明確にする',
      '期限や人数制限で緊急性を出す',
      '特典は必ず価値のあるものを用意する',
    ],
    cautions: [
      '特典の質が低いと即ブロックされる',
      '頻繁な誘導は敬遠される',
      'LINEの規約に違反しないよう注意',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-02', 'cta-05', 'value-03'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'medium',
      replies: 'low',
      reposts: 'low',
      bookmarks: 'high',
    },
  },
  {
    id: 'cta-07',
    category: 'cta',
    title: '商品・サービス紹介',
    description: '自社の商品やサービスを紹介し、購入や申し込みを促す',
    effects: [
      '直接的な売上獲得',
      'サービス認知度の向上',
      '見込み客のリスト化',
    ],
    example: `X運用をゼロから学べる
オンライン講座をリリースしました。

【講座の内容】
・動画30本（合計10時間）
・実践ワークシート付き
・1ヶ月間の質問サポート

【受講者の声】
「3ヶ月でフォロワー5000人達成」
「副業で月10万円稼げるように」

先着30名様限定で
通常29,800円→19,800円

詳細はプロフィールから`,
    explanation: '商品の内容、実績（受講者の声）、価格のメリットを順番に示しています。限定割引で今すぐ行動する理由を作っています。',
    points: [
      '商品の内容を具体的に示す',
      '実績やお客様の声で信頼性を高める',
      '限定割引や特典で今すぐ行動する理由を作る',
      '日頃から価値提供をして信頼を構築しておく',
    ],
    cautions: [
      '宣伝ばかりの投稿は嫌われる（普段は価値提供）',
      '誇大広告は景品表示法違反のリスク',
      '購入者へのサポートは誠実に対応する',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-02', 'cta-08', 'cta-10'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'low',
      replies: 'low',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'cta-08',
    category: 'cta',
    title: 'イベント告知',
    description: 'オンライン・オフラインイベントへの参加を促す',
    effects: [
      'イベント参加者の獲得',
      'リアルな交流機会の創出',
      'コミュニティの活性化',
    ],
    example: `【無料オンラインセミナー開催】

「X運用で月100万インプレッションを達成する方法」

日時：○月○日(土) 20:00〜21:30
場所：Zoom（オンライン）
参加費：無料

内容：
・最新アルゴリズム解説
・実際の投稿を添削
・質疑応答タイム

定員：100名（先着順）

参加希望の方は
「参加します」とリプしてください！`,
    explanation: 'イベントの基本情報（日時・場所・費用）と内容を明確に示し、「リプで参加表明」という簡単なアクションで参加のハードルを下げています。',
    points: [
      '5W1Hを明確にする（いつ、どこで、何を、どうやって）',
      '参加するメリットを具体的に示す',
      '参加方法を簡単にする（リプで参加表明など）',
      '定員を設けて希少性を演出する',
    ],
    cautions: [
      '詳細が不明確だと参加しにくい',
      '告知は複数回に分けて行う',
      'リマインドも忘れずに送る',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-09', 'community-07', 'engagement-02'],
    difficulty: 'intermediate',
    expectedEngagement: {
      likes: 'high',
      replies: 'high',
      reposts: 'medium',
      bookmarks: 'high',
    },
  },
  {
    id: 'cta-09',
    category: 'cta',
    title: 'コラボ・募集',
    description: '協力者やパートナーを募集し、新しい取り組みにつなげる',
    effects: [
      '協力者・パートナーの獲得',
      '新規プロジェクトの推進',
      '相互送客による拡散',
    ],
    example: `【コラボ相手募集】

一緒にX運用に関する
電子書籍を作りませんか？

求める人：
・X運用の実績がある方
・フォロワー3000人以上
・本気で取り組める方

条件：
・売上は折半
・執筆期間は2ヶ月

興味ある方はDMください！
まずはお話ししましょう。`,
    explanation: '募集内容、求める条件、提供する条件を明確にし、DMというアクションにつなげています。具体的な条件を示すことで本気度が伝わります。',
    points: [
      '何を一緒にやりたいのか明確にする',
      '求める条件を具体的に示す',
      'お互いのメリットを明確にする',
      'まずは話を聞くという姿勢で敷居を下げる',
    ],
    cautions: [
      '条件が厳しすぎると応募が来ない',
      '条件が緩すぎると質が下がる',
      '約束した条件は必ず守る',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-05', 'community-02', 'community-09'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'medium',
    },
  },
  {
    id: 'cta-10',
    category: 'cta',
    title: '限定オファー',
    description: '期間限定や数量限定の特別オファーで即座の行動を促す',
    effects: [
      '緊急性による即時行動の促進',
      'コンバージョン率の向上',
      '限定感によるブランド価値向上',
    ],
    example: `【72時間限定】

X運用コンサルティング
通常10万円→5万円

今回だけの特別価格です。

内容：
・1時間のZoom面談×2回
・1ヶ月間のLINEサポート
・投稿添削し放題

残り枠：あと3名

この投稿から72時間以内に
DMで「コンサル希望」と
送ってください。`,
    explanation: '時間制限（72時間）、価格メリット（半額）、残り枠数という3つの緊急性を組み合わせています。行動方法も明確に指示。',
    points: [
      '期限や数量の制限を明確にする',
      '通常価格との比較でお得感を出す',
      '残り枠数を更新して緊急性を維持する',
      '嘘の期限設定はしない（信頼を失う）',
    ],
    cautions: [
      '毎回「限定」だと効果が薄れる',
      '嘘の期限や数量は絶対にNG',
      '割引後の価格が適正か確認する',
    ],
    relatedChapters: [4, 6, 10],
    relatedTemplates: ['cta-07', 'cta-08', 'viral-07'],
    difficulty: 'advanced',
    expectedEngagement: {
      likes: 'medium',
      replies: 'medium',
      reposts: 'low',
      bookmarks: 'high',
    },
  },
];
