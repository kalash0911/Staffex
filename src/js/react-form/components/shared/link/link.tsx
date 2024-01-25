import React, { ReactNode } from 'react';

export type TLinkProps = {
    href: string;
    children: ReactNode;
};

export const Link = ({ href, children, ...rest }: TLinkProps) => {
    return (
        <a href={href} {...rest}>
            {children}
        </a>
    );
};
