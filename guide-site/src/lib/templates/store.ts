/**
 * Template Store - テンプレートのストレージ
 * 循環参照を避けるため、独立したファイルに分離
 */

import {
  Template,
  CategoryId,
  TemplateFilters,
  TemplateSorting,
  TemplatePagination,
  EngagementLevel,
} from './types';

/**
 * テンプレートのストレージ
 */
const templateStore: Map<string, Template> = new Map();
const templatesByCategory: Map<CategoryId, Template[]> = new Map();

/**
 * テンプレートを登録する
 * @param templates - 登録するテンプレートの配列
 */
export function registerTemplates(templates: Template[]): void {
  for (const template of templates) {
    templateStore.set(template.id, template);

    const categoryTemplates = templatesByCategory.get(template.category) || [];
    categoryTemplates.push(template);
    templatesByCategory.set(template.category, categoryTemplates);
  }
}

/**
 * 全テンプレートを取得
 * @returns テンプレートの配列
 */
export function getAllTemplates(): Template[] {
  return Array.from(templateStore.values());
}

/**
 * カテゴリIDからテンプレートを取得
 * @param categoryId - カテゴリID
 * @returns テンプレートの配列
 */
export function getTemplatesByCategory(categoryId: CategoryId): Template[] {
  return templatesByCategory.get(categoryId) || [];
}

/**
 * テンプレートIDからテンプレートを取得
 * @param id - テンプレートID
 * @returns テンプレート、または見つからない場合はundefined
 */
export function getTemplate(id: string): Template | undefined {
  return templateStore.get(id);
}

/**
 * 関連テンプレートを取得
 * @param templateId - 元のテンプレートID
 * @returns 関連テンプレートの配列
 */
export function getRelatedTemplates(templateId: string): Template[] {
  const template = templateStore.get(templateId);
  if (!template) return [];

  return template.relatedTemplates
    .map((id) => templateStore.get(id))
    .filter((t): t is Template => t !== undefined);
}

/**
 * 難易度でテンプレートをフィルタリング
 * @param difficulty - 難易度
 * @returns フィルタリングされたテンプレートの配列
 */
export function getTemplatesByDifficulty(
  difficulty: Template['difficulty']
): Template[] {
  return getAllTemplates().filter((t) => t.difficulty === difficulty);
}

/**
 * 章番号から関連テンプレートを取得
 * @param chapterNumber - 章番号
 * @returns 関連テンプレートの配列
 */
export function getTemplatesByChapter(chapterNumber: number): Template[] {
  return getAllTemplates().filter((t) =>
    t.relatedChapters.includes(chapterNumber)
  );
}

/**
 * テンプレート検索
 * @param query - 検索クエリ
 * @returns マッチしたテンプレートの配列
 */
export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return getAllTemplates().filter(
    (t) =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.effects.some((e) => e.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 複数条件でテンプレートをフィルタリング
 * @param templates - フィルタリング対象のテンプレート配列
 * @param filters - フィルター条件
 * @returns フィルタリングされたテンプレートの配列
 */
export function filterTemplates(
  templates: Template[],
  filters: TemplateFilters
): Template[] {
  let result = templates;

  if (filters.categories.length > 0) {
    result = result.filter((t) => filters.categories.includes(t.category));
  }

  if (filters.difficulty) {
    result = result.filter((t) => t.difficulty === filters.difficulty);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.effects.some((e) => e.toLowerCase().includes(query))
    );
  }

  return result;
}

/**
 * テンプレートのエンゲージメントスコアを計算
 * @param template - テンプレート
 * @returns エンゲージメントスコア
 */
export function getEngagementScore(template: Template): number {
  const levels: Record<EngagementLevel, number> = { low: 1, medium: 2, high: 3 };
  return Object.values(template.expectedEngagement).reduce(
    (sum, level) => sum + levels[level as EngagementLevel],
    0
  );
}

/**
 * テンプレートをソート
 * @param templates - ソート対象のテンプレート配列
 * @param sorting - ソート設定
 * @returns ソートされたテンプレートの配列
 */
export function sortTemplates(
  templates: Template[],
  sorting: TemplateSorting
): Template[] {
  const sorted = [...templates];

  switch (sorting.sortBy) {
    case 'category':
      sorted.sort((a, b) => a.category.localeCompare(b.category));
      break;
    case 'difficulty':
      const diffOrder: Record<string, number> = {
        beginner: 1,
        intermediate: 2,
        advanced: 3,
      };
      sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
      break;
    case 'engagement':
      sorted.sort((a, b) => getEngagementScore(b) - getEngagementScore(a));
      break;
    default:
      // default order - by ID
      break;
  }

  if (sorting.order === 'desc') sorted.reverse();
  return sorted;
}

/**
 * テンプレートをページネーション
 * @param templates - ページネーション対象のテンプレート配列
 * @param pagination - ページネーション設定
 * @returns ページネーションされたテンプレートの配列
 */
export function paginateTemplates(
  templates: Template[],
  pagination: TemplatePagination
): Template[] {
  const { page, itemsPerPage } = pagination;
  const start = (page - 1) * itemsPerPage;
  return templates.slice(start, start + itemsPerPage);
}
