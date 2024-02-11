import { ReactNode } from 'react';

export interface IShowToast {
    error: (msg?: string | ReactNode) => void;
    warning: (msg: string | ReactNode) => void;
}
