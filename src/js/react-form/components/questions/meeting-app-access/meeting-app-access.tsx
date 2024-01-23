import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';
import { ServiceButton } from '../../shared/service-button/service-button';
import { GoogleMeet as GMeetIcon } from '../../../icons/GoogleMeet';
import { Zoom as ZoomIcon } from '../../../icons/Zoom';
import { Skype as SkypeIcon } from '../../../icons/Skype';
import { MicrosoftTeams as TeamsIcon } from '../../../icons/MicrosoftTeams';
import { MeetingApp as AnotherAppIcon } from '../../../icons/MeetingApp';
import { useModal } from '../../../context/modal-context';
import { AnotherMeetApp, IAnotherMeetAppProps } from '../../modals/another-meet-app/another-meet-app';

export const MeetingAppAccess = () => {
    const { answers, handleDeleteServiceItem, setAnswers, handleNextQuestion } = useAppFormState();
    const { openModal, hideModal } = useModal();

    const meetApps = answers?.accessMeetApps;

    const onAnotherApp = () => {
        openModal<IAnotherMeetAppProps>(AnotherMeetApp, {
            onAdd: (value) => {
                const anotherApp: TServiceItemInfo = {
                    email: '',
                    serviceType: 'anotherMeetApp',
                    refreshToken: '',
                    appName: value,
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
            if (!prevState.accessMeetApps.find((el) => el.appName && el.appName === meetAppData.appName)) {
                return {
                    ...prevState,
                    accessMeetApps: [...prevState?.accessMeetApps, meetAppData],
                };
            }
            return prevState;
        });
    };

    const meetAppsList = meetApps?.length ? (
        meetApps.map(({ email, serviceType, appName }, index) => {
            return (
                <ServiceItem
                    key={email || appName}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={appName}
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
                        Select the applications in which the call will be held: google meet, zoom, teams, skype for business. If
                        you do not agree, the following basic functions will not be available:
                    </Typography>
                    <Typography variant="sm">
                        <span>Meeting Preparation:</span> Assisting in preparing for meetings, including gathering necessary
                        documents, setting up video conferencing, and providing relevant information.
                    </Typography>
                </div>
                <div className="choose-wrap">
                    <ServiceButton icon={<GMeetIcon />} onClick={() => alert('In progress...')}>
                        Google Meet
                    </ServiceButton>
                    <ServiceButton icon={<ZoomIcon />} onClick={() => alert('In progress...')}>
                        Zoom
                    </ServiceButton>
                    <ServiceButton icon={<SkypeIcon />} onClick={() => alert('In progress...')}>
                        Skype
                    </ServiceButton>
                    <ServiceButton icon={<TeamsIcon />} onClick={() => alert('In progress...')}>
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
