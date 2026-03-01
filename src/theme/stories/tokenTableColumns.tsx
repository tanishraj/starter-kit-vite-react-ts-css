import type { TokenTableColumn } from '../../components/TokenTable';
import type { TokenEntry } from '../../utils';
import type { ReactNode } from 'react';

export function createTokenTableColumns({
  renderPreview,
  renderValue,
}: {
  renderPreview?: (token: TokenEntry) => ReactNode;
  renderValue?: (token: TokenEntry) => ReactNode;
} = {}): TokenTableColumn<TokenEntry>[] {
  const columns: TokenTableColumn<TokenEntry>[] = [
    {
      id: 'token',
      header: 'Token',
      renderCell: (token) => <code className="token-name">{token.name}</code>,
    },
    {
      id: 'value',
      header: 'Value',
      renderCell: (token) => (
        <code className="token-value">{renderValue ? renderValue(token) : token.value}</code>
      ),
    },
  ];

  if (renderPreview) {
    columns.push({
      id: 'preview',
      header: 'Preview',
      renderCell: (token) => <div className="token-table-preview">{renderPreview(token)}</div>,
    });
  }

  return columns;
}
