import { Occasion } from '@elevate/core-data-access';
import { DashboardTableConfig } from '../../shared/components/dashboard-data-table/dashboard-data-table.config';

export const occasionsTableConfig: DashboardTableConfig<Occasion> = {
  titleKey: 'DASHBOARD.TABLE.OCCASIONS.TITLE',
  addButtonLabelKey: 'DASHBOARD.TABLE.OCCASIONS.ADD',
  searchPlaceholderKey: 'DASHBOARD.TABLE.SEARCH_PLACEHOLDER',
  emptyMessageKey: 'DASHBOARD.TABLE.OCCASIONS.EMPTY',
  rowsPerPage: 12,
  addRoute: 'add',
  updateRoute: (occasion) => `edit/${occasion._id}`,
  imageAccessor: (occasion) => occasion.image,
  searchAccessor: (occasion) => occasion.name,
  columns: [
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.NAME',
      value: (occasion) => occasion.name,
    },
    {
      headerKey: 'DASHBOARD.TABLE.COLUMNS.PRODUCTS',
      value: (occasion) => occasion.productsCount,
      suffixKey: 'DASHBOARD.TABLE.PRODUCTS_SUFFIX',
    },
  ],
};
