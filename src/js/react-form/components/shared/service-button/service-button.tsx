import React, { ReactNode } from 'react';
import { IconPlus } from '../../../icons/plus';

export type TServiceButtonProps = {
    icon?: ReactNode;
    onClick?: () => void;
    children?: ReactNode;
};

export const ServiceButton = ({ children, onClick, icon }: TServiceButtonProps) => {
    return (
        <button className="service-button" onClick={onClick}>
            <div className="icon-wrap">
                <IconPlus />
            </div>
            <div className="logo-wrap">{icon}</div>
            <p className="service-name">{children}</p>
        </button>
    );
};
