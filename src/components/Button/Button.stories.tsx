import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'outline', 'soft', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'accent', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    startIcon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
    onClick: {
      action: 'clicked',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const PlusIcon = () => <span>+</span>;
const ArrowIcon = () => <span>→</span>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-sm)',
      }}
    >
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="soft">
        Soft
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-sm)',
      }}
    >
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
      <Button {...args} size="xl">
        XL
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-sm)',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        width: 'min(700px, 100%)',
      }}
    >
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="accent">
        Accent
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    startIcon: <PlusIcon />,
    endIcon: <ArrowIcon />,
    children: 'Create Item',
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving',
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Continue',
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <Button {...args} />
    </div>
  ),
};
