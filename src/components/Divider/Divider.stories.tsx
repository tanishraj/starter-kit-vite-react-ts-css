import { Divider } from './Divider';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'primary',
    inset: 'none',
    thickness: 1,
    decorative: true,
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'radio',
      options: ['solid', 'dashed', 'dotted'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'brand', 'success', 'warning', 'danger', 'current'],
    },
    inset: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
    },
    thickness: {
      control: {
        type: 'range',
        min: 1,
        max: 8,
        step: 1,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) =>
    args.orientation === 'vertical' ? (
      <div
        style={{
          display: 'flex',
          height: '120px',
        }}
      >
        <Divider {...args} />
      </div>
    ) : (
      <div style={{ width: 'min(520px, 80vw)' }}>
        <Divider {...args} />
      </div>
    ),
};

export const HorizontalVariants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        width: 'min(560px, 85vw)',
      }}
    >
      <Divider {...args} orientation="horizontal" variant="solid" />
      <Divider {...args} orientation="horizontal" variant="dashed" />
      <Divider {...args} orientation="horizontal" variant="dotted" />
    </div>
  ),
};

export const VerticalVariants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-lg)',
        height: '120px',
      }}
    >
      <Divider {...args} orientation="vertical" variant="solid" />
      <Divider {...args} orientation="vertical" variant="dashed" />
      <Divider {...args} orientation="vertical" variant="dotted" />
    </div>
  ),
};
