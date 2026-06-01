import { Category } from '@elevate/core-data-access';
import { DashboardTableConfig } from '../../shared/components/dashboard-data-table/dashboard-data-table.config';

export const categoriesTableConfig: DashboardTableConfig<Category> = {
  titleKey: 'DASHBOARD.TABLE.CATEGORIES.TITLE',
  addButtonLabelKey: 'DASHBOARD.TABLE.CATEGORIES.ADD',
  searchPlaceholderKey: 'DASHBOARD.TABLE.SEARCH_PLACEHOLDER',
  emptyMessageKey: 'DASHBOARD.TABLE.CATEGORIES.EMPTY',
  rowsPerPage: 12,
  imageAccessor: (category) => category.image,
  searchAccessor: (category) => category.name,
  columns: [
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.NAME',
      value: (category) => category.name,
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.PRODUCTS',
      value: (category) => category.productsCount,
      suffixKey: 'DASHBOARD.TABLE.PRODUCTS_SUFFIX',
    },
  ],
};
