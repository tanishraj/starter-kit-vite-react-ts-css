import { themeQuartz, type Theme } from 'ag-grid-community';

import type { AgGridThemeConfig } from './types';

export const defaultAgGridThemeConfig = {
  accentColor: 'var(--color-fg-brand-primary)',
  backgroundColor: 'var(--color-bg-primary)',
  borderColor: 'var(--color-border-secondary)',
  borderRadius: 'var(--radius-md)',
  browserColorScheme: 'inherit',
  cardShadow: 'var(--shadow-md)',
  chromeBackgroundColor: 'var(--color-bg-secondary)',
  columnBorder: {
    color: 'var(--color-border-tertiary)',
  },
  dataBackgroundColor: 'var(--color-bg-primary)',
  dataFontSize: 14,
  dialogShadow: 'var(--shadow-xl)',
  fontFamily: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
  fontSize: 14,
  foregroundColor: 'var(--color-fg-primary)',
  headerBackgroundColor: 'var(--color-bg-secondary)',
  headerColumnBorder: {
    color: 'var(--color-border-secondary)',
  },
  headerColumnResizeHandleColor: 'transparent',
  headerColumnResizeHandleWidth: 0,
  headerFontFamily: { ref: 'fontFamily' },
  headerFontWeight: 600,
  headerRowBorder: {
    color: 'var(--color-border-secondary)',
  },
  headerTextColor: 'var(--color-text-secondary)',
  iconColor: 'var(--color-fg-secondary)',
  menuBackgroundColor: 'var(--color-bg-primary)',
  menuTextColor: 'var(--color-text-primary)',
  modalOverlayBackgroundColor: 'color-mix(in srgb, var(--color-bg-overlay) 18%, transparent)',
  oddRowBackgroundColor: 'var(--color-bg-secondary_subtle)',
  panelBackgroundColor: 'var(--color-bg-primary)',
  popupShadow: 'var(--shadow-lg)',
  rangeSelectionBackgroundColor:
    'color-mix(in srgb, var(--color-bg-brand-secondary) 32%, transparent)',
  rangeSelectionBorderColor: 'var(--color-border-brand)',
  rowBorder: {
    color: 'var(--color-border-tertiary)',
  },
  rowHoverColor: 'var(--color-bg-primary_hover)',
  selectedRowBackgroundColor: 'var(--color-bg-brand-primary)',
  sideBarBackgroundColor: 'var(--color-bg-primary_alt)',
  sideButtonBarBackgroundColor: 'var(--color-bg-secondary)',
  sideButtonSelectedBackgroundColor: 'var(--color-bg-brand-primary)',
  sideButtonSelectedUnderlineColor: 'var(--color-fg-brand-primary)',
  spacing: 'var(--space-sm)',
  subtleTextColor: 'var(--color-text-tertiary)',
  textColor: 'var(--color-text-primary)',
  tooltipBackgroundColor: 'var(--color-bg-primary-solid)',
  tooltipBorder: {
    color: 'var(--color-bg-primary-solid)',
  },
  tooltipTextColor: 'var(--color-text-white)',
  valueChangeDeltaDownColor: 'var(--color-fg-error-primary)',
  valueChangeDeltaUpColor: 'var(--color-fg-success-primary)',
  wrapperBorder: {
    color: 'var(--color-border-secondary)',
  },
  wrapperBorderRadius: 'var(--radius-xl)',
} satisfies AgGridThemeConfig;

export function createAgGridTheme(themeConfig: AgGridThemeConfig = {}): Theme {
  return themeQuartz.withParams({
    ...defaultAgGridThemeConfig,
    ...themeConfig,
  });
}
