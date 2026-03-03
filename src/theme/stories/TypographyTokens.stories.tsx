import { DataTable, useColumnDef } from '../../components/DataTable';
import { getAllCSSVariablesWithPrefix, getTokens } from '../../utils';

import type { TokenEntry } from '../../utils';
import type { Meta, StoryObj } from '@storybook/react-vite';

const typographyTokenNames = getAllCSSVariablesWithPrefix('--font-family');

const sampleByToken: Record<(typeof typographyTokenNames)[number], string> = {
  '--font-family-sans': 'Sphinx of black quartz, judge my vow.',
  '--font-family-mono': 'const answer = 42;',
};

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function TypographyDataTable({ tokens }: { tokens: TokenEntry[] }) {
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
              fontFamily: `var(${token.name})`,
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-md)',
            }}
          >
            {sampleByToken[token.name as keyof typeof sampleByToken]}
          </span>
        </div>
      ),
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from typography tokens."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Font Families"
    />
  );
}

export const Families: Story = {
  render: () => {
    const tokens = getTokens(typographyTokenNames);

    return (
      <div className="token-page">
        <TypographyDataTable tokens={tokens} />
      </div>
    );
  },
};
