import React, { useState } from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { GoogleMeet as GMeetIcon } from '../../../icons/GoogleMeet';
import { Zoom as ZoomIcon } from '../../../icons/Zoom';
import { Skype as SkypeIcon } from '../../../icons/Skype';
import { MicrosoftTeams as TeamsIcon } from '../../../icons/MicrosoftTeams';
import { MeetingApp as AnotherAppIcon } from '../../../icons/MeetingApp';
import { useModal } from '../../../context/modal-context';
import { AnotherMeetApp, IAnotherMeetAppProps } from '../../modals/another-meet-app/another-meet-app';
import { useGoogleLogin } from '@react-oauth/google';
import { GMEET_SCOPE } from '../../../constants/google';
import { TStaffexAuthResponse, staffexApi } from '../../../api/staffex';
import { useMsal } from '@azure/msal-react';
import { SKYPE_SCOPES, TEAMS_SCOPES } from '../../../constants/microsoft';

export const MeetingAppAccess = () => {
    const { answers, handleDeleteServiceItem, setAnswers, handleNextQuestion } = useAppFormState();
    const { openModal, hideModal } = useModal();
    const { instance } = useMsal();

    const ZOOM_API_KEY = 'YOUR_ZOOM_API_KEY';
    const ZOOM_REDIRECT_URL = 'YOUR_ZOOM_REDIRECT_URL';
    const getZoomAuthUrl = () => {
        return `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_API_KEY}&redirect_uri=${ZOOM_REDIRECT_URL}`;
    };

    const meetApps = answers?.accessMeetApps;

    const onSkype = async () => {
        await instance
            .loginPopup({
                scopes: SKYPE_SCOPES,
                prompt: 'select_account',
            })
            .then((res) => {
                const realResponse: TStaffexAuthResponse = JSON.parse(res.code || '');
                const meetAppData: TServiceItemInfo = {
                    email: realResponse?.email,
                    refreshToken: realResponse?.refreshToken,
                    accessToken: realResponse?.accessToken,
                    serviceType: 'skype',
                };
                updateMeetAppsList(meetAppData);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const onMicrosoftTeams = async () => {
        await instance
            .loginPopup({
                scopes: TEAMS_SCOPES,
                prompt: 'select_account',
            })
            .then((res) => {
                const realResponse: TStaffexAuthResponse = JSON.parse(res.code || '');
                const meetAppData: TServiceItemInfo = {
                    email: realResponse?.email,
                    refreshToken: realResponse?.refreshToken,
                    accessToken: realResponse?.accessToken,
                    serviceType: 'teams',
                };
                updateMeetAppsList(meetAppData);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    const onGoogleMeet = useGoogleLogin({
        flow: 'auth-code',
        scope: GMEET_SCOPE,
        onSuccess: async (codeResponse) => {
            const googleAuthResponse = await staffexApi.postGoogleAuth({ code: codeResponse.code });

            if (!meetApps?.find(({ email, serviceType }) => email === googleAuthResponse.data.email && serviceType === 'gmeet')) {
                const meetAppData: TServiceItemInfo = {
                    email: googleAuthResponse.data.email,
                    accessToken: googleAuthResponse.data.accessToken,
                    refreshToken: googleAuthResponse.data.refreshToken,
                    serviceType: 'gmeet',
                };
                updateMeetAppsList(meetAppData);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const onZoom = () => {
        const authWindow = window.open(
            getZoomAuthUrl(),
            '_blank',
            'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
        );
        // TODO:
        // 1. create redirect page
        // 2. set zoom code in localStorage on redirect page

        const intervalId = setInterval(() => {
            if (authWindow?.closed) {
                clearInterval(intervalId);
                console.log('intervalId: ', intervalId);
                // TODO: send this code into API
                // @ts-ignore
                const code = localStorage.getItem('zoom_code');
                localStorage.removeItem('zoom_code');
            }
        }, 1000);
    };

    const onAnotherApp = () => {
        openModal<IAnotherMeetAppProps>(AnotherMeetApp, {
            onAdd: (value) => {
                const anotherApp: TServiceItemInfo = {
                    email: '',
                    serviceType: 'anotherMeetApp',
                    refreshToken: '',
                    accessToken: '',
                    meetAppName: value,
                };
                updateMeetAppsList(anotherApp);
                hideModal();
            },
        });
    };

    const updateMeetAppsList = (meetAppData: TServiceItemInfo) => {
        setAnswers((prevState) => {
            if (!prevState?.accessMeetApps?.length) {
                return {
                    ...prevState,
                    accessMeetApps: [meetAppData],
                };
            }
            if (!prevState.accessMeetApps.find((el) => el.meetAppName && el.meetAppName === meetAppData.meetAppName)) {
                return {
                    ...prevState,
                    accessMeetApps: [...prevState?.accessMeetApps, meetAppData],
                };
            }
            return prevState;
        });
    };

    const meetAppsList = meetApps?.length ? (
        meetApps.map(({ email, serviceType, meetAppName }, index) => {
            return (
                <ServiceItem
                    key={email || meetAppName}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={meetAppName}
                    onDelete={() => {
                        handleDeleteServiceItem('accessMeetApps', index);
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
                        Need help managing your meetings? Let us into your meeting apps, and we’ll sort it out. We create
                        meetings, shoot out invites automatically, making coordination smooth for everyone. You will also receive
                        all the necessary information regarding the topic of discussion before the meeting. Please note, the
                        following function depends on access to operate correctly:
                    </Typography>
                    <Typography variant="sm">
                        <span>Meeting Preparation:</span> Assisting in preparing for meetings, including gathering necessary
                        documents, setting up video conferencing, and providing relevant information.
                    </Typography>
                </div>
                <div className="choose-wrap">
                    <ServiceButton icon={<GMeetIcon />} onClick={onGoogleMeet}>
                        Google Meet
                    </ServiceButton>
                    <ServiceButton icon={<ZoomIcon />} onClick={onZoom}>
                        Zoom
                    </ServiceButton>
                    <ServiceButton icon={<SkypeIcon />} onClick={onSkype}>
                        Skype
                    </ServiceButton>
                    <ServiceButton icon={<TeamsIcon />} onClick={onMicrosoftTeams}>
                        Teams
                    </ServiceButton>
                    <ServiceButton icon={<AnotherAppIcon />} onClick={onAnotherApp}>
                        Another app
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added applications</Typography>
                    {meetAppsList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
