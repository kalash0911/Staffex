import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { useGoogleLogin } from '@react-oauth/google';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceButton } from '../../shared/service-button/service-button';
import { GMAIL_SCOPE } from '../../../constants/google';
import { Gmail as GmailIcon } from '../../../icons/Gmail';
import { MicrosoftOutlook as OutlookIcon } from '../../../icons/MicrosoftOutlook';
import { ICloudEmail as ICloudIcon } from '../../../icons/iCloudEmail';
import { ServiceItem } from '../../shared/service-item/service-item';
import axios from 'axios';

export const EmailAccess = () => {
    const { answers, setAnswers, handleNextQuestion } = useAppFormState();

    const emails = answers?.accessEmails;

    const mocksEmail: TServiceItemInfo[] = [
        {
            serviceType: 'gmail',
            email: 'test@gmail.com',
            refreshToken: '123',
        },
        {
            serviceType: 'gmail',
            email: 'test2@gmail.com',
            refreshToken: '1233',
        },
        {
            serviceType: 'outlook',
            email: 'test2@outlool.com',
            refreshToken: '12233',
        },
        {
            serviceType: 'icloud',
            email: 'test2@icloud.com',
            refreshToken: '12323',
        },
    ];

    const onGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            // TODO: Change to super API:
            const googleAuthResponse = await axios.post('https://localhost:32770/auth/google', {
                 //super backend url
                 code: codeResponse.code,
             });

            // console.log(tokens);

            // TODO: set real emails and needed data
            setAnswers((prevStrate) => {
                const accessEmails = prevStrate?.accessEmails;
                // TODO: check email from Vetals API:
                if (!accessEmails?.find((email) => email.email === googleAuthResponse.data.email)) {
                    const emailData: TServiceItemInfo = {
                        email: googleAuthResponse.data.email,
                        refreshToken: googleAuthResponse.data.refreshToken,
                        serviceType: 'gmail',
                    };
                    return {
                        ...prevStrate,
                        accessEmails: accessEmails?.length ? [...accessEmails, emailData] : [emailData],
                    };
                }
                return {
                    ...prevStrate,
                };
            });
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const emailsList = emails?.length ? (
        emails.map(({ email }) => {
            return <div key={email}>mocktestuser@gmail.com</div>;
        })
    ) : (
        <Typography>The list of emails you added is empty.</Typography>
    );

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Do you have an overloaded inbox? Grant us email access, and we’ll help you summarize correspondence with
                        specific individuals, ensuring nothing important is overlooked. Please note, the following function
                        depends on access to operate correctly:
                    </Typography>
                    <Typography variant="sm">
                        <span>Email Management:</span> Filtering, sorting, and prioritising emails, responding to routine
                        inquiries, and flagging important messages for personal attention.
                    </Typography>
                </div>

                <div className="choose-wrap">
                    <ServiceButton icon={<GmailIcon />} onClick={onGoogleLogin}>
                        Google Gmail
                    </ServiceButton>
                    <ServiceButton icon={<OutlookIcon />} onClick={() => alert('In progress...')}>
                        Microsoft Outlook
                    </ServiceButton>
                    <ServiceButton icon={<ICloudIcon />} onClick={() => alert('In progress...')}>
                        iCloud Email
                    </ServiceButton>
                </div>

                <div className="list-add-wrap">
                    <Typography variant="ft">List of added emails</Typography>
                    {emailsList}
                    {/* TODO: remove mocks */}
                    {mocksEmail.map(({ email, serviceType }) => {
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
