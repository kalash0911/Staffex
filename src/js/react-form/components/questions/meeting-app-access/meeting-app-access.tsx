import React from 'react';
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
import { ZOOM_AUTH_URL } from '../../../constants/zoom';

export const MeetingAppAccess = () => {
    const { answers, handleDeleteServiceItem, setAnswers, handleNextQuestion, showToast } = useAppFormState();
    const { openModal, hideModal } = useModal();
    const { instance } = useMsal();

    const meetApps = answers?.accessMeetApps;

    const onSkype = async () => {
        await instance
            .loginPopup({
                scopes: SKYPE_SCOPES,
                prompt: 'select_account',
            })
            .then((res) => {
                const realResponse: TStaffexAuthResponse = JSON.parse(res.code || '');
                if (!meetApps?.find(({ email, serviceType }) => email === realResponse.email && serviceType === 'skype')) {
                    const meetAppData: TServiceItemInfo = {
                        email: realResponse?.email,
                        refreshToken: realResponse?.refreshToken,
                        accessToken: realResponse?.accessToken,
                        serviceType: 'skype',
                        id: crypto.randomUUID(),
                    };
                    updateMeetAppsList(meetAppData);
                }
            })
            .catch(() => {
                showToast.error();
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
                if (!meetApps?.find(({ email, serviceType }) => email === realResponse.email && serviceType === 'teams')) {
                    const meetAppData: TServiceItemInfo = {
                        email: realResponse?.email,
                        refreshToken: realResponse?.refreshToken,
                        accessToken: realResponse?.accessToken,
                        serviceType: 'teams',
                        id: crypto.randomUUID(),
                    };
                    updateMeetAppsList(meetAppData);
                }
            })
            .catch(() => {
                showToast.error();
            });
    };

    const onGoogleMeet = useGoogleLogin({
        flow: 'auth-code',
        scope: GMEET_SCOPE,
        onSuccess: async (codeResponse) => {
            await staffexApi
                .postGoogleAuth({ code: codeResponse.code })
                .then(({ data }) => {
                    if (!meetApps?.find(({ email, serviceType }) => email === data.email && serviceType === 'gmeet')) {
                        const meetAppData: TServiceItemInfo = {
                            email: data.email,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                            serviceType: 'gmeet',
                            id: crypto.randomUUID(),
                        };
                        updateMeetAppsList(meetAppData);
                    }
                })
                .catch(() => {
                    showToast.error();
                });
        },
        onError: () => {
            showToast.error();
        },
    });

    const onZoom = () => {
        const authWindow = window.open(
            ZOOM_AUTH_URL,
            '_blank',
            'height=500,width=400,left=300,top=300,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes',
        );

        const intervalId = setInterval(() => {
            if (authWindow?.closed) {
                clearInterval(intervalId);
                const code = localStorage.getItem('zoom_code');
                localStorage.removeItem('zoom_code');

                if (!code) return;

                staffexApi
                    .postZoomAuth({ code })
                    .then(({ data }) => {
                        if (!meetApps?.find(({ email, serviceType }) => email === data.email && serviceType === 'zoom')) {
                            const meetAppData: TServiceItemInfo = {
                                email: data.email,
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                                serviceType: 'zoom',
                                id: crypto.randomUUID(),
                            };
                            updateMeetAppsList(meetAppData);
                        }
                    })
                    .catch(() => {
                        showToast.error();
                    });
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
                    id: crypto.randomUUID(),
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
            // Check custom meetings app dublicates:
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
        meetApps.map(({ email, serviceType, meetAppName, id }) => {
            return (
                <ServiceItem
                    key={id}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={meetAppName}
                    onDelete={() => {
                        handleDeleteServiceItem('accessMeetApps', id);
                    }}
                />
            );
        })
    ) : (
        <Typography>The list of applications you added is empty.</Typography>
    );

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Need help managing your meetings? Let us into your meeting apps, and we&apos;ll sort it out. We create
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
                <SkipButton
                    disabled={!!meetApps?.length}
                    requiredText={`You have already added application${Number(meetApps?.length) > 1 ? 's' : ''}`}
                />
                <Button
                    label="Next"
                    type="submit"
                    onClick={() => {
                        if (!meetApps?.length) {
                            showToast.warning('The list of applications you added is empty.');
                            return;
                        }
                        handleNextQuestion();
                    }}
                />
            </div>
        </div>
    );
};
