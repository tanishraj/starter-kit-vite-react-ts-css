import { render, screen } from '@testing-library/react';
import { forwardRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { agGridPropsSpy, withParamsMock } = vi.hoisted(() => ({
  agGridPropsSpy: vi.fn(),
  withParamsMock: vi.fn((config) => ({
    config,
    kind: 'generated-theme',
  })),
}));

vi.mock('ag-grid-community', () => ({
  ClientSideRowModelModule: { moduleName: 'ClientSideRowModelModule' },
  InfiniteRowModelModule: { moduleName: 'InfiniteRowModelModule' },
  PaginationModule: { moduleName: 'PaginationModule' },
  RowSelectionModule: { moduleName: 'RowSelectionModule' },
  themeQuartz: {
    withParams: withParamsMock,
  },
  ValidationModule: { moduleName: 'ValidationModule' },
}));

vi.mock('ag-grid-react', () => ({
  AgGridReact: Object.assign(
    forwardRef(function MockAgGridReact(props: Record<string, unknown>, _ref) {
      agGridPropsSpy(props);

      return <div data-testid="ag-grid-react" />;
    }),
    {
      displayName: 'MockAgGridReact',
    },
  ),
}));

import { AgGrid } from './AgGrid';
import { defaultAgGridThemeConfig } from './theme';

describe('AgGrid', () => {
  beforeEach(() => {
    agGridPropsSpy.mockClear();
    withParamsMock.mockClear();
  });

  it('renders with the shared default theme config and wrapper sizing', () => {
    render(<AgGrid columnDefs={[]} rowData={[]} />);

    const grid = screen.getByTestId('ag-grid-react');
    const shell = grid.parentElement;

    expect(shell).toHaveClass('ag-grid-shell');
    expect(shell).toHaveStyle({
      height: '32rem',
      minHeight: '20rem',
      width: '100%',
    });
    expect(withParamsMock).toHaveBeenCalledWith(defaultAgGridThemeConfig);
    expect(agGridPropsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'ag-grid',
        columnDefs: [],
        containerStyle: {
          height: '100%',
          width: '100%',
        },
        modules: expect.arrayContaining([{ moduleName: 'ClientSideRowModelModule' }]),
        rowData: [],
        theme: {
          config: defaultAgGridThemeConfig,
          kind: 'generated-theme',
        },
      }),
    );
  });

  it('merges theme config overrides and forwards AG Grid props', () => {
    render(
      <AgGrid
        className="custom-grid"
        columnDefs={[]}
        containerStyle={{ backgroundColor: 'rgb(0 0 0 / 0.4)' }}
        height={480}
        pagination
        rowData={[]}
        rowSelection="multiple"
        themeConfig={{ accentColor: 'tomato' }}
        wrapperClassName="custom-shell"
        wrapperStyle={{ maxWidth: '70rem' }}
      />,
    );

    const grid = screen.getByTestId('ag-grid-react');
    const shell = grid.parentElement;

    expect(shell).toHaveClass('ag-grid-shell', 'custom-shell');
    expect(shell).toHaveStyle({
      height: '480px',
      maxWidth: '70rem',
      minHeight: '20rem',
      width: '100%',
    });
    expect(withParamsMock).toHaveBeenCalledWith({
      ...defaultAgGridThemeConfig,
      accentColor: 'tomato',
    });
    expect(agGridPropsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'ag-grid custom-grid',
        containerStyle: {
          backgroundColor: 'rgb(0 0 0 / 0.4)',
          height: '100%',
          width: '100%',
        },
        modules: expect.arrayContaining([
          { moduleName: 'ClientSideRowModelModule' },
          { moduleName: 'PaginationModule' },
          { moduleName: 'RowSelectionModule' },
        ]),
        pagination: true,
        rowSelection: 'multiple',
        theme: {
          config: {
            ...defaultAgGridThemeConfig,
            accentColor: 'tomato',
          },
          kind: 'generated-theme',
        },
      }),
    );
  });

  it('uses an explicitly provided theme without generating a default one', () => {
    render(<AgGrid columnDefs={[]} rowData={[]} theme="legacy" />);

    expect(withParamsMock).not.toHaveBeenCalled();
    expect(agGridPropsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'legacy',
      }),
    );
  });

  it('does not force a minimum height for auto-height layout', () => {
    render(<AgGrid columnDefs={[]} domLayout="autoHeight" rowData={[]} />);

    const grid = screen.getByTestId('ag-grid-react');
    const shell = grid.parentElement;

    expect(shell).toHaveStyle('height: auto; min-height: 0px; width: 100%;');
    expect(agGridPropsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'ag-grid ag-grid--auto-height ag-grid--empty',
        containerStyle: {
          height: 'auto',
          width: '100%',
        },
      }),
    );
  });
});
