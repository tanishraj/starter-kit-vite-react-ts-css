import { ColorSwatch } from './ColorSwatch';
import { SwatchType } from './types';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  args: {
    label: 'text-warning-primary',
    swatchType: SwatchType.COLOR,
    token: {
      name: '--color-text-warning-primary',
      value: '#dc6803',
    },
  },
  argTypes: {
    swatchType: {
      control: 'radio',
      options: [SwatchType.COLOR, SwatchType.GRADIENT],
    },
    token: {
      control: 'object',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorSwatch>;

export default meta;

type Story = StoryObj<typeof meta>;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '240px',
      }}
    >
      {children}
    </div>
  );
}

export const Playground: Story = {
  render: (args) => (
    <Frame>
      <ColorSwatch {...args} />
    </Frame>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
        width: 'min(720px, 100%)',
      }}
    >
      <ColorSwatch
        label="text-warning-primary"
        token={{ name: '--color-text-warning-primary', value: '#dc6803' }}
      />
      <ColorSwatch
        label="bg-brand-solid"
        token={{ name: '--color-bg-brand-solid', value: 'var(--color-brand-600)' }}
      />
      <ColorSwatch
        label="border-primary"
        token={{ name: '--color-border-primary', value: 'var(--color-gray-300)' }}
      />
    </div>
  ),
};

export const Gradients: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))',
        width: 'min(560px, 100%)',
      }}
    >
      <ColorSwatch
        label="gradient-feedback-caution"
        swatchType={SwatchType.GRADIENT}
        token={{ name: '--gradient-feedback-caution', value: 'var(--gradient-bg-warning)' }}
      />
      <ColorSwatch
        label="background-image-brand"
        swatchType={SwatchType.GRADIENT}
        token={{ name: '--background-image-brand', value: 'var(--gradient-bg-brand-primary)' }}
      />
    </div>
  ),
};
