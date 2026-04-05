import type { Theme, ThemeDefaultParams } from 'ag-grid-community';
import type { AgGridReactProps } from 'ag-grid-react';
import type { CSSProperties } from 'react';

export type AgGridThemeConfig = Partial<ThemeDefaultParams>;

export type AgGridThemeOption = Theme | 'legacy';

export type AgGridProps<TData = unknown> = AgGridReactProps<TData> & {
  height?: CSSProperties['height'];
  minHeight?: CSSProperties['minHeight'];
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  themeConfig?: AgGridThemeConfig;
};
