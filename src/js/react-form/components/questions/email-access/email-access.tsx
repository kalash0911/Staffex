import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';

export const EmailAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    To enable email managment, we require access to your email
                    accounts. This is completely optional – if you prefer not to
                    grant access, simply skip this step. Please note, without
                    email access, you will not get this feature:
                </p>
                <p className="text sm">
                    <span>Email Management:</span> Filtering, sorting, and
                    prioritising emails, responding to routine inquiries, and
                    flagging important messages for personal attention.
                </p>
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
