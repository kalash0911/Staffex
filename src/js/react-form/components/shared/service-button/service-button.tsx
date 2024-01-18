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
            {children}
        </button>
    );
};
