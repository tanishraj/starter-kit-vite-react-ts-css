import { DataTable, useColumnDef } from '../../components/DataTable';
import {
  type VarName,
  getAllCSSVariablesWithPrefix,
  getCSSVarTshirtScale,
  getTokens,
  getSortedTshirtSize,
} from '../../utils';

import type { TokenEntry } from '../../utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

const spaceCSSVars = getAllCSSVariablesWithPrefix('--space');
const spaceScaleFromCSS = getCSSVarTshirtScale(spaceCSSVars);
const sortedSpaceScale = getSortedTshirtSize(spaceScaleFromCSS);

const spacingTokenNames: VarName[] = sortedSpaceScale.map((size) => `--space-${size}` as VarName);

const meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function SpacingDataTable({ tokens }: { tokens: TokenEntry[] }) {
  const columns = useColumnDef<TokenEntry>(
    {
      id: 'token',
      header: 'Token',
      renderCell: (token) => <code className="token-name">{token.name}</code>,
    },
    {
      id: 'value',
      header: 'Value',
      renderCell: (token) => <code className="token-value">{token.value}</code>,
    },
    {
      id: 'preview',
      header: 'Preview',
      renderCell: (token) => (
        <div className="token-table-preview">
          <div
            style={{
              background: 'var(--color-bg-brand-solid)',
              border: '1px solid var(--color-border-brand)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary_on-brand)',
              fontSize: 'var(--font-size-xs)',
              height: '20px',
              textAlign: 'center',
              width: `var(${token.name})`,
            }}
          />
        </div>
      ),
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from spacing tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Spacing Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(spacingTokenNames);

    return (
      <div className="token-page">
        <SpacingDataTable tokens={tokens} />
      </div>
    );
  },
};
