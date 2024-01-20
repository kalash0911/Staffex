import React, { ReactNode } from 'react';

export type Variant = 'body' | 'sm' | 'ft' | 'h1' | 'h2' | string;

export type TTypographyProps = {
    children?: ReactNode;
    classNames?: string;
    variant?: Variant;
};

export const Typography = ({ children, classNames, variant = 'body' }: TTypographyProps) => {
    const classes = {
        body: 'text',
        sm: 'text sm',
        ft: 'ft',
        h1: 'main-title',
    } as Record<string, string>;

    const cn = classes[variant];

    if (variant === 'body') {
        return <p className={`${cn} ${classNames}`}>{children}</p>;
    }

    if (variant === 'sm') {
        return <p className={`${cn} ${classNames}`}>{children}</p>;
    }

    if (variant === 'ft') {
        return <p className={`${cn} ${classNames}`}>{children}</p>;
    }

    if (variant === 'h1') {
        return <h1 className={`${cn} ${classNames}`}>{children}</h1>;
    }
};
