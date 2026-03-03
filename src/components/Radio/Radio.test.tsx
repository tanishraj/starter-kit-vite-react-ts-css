import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './Radio';

describe('Radio', () => {
  it('renders label and hint with aria-describedby', () => {
    render(<Radio hint="Receive updates by email" label="Email" name="contact" value="email" />);

    const radio = screen.getByLabelText('Email');
    const hint = screen.getByText('Receive updates by email');
    const describedBy = radio.getAttribute('aria-describedby') ?? '';

    expect(hint).toBeInTheDocument();
    expect(describedBy).toContain(hint.id);
    expect(radio).not.toHaveAttribute('aria-invalid');
  });

  it('renders error state and marks the input invalid', () => {
    render(<Radio error="Please select email" hint="Optional hint" label="Email" value="email" />);

    const radio = screen.getByLabelText('Email');
    const error = screen.getByText('Please select email');
    const describedBy = radio.getAttribute('aria-describedby') ?? '';

    expect(screen.queryByText('Optional hint')).not.toBeInTheDocument();
    expect(radio.closest('.radio')).toHaveClass('radio--invalid');
    expect(describedBy).toContain(error.id);
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn<(value: string) => void>();
    const user = userEvent.setup();

    render(
      <Radio
        label="Email"
        name="contact"
        onChange={(event) => onChange(event.currentTarget.value)}
        value="email"
      />,
    );

    await user.click(screen.getByLabelText('Email'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('email');
  });
});
