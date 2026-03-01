import type { ReactNode } from 'react';
import { TokenTable, type TokenTableColumn } from '../../components/TokenTable';

export type TokenEntry = {
  name: string;
  value: string;
};

type TokenSectionProps = {
  title: string;
  description?: string;
  tokens: readonly TokenEntry[];
  renderPreview?: (token: TokenEntry) => ReactNode;
  renderValue?: (token: TokenEntry) => ReactNode;
};

const nameSortOptions = {
  numeric: true,
  sensitivity: 'base',
} as const;

function hasDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function getTokenValue(name: string): string {
  if (!hasDom()) {
    return '';
  }

  return window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function getTokens(names: readonly string[]): TokenEntry[] {
  return names.map((name) => ({
    name,
    value: getTokenValue(name),
  }));
}

export function getTokensByPrefix(prefixes: readonly string[]): TokenEntry[] {
  if (!hasDom()) {
    return [];
  }

  const computedStyle = window.getComputedStyle(document.documentElement);
  const names = new Set<string>();

  for (let index = 0; index < computedStyle.length; index += 1) {
    const propertyName = computedStyle.item(index);

    if (prefixes.some((prefix) => propertyName.startsWith(prefix))) {
      names.add(propertyName);
    }
  }

  return [...names]
    .sort((a, b) => a.localeCompare(b, undefined, nameSortOptions))
    .map((name) => ({
      name,
      value: computedStyle.getPropertyValue(name).trim(),
    }));
}

export function filterTokens(tokens: readonly TokenEntry[], matcher: RegExp): TokenEntry[] {
  return tokens.filter((token) => matcher.test(token.name));
}

export function TokenSection({
  title,
  description,
  tokens,
  renderPreview,
  renderValue,
}: TokenSectionProps) {
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

  return (
    <TokenTable
      columns={columns}
      description={description}
      emptyMessage="No matching tokens found."
      getRowKey={(token) => token.name}
      rows={tokens}
      title={title}
    />
  );
}
