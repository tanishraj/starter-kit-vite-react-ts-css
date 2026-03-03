import { useState } from 'react';

import { Radio } from './Radio';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    label: 'Email',
    hint: 'Send updates by email.',
    size: 'md',
    disabled: false,
    fullWidth: false,
    name: 'contact-method',
    value: 'email',
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
} satisfies Meta<typeof Radio>;

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
      <Radio {...args} defaultChecked hint="Currently selected." label="Checked" value="checked" />
      <Radio {...args} hint="Not selected yet." label="Unchecked" value="unchecked" />
      <Radio
        {...args}
        disabled
        hint="Cannot be changed right now."
        label="Disabled"
        value="disabled"
      />
      <Radio {...args} error="Please choose an option." label="Error state" value="error" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('email');

    return (
      <div style={{ display: 'grid', gap: 'var(--space-md)', width: '360px' }}>
        <Radio
          {...args}
          checked={selected === 'email'}
          hint="Select email as the preferred contact method."
          label="Email"
          name="preferred-contact"
          onChange={() => setSelected('email')}
          value="email"
        />
        <Radio
          {...args}
          checked={selected === 'sms'}
          hint="Select SMS as the preferred contact method."
          label="SMS"
          name="preferred-contact"
          onChange={() => setSelected('sms')}
          value="sms"
        />
        <p style={{ margin: 0 }}>Current value: {selected}</p>
      </div>
    );
  },
};
