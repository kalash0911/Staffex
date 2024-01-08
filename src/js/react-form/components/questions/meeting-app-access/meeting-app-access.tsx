import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';

export const MeetingAppAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    Select the applications in which the call will be held:
                    google meet, zoom, teams, skype for business. If you do not
                    agree, the following basic functions will not be available:
                </p>
                <p className="text sm">
                    <span>Meeting Preparation:</span> Assisting in preparing for
                    meetings, including gathering necessary documents, setting
                    up video conferencing, and providing relevant information.
                </p>
            </div>
            <form className="meeting-app-access">
                <Checkbox text="Google Meet" />
                <Checkbox text="Zoom" />
                <Checkbox text="Skype" />
                <Checkbox text="Other" />
            </form>
        </div>
    );
};
