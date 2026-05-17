export interface OverallStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface CategoryStat {
  categoryName: string;
  productCount: number;
  revenue: number;
}

export interface ProductStat {
  _id: string;
  name?: string;
  title?: string;
  sales?: number;
  sold?: number;
  revenue?: number;
  price: number;
  stock?: number;
  quantity?: number;
  image?: string;
  imgCover?: string;
}

export interface OrderStatusStat {
  _id?: string;
  status?: 'Completed' | 'In progress' | 'Canceled' | string;
  count: number;
  percentage?: number;
}

export interface RevenueTrendPoint {
  _id?: string;
  date?: string;
  revenue: number;
}

export interface OrderStats {
  ordersByStatus: OrderStatusStat[];
  dailyRevenue: RevenueTrendPoint[];
  monthlyRevenue: RevenueTrendPoint[];
}

export interface ProductStats {
  productsByCategory: { category: string; count: number }[];
  topSellingProducts: ProductStat[];
  lowStockProducts: ProductStat[];
}

export interface CategoryStats {
  totalProducts: number;
  revenuePerCategory: CategoryStat[];
}

export interface AllStatsResponse {
  overall: OverallStats;
  products: ProductStats;
  orders: OrderStats;
  categories: CategoryStats;
}

export interface StatisticsApiResponse {
  message: string;
  statistics?: AllStatsResponse;
  data?: AllStatsResponse;
}
