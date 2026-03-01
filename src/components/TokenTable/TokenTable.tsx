import { useId } from 'react';

import type { TokenTableProps } from './types';

import './TokenTable.css';

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function TokenTable<Row>({
  title,
  description,
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No data available.',
  tableLabel,
  className,
}: TokenTableProps<Row>) {
  const reactId = useId().replaceAll(':', '');
  const titleId = title ? `token-table-title-${reactId}` : undefined;
  const descriptionId = description ? `token-table-description-${reactId}` : undefined;
  const ariaLabel = !titleId ? tableLabel : undefined;

  return (
    <section className={cx('token-table-section', className)}>
      {title ? (
        <h3 className="token-table-section__title" id={titleId}>
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="token-table-section__description" id={descriptionId}>
          {description}
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="token-table-section__wrap">
          <table
            aria-describedby={descriptionId}
            aria-label={ariaLabel}
            aria-labelledby={titleId}
            className="token-table-section__table"
          >
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    className={cx('token-table-section__header-cell', column.headerClassName)}
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
                    <td
                      className={cx('token-table-section__cell', column.cellClassName)}
                      key={column.id}
                    >
                      {column.renderCell(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="token-table-section__empty">{emptyMessage}</p>
      )}
    </section>
  );
}
