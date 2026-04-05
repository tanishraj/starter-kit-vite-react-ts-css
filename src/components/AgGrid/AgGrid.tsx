import {
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  PaginationModule,
  RowSelectionModule,
  ValidationModule,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

import { createAgGridTheme } from './theme';

import type { AgGridProps } from './types';
import type { Module } from 'ag-grid-community';
import type { CSSProperties, ForwardedRef, ReactElement } from 'react';
import './AgGrid.css';

function AgGridInner<TData>(
  {
    className,
    containerStyle,
    gridOptions,
    height,
    minHeight,
    modules,
    theme,
    themeConfig,
    wrapperClassName,
    wrapperStyle,
    ...rest
  }: AgGridProps<TData>,
  ref: ForwardedRef<AgGridReact<TData>>,
) {
  const baseContainerStyle = containerStyle as CSSProperties | undefined;
  const domLayout = rest.domLayout ?? gridOptions?.domLayout;
  const rowModelType = rest.rowModelType ?? gridOptions?.rowModelType;
  const rowData = rest.rowData ?? gridOptions?.rowData;
  const isEmptyClientSideRowData = Array.isArray(rowData) && rowData.length === 0;
  const resolvedTheme = useMemo(() => {
    if (theme) {
      return theme;
    }

    if (gridOptions?.theme) {
      return gridOptions.theme;
    }

    return createAgGridTheme(themeConfig);
  }, [gridOptions?.theme, theme, themeConfig]);
  const resolvedModules = useMemo(() => {
    const defaultModules: Module[] = [];

    if (!rowModelType || rowModelType === 'clientSide') {
      defaultModules.push(ClientSideRowModelModule);
    }

    if (rowModelType === 'infinite') {
      defaultModules.push(InfiniteRowModelModule);
    }

    if (rest.pagination || gridOptions?.pagination) {
      defaultModules.push(PaginationModule);
    }

    if (rest.rowSelection || gridOptions?.rowSelection) {
      defaultModules.push(RowSelectionModule);
    }

    if (import.meta.env.DEV) {
      defaultModules.push(ValidationModule);
    }

    if (!modules?.length) {
      return defaultModules;
    }

    const mergedModules = [...defaultModules];

    for (const module of modules) {
      if (!mergedModules.includes(module)) {
        mergedModules.push(module);
      }
    }

    return mergedModules;
  }, [
    gridOptions?.pagination,
    gridOptions?.rowSelection,
    modules,
    rest.pagination,
    rest.rowSelection,
    rowModelType,
  ]);

  const mergedContainerStyle: CSSProperties = {
    ...(baseContainerStyle ?? {}),
    height: domLayout === 'autoHeight' ? 'auto' : '100%',
    width: '100%',
  };

  const mergedWrapperStyle: CSSProperties = {
    height:
      height ?? baseContainerStyle?.height ?? (domLayout === 'autoHeight' ? 'auto' : '32rem'),
    minHeight:
      minHeight ??
      baseContainerStyle?.minHeight ??
      (domLayout === 'autoHeight' ? '0px' : '20rem'),
    width: baseContainerStyle?.width ?? '100%',
    ...(wrapperStyle ?? {}),
  };

  return (
    <div className={clsx('ag-grid-shell', wrapperClassName)} style={mergedWrapperStyle}>
      <AgGridReact<TData>
        {...rest}
        ref={ref}
        className={clsx(
          'ag-grid',
          domLayout === 'autoHeight' && 'ag-grid--auto-height',
          domLayout === 'autoHeight' &&
            (!rowModelType || rowModelType === 'clientSide') &&
            isEmptyClientSideRowData &&
            'ag-grid--empty',
          className,
        )}
        containerStyle={mergedContainerStyle}
        gridOptions={gridOptions}
        modules={resolvedModules}
        theme={resolvedTheme}
      />
    </div>
  );
}

export const AgGrid = forwardRef(AgGridInner) as <TData = unknown>(
  props: AgGridProps<TData> & { ref?: ForwardedRef<AgGridReact<TData>> },
) => ReactElement;
