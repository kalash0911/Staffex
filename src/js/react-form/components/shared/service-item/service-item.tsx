import React, { ReactNode } from 'react';
import { Gmail } from '../../../icons/Gmail';
import { MicrosoftOutlook } from '../../../icons/MicrosoftOutlook';
import { ICloudEmail } from '../../../icons/iCloudEmail';
import { GoogleCalendar } from '../../../icons/GoogleCalendar';
import { AppleCalendar } from '../../../icons/AppleCalendar';
import { GoogleMeet } from '../../../icons/GoogleMeet';
import { Zoom } from '../../../icons/Zoom';
import { Skype } from '../../../icons/Skype';
import { MicrosoftTeams } from '../../../icons/MicrosoftTeams';
import { GoogleDrive } from '../../../icons/GoogleDrive';
import { FilePlus } from '../../../icons/FilePlus';
import { MeetingApp } from '../../../icons/MeetingApp';
import { Calendar } from '../../../icons/Calendar';

export const SERVICE_ITEMS_VARIANTS = {
    gmail: {
        title: 'Google Mail',
        icon: <Gmail />,
    },
    outlook: {
        title: 'Microsoft Outlook',
        icon: <MicrosoftOutlook />,
    },
    icloud: {
        title: 'iCloud Email',
        icon: <ICloudEmail />,
    },
    gcalendar: {
        title: 'Google Calendar',
        icon: <GoogleCalendar />,
    },
    appleCalendar: {
        title: 'Apple Calendar',
        icon: <AppleCalendar />,
    },
    gmeet: {
        title: 'Google Meet',
        icon: <GoogleMeet />,
    },
    zoom: {
        title: 'Zoom',
        icon: <Zoom />,
    },
    skype: {
        title: 'Skype',
        icon: <Skype />,
    },
    teams: {
        title: 'Microsoft Teams',
        icon: <MicrosoftTeams />,
    },
    gdrive: {
        title: 'Google Drive',
        icon: <GoogleDrive />,
    },
    anotherCloud: {
        title: '',
        icon: <FilePlus />,
    },
    anotherMeetApp: {
        title: '',
        icon: <MeetingApp />,
    },
    anotherCalendar: {
        title: '',
        icon: <Calendar />,
    },
};

export type TServiceItemVariants = keyof typeof SERVICE_ITEMS_VARIANTS;

export type TServiceItemProps = {
    variant?: TServiceItemVariants;
    serviceTitle?: string;
    textContent?: string;
    icon?: ReactNode;
    onDelete?: () => void;
};

export const ServiceItem = ({ variant, icon, serviceTitle, textContent, onDelete }: TServiceItemProps) => {
    let title: string = variant ? SERVICE_ITEMS_VARIANTS[variant].title : '';
    title = serviceTitle || title;

    let iconEl: ReactNode | string = variant ? SERVICE_ITEMS_VARIANTS[variant].icon : '';
    iconEl = icon || iconEl;

    return (
        <div className="list-add-item">
            <div className="list-add-icon-wrap">
                <div className="list-add-icon-box">
                    {iconEl}
                    <p className="list-add-title">{title}</p>
                </div>
                <p className="list-add-content">{textContent}</p>
            </div>
            <button className="delete-btn" onClick={onDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g clipPath="url(#clip0_1330_12134)">
                        <path
                            d="M1.09995 -4.80803e-08L-5.63879e-07 1.09995L5.90028 7L-4.80802e-08 12.9001L1.09995 14L7 8.09995L12.9001 14L14 12.9001L8.09995 7L14 1.09995L12.9001 -5.63879e-07L7 5.90005L1.09995 -4.80803e-08Z"
                            fill="#FF4F4F"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1330_12134">
                            <rect width="14" height="14" fill="white" transform="translate(0 14) rotate(-90)" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
};
