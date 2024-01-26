import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { GoogleCalendar as GCalendarIcon } from '../../../icons/GoogleCalendar';
import { MicrosoftOutlook as OutlookIcon } from '../../../icons/MicrosoftOutlook';
import { AppleCalendar as AppleCalendarIcon } from '../../../icons/AppleCalendar';
import { useModal } from '../../../context/modal-context';
import { IAppleCalendarProps, AppleCalendar as AppleCalendarModal } from '../../modals/apple-calendar/apple-calendar';
import { AnotherCalendar, IAnotherCalendarProps } from '../../modals/another-calendar/another-calendar';
import { Calendar as CalendarIcon } from '../../../icons/Calendar';
import { useGoogleLogin } from '@react-oauth/google';
import { GCALENDAR_SCOPE } from '../../../constants/google';
import { TStaffexAuthResponse, staffexApi } from '../../../api/staffex';
import { useMsal } from '@azure/msal-react';
import { CALENDAR_SCOPES as OUTLOOK_CALENDAR_SCOPES } from '../../../constants/microsoft';

export const CalendarAccess = () => {
    const { answers, setAnswers, handleNextQuestion, handleDeleteServiceItem } = useAppFormState();
    const { openModal, hideModal } = useModal();
    const { instance } = useMsal();

    const calendars = answers?.accessCalendars;

    const onOutlookCalendar = async () => {
        await instance
            .loginPopup({
                scopes: OUTLOOK_CALENDAR_SCOPES,
                prompt: 'select_account',
            })
            .then((res) => {
                const realResponse: TStaffexAuthResponse = JSON.parse(res.code || '');
                const calendarData: TServiceItemInfo = {
                    email: realResponse?.email,
                    refreshToken: realResponse?.refreshToken,
                    accessToken: realResponse?.accessToken,
                    serviceType: 'outlookCalendar',
                };
                updateCalendarsList(calendarData);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const onGoogleCalendar = useGoogleLogin({
        flow: 'auth-code',
        scope: GCALENDAR_SCOPE,
        onSuccess: async (codeResponse) => {
            const googleAuthResponse = await staffexApi.postGoogleAuth({ code: codeResponse.code });

            if (
                !calendars?.find(
                    ({ email, serviceType }) => email === googleAuthResponse.data.email && serviceType === 'gcalendar',
                )
            ) {
                const calendarData: TServiceItemInfo = {
                    email: googleAuthResponse.data.email,
                    accessToken: googleAuthResponse.data.accessToken,
                    refreshToken: googleAuthResponse.data.refreshToken,
                    serviceType: 'gcalendar',
                };
                updateCalendarsList(calendarData);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

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
                    accessToken: '',
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
                        Got a busy schedule? Let us access your calendar, and we can help sort out your priorities and important
                        meetings. We&apos;ll optimize your work schedule and give you timely reminders for a more organized and
                        productive routine. Please note, the following function depends on access to operate correctly:
                    </Typography>
                    <Typography variant="sm">
                        <span>Appointment Scheduling and Calendar Management:</span> This includes managing the user's calendar,
                        scheduling appointments and meetings, setting reminders, and sending notifications for upcoming events.
                    </Typography>
                </div>
                <div className="choose-wrap">
                    <ServiceButton icon={<GCalendarIcon />} onClick={onGoogleCalendar}>
                        Google Calendar
                    </ServiceButton>
                    <ServiceButton icon={<OutlookIcon />} onClick={onOutlookCalendar}>
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
