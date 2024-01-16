import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';

export const Modal = ({ open, onClose, children, size = 'md' }: IModalBasicProps) => {
    return (
        open && (
            <div className={`modal-wrap ${size}`}>
                <button onClick={onClose}>X</button>
                {children}
                <div className="backdrop"></div>
            </div>
        )
    );
};
