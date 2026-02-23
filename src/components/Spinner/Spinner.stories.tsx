import { Spinner } from './Spinner';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    size: 'md',
    color: 'primary',
    label: 'Loading',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'accent', 'success', 'warning', 'danger', 'neutral', 'current'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 'var(--space-md)',
      }}
    >
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        width: 'min(560px, 100%)',
      }}
    >
      <Spinner {...args} color="primary" />
      <Spinner {...args} color="accent" />
      <Spinner {...args} color="success" />
      <Spinner {...args} color="warning" />
      <Spinner {...args} color="danger" />
      <Spinner {...args} color="neutral" />
    </div>
  ),
};
