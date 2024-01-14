import React from 'react';
import { Radio } from '../../shared/radio/radio';
import { Typography } from '../../shared/typography/typography';

export const PhoneReminders = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    Are you ready to provide access to your phone's reminders and to-do lists? If you refuse, the following basic
                    features will not be available:
                </Typography>
                <Typography variant="sm">
                    <span>Task Management and To-Do Lists:</span> Keeping track of tasks and to-do lists, setting reminders for
                    deadlines, and assisting in prioritizing tasks.
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
    );
};
