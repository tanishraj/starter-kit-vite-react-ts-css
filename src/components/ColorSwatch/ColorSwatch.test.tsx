import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ColorSwatch } from './ColorSwatch';
import { SwatchType } from './types';

describe('ColorSwatch', () => {
  it('renders the label, token value, and uses color mode by default', () => {
    const { container } = render(
      <ColorSwatch
        label="text-warning-primary"
        token={{ name: '--color-text-warning-primary', value: '#dc6803' }}
      />,
    );

    expect(screen.getByText('text-warning-primary')).toBeInTheDocument();
    expect(screen.getByText('#dc6803')).toBeInTheDocument();

    const swatch = container.querySelector('.color-palette-swatch');

    expect(swatch).toBeInTheDocument();
    expect(swatch).toHaveAttribute(
      'style',
      expect.stringContaining('background-color: var(--color-text-warning-primary);'),
    );
  });

  it('uses background-image when the swatch type is gradient', () => {
    const { container } = render(
      <ColorSwatch
        label="gradient-feedback-caution"
        swatchType={SwatchType.GRADIENT}
        token={{ name: '--gradient-feedback-caution', value: 'var(--gradient-bg-warning)' }}
      />,
    );

    const swatch = container.querySelector('.color-palette-swatch');

    expect(swatch).toBeInTheDocument();
    expect(swatch).toHaveAttribute(
      'style',
      expect.stringContaining('background-image: var(--gradient-feedback-caution);'),
    );
  });
});
