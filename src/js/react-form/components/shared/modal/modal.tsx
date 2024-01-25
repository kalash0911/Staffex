import React, { useEffect } from 'react';
import { IModalBasicProps } from '../../../models/common/modal';
import { CrossIcon } from '../../../icons/cross';

export const Modal = ({ open, onClose, children, size = 'md' }: IModalBasicProps) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add('body_lock');
        } else {
            document.body.classList.remove('body_lock');
        }
    }, [open]);

    const isLgSize = size === 'lg';
    const closeButton = (
        <button className="btn-close" onClick={onClose}>
            <CrossIcon />
        </button>
    );
    return (
        open && (
            <div className={`modal-wrap ${size}`}>
                {isLgSize && closeButton}
                <div className="modal-content">
                    {children} {!isLgSize && closeButton}
                </div>
                <div className="backdrop" onClick={onClose}></div>
            </div>
        )
    );
};
