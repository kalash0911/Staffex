import React, { ReactNode } from 'react';
interface IRadioBasicProps {
    text: string;
    checked?: true;
}

export const Radio = ({ text, checked }: IRadioBasicProps) => {
    return (
        <label className="radio-box">
            <input
                className="radio-input"
                name="radio"
                type="radio"
                checked={checked}
            />
            <div className="radio"></div>
            {text}
        </label>
    );
};
