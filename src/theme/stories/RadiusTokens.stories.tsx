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

const radiusCSSVars = getAllCSSVariablesWithPrefix('--radius');
const radiusScaleFromCSS = getCSSVarTshirtScale(radiusCSSVars);
const sortedRadiusScale = getSortedTshirtSize(radiusScaleFromCSS);

const radiusTokenNames: VarName[] = sortedRadiusScale.map((size) => `--radius-${size}` as VarName);

const meta = {
  title: 'Tokens/Radius',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function RadiusDataTable({ tokens }: { tokens: TokenEntry[] }) {
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
              border: '1px solid var(--color-border-primary)',
              borderRadius: `var(${token.name})`,
              height: '150px',
              width: '150px',
            }}
          />
        </div>
      ),
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from border-radius tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Radius Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(radiusTokenNames);

    return (
      <div className="token-page">
        <RadiusDataTable tokens={tokens} />
      </div>
    );
  },
};
