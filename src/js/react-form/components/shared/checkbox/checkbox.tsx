import React, { ReactNode } from 'react';
interface ICheckboxBasicProps {
    text: string;
}

export const Checkbox = ({ text }: ICheckboxBasicProps) => {
    return (
        <label className="checkbox-box click-song">
            <input className="hidden-checkbox" type="checkbox" />
            <div className="checkbox">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.60938 6.64011L2.13963 6.10986L4.4995 8.46974L10.2344 2.73486L10.7646 3.26511L4.4995 9.53024L1.60938 6.64011Z"
                        fill="#030303"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.18555 6.64006L2.14006 5.68555L4.49994 8.04542L10.2348 2.31055L11.1893 3.26506L4.49994 9.95445L1.18555 6.64006ZM4.49994 8.46969L2.14006 6.10981L1.60981 6.64006L4.49994 9.53019L10.7651 3.26506L10.2348 2.73481L4.49994 8.46969Z"
                        fill="#030303"
                    />
                </svg>
            </div>
            <p className="checkbox-text">{text}</p>
        </label>
    );
};
