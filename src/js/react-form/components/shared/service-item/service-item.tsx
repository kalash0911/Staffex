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
};

export type TServiceItemVariants = keyof typeof SERVICE_ITEMS_VARIANTS;

export type TServiceItemProps = {
    variant?: TServiceItemVariants;
    serviceTitle?: string;
    textContent?: string;
    icon?: ReactNode;
    onDelete?: () => {};
};

export const ServiceItem = ({ variant, icon, serviceTitle, textContent, onDelete }: TServiceItemProps) => {
    let title: string = variant ? SERVICE_ITEMS_VARIANTS[variant].title : '';
    title = serviceTitle || title;

    let iconEl: ReactNode | string = variant ? SERVICE_ITEMS_VARIANTS[variant].icon : '';
    iconEl = icon || iconEl;

    return (
        <div className="service-item">
            <div className="service-icon">
                {iconEl}
                <p className="service-title">{title}</p>
            </div>
            <div className="service-content">{textContent}</div>
            <button onClick={onDelete}>X</button>
        </div>
    );
};
