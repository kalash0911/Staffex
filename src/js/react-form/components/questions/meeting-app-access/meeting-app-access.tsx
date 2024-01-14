import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';

export const MeetingAppAccess = () => {
    const { handleNextQuestion } = useAppFormState();

    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    Select the applications in which the call will be held: google meet, zoom, teams, skype for business. If you
                    do not agree, the following basic functions will not be available:
                </Typography>
                <Typography variant="sm">
                    <span>Meeting Preparation:</span> Assisting in preparing for meetings, including gathering necessary
                    documents, setting up video conferencing, and providing relevant information.
                </Typography>
            </div>
            <form className="meeting-app-access">
                <Checkbox text="Google Meet" />
                <Checkbox text="Zoom" />
                <Checkbox text="Skype" />
                <Checkbox text="Other" />
            </form>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
