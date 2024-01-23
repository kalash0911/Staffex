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
import { useMsal } from '@azure/msal-react';
import axios from 'axios';

export const EmailAccess = () => {
    const { answers, setAnswers, handleNextQuestion } = useAppFormState();

    const { instance, accounts } = useMsal();
    console.log('accounts: ', accounts);

    const emails = answers?.accessEmails;

    const onOutlookLogin = async () => {
        await instance
            .loginPopup({
                scopes: ['user.read', 'mail.read'],
                account: accounts[0],
            })
            .then((res) => {
                console.log('res: ', res);
                const emailData: TServiceItemInfo = {
                    email: res.account.username,
                    // TODO: Change to refreshToken:
                    refreshToken: res.accessToken,
                    serviceType: 'outlook',
                };
                updateEmailList(emailData);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

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

            if (!emails?.find(({ email, serviceType }) => email === googleAuthResponse.data.email && serviceType === 'gmail')) {
                const emailData: TServiceItemInfo = {
                    email: googleAuthResponse.data.email,
                    refreshToken: googleAuthResponse.data.refreshToken,
                    serviceType: 'gmail',
                };
                updateEmailList(emailData);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const updateEmailList = (emailData: TServiceItemInfo) => {
        setAnswers((prevState) => {
            if (!prevState?.accessEmails?.length) {
                return {
                    ...prevState,
                    accessEmails: [emailData],
                };
            }
            if (!prevState.accessEmails?.find((el) => el.serviceType === emailData.serviceType && el.email === emailData.email)) {
                return {
                    ...prevState,
                    accessEmails: [...prevState.accessEmails, emailData],
                };
            }
            return prevState;
        });
    };

    const emailsList = emails?.length ? (
        emails.map(({ email, serviceType }) => {
            return <ServiceItem key={email} variant={serviceType} textContent={email} />;
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
                    <ServiceButton icon={<OutlookIcon />} onClick={onOutlookLogin}>
                        Microsoft Outlook
                    </ServiceButton>
                    <ServiceButton icon={<ICloudIcon />} onClick={() => alert('In progress...')}>
                        iCloud Email
                    </ServiceButton>
                </div>

                <div className="list-add-wrap">
                    <Typography variant="ft">List of added emails</Typography>
                    {emailsList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
