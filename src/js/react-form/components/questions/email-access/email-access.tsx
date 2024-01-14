import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';

export const EmailAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    To enable email managment, we require access to your email accounts. This is completely optional – if you
                    prefer not to grant access, simply skip this step. Please note, without email access, you will not get this
                    feature:
                </Typography>
                <Typography variant="sm">
                    <span>Email Management:</span> Filtering, sorting, and prioritising emails, responding to routine inquiries,
                    and flagging important messages for personal attention.
                </Typography>
            </div>
            <form className="email-access">
                <Checkbox text="Google Gmail" />
                <Checkbox text="Microsoft Outlook" />
                <Checkbox text="iCloud Email" />
                <Checkbox text="Other" />
            </form>
        </div>
    );
};
