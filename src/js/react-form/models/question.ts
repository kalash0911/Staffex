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
    isViewed: boolean;
};

export type TTopic = {
    title: string;
    list: TQuestion[];
};

export type TAdditionalFeatures = {
    communicationCoordination: boolean;
    crm: boolean;
    documentPreparation: boolean;
    voiceRecognation: boolean;
};
