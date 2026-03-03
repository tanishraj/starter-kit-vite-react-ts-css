import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from '../Radio';

import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders label and hint for the group', () => {
    render(
      <RadioGroup hint="Choose one option" label="Preferred contact" name="contact">
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>,
    );

    const group = screen.getByRole('radiogroup', { name: 'Preferred contact' });
    const hint = screen.getByText('Choose one option');

    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('aria-describedby', hint.id);
  });

  it('supports uncontrolled selection with defaultValue', async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup defaultValue="email" label="Preferred contact" name="contact">
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>,
    );

    const email = screen.getByLabelText('Email') as HTMLInputElement;
    const sms = screen.getByLabelText('SMS') as HTMLInputElement;

    expect(email).toBeChecked();
    expect(sms).not.toBeChecked();

    await user.click(sms);

    expect(email).not.toBeChecked();
    expect(sms).toBeChecked();
  });

  it('calls onValueChange when a new radio is selected', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup label="Preferred contact" name="contact" onValueChange={onValueChange}>
        <Radio label="Email" value="email" />
        <Radio label="SMS" value="sms" />
      </RadioGroup>,
    );

    await user.click(screen.getByLabelText('SMS'));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('sms');
  });

  it('supports controlled selection', async () => {
    const user = userEvent.setup();

    function ControlledExample() {
      const [value, setValue] = useState('email');

      return (
        <RadioGroup label="Preferred contact" onValueChange={setValue} value={value}>
          <Radio label="Email" value="email" />
          <Radio label="SMS" value="sms" />
        </RadioGroup>
      );
    }

    render(<ControlledExample />);

    const email = screen.getByLabelText('Email') as HTMLInputElement;
    const sms = screen.getByLabelText('SMS') as HTMLInputElement;

    expect(email).toBeChecked();

    await user.click(sms);

    expect(email).not.toBeChecked();
    expect(sms).toBeChecked();
  });
});
