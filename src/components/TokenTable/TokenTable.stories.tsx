import { TokenTable } from './TokenTable';

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

const teamColumns = [
  {
    id: 'name',
    header: 'Name',
    renderCell: (row: TeamRow) => <strong>{row.name}</strong>,
  },
  {
    id: 'role',
    header: 'Role',
    renderCell: (row: TeamRow) => row.role,
  },
  {
    id: 'status',
    header: 'Status',
    renderCell: (row: TeamRow) => (
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
] as const;

const meta = {
  title: 'Components/TokenTable',
  component: TokenTable,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TokenTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TokenTable
        columns={teamColumns}
        description="A reusable table with configurable columns and row rendering."
        getRowKey={(row: TeamRow) => row.id}
        rows={teamRows}
        title="Team Directory"
      />
    </div>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TokenTable
        columns={teamColumns}
        getRowKey={(row: TeamRow) => row.id}
        rows={teamRows.slice(0, 2)}
        tableLabel="Compact team directory"
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ width: 'min(840px, 100%)' }}>
      <TokenTable
        columns={teamColumns}
        emptyMessage="No team members found."
        getRowKey={(row: TeamRow) => row.id}
        rows={[]}
        title="Team Directory"
      />
    </div>
  ),
};
