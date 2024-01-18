import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { useGoogleLogin } from '@react-oauth/google';
import { TEmailAccess } from '../../../models/form';
import { ServiceButton } from '../../shared/service-button/service-button';
import { GMAIL_SCOPE } from '../../../constants/google';

export const EmailAccess = () => {
    const { answers, setAnswers, handleNextQuestion } = useAppFormState();

    const emails = answers?.accessEmails;

    const onGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            // TODO: Change to super API:
            // const tokens = await axios.post('http://localhost:3001/auth/google', {
            //     //super backend url
            //     code: codeResponse.code,
            // });

            // console.log(tokens);

            // TODO: set real emails and needed data
            setAnswers((prevStrate) => {
                const accessEmails = prevStrate?.accessEmails;
                // TODO: check email from Vetals API:
                if (!accessEmails?.find((email) => email.email === codeResponse.code)) {
                    const emailData: TEmailAccess = { email: codeResponse.code, refreshToken: codeResponse.code };
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
        scope: GMAIL_SCOPE,
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
                        To enable email managment, we require access to your email accounts. This is completely optional – if you
                        prefer not to grant access, simply skip this step. Please note, without email access, you will not get
                        this feature:
                    </Typography>
                    <Typography variant="sm">
                        <span>Email Management:</span> Filtering, sorting, and prioritising emails, responding to routine
                        inquiries, and flagging important messages for personal attention.
                    </Typography>
                </div>

                <div>
                    <ServiceButton onClick={onGoogleLogin}>Google Gmail</ServiceButton>
                    <ServiceButton onClick={() => alert('In progress...')}>Microsoft Outlook</ServiceButton>
                    <ServiceButton onClick={() => alert('In progress...')}>iCloud Email</ServiceButton>
                </div>

                <Typography>List of added emails</Typography>
                {emailsList}
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
