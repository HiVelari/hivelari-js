import { CategoryPayload } from '@/types/records';

/**
 * A commerce category returned by `client.records.getCategories()`.
 *
 * Categories form a two-level tree: top-level categories have a non-empty
 * `children` array; subcategories have `children = []`.
 */
export class Category {
  /** ULID unique identifier. */
  readonly id: string;

  /** Display name. */
  readonly name: string;

  /** URL-safe slug. */
  readonly slug: string;

  /** Parent category ID, or `null` for top-level categories. */
  readonly parentId: string | null;

  /** Optional description. */
  readonly description: string | null;

  /** Whether the category is visible to clients. */
  readonly isActive: boolean;

  /** Subcategories (populated for top-level categories, empty for leaves). */
  readonly children: Category[];

  constructor(data: CategoryPayload) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.parentId = data.parent_id ?? null;
    this.description = data.description ?? null;
    this.isActive = data.is_active;
    this.children = (data.children ?? []).map((child) => new Category(child));
  }
}
