import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default size, color, and accessible label', () => {
    render(<Spinner />);

    const spinner = screen.getByLabelText('Loading');

    expect(spinner).toBeInTheDocument();
    expect(spinner.tagName).toBe('OUTPUT');
    expect(spinner).toHaveClass('spinner', 'spinner--md', 'spinner--color-primary');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('renders without a color class when color is current', () => {
    render(<Spinner className="custom-spinner" color="current" label="Syncing" size="lg" />);

    const spinner = screen.getByLabelText('Syncing');
    const hasColorClass = [...spinner.classList].some((className) =>
      className.startsWith('spinner--color-'),
    );

    expect(spinner).toHaveClass('spinner', 'spinner--lg', 'custom-spinner');
    expect(hasColorClass).toBe(false);
  });
});
