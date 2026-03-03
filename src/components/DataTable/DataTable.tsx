import clsx from 'clsx';
import { useId } from 'react';

import type { DataTableProps } from './types';

import './DataTable.css';

export function DataTable<Row>({
  title,
  description,
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No data available.',
  tableLabel,
  className,
}: DataTableProps<Row>) {
  const reactId = useId().replaceAll(':', '');
  const titleId = title ? `data-table-title-${reactId}` : undefined;
  const descriptionId = description ? `data-table-description-${reactId}` : undefined;
  const ariaLabel = !titleId ? tableLabel : undefined;

  return (
    <section className={clsx('data-table', className)}>
      {title ? (
        <h3 className="data-table__title" id={titleId}>
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="data-table__description" id={descriptionId}>
          {description}
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="data-table__wrap">
          <table
            aria-describedby={descriptionId}
            aria-label={ariaLabel}
            aria-labelledby={titleId}
            className="data-table__table"
          >
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    className={clsx('data-table__header-cell', column.headerClassName)}
                    key={column.id}
                    scope="col"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={getRowKey(row, index)}>
                  {columns.map((column) => (
                    <td className={clsx('data-table__cell', column.cellClassName)} key={column.id}>
                      {column.renderCell(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="data-table__empty">{emptyMessage}</p>
      )}
    </section>
  );
}
