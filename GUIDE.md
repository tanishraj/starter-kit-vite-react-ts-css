# UI Library Consumer Guide

## 1. Install

```bash
yarn add starter-kit-vite-react-ts-css
```

If you are consuming directly from this monorepo/workspace, link the package as usual in your workspace manager.

## 2. Import Global Theme Once

Import the global theme entry in your app root (for example `main.tsx`):

```ts
import 'starter-kit-vite-react-ts-css/src/theme/global.css';
```

Then render your app:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## 3. Use Components

```tsx
import { Button, Input, Spinner } from 'starter-kit-vite-react-ts-css/src/components';

export function Example() {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
      <Input label="Email" placeholder="you@example.com" />
      <Button color="primary" variant="solid">
        Continue
      </Button>
      <Spinner color="accent" />
    </div>
  );
}
```

## 4. Theme Mode (Light / Dark)

Set `data-theme` on the root element:

```html
<html data-theme="light"></html>
```

```html
<html data-theme="dark"></html>
```

You can toggle at runtime:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

## 5. Use Tokens in Consumer CSS

```css
.card {
  background: var(--color-surface);
  color: var(--color-foreground);
  border: 1px solid var(--color-border-muted);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
}
```

## 6. Token Reference in Storybook

Storybook includes live token pages under `Tokens/*`:

- `Tokens/Colors`
- `Tokens/Gradients`
- `Tokens/Spacing`
- `Tokens/Font Size`
- `Tokens/Typography`
- `Tokens/Line Height`
- `Tokens/Radius`
- `Tokens/Shadows`
- `Tokens/Breakpoints`

These stories read CSS variables at runtime, so values reflect the active theme instantly.
