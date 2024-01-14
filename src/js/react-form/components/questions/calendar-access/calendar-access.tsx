import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';

export const CalendarAccess = () => {
    const { handleNextQuestion } = useAppFormState();

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
            <form className="calendar-access">
                <Checkbox text="Google Calendar" />
                <Checkbox text="Microsoft Outlook" />
                <Checkbox text="Apple Calendar" />
                <Checkbox text="Other" />
                <TextField placeholder="Enter other option" type="text" />
            </form>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
