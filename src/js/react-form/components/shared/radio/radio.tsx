import React, { forwardRef } from 'react';

interface IRadioBasicProps {
    text: string;
    checked?: boolean;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = forwardRef<HTMLInputElement, IRadioBasicProps>(
    ({ text, checked, onClick, onChange, ...rest }: IRadioBasicProps, ref) => {
        return (
            <label className="radio-box">
                <input
                    className="radio-input"
                    name="radio"
                    type="radio"
                    checked={checked}
                    onChange={onChange}
                    ref={ref}
                    {...rest}
                />
                <div className="radio"></div>
                {text}
            </label>
        );
    },
);
