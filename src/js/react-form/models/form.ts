import { TServiceItemVariants } from '../components/shared/service-item/service-item';

export type TServiceItemInfo = {
    email: string;
    serviceType: TServiceItemVariants;
    refreshToken: string;
    meetAppName?: string;
    cloudLink?: string;
    calendarName?: string;
};

export type ContactFormValues = {
    isB2B: boolean;
    phone: string;
    altPhone?: string;
    email: string;
};

export type TB2CContactFormValues = {
    firstName: string;
    lastName: string;
} & ContactFormValues;

export type TB2BContactFormValues = {
    companyName: string;
    contactFirstName: string;
    contactLastName: string;
    contactFirstTitle: string;
} & ContactFormValues;

export type TEmailAccessValues = {
    accessEmails: Array<TServiceItemInfo>;
};

export type TCalendarsAccessValues = {
    accessCalendars: Array<TServiceItemInfo>;
};

export type TMeetAppsAccessValues = {
    accessMeetApps: Array<TServiceItemInfo>;
};

export type TCloudDataAccessValues = {
    accessCloudData: Array<TServiceItemInfo>;
};

export type TAccessCommonType = TEmailAccessValues & TMeetAppsAccessValues & TCloudDataAccessValues & TCalendarsAccessValues;

export type TServiceListKeys = keyof TAccessCommonType;

export type TDataBase = {
    host?: string;
    port?: string;
    database?: string;
    user?: string;
    password?: string;
    url?: string;
};

export type TDataBaseFormValues = {
    databaseList?: Array<TDataBase>;
};

export type TPhoneReminderFormValues = {
    isPhoneRemindersAccept?: boolean;
};

export type TAdditionalNotesFormValues = {
    additionalNotes?: string;
};

export type TCommonFormValues = Partial<TB2CContactFormValues> &
    Partial<TB2BContactFormValues> &
    Partial<TEmailAccessValues> &
    Partial<TDataBaseFormValues> &
    Partial<TPhoneReminderFormValues> &
    Partial<TAdditionalNotesFormValues> &
    Partial<TMeetAppsAccessValues> &
    Partial<TCloudDataAccessValues> &
    Partial<TCalendarsAccessValues>;
