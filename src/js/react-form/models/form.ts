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

export type TCommonFormValues = Partial<TB2CContactFormValues> & Partial<TB2BContactFormValues>;
