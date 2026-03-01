import type { ReactNode } from 'react';

export type TokenTableColumn<Row> = {
  id: string;
  header: ReactNode;
  renderCell: (row: Row) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export type TokenTableProps<Row> = {
  title?: ReactNode;
  description?: ReactNode;
  columns: readonly TokenTableColumn<Row>[];
  rows: readonly Row[];
  getRowKey: (row: Row, index: number) => string;
  emptyMessage?: ReactNode;
  tableLabel?: string;
  className?: string;
};
