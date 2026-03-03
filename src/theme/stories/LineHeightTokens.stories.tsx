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

const lineHeightCSSVars = getAllCSSVariablesWithPrefix('--line-height');
const lineHeightScaleFromCSS = getCSSVarTshirtScale(lineHeightCSSVars);
const sortedLineHeightScale = getSortedTshirtSize(lineHeightScaleFromCSS);

const lineHeightTokenNames: VarName[] = sortedLineHeightScale.map(
  (size) => `--line-height-${size}` as VarName,
);

const meta = {
  title: 'Tokens/Line Height',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function LineHeightDataTable({ tokens }: { tokens: TokenEntry[] }) {
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
          <span
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family-sans)',
              fontSize: 'var(--font-size-xs)',
              lineHeight: `var(${token.name})`,
              maxWidth: '14ch',
            }}
          >
            Design systems scale with clear rhythm.
          </span>
        </div>
      ),
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from line-height tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Line Height Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(lineHeightTokenNames);

    return (
      <div className="token-page">
        <LineHeightDataTable tokens={tokens} />
      </div>
    );
  },
};
