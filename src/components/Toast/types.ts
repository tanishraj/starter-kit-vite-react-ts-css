import type {
  Id,
  ToastContainerProps,
  ToastContent,
  ToastOptions,
  ToastPromiseParams,
} from 'react-toastify';

export type ToastProps = ToastContainerProps;

export type ToastMessage = ToastContent;

export type ToastMessageOptions = ToastOptions;

export type ToastPromiseOptions<TData = unknown, TError = unknown, TPending = unknown> =
  ToastPromiseParams<TData, TError, TPending>;

export type ToastId = Id;
