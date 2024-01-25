import React from 'react';
import { Button } from '../../shared/button/button';
import { IModalBasicProps } from '../../../models/common/modal';

export interface ISkipModalProps extends IModalBasicProps {
    onSkip: () => void;
    onClose: () => void;
}

export const SkipModal = ({ onClose, onSkip }: ISkipModalProps) => {
    return (
        <div>
            <h2 className="modal-title">Are you sure you want to skip this step?</h2>
            <p className="modal-text">If you skip this step, mentioned features will not be available.</p>
            <div className="modal-btn-wrap">
                <Button label="Cancel" onClick={onClose} variant="secondary" />
                <Button label="Skip anyway" onClick={onSkip} />
            </div>
        </div>
    );
};
