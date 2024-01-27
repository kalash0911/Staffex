import React, { FC, ReactNode } from 'react';
import { useModal } from '../../../context/modal-context';

export type TButtonProps = {
    label: string | ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    onClick?: () => void;
    requiredText?: string | ReactNode | null;
};

export const Button = ({ disabled, label, variant = 'primary', type = 'button', requiredText, onClick }: TButtonProps) => {
    const btnVarianrsClasses = {
        primary: '',
        secondary: 'transp',
    };

    return (
        <button
            className={`main-btn click-song ${btnVarianrsClasses[variant]}`}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            <span className="btn-text">{label}</span>
            <span className="icon-line top-left-line"></span>
            <span className="icon-line top-right-line"></span>
            <span className="icon-line bot-left-line"></span>
            <span className="icon-line bot-right-line"></span>
            {disabled && requiredText && <span className="text-required">{requiredText}</span>}
        </button>
    );
};

// Future improves? :)
export type TButtonWithModal = {
    modal: FC<any>;
    modalProps: any;
} & TButtonProps;

const withModal =
    <T,>(WrappedComponent: React.ComponentType<T>) =>
    ({ modal, modalProps, ...rest }: TButtonWithModal) => {
        const { openModal, hideModal } = useModal();

        const handleOnClick = () => {
            openModal(modal, {
                onClose: hideModal,
                ...modalProps,
            });
        };

        return <WrappedComponent {...(rest as T)} onClick={handleOnClick} />;
    };

export const ButtonWithModal = withModal(Button);
