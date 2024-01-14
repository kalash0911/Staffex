import { ReactNode } from 'react';

export type TActiveQuestion = {
    configInd: number;
    questionInd: number;
};

export enum FormType {
    SECRETARY = 'SECRETARY',
    SMM = 'SMM',
    ACOUNTANT = 'ACOUNTANT',
}

export type TQuestion = {
    label: string;
    content: ReactNode;
};

export type TTopic = {
    title: string;
    list: TQuestion[];
};
