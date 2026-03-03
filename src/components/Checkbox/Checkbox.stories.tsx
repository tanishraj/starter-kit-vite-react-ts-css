import { useState } from 'react';

import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Accept terms and conditions',
    hint: 'Required before continuing.',
    size: 'md',
    disabled: false,
    fullWidth: false,
    indeterminate: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    onChange: {
      action: 'changed',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-md)',
        width: '360px',
      }}
    >
      <Checkbox {...args} defaultChecked hint="Ready to submit." label="Checked" />
      <Checkbox {...args} hint="Not selected yet." label="Unchecked" />
      <Checkbox {...args} hint="Some items are selected." indeterminate label="Indeterminate" />
      <Checkbox {...args} disabled hint="Cannot be changed right now." label="Disabled" />
      <Checkbox {...args} error="This field is required." label="Error state" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'grid', gap: 'var(--space-md)', width: '360px' }}>
        <Checkbox
          {...args}
          checked={checked}
          hint={checked ? 'Notifications are on.' : 'Notifications are off.'}
          label="Email notifications"
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <p style={{ margin: 0 }}>Current value: {checked ? 'checked' : 'unchecked'}</p>
      </div>
    );
  },
};
