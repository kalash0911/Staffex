import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';

export const EmailAccess = () => {
    const { handleNextQuestion } = useAppFormState();

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
                <form className="email-access">
                    <Checkbox text="Google Gmail" />
                    <Checkbox text="Microsoft Outlook" />
                    <Checkbox text="iCloud Email" />
                    <Checkbox text="Other" />
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
