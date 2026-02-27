import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast configuration
export const configureToast = () => {
  toast.configure({
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

// Success toast
export const showSuccessToast = (message) => {
  return toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

// Error toast
export const showErrorToast = (message) => {
  return toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

// Warning toast
export const showWarningToast = (message) => {
  return toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

// Info toast
export const showInfoToast = (message) => {
  return toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

// Default toast (for general notifications)
export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      return showSuccessToast(message);
    case 'error':
      return showErrorToast(message);
    case 'warning':
      return showWarningToast(message);
    case 'info':
    default:
      return showInfoToast(message);
  }
};
