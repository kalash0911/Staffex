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
            <h2>Are you sure you want to skip this step?</h2>
            <p>
                If you skip this step, mentioned features will not be available. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
            </p>
            <div className="btn-wrap">
                <Button label="Cancel" onClick={onClose} />
                <Button label="Skip" onClick={onSkip} />
            </div>
        </div>
    );
};
