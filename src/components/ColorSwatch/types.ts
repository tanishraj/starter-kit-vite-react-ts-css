export const SwatchType = {
  GRADIENT: 'gradient',
  COLOR: 'color',
} as const;

export type SwatchType = (typeof SwatchType)[keyof typeof SwatchType];

export type Token = {
  name: string;
  value: string;
};
