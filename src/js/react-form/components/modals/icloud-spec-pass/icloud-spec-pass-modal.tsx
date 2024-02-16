import React from 'react';
import { Button } from '../../shared/button/button';
import { IModalBasicProps } from '../../../models/common/modal';
import styles from './icloud-spec-pass-modal.module.scss';

export interface ISkipModalProps extends IModalBasicProps {
    onSkip: () => void;
    onClose: () => void;
}

export const ICloudSpecPassword = ({ onClose }: ISkipModalProps) => {
    return (
        <div>
            <div className={styles.videoWrap}>
                <video controls src="./files/icloud-password.mp4"></video>
            </div>
        </div>
    );
};
