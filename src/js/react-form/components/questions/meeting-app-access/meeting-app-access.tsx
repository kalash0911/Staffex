import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceItem } from '../../shared/service-item/service-item';

export const MeetingAppAccess = () => {
    const { handleNextQuestion } = useAppFormState();

    // TODO: Remove mocks
    const mocksApps: TServiceItemInfo[] = [
        {
            serviceType: 'gmeet',
            email: 'test@gmail.com',
            refreshToken: '123',
        },
        {
            serviceType: 'zoom',
            email: 'test2@gmail.com',
            refreshToken: '1233',
        },
        {
            serviceType: 'skype',
            email: 'test2@outlool.com',
            refreshToken: '12233',
        },
        {
            serviceType: 'teams',
            email: 'test2@outlool.com',
            refreshToken: '12233',
        },
    ];

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
                <form className="meeting-app-access">
                    <Checkbox text="Google Meet" />
                    <Checkbox text="Zoom" />
                    <Checkbox text="Skype" />
                    <Checkbox text="Other" />
                </form>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added applications</Typography>
                    {/* TODO: remove mocks */}
                    {mocksApps.map(({ email, serviceType }) => {
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
