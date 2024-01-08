import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';

export const Modal = ({ open, onClose, children }: IModalBasicProps) => {
  return (
    open && (
      <div className="modal-wrap">
        <button onClick={onClose}>X</button>
        {children}
      </div>
    )
  );
};
