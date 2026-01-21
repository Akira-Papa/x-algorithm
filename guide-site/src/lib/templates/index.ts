/**
 * Templates Module - 投稿テンプレート集のエクスポート
 */

// テンプレートデータを初期化（副作用としてテンプレートが登録される）
import './data';

// 型定義のエクスポート
export type {
  CategoryId,
  EngagementLevel,
  Difficulty,
  EngagementExpectation,
  Template,
  Category,
} from './types';

export { DIFFICULTY_LABELS, ENGAGEMENT_LEVEL_LABELS } from './types';

// カテゴリのエクスポート
export {
  categories,
  getCategory,
  getAllCategories,
  categoryIds,
} from './categories';

// ストアからの関数のエクスポート
export {
  registerTemplates,
  getAllTemplates,
  getTemplatesByCategory,
  getTemplate,
  getRelatedTemplates,
  getTemplatesByDifficulty,
  getTemplatesByChapter,
  searchTemplates,
} from './store';

// Re-export getCategory with alias for clarity
import { getCategory as getCategoryById } from './categories';
export { getCategoryById };
