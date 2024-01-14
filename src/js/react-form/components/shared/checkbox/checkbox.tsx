import React from 'react';
import { CheckIcon } from '../../../icons/check';

interface ICheckboxBasicProps {
    text: string;
}

export const Checkbox = ({ text }: ICheckboxBasicProps) => {
    return (
        <label className="checkbox-box click-song">
            <input className="hidden-checkbox" type="checkbox" />
            <div className="checkbox">
                <CheckIcon />
            </div>
            <p className="checkbox-text">{text}</p>
        </label>
    );
};
