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
import { AnotherCalendar, IAnotherCalendarProps } from '../../modals/another-calendar/another-calendar';
import { Calendar as CalendarIcon } from '../../../icons/Calendar';

export const CalendarAccess = () => {
    const { answers, setAnswers, handleNextQuestion, handleDeleteServiceItem } = useAppFormState();
    const { openModal, hideModal } = useModal();

    const calendars = answers?.accessCalendars;

    const onAppleCalendar = () => {
        openModal<IAppleCalendarProps>(AppleCalendarModal, {
            onContinue: hideModal,
        });
    };

    const onAnotherCalendar = () => {
        openModal<IAnotherCalendarProps>(AnotherCalendar, {
            onAdd: (value) => {
                const calendarData: TServiceItemInfo = {
                    email: '',
                    serviceType: 'anotherCalendar',
                    calendarName: value,
                    refreshToken: '',
                };
                updateCalendarsList(calendarData);
                hideModal();
            },
        });
    };

    const updateCalendarsList = (calendarData: TServiceItemInfo) => {
        setAnswers((prevState) => {
            if (!prevState?.accessCalendars?.length) {
                return {
                    ...prevState,
                    accessCalendars: [calendarData],
                };
            }
            if (!prevState.accessCalendars.find((el) => el.calendarName && el.calendarName === calendarData.calendarName)) {
                return {
                    ...prevState,
                    accessCalendars: [...prevState?.accessCalendars, calendarData],
                };
            }
            return prevState;
        });
    };

    const calendarsList = calendars?.length ? (
        calendars.map(({ email, serviceType, calendarName }, index) => {
            return (
                <ServiceItem
                    key={email || calendarName}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={calendarName}
                    onDelete={() => {
                        handleDeleteServiceItem('accessCalendars', index);
                    }}
                />
            );
        })
    ) : (
        <Typography>The list of emails you added is empty.</Typography>
    );

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
                    <ServiceButton icon={<CalendarIcon />} onClick={onAnotherCalendar}>
                        Another calendar
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added calendars</Typography>
                    {calendarsList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
