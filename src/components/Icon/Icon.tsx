import clsx from 'clsx';

import type { IconProps } from './types';
import './Icon.css';

const ICON_SOURCE_BY_PATH = import.meta.glob('../../assets/icons/**/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const ICON_ENTRIES = Object.entries(ICON_SOURCE_BY_PATH).sort(([aPath], [bPath]) =>
  aPath.localeCompare(bPath, undefined, { sensitivity: 'base' }),
);

const ICON_SOURCES = ICON_ENTRIES.reduce<Record<string, string>>((acc, [path, source]) => {
  const fileName = path.replace(/\\/g, '/').split('/').at(-1) ?? path;
  const name = fileName.replace(/\.svg$/i, '');

  // Keep first hit so local root icons can intentionally override library assets.
  if (!acc[name]) {
    acc[name] = source;
  }

  return acc;
}, {});

export const ICON_NAMES = Object.keys(ICON_SOURCES).sort((a, b) =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  }),
);

export function Icon({
  name,
  size = 'md',
  color = 'current',
  decorative,
  title,
  className,
  style,
  ...rest
}: IconProps) {
  const iconSource = ICON_SOURCES[name];
  if (!iconSource) {
    if (import.meta.env.DEV) {
      console.warn(
        `[Icon] Missing icon "${name}". Add src/assets/icons/${name}.svg (or any nested folder) or use one of: ${ICON_NAMES.join(', ')}`,
      );
    }
    return null;
  }

  const isDecorative = decorative ?? !title;
  const sizeStyle =
    typeof size === 'number'
      ? {
          width: `${size}px`,
          height: `${size}px`,
        }
      : undefined;
  const ariaLabel = !isDecorative ? rest['aria-label'] ?? title ?? name : undefined;

  return (
    <span
      {...rest}
      aria-hidden={isDecorative || undefined}
      aria-label={ariaLabel}
      className={clsx(
        'icon',
        typeof size !== 'number' && `icon--${size}`,
        color !== 'current' && `icon--color-${color}`,
        className,
      )}
      data-icon-name={name}
      role={!isDecorative ? 'img' : undefined}
      style={{ ...style, ...sizeStyle }}
      title={title}
      dangerouslySetInnerHTML={{ __html: iconSource }}
    />
  );
}
