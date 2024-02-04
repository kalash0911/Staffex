import React, { forwardRef } from 'react';

interface ITextFieldBasicProps {
    label?: string;
    placeholder: string;
    maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextFieldBasicProps>(
    ({ label, placeholder, ...rest }: ITextFieldBasicProps, ref) => {
        return (
            <div className="input-wrap textarea-wrap">
                <label className="label">{label}</label>
                <textarea className="input textarea click-song" placeholder={placeholder} ref={ref} {...rest}></textarea>
            </div>
        );
    },
);
