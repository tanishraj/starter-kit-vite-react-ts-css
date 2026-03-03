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

const breakpointsCSSVars = getAllCSSVariablesWithPrefix('--breakpoint');
const breakpointScaleFromCSS = getCSSVarTshirtScale(breakpointsCSSVars);
const sortedBreakpointsScale = getSortedTshirtSize(breakpointScaleFromCSS);

const breakpointTokenNames: VarName[] = sortedBreakpointsScale.map(
  (size) => `--breakpoint-${size}` as VarName,
);

const meta = {
  title: 'Tokens/Breakpoints',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function getBreakpointRatios(values: readonly string[]) {
  const numericValues = values.map((value) => Number.parseFloat(value));
  const maxValue = Math.max(...numericValues, 1);

  return numericValues.map((value) => value / maxValue);
}

function BreakpointsDataTable({ ratios, tokens }: { ratios: number[]; tokens: TokenEntry[] }) {
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
      renderCell: (token) => {
        const ratio = ratios[tokens.findIndex((item) => item.name === token.name)];

        return (
          <div className="token-table-preview">
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                style={{
                  background: 'var(--color-bg-brand-solid)',
                  border: '1px solid var(--color-border-brand)',
                  borderRadius: 'var(--radius-2xs)',
                  height: 'var(--space-md)',
                  width: `${Math.max(ratio * 100, 4)}%`,
                }}
              />
            </div>
          </div>
        );
      },
    },
  );

  return (
    <DataTable
      columns={columns}
      description="Live values from breakpoint tokens. Preview bars are proportional to the largest breakpoint."
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title="Breakpoint Scale"
    />
  );
}

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(breakpointTokenNames);
    const ratios = getBreakpointRatios(tokens.map((token) => token.value));

    return (
      <div className="token-page">
        <BreakpointsDataTable ratios={ratios} tokens={tokens} />
      </div>
    );
  },
};
