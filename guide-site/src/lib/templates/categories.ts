/**
 * Template Categories - 14カテゴリの定義
 */

import { Category, CategoryId } from './types';

/** カテゴリ定義 */
export const categories: Category[] = [
  {
    id: 'engagement',
    name: 'エンゲージメント獲得',
    description:
      'いいね・リプライ・リポストを効果的に獲得するためのテンプレート。アルゴリズムに好まれる投稿形式を活用。',
    icon: 'HeartIcon',
    color: 'rose',
    targetEngagement: ['いいね', 'リプライ', 'リポスト'],
  },
  {
    id: 'viral',
    name: 'バイラル拡散',
    description:
      '大規模な拡散を狙うためのテンプレート。シェアされやすい構造と話題性のある内容で拡散力を最大化。',
    icon: 'ArrowPathRoundedSquareIcon',
    color: 'purple',
    targetEngagement: ['リポスト', '引用リポスト', 'インプレッション'],
  },
  {
    id: 'thread',
    name: 'スレッド・長文',
    description:
      '深い内容を段階的に伝えるスレッド形式のテンプレート。滞在時間とエンゲージメントを最大化。',
    icon: 'QueueListIcon',
    color: 'blue',
    targetEngagement: ['滞在時間', 'ブックマーク', 'フォロー'],
  },
  {
    id: 'question',
    name: '質問・対話',
    description:
      'フォロワーとの対話を促進するテンプレート。コメント誘発で双方向コミュニケーションを実現。',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'green',
    targetEngagement: ['リプライ', 'コミュニティ形成', 'エンゲージメント率'],
  },
  {
    id: 'value',
    name: '価値提供・教育',
    description:
      '有益な情報やノウハウを提供するテンプレート。専門性の確立と信頼構築に効果的。',
    icon: 'AcademicCapIcon',
    color: 'amber',
    targetEngagement: ['ブックマーク', 'フォロー', 'リポスト'],
  },
  {
    id: 'story',
    name: 'ストーリー・体験',
    description:
      '個人の経験やストーリーを共有するテンプレート。共感を生み、人間味のある発信を実現。',
    icon: 'BookOpenIcon',
    color: 'orange',
    targetEngagement: ['いいね', 'リプライ', '共感'],
  },
  {
    id: 'news',
    name: 'ニュース・速報',
    description:
      '最新情報やトレンドを素早く発信するテンプレート。タイムリーな情報発信で注目を集める。',
    icon: 'NewspaperIcon',
    color: 'red',
    targetEngagement: ['インプレッション', 'リポスト', '引用リポスト'],
  },
  {
    id: 'opinion',
    name: '意見・主張',
    description:
      '自分の考えや意見を効果的に伝えるテンプレート。議論を促し、ソートリーダーシップを確立。',
    icon: 'MegaphoneIcon',
    color: 'indigo',
    targetEngagement: ['リプライ', '引用リポスト', 'ディスカッション'],
  },
  {
    id: 'visual',
    name: 'ビジュアル・画像',
    description:
      '画像を効果的に活用するテンプレート。視覚的インパクトでスクロールを止め、注目を集める。',
    icon: 'PhotoIcon',
    color: 'pink',
    targetEngagement: ['インプレッション', 'いいね', 'ブックマーク'],
  },
  {
    id: 'video',
    name: '動画・VQV',
    description:
      '動画コンテンツを活用するテンプレート。VQV（Valuable Quick Video）で滞在時間を最大化。',
    icon: 'VideoCameraIcon',
    color: 'cyan',
    targetEngagement: ['視聴完了率', '滞在時間', 'フォロー'],
  },
  {
    id: 'cta',
    name: 'CTA・誘導',
    description:
      '行動喚起を効果的に行うテンプレート。フォロー誘導やリンククリックを促進。',
    icon: 'CursorArrowRaysIcon',
    color: 'emerald',
    targetEngagement: ['クリック', 'フォロー', 'コンバージョン'],
  },
  {
    id: 'community',
    name: 'コミュニティ・交流',
    description:
      'フォロワーコミュニティを育成するテンプレート。帰属意識とロイヤリティを構築。',
    icon: 'UserGroupIcon',
    color: 'violet',
    targetEngagement: ['リプライ', 'コミュニティ', 'リテンション'],
  },
  {
    id: 'timing',
    name: 'タイミング・トレンド',
    description:
      'トレンドや時事ネタを活用するテンプレート。タイムリーな発信で話題性を獲得。',
    icon: 'ClockIcon',
    color: 'sky',
    targetEngagement: ['インプレッション', 'トレンド入り', '新規リーチ'],
  },
  {
    id: 'personal',
    name: 'パーソナル・自己開示',
    description:
      '自己開示や個人的な発信のテンプレート。親近感と信頼関係を構築し、ファンを育成。',
    icon: 'UserCircleIcon',
    color: 'teal',
    targetEngagement: ['いいね', 'リプライ', 'フォロワーロイヤリティ'],
  },
];

/** カテゴリIDからカテゴリを取得 */
export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id);
}

/** 全カテゴリを取得 */
export function getAllCategories(): Category[] {
  return categories;
}

/** カテゴリIDの配列 */
export const categoryIds: CategoryId[] = categories.map((c) => c.id);
