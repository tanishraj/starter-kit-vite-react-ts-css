import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TokenTable } from './TokenTable';

type ExampleRow = {
  id: string;
  name: string;
  role: string;
};

const columns = [
  {
    id: 'name',
    header: 'Name',
    renderCell: (row: ExampleRow) => row.name,
  },
  {
    id: 'role',
    header: 'Role',
    renderCell: (row: ExampleRow) => row.role,
  },
] as const;

describe('TokenTable', () => {
  it('renders title, description, headers, and rows', () => {
    render(
      <TokenTable
        columns={columns}
        description="Current members and responsibilities."
        getRowKey={(row: ExampleRow) => row.id}
        rows={[
          { id: '1', name: 'Avery Stone', role: 'Design Systems' },
          { id: '2', name: 'Noah Reed', role: 'Frontend Platform' },
        ]}
        title="Team Directory"
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
    render(
      <TokenTable
        columns={columns}
        emptyMessage="Nothing to show."
        getRowKey={(row: ExampleRow) => row.id}
        rows={[]}
        title="Team Directory"
      />,
    );

    expect(screen.getByText('Nothing to show.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
