import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { toastMock } = vi.hoisted(() => ({
  toastMock: Object.assign(vi.fn(), {
    dismiss: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
    promise: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
  }),
}));

vi.mock('react-toastify', () => ({
  ToastContainer: (props: { position?: string; theme?: string }) => (
    <div data-position={props.position} data-testid="toast-container" data-theme={props.theme} />
  ),
  toast: toastMock,
}));

import {
  Toast,
  dismissToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showPromiseToast,
  showSuccessToast,
  showToast,
  showWarningToast,
} from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    toastMock.mockClear();
    toastMock.dismiss.mockClear();
    toastMock.error.mockClear();
    toastMock.info.mockClear();
    toastMock.loading.mockClear();
    toastMock.promise.mockClear();
    toastMock.success.mockClear();
    toastMock.warning.mockClear();
  });

  it('renders the react-toastify container with forwarded props', () => {
    render(<Toast position="bottom-left" theme="dark" />);

    const container = screen.getByTestId('toast-container');

    expect(container).toHaveAttribute('data-position', 'bottom-left');
    expect(container).toHaveAttribute('data-theme', 'dark');
  });

  it('shows default toast', () => {
    showToast('Saved');

    expect(toastMock).toHaveBeenCalledWith('Saved', undefined);
  });

  it('shows typed toasts', () => {
    showSuccessToast('Success');
    showInfoToast('Info');
    showWarningToast('Warning');
    showErrorToast('Error');
    showLoadingToast('Loading');

    expect(toastMock.success).toHaveBeenCalledWith('Success', undefined);
    expect(toastMock.info).toHaveBeenCalledWith('Info', undefined);
    expect(toastMock.warning).toHaveBeenCalledWith('Warning', undefined);
    expect(toastMock.error).toHaveBeenCalledWith('Error', undefined);
    expect(toastMock.loading).toHaveBeenCalledWith('Loading', undefined);
  });

  it('supports promise toasts and dismiss', async () => {
    const promise = Promise.resolve('done');

    showPromiseToast(promise, {
      error: 'failed',
      pending: 'loading',
      success: 'done',
    });
    dismissToast('abc');

    expect(toastMock.promise).toHaveBeenCalledTimes(1);
    expect(toastMock.dismiss).toHaveBeenCalledWith('abc');
  });
});
