import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders label and hint with aria-describedby', () => {
    render(<Input hint="Use your work email" label="Email" />);

    const input = screen.getByLabelText('Email');
    const hint = screen.getByText('Use your work email');
    const describedBy = input.getAttribute('aria-describedby') ?? '';

    expect(hint).toBeInTheDocument();
    expect(describedBy).toContain(hint.id);
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders error state and overrides hint', () => {
    render(<Input error="Email is required" hint="Use your work email" label="Email" />);

    const input = screen.getByLabelText('Email');
    const error = screen.getByText('Email is required');
    const describedBy = input.getAttribute('aria-describedby') ?? '';

    expect(screen.queryByText('Use your work email')).not.toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.closest('.inp')).toHaveClass('inp--tone-danger');
    expect(describedBy).toContain(error.id);
  });

  it('clears value and calls onClear when clear button is clicked', async () => {
    const onClear = vi.fn();
    const user = userEvent.setup();

    render(<Input clearable defaultValue="hello" label="Search" onClear={onClear} />);

    const input = screen.getByLabelText('Search') as HTMLInputElement;
    const clearButton = screen.getByRole('button', { name: 'Clear input' });

    expect(input).toHaveValue('hello');

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
  });
});
