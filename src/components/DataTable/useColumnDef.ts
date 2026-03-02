import type { DataTableColumn } from './types';

export function useColumnDef<Row>(
  ...columns: Array<DataTableColumn<Row> | false | null | undefined>
): DataTableColumn<Row>[] {
  return columns.filter((column): column is DataTableColumn<Row> => Boolean(column));
}
