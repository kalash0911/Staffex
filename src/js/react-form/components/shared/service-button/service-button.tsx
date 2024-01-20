import React, { ReactNode } from 'react';
import { IconPlus } from '../../../icons/plus';

export type TServiceButtonProps = {
    onClick?: () => void;
    children?: ReactNode;
};

export const ServiceButton = ({ children, onClick }: TServiceButtonProps) => {
    return (
        <button className="service-button" onClick={onClick}>
            <div className="icon-wrap">
                <IconPlus />
            </div>
            <div className="logo-wrap">
                <img src="../images/icons/Gmail.svg" alt="Logo Email" />
            </div>
            <p className="service-name">{children}</p>
        </button>
    );
};
