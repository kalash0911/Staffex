import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { useGoogleLogin } from '@react-oauth/google';
import { TServiceItemInfo } from '../../../models/form';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { Gmail as GmailIcon } from '../../../icons/Gmail';
import { MicrosoftOutlook as OutlookIcon } from '../../../icons/MicrosoftOutlook';
import { ICloudEmail as ICloudIcon } from '../../../icons/iCloudEmail';
import { ServiceItem } from '../../shared/service-item/service-item';
import { useMsal } from '@azure/msal-react';
import { TStaffexAuthResponse, staffexApi } from '../../../api/staffex';
import { useModal } from '../../../context/modal-context';
import { IICloudEmailProps, ICloudEmail } from '../../modals/icloud-email/icloud-email';
import { AnotherEmail as AnotherEmailIcon } from '../../../icons/AnotherEmail';
import { EmailModal, IEmailModalProps } from '../../modals/email-modal/email-modal';

export const EmailAccess = () => {
    const { answers, setAnswers, handleNextQuestion, handleDeleteServiceItem } = useAppFormState();
    const { hideModal, openModal } = useModal();
    const { instance } = useMsal();

    const emails = answers?.accessEmails;

    const onOutlookLogin = async () => {
        await instance
            .loginPopup({
                scopes: ['user.read', 'mail.read'],
                prompt: 'select_account',
            })
            .then((res) => {
                const realResponse: TStaffexAuthResponse = JSON.parse(res.code || '');
                const emailData: TServiceItemInfo = {
                    email: realResponse?.email,
                    refreshToken: realResponse?.refreshToken,
                    accessToken: realResponse?.accessToken,
                    serviceType: 'outlook',
                    id: crypto.randomUUID(),
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
            const googleAuthResponse = await staffexApi.postGoogleAuth({ code: codeResponse.code });

            if (!emails?.find(({ email, serviceType }) => email === googleAuthResponse.data.email && serviceType === 'gmail')) {
                const emailData: TServiceItemInfo = {
                    email: googleAuthResponse.data.email,
                    accessToken: googleAuthResponse.data.accessToken,
                    refreshToken: googleAuthResponse.data.refreshToken,
                    serviceType: 'gmail',
                    id: crypto.randomUUID(),
                };
                updateEmailList(emailData);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const oniCloudLogin = () => {
        openModal<IICloudEmailProps>(ICloudEmail, {
            onAdd: (value) => {
                if (!emails?.find(({ email, serviceType }) => email === value.email && serviceType === 'icloud')) {
                    const emailData: TServiceItemInfo = {
                        email: value.email,
                        accessToken: '',
                        refreshToken: '',
                        serviceType: 'icloud',
                        appleSpecificPassword: value.appPassword,
                        id: crypto.randomUUID(),
                    };
                    updateEmailList(emailData);
                }
                hideModal();
            },
        });
    };

    const onAnotherEmail = () => {
        openModal<IEmailModalProps>(EmailModal, {
            onAdd: (data) => {
                if (!emails?.find(({ email, serviceType }) => email === data.email && serviceType === 'anotherEmail')) {
                    const emailData: TServiceItemInfo = {
                        email: data.email,
                        accessToken: '',
                        refreshToken: '',
                        serviceType: 'anotherEmail',
                        emailPassword: data.password,
                        id: crypto.randomUUID(),
                    };
                    updateEmailList(emailData);
                }
                hideModal();
            },
        });
    };

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
        emails.map(({ email, serviceType, id }, ind) => {
            return (
                <ServiceItem
                    key={id}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={`Email ${ind + 1}`}
                    onDelete={() => handleDeleteServiceItem('accessEmails', id)}
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
                        Do you have an overloaded inbox? Grant us email access, and we&apos;ll help you summarize correspondence
                        with specific individuals, ensuring nothing important is overlooked. Our services go beyond summarizing –
                        we can also respond to and send emails on your behalf. Please note, the following function depends on
                        access to operate correctly:
                    </Typography>
                    <Typography variant="sm">
                        <span>Email Management:</span> Filtering, sorting, and prioritizing emails, responding to routine
                        inquiries, sending emails on your behalf and flagging important messages for personal attention.
                    </Typography>
                </div>

                <div className="choose-wrap">
                    <ServiceButton icon={<GmailIcon />} onClick={onGoogleLogin}>
                        Google Gmail
                    </ServiceButton>
                    <ServiceButton icon={<OutlookIcon />} onClick={onOutlookLogin}>
                        Microsoft Outlook
                    </ServiceButton>
                    <ServiceButton icon={<ICloudIcon />} onClick={oniCloudLogin}>
                        iCloud Email
                    </ServiceButton>
                    <ServiceButton icon={<AnotherEmailIcon />} onClick={onAnotherEmail}>
                        Another email
                    </ServiceButton>
                </div>

                <div className="list-add-wrap">
                    <Typography variant="ft">List of added emails</Typography>
                    {emailsList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton
                    disabled={!!emails?.length}
                    requiredText={`${
                        Number(emails?.length) > 1
                            ? "You've already added email addresses"
                            : "You've already added an e-mail address"
                    }`}
                />
                <Button disabled={!emails?.length} label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
