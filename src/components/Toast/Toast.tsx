import { ToastContainer, toast } from 'react-toastify';

import type {
  ToastId,
  ToastMessage,
  ToastMessageOptions,
  ToastPromiseOptions,
  ToastProps,
} from './types';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.styles.css';

export function Toast({
  autoClose = 4000,
  className = 'toastify-container',
  closeOnClick = true,
  draggable = true,
  hideProgressBar = false,
  newestOnTop = true,
  pauseOnFocusLoss = true,
  pauseOnHover = true,
  position = 'top-right',
  progressClassName = 'toastify-progress',
  theme = 'light',
  toastClassName = 'toastify-toast',
  ...rest
}: ToastProps) {
  return (
    <ToastContainer
      autoClose={autoClose}
      className={className}
      closeOnClick={closeOnClick}
      draggable={draggable}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      pauseOnFocusLoss={pauseOnFocusLoss}
      pauseOnHover={pauseOnHover}
      position={position}
      progressClassName={progressClassName}
      theme={theme}
      toastClassName={toastClassName}
      {...rest}
    />
  );
}

export function showToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast(content, options);
}

export function showSuccessToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast.success(content, options);
}

export function showInfoToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast.info(content, options);
}

export function showWarningToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast.warning(content, options);
}

export function showErrorToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast.error(content, options);
}

export function showLoadingToast(content: ToastMessage, options?: ToastMessageOptions): ToastId {
  return toast.loading(content, options);
}

export function showPromiseToast<TData = unknown, TError = unknown, TPending = unknown>(
  promise: Promise<TData> | (() => Promise<TData>),
  options: ToastPromiseOptions<TData, TError, TPending>,
  toastOptions?: ToastMessageOptions,
) {
  return toast.promise(promise, options, toastOptions);
}

export function dismissToast(id?: ToastId) {
  toast.dismiss(id);
}
