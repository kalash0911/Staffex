import { ReactNode } from 'react';

export interface IModalBasicProps {
    open?: boolean;
    size?: 'sm' | 'md' | 'lg';
    children?: ReactNode;
    onClose?: () => void;
}
