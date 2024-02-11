import { Bounce, ToastOptions } from 'react-toastify';

export const ERR_TOAST_CONFIG: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    transition: Bounce,
};
