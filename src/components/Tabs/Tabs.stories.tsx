import { useState } from 'react';

import { Tabs } from './Tabs';

import type { Meta, StoryObj } from '@storybook/react-vite';

function mutedTextStyle() {
  return {
    color: 'var(--color-text-tertiary)',
    margin: 0,
  } as const;
}

function panelStyle() {
  return {
    display: 'grid',
    gap: 'var(--space-sm)',
  } as const;
}

const items = [
  {
    value: 'overview',
    label: 'Overview',
    description: 'Summary and status',
    content: (
      <div style={panelStyle()}>
        <h3 style={{ margin: 0 }}>Release overview</h3>
        <p style={mutedTextStyle()}>
          Review the rollout summary and key highlights without leaving the page.
        </p>
      </div>
    ),
  },
  {
    value: 'analytics',
    label: 'Analytics',
    description: 'Metrics and trends',
    content: (
      <div style={panelStyle()}>
        <h3 style={{ margin: 0 }}>Performance</h3>
        <p style={mutedTextStyle()}>
          Keep charts and KPI details inside one focused panel for faster comparisons.
        </p>
      </div>
    ),
  },
  {
    value: 'settings',
    label: 'Settings',
    description: 'Preferences and access',
    content: (
      <div style={panelStyle()}>
        <h3 style={{ margin: 0 }}>Workspace settings</h3>
        <p style={mutedTextStyle()}>
          Use tabs for policy, permissions, and configuration sections in complex forms.
        </p>
      </div>
    ),
  },
];

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    items,
    label: 'Workspace sections',
    hint: 'Choose one section to view its content.',
    orientation: 'horizontal',
    variant: 'underline',
    color: 'primary',
    size: 'md',
    fullWidth: true,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underline', 'soft', 'solid'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'accent', 'success', 'warning', 'danger', 'neutral'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ maxWidth: '960px' }}>
      <Tabs {...args} orientation="horizontal" size="lg" variant="underline" />
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ maxWidth: '960px' }}>
      <Tabs {...args} orientation="vertical" variant="underline" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('analytics');

    return (
      <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: '960px' }}>
        <Tabs {...args} onValueChange={setValue} value={value} />
        <p style={mutedTextStyle()}>Current tab: {value}</p>
      </div>
    );
  },
};
