import { CatalogMetadata } from './catalog.interface';

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number | null;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
  isSuperAdmin: boolean;
  favoriteId: string | null;
  isInWishlist: boolean;
  discount?: number;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
}

export interface ProductsResponse {
  message: string;
  metadata: CatalogMetadata;
  products: Product[];
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryIds?: string[];
  occasionIds?: string[];
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
}

export interface FilterState {
  categoryIds?: string[];
  occasionIds?: string[];
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
}

export interface RelatedProductsResponse {
  message: string;
  count: number;
  relatedProducts: Product[];
}

export interface ReviewResponse {
  message: string;
  metadata: CatalogMetadata;
  reviews: Review[];
}

export interface Review {
  _id: string;
  product: ReviewProduct;
  user: ReviewUser;
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ReviewProduct {
  _id: string;
  title: string;
  imgCover: string;
  id: string;
}

export interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
}
