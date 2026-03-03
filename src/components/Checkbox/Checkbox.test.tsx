import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders label and hint with aria-describedby', () => {
    render(<Checkbox hint="Receive weekly updates" label="Subscribe" />);

    const checkbox = screen.getByLabelText('Subscribe');
    const hint = screen.getByText('Receive weekly updates');
    const describedBy = checkbox.getAttribute('aria-describedby') ?? '';

    expect(hint).toBeInTheDocument();
    expect(describedBy).toContain(hint.id);
    expect(checkbox).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders error state and marks the input invalid', () => {
    render(<Checkbox error="Please accept the terms" hint="Optional hint" label="Terms" />);

    const checkbox = screen.getByLabelText('Terms');
    const error = screen.getByText('Please accept the terms');
    const describedBy = checkbox.getAttribute('aria-describedby') ?? '';

    expect(screen.queryByText('Optional hint')).not.toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox.closest('.chk')).toHaveClass('chk--invalid');
    expect(describedBy).toContain(error.id);
  });

  it('supports the indeterminate state', () => {
    render(<Checkbox indeterminate label="Select all" />);

    const checkbox = screen.getByLabelText('Select all') as HTMLInputElement;

    expect(checkbox.indeterminate).toBe(true);
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn<(checked: boolean) => void>();
    const user = userEvent.setup();

    render(
      <Checkbox
        label="Enable alerts"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />,
    );

    await user.click(screen.getByLabelText('Enable alerts'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
