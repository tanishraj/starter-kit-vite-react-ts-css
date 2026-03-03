import { DataTable } from './DataTable';
import { useColumnDef } from './useColumnDef';

import type { DataTableProps } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

type TeamRow = {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Paused' | 'Invited';
};

const teamRows: TeamRow[] = [
  { id: '1', name: 'Avery Stone', role: 'Design Systems', status: 'Active' },
  { id: '2', name: 'Noah Reed', role: 'Frontend Platform', status: 'Paused' },
  { id: '3', name: 'Mila Chen', role: 'Developer Experience', status: 'Invited' },
];

function TeamDataTable(props: Omit<DataTableProps<TeamRow>, 'columns'>) {
  const columns = useColumnDef<TeamRow>(
    {
      id: 'name',
      header: 'Name',
      renderCell: (row) => <strong>{row.name}</strong>,
    },
    {
      id: 'role',
      header: 'Role',
      renderCell: (row) => row.role,
    },
    {
      id: 'status',
      header: 'Status',
      renderCell: (row) => (
        <span
          style={{
            border: '1px solid var(--color-border-primary)',
            borderRadius: '999px',
            color: 'var(--color-text-secondary)',
            display: 'inline-flex',
            fontSize: 'var(--font-size-xs)',
            lineHeight: 1,
            padding: '0.375rem 0.5rem',
          }}
        >
          {row.status}
        </span>
      ),
    },
  );

  return <DataTable<TeamRow> {...props} columns={columns} />;
}

const meta = {
  title: 'Components/DataTable',
  component: TeamDataTable,
  args: {
    getRowKey: (row: TeamRow) => row.id,
    rows: teamRows,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TeamDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TeamDataTable
        {...args}
        description="A reusable table with configurable columns and row rendering."
        title="Team Directory"
      />
    </div>
  ),
};

export const WithoutHeader: Story = {
  render: (args) => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TeamDataTable {...args} rows={teamRows.slice(0, 2)} tableLabel="Compact team directory" />
    </div>
  ),
};

export const EmptyState: Story = {
  render: (args) => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TeamDataTable
        {...args}
        emptyMessage="No team members found."
        rows={[]}
        title="Team Directory"
      />
    </div>
  ),
};
