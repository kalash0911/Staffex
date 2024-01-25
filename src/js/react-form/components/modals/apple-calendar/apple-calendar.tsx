import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { IModalBasicProps } from '../../../models/common/modal';

export interface IAppleCalendarProps extends IModalBasicProps {
    onContinue: () => void;
}

export const AppleCalendar = ({ onContinue }: IAppleCalendarProps) => {
    return (
        <div className="modal-content">
            <h2 className="modal-title">Add Apple Calendar</h2>
            <Typography classNames="mb40">We&apos;ll ask you for Apple Calendar access later in the mobile app.</Typography>
            <Button variant="primary" label="Continue" onClick={onContinue} />
        </div>
    );
};
