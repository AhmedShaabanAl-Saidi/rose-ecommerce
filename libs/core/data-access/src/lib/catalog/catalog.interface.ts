export interface CatalogMetadata {
  currentPage: number;
  totalPages?: number;
  numberOfPages?: number;
  limit: number;
  totalItems: number;
  next?: number;
  prev?: number;
  nextPage?: number;
  prevPage?: number;
}

export type PaginationMetadata = CatalogMetadata;
