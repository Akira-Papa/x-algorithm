/**
 * Template Store - テンプレートのストレージ
 * 循環参照を避けるため、独立したファイルに分離
 */

import { Template, CategoryId } from './types';

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
