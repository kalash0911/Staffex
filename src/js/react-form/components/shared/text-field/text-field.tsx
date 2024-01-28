import React, { ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type TTextFieldBasicProps = {
    label?: string | ReactNode;
    type: string;
    placeholder?: string;
    errorMsg?: string | FieldError['message'];
    className?: string;
    required?: boolean;
    id?: string;
    value?: string;
} & Record<string, any>;

export const TextField = forwardRef<HTMLInputElement, TTextFieldBasicProps>(
    ({ label, type, placeholder, errorMsg, className, required, id, value, ...restProps }: TTextFieldBasicProps, ref) => {
        const inputId = id || crypto.randomUUID();

        return (
            <div className={`input-wrap ${className ? className : ''} ${errorMsg ? 'error-input' : ''}`}>
                {label && (
                    <label className="label" htmlFor={inputId}>
                        {label} {required && <sup>*</sup>}
                    </label>
                )}
                <input
                    className="input click-song"
                    type={type}
                    placeholder={placeholder}
                    id={inputId}
                    {...restProps}
                    ref={ref}
                    value={value}
                />
                {errorMsg && <p className="error">{errorMsg}</p>}
            </div>
        );
    },
);
