import type { ReactNode } from 'react';

export type DataTableColumn<Row> = {
  id: string;
  header: ReactNode;
  renderCell: (row: Row) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type DataTableProps<Row> = {
  title?: ReactNode;
  description?: ReactNode;
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  getRowKey: (row: Row, index: number) => string;
  emptyMessage?: ReactNode;
  tableLabel?: string;
  className?: string;
};
