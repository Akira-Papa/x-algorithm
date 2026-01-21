/**
 * Template Types - 投稿テンプレート集の型定義
 */

/** カテゴリID */
export type CategoryId =
  | 'engagement'
  | 'viral'
  | 'thread'
  | 'question'
  | 'value'
  | 'story'
  | 'news'
  | 'opinion'
  | 'visual'
  | 'video'
  | 'cta'
  | 'community'
  | 'timing'
  | 'personal';

/** エンゲージメントレベル */
export type EngagementLevel = 'low' | 'medium' | 'high';

/** 難易度 */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/** 期待されるエンゲージメント */
export interface EngagementExpectation {
  /** いいね期待度 */
  likes: EngagementLevel;
  /** リプライ期待度 */
  replies: EngagementLevel;
  /** リポスト期待度 */
  reposts: EngagementLevel;
  /** ブックマーク期待度 */
  bookmarks: EngagementLevel;
}

/** テンプレート */
export interface Template {
  /** テンプレートID（例: engagement-01） */
  id: string;
  /** カテゴリID */
  category: CategoryId;
  /** テンプレート名 */
  title: string;
  /** 概要説明 */
  description: string;
  /** 期待できる効果 */
  effects: string[];
  /** 投稿例 */
  example: string;
  /** 例文の解説 */
  explanation: string;
  /** 効果的に使うポイント */
  points: string[];
  /** 注意点・避けるべきこと */
  cautions: string[];
  /** 関連する章番号 */
  relatedChapters: number[];
  /** 関連テンプレートID */
  relatedTemplates: string[];
  /** 難易度 */
  difficulty: Difficulty;
  /** 期待されるエンゲージメント */
  expectedEngagement: EngagementExpectation;
}

/** カテゴリ */
export interface Category {
  /** カテゴリID */
  id: CategoryId;
  /** カテゴリ名 */
  name: string;
  /** カテゴリ説明 */
  description: string;
  /** アイコン名（Heroicons） */
  icon: string;
  /** カラーテーマ（Tailwind色名） */
  color: string;
  /** 狙えるエンゲージメントタイプ */
  targetEngagement: string[];
}

/** 難易度の表示ラベル */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

/** エンゲージメントレベルの表示ラベル */
export const ENGAGEMENT_LEVEL_LABELS: Record<EngagementLevel, string> = {
  low: '低',
  medium: '中',
  high: '高',
};
