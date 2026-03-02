import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DataTable } from './DataTable';
import { useColumnDef } from './useColumnDef';

type ExampleRow = {
  id: string;
  name: string;
  role: string;
};

function ExampleDataTable({ emptyMessage, rows }: { emptyMessage?: string; rows: ExampleRow[] }) {
  const columns = useColumnDef<ExampleRow>(
    {
      id: 'name',
      header: 'Name',
      renderCell: (row) => row.name,
    },
    {
      id: 'role',
      header: 'Role',
      renderCell: (row) => row.role,
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Current members and responsibilities."
      emptyMessage={emptyMessage}
      getRowKey={(row: ExampleRow) => row.id}
      rows={rows}
      title="Team Directory"
    />
  );
}

describe('DataTable', () => {
  it('renders title, description, headers, and rows', () => {
    render(
      <ExampleDataTable
        rows={[
          { id: '1', name: 'Avery Stone', role: 'Design Systems' },
          { id: '2', name: 'Noah Reed', role: 'Frontend Platform' },
        ]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Team Directory' })).toBeInTheDocument();
    expect(screen.getByText('Current members and responsibilities.')).toBeInTheDocument();

    const table = screen.getByRole('table', { name: 'Team Directory' });
    const headers = within(table).getAllByRole('columnheader');

    expect(headers).toHaveLength(2);
    expect(within(table).getByText('Avery Stone')).toBeInTheDocument();
    expect(within(table).getByText('Frontend Platform')).toBeInTheDocument();
  });

  it('renders the empty message instead of a table when no rows are provided', () => {
    render(<ExampleDataTable emptyMessage="Nothing to show." rows={[]} />);

    expect(screen.getByText('Nothing to show.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
