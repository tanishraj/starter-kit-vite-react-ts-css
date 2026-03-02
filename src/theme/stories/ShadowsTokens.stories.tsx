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

const shadowCSSVars = getAllCSSVariablesWithPrefix('--shadow');
const shadowScaleFromCSS = getCSSVarTshirtScale(shadowCSSVars);
const sortedShadowScale = getSortedTshirtSize(shadowScaleFromCSS);

const shadowTokenNames: VarName[] = sortedShadowScale.map((size) => `--shadow-${size}` as VarName);

const meta = {
  title: 'Tokens/Shadows',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function ShadowsDataTable({ tokens }: { tokens: TokenEntry[] }) {
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
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: `var(${token.name})`,
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
      description="Live values from shadow tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Shadow Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(shadowTokenNames);

    return (
      <div className="token-page">
        <ShadowsDataTable tokens={tokens} />
      </div>
    );
  },
};
