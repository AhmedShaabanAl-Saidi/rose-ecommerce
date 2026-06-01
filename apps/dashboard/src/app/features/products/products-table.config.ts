import { Product } from '@elevate/core-data-access';
import { DashboardTableConfig } from '../../shared/components/dashboard-data-table/dashboard-data-table.config';

export const productsTableConfig: DashboardTableConfig<Product> = {
  titleKey: 'DASHBOARD.TABLE.PRODUCTS.TITLE',
  addButtonLabelKey: 'DASHBOARD.TABLE.PRODUCTS.ADD',
  searchPlaceholderKey: 'DASHBOARD.TABLE.SEARCH_PLACEHOLDER',
  emptyMessageKey: 'DASHBOARD.TABLE.PRODUCTS.EMPTY',
  rowsPerPage: 12,
  imageAccessor: (product) => product.imgCover,
  searchAccessor: (product) => product.title,
  columns: [
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.NAME',
      value: (product) => product.title,
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.PRICE',
      value: (product) => product.price,
      suffixKey: 'DASHBOARD.TABLE.CURRENCY',
      hideOnMobile: true,
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.STOCK',
      value: (product) => product.quantity,
      cellClass: (product) =>
        product.quantity <= 5 ? 'dashboard-data-table__stock-low' : '',
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.SALES',
      value: (product) => product.sold ?? 0,
      hideOnMobile: true,
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.RATINGS',
      value: (product) => `${product.rateAvg}/5 (${product.rateCount})`,
      hideOnMobile: true,
    },
  ],
};
