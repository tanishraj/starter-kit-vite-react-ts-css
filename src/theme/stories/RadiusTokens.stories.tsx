import type { Meta, StoryObj } from '@storybook/react-vite';
import { getTokens, TokenSection } from './tokenUtils';
import './tokens.css';

const radiusScale = [
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
  'full',
] as const;

const radiusTokenNames = radiusScale.map((size) => `--radius-${size}`);

const meta = {
  title: 'Tokens/Radius',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => {
    const tokens = getTokens(radiusTokenNames);

    return (
      <div className="token-page">
        <TokenSection
          title="Radius Scale"
          description="Live values from border-radius tokens."
          tokens={tokens}
          renderPreview={(token) => (
            <div
              style={{
                background: 'var(--color-primary-500)',
                borderRadius: `var(${token.name})`,
                height: '150px',
                width: '150px',
              }}
            />
          )}
        />
      </div>
    );
  },
};
