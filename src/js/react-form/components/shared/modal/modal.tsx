import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';
import { CrossIcon } from '../../../icons/cross';

export const Modal = ({ open, onClose, children, size = 'md' }: IModalBasicProps) => {
    return (
        open && (
            <div className={`modal-wrap ${size}`}>
                <button className="btn-close" onClick={onClose}>
                    <CrossIcon />
                </button>
                {children}
                <div className="backdrop" onClick={onClose}></div>
            </div>
        )
    );
};
