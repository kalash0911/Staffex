import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';

export const CalendarAccess = () => {
    const { handleNextQuestion } = useAppFormState();

    // TODO: Remove mocks
    const mocksCalendars: TServiceItemInfo[] = [
        {
            serviceType: 'gcalendar',
            email: 'test@gmail.com',
            refreshToken: '123',
        },
        {
            serviceType: 'outlook',
            email: 'test2@gmail.com',
            refreshToken: '1233',
        },
        {
            serviceType: 'appleCalendar',
            email: 'test2@outlool.com',
            refreshToken: '12233',
        },
    ];

    return (
        <div className="conetnt-block">
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
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added calendars</Typography>
                    {/* TODO: remove mocks */}
                    {mocksCalendars.map(({ email, serviceType }) => {
                        return <ServiceItem key={email} variant={serviceType} textContent={email} />;
                    })}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
