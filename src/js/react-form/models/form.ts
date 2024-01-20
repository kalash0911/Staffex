export type TEmailService = 'gmail' | 'outlook' | 'icloud';

export type TEmailAccess = {
    email: string;
    serviceType: TEmailService;
    refreshToken: string;
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
    accessEmails: Array<TEmailAccess>;
};

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

export type TCommonFormValues = Partial<TB2CContactFormValues> &
    Partial<TB2BContactFormValues> &
    Partial<TEmailAccessValues> &
    Partial<TDataBaseFormValues>;
