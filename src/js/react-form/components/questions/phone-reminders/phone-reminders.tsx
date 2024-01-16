import React from 'react';
import { Radio } from '../../shared/radio/radio';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';

export const PhoneReminders = () => {
    const { handleNextQuestion } = useAppFormState();

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Are you ready to provide access to your phone's reminders and to-do lists? If you refuse, the following
                        basic features will not be available:
                    </Typography>
                    <Typography variant="sm">
                        <span>Task Management and To-Do Lists:</span> Keeping track of tasks and to-do lists, setting reminders
                        for deadlines, and assisting in prioritizing tasks.
                    </Typography>
                    <Typography variant="sm">
                        <span>Personal Reminders:</span> Setting personal reminders such as birthdays, anniversaries, or other
                        significant dates.
                    </Typography>
                </div>
                <form className="email-access">
                    <Radio text="Accept" checked />
                    <Radio text="Decline" />
                </form>
            </div>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
