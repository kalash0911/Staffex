import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';
import { ServiceButton } from '../../shared/service-button/service-button';
import { GoogleCalendar as GCalendarIcon } from '../../../icons/GoogleCalendar';
import { MicrosoftOutlook as OutlookIcon } from '../../../icons/MicrosoftOutlook';
import { AppleCalendar as AppleCalendarIcon } from '../../../icons/AppleCalendar';
import { useModal } from '../../../context/modal-context';
import { IAppleCalendarProps, AppleCalendar as AppleCalendarModal } from '../../modals/apple-calendar/apple-calendar';

export const CalendarAccess = () => {
    const { handleNextQuestion } = useAppFormState();
    const { openModal, hideModal } = useModal();

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
    ];

    const onAppleCalendar = () => {
        openModal<IAppleCalendarProps>(AppleCalendarModal, {
            onContinue: hideModal,
        });
    };

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
                <div className="choose-wrap">
                    <ServiceButton icon={<GCalendarIcon />} onClick={() => alert('In progress...')}>
                        Google Calendar
                    </ServiceButton>
                    <ServiceButton icon={<OutlookIcon />} onClick={() => alert('In progress...')}>
                        Microsoft Outlook
                    </ServiceButton>
                    <ServiceButton icon={<AppleCalendarIcon />} onClick={onAppleCalendar}>
                        Apple Calendar
                    </ServiceButton>
                </div>
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
