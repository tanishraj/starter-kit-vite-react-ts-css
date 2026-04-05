import { AgGrid } from './AgGrid';

import type { AgGridProps } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColDef } from 'ag-grid-community';

type TeamRow = {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Paused' | 'Invited';
};

const rowData: TeamRow[] = [
  { id: '1', name: 'Avery Stone', role: 'Design Systems', status: 'Active' },
  { id: '2', name: 'Noah Reed', role: 'Frontend Platform', status: 'Paused' },
  { id: '3', name: 'Mila Chen', role: 'Developer Experience', status: 'Invited' },
  { id: '4', name: 'Iris Patel', role: 'Product Ops', status: 'Active' },
  { id: '5', name: 'Luca Bennett', role: 'Data Platform', status: 'Active' },
  { id: '6', name: 'Nina Kapoor', role: 'Quality Engineering', status: 'Paused' },
  { id: '7', name: 'Ethan Brooks', role: 'Security', status: 'Active' },
  { id: '8', name: 'Sara Kim', role: 'Research', status: 'Invited' },
];

const columnDefs: ColDef<TeamRow>[] = [
  {
    field: 'name',
    flex: 1.2,
    headerName: 'Name',
  },
  {
    field: 'role',
    flex: 1,
    headerName: 'Role',
  },
  {
    field: 'status',
    flex: 0.8,
    headerName: 'Status',
  },
];

function TeamAgGrid({
  rowData: teamRowData = rowData,
  ...props
}: Omit<AgGridProps<TeamRow>, 'columnDefs'>) {
  return (
    <AgGrid<TeamRow>
      {...props}
      columnDefs={columnDefs}
      defaultColDef={{
        resizable: true,
        sortable: true,
      }}
      rowData={teamRowData}
    />
  );
}

const meta = {
  title: 'Components/AgGrid',
  component: TeamAgGrid,
  args: {
    animateRows: true,
    pagination: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TeamAgGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        inlineSize: '100%',
        margin: '0 auto',
        maxWidth: '1000px',
        padding: '24px',
      }}
    >
      {children}
    </div>
  );
}

const autoHeightArgs = {
  domLayout: 'autoHeight' as const,
  height: 'auto',
  minHeight: 0,
  pagination: false,
};

export const Basic: Story = {
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid {...args} />
    </StoryFrame>
  ),
};

export const NormalLayout: Story = {
  args: {
    domLayout: 'normal',
    height: '28rem',
  },
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid {...args} />
    </StoryFrame>
  ),
};

export const AutoHeightLayout: Story = {
  args: {
    ...autoHeightArgs,
    rowData: rowData.slice(0, 1),
  },
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid {...args} />
    </StoryFrame>
  ),
};

export const AutoHeightMultipleRows: Story = {
  args: {
    ...autoHeightArgs,
    rowData: rowData.slice(0, 4),
  },
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid {...args} />
    </StoryFrame>
  ),
};

export const AutoHeightNoData: Story = {
  args: {
    ...autoHeightArgs,
    overlayNoRowsTemplate:
      '<span style="color: var(--color-text-tertiary); padding: 1rem 0;">No team members found.</span>',
    rowData: [],
  },
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid {...args} />
    </StoryFrame>
  ),
};

export const BrandAccent: Story = {
  render: (args) => (
    <StoryFrame>
      <TeamAgGrid
        {...args}
        themeConfig={{
          accentColor: 'var(--color-fg-success-primary)',
          headerBackgroundColor: 'var(--color-bg-success-primary)',
          selectedRowBackgroundColor: 'var(--color-bg-success-secondary)',
          sideButtonSelectedUnderlineColor: 'var(--color-fg-success-primary)',
        }}
      />
    </StoryFrame>
  ),
};
