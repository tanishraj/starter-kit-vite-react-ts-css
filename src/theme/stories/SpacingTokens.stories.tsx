import type { Meta, StoryObj } from '@storybook/react-vite';
import { getTokens, TokenSection } from './tokenUtils';
import './tokens.css';

const spacingScale = [
  'none',
  '4xs',
  '3xs',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
] as const;

const spacingTokenNames = spacingScale.map((size) => `--space-${size}`);

const meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(spacingTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Spacing Scale"
          description="Live values from spacing tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <div
              style={{
                background: 'var(--color-primary-500)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-xs)',
                textAlign: 'center',
                width: `var(${token.name})`,
                height: '20px',
              }}
            ></div>
          )}
        />
      </div>
    );
  },
};
