export type TContactFormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    altPhone?: string;
    email: string;
};

export type TCommonFormValues = Partial<TContactFormValues>;
