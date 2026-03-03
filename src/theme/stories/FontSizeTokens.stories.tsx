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

const fontSizeCSSVars = getAllCSSVariablesWithPrefix('--font-size');
const fontSizeScaleFromCSS = getCSSVarTshirtScale(fontSizeCSSVars);
const sortedFontSizeScale = getSortedTshirtSize(fontSizeScaleFromCSS);

const fontSizeTokenNames: VarName[] = sortedFontSizeScale.map(
  (size) => `--font-size-${size}` as VarName,
);

const meta = {
  title: 'Tokens/Font Size',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function FontSizeDataTable({ tokens }: { tokens: TokenEntry[] }) {
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
              fontSize: `var(${token.name})`,
              lineHeight: '1.2',
            }}
          >
            Ag
          </span>
        </div>
      ),
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from font-size tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Font Size Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(fontSizeTokenNames);

    return (
      <div className="token-page">
        <FontSizeDataTable tokens={tokens} />
      </div>
    );
  },
};
