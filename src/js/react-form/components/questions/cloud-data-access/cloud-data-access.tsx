import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { IconPlus } from '../../../icons/plus.tsx';
import { Typography } from '../../shared/typography/typography.tsx';

export const CloudDataAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    In order for us to manage your calendar, do you agree to provide access to your Google and/and Microsoft
                    accounts? If you do not agree, the following basic functions will not be available:
                </Typography>
                <Typography variant="sm">
                    <span>Appointment Scheduling and Calendar Management:</span> Managing the user's calendar, scheduling
                    appointments, meetings, and reminders, and sending notifications for upcoming events.
                </Typography>
            </div>
            <form className="cloud-data-access">
                <TextField label="Link 1" placeholder="http:/example.com" type="url" />
                <div className="btn-wrap">
                    <button className="btn-add click-song">
                        <IconPlus />
                        Add one more link
                    </button>
                </div>
            </form>
        </div>
    );
};
