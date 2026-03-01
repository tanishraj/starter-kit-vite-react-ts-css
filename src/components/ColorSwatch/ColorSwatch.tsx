import { SwatchType, type Token } from './types';

import type { FC } from 'react';

import './ColorSwatch.styles.css';

export interface IColorSwatchProps {
  label: string;
  swatchType?: SwatchType;
  token: Token;
}

export const ColorSwatch: FC<IColorSwatchProps> = ({
  label,
  swatchType = SwatchType.COLOR,
  token,
}) => {
  return (
    <div className="color-palette-item">
      <div
        className="color-palette-swatch"
        style={
          swatchType === SwatchType.GRADIENT
            ? { backgroundImage: `var(${token.name})` }
            : { backgroundColor: `var(${token.name})` }
        }
      />
      <span className="color-palette-label">{label}</span>
      <code className="token-value">{token.value}</code>
    </div>
  );
};
