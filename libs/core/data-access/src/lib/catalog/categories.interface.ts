import { CatalogMetadata } from './catalog.interface';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount?: number;
  createdAt?: string;
  updatedAt?: string;
  isSuperAdmin?: boolean;
}

export interface CategoriesRes {
  message: string;
  metadata: CatalogMetadata;
  categories: Category[];
}
