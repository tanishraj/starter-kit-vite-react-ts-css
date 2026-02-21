import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    hint: 'We will never share your email.',
    variant: 'outline',
    size: 'md',
    tone: 'default',
    fullWidth: false,
    disabled: false,
    clearable: false,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outline', 'soft'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'danger'],
    },
    startAdornment: {
      control: false,
    },
    endAdornment: {
      control: false,
    },
    onChange: {
      action: 'changed',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: '360px' }}>
      <Input {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        width: '360px',
      }}
    >
      <Input {...args} label="Outline" variant="outline" />
      <Input {...args} label="Soft" variant="soft" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        width: '360px',
      }}
    >
      <Input {...args} label="Small" size="sm" />
      <Input {...args} label="Medium" size="md" />
      <Input {...args} label="Large" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        width: '360px',
      }}
    >
      <Input {...args} hint="Looks good." label="Success" tone="success" />
      <Input
        {...args}
        hint="Double-check this value."
        label="Warning"
        tone="warning"
      />
      <Input
        {...args}
        error="This field is invalid."
        label="Danger"
        tone="danger"
      />
      <Input {...args} disabled label="Disabled" value="Read only value" />
    </div>
  ),
};

export const WithAdornments: Story = {
  args: {
    label: 'Website',
    placeholder: 'your-domain.com',
    startAdornment: <span>https://</span>,
    endAdornment: <span>.com</span>,
  },
  render: (args) => (
    <div style={{ width: '420px' }}>
      <Input {...args} />
    </div>
  ),
};

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState('Search components');

    return (
      <div style={{ width: '360px' }}>
        <Input
          {...args}
          clearable
          endAdornment={<span>⌘K</span>}
          label="Search"
          onChange={(event) => setValue(event.currentTarget.value)}
          value={value}
        />
      </div>
    );
  },
};
