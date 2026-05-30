export type DashboardTableCellValue = string | number | null | undefined;

export interface DashboardTableColumn<TItem = any> {
  headerKey: string;
  value: (row: TItem) => DashboardTableCellValue;
  suffixKey?: string;
  hideOnMobile?: boolean;
  cellClass?: (row: TItem) => string;
}

export interface DashboardTableConfig<TItem = any> {
  titleKey: string;
  addButtonLabelKey: string;
  searchPlaceholderKey: string;
  emptyMessageKey: string;
  imageAccessor?: (row: TItem) => string;
  searchAccessor: (row: TItem) => string;
  columns: DashboardTableColumn<TItem>[];
  rowsPerPage?: number;
}
