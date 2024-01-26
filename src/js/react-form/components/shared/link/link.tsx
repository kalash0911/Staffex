import React, { ReactNode } from 'react';

export type TLinkProps = {
    href?: string;
    children: ReactNode;
    size?: 'sm' | 'md';
    className?: string;
    onClick?: () => void;
};

export const Link = ({ href = '#', children, className = '', size = 'sm', onClick, ...rest }: TLinkProps) => {
    if (onClick) {
        return (
            <button className={`link button-link ${size} ${className}`} onClick={onClick} {...rest}>
                {children}
            </button>
        );
    }

    return (
        <a href={href} className={`link ${size} ${className}`} {...rest}>
            {children}
        </a>
    );
};
