import React, { ReactNode } from 'react';
interface ITextFieldBasicProps {
    label?: string | ReactNode;
    type: string;
    placeholder?: string;
    errorMsg?: string;
    className?: string;
    required?: boolean;
}

export const TextField = ({
    label,
    type,
    placeholder,
    errorMsg,
    className,
    required,
}: ITextFieldBasicProps) => {
    return (
        <div className={`input-wrap ${className}`}>
            {label && (
                <label className="label">
                    {label} {required && <sup>*</sup>}
                </label>
            )}
            <input
                className="input click-song"
                type={type}
                placeholder={placeholder}
            />
            {errorMsg && <p className="error">{errorMsg}</p>}
        </div>
    );
};
