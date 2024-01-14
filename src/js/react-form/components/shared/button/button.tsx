import React, { ReactNode } from 'react';

export type TButtonProps = {
    label: string | ReactNode;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    onClick?: () => void;
};

export const Button = ({ disabled, label, variant = 'primary', onClick }: TButtonProps) => {
    const btnVarianrsClasses = {
        primary: '',
        secondary: 'transp',
    };

    return (
        <button className={`main-btn click-song ${btnVarianrsClasses[variant]}`} disabled={disabled} onClick={onClick}>
            <span className="btn-text">{label}</span>
            <span className="icon-line top-left-line"></span>
            <span className="icon-line top-right-line"></span>
            <span className="icon-line bot-left-line"></span>
            <span className="icon-line bot-right-line"></span>
        </button>
    );
};
