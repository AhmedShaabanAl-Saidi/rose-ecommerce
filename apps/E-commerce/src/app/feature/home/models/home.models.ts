export interface CategoryOrOccasion {
  _id: string;
  name: string;
  image: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  isSuperAdmin?: boolean;
}

export interface Product {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isSuperAdmin?: boolean;
  sold?: number;
  rateAvg?: number;
  rateCount?: number;
  id?: string;
}

export interface HomeApiResponse {
  message: string;
  categories?: CategoryOrOccasion[];
  occasions?: CategoryOrOccasion[];
  products?: Product[];
  bestSeller?: Product[];
}

export interface HeroBannerConfig {
  title: string;
  subtitle?: string;
  badge?: string;
  ctaText: string;
  imageSrc: string;
  link: string;
}
