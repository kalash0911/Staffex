import React, { ReactNode } from 'react';
interface ITextFieldBasicProps {
    label?: string;
    placeholder: string;
}

export const Textarea = ({ label, placeholder }: ITextFieldBasicProps) => {
    return (
        <div className="input-wrap textarea-wrap">
            <label className="label">{label}</label>
            <textarea
                className="input textarea click-song"
                placeholder={placeholder}
            ></textarea>
        </div>
    );
};
