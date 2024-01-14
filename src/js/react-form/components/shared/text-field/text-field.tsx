import React, { ReactNode, forwardRef, useId } from 'react';
import { FieldError } from 'react-hook-form';

type TTextFieldBasicProps = {
    label?: string | ReactNode;
    type: string;
    placeholder?: string;
    errorMsg?: string | FieldError['message'];
    className?: string;
    required?: boolean;
    id?: string;
} & Record<string, any>;

export const TextField = forwardRef<HTMLInputElement, TTextFieldBasicProps>(function TextField(
    { label, type, placeholder, errorMsg, className, required, id, ...restProps }: TTextFieldBasicProps,
    ref,
) {
    const inputId = id || useId();

    return (
        <div className={`input-wrap ${className ? className : ''}`}>
            {label && (
                <label className="label" htmlFor={inputId}>
                    {label} {required && <sup>*</sup>}
                </label>
            )}
            <input className="input click-song" type={type} placeholder={placeholder} id={inputId} {...restProps} ref={ref} />
            {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
    );
});
