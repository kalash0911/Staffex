import React from 'react';
import { ContactInfo } from '../components/questions/contact-info/contact-info';
import { MeetingAppAccess } from '../components/questions/meeting-app-access/meeting-app-access';
import { CalendarAccess } from '../components/questions/calendar-access/calendar-access';
import { CloudDataAccess } from '../components/questions/cloud-data-access/cloud-data-access';
import { DatabaseAccess } from '../components/questions/database-access/database-access';
import { EmailAccess } from '../components/questions/email-access/email-access';
import { PhoneReminders } from '../components/questions/phone-reminders/phone-reminders';
import { BankAccess } from '../components/questions/bank-access/bank-access';
import { AdditionalNotes } from '../components/questions/additional-notes/additional-notes';
import { FormType, TQuestion, TTopic } from '../models/question';

export const SECRETARY_QUESTIONS: TTopic[] = [
    {
        title: 'Basic features',
        list: [
            {
                label: 'Contact Info',
                content: <ContactInfo />,
            },
            {
                label: 'Email access',
                content: <EmailAccess />,
            },
            {
                label: 'Calendar access',
                content: <CalendarAccess />,
            },
            {
                label: 'Meeting applications access',
                content: <MeetingAppAccess />,
            },
            {
                label: 'Cloud Data Access',
                content: <CloudDataAccess />,
            },
            {
                label: 'Database Access',
                content: <DatabaseAccess />,
            },

            {
                label: "Phone's reminders and to-do lists",
                content: <PhoneReminders />,
            },
        ],
    },
    {
        title: 'Additional features',
        list: [
            {
                label: 'Bank access',
                content: <BankAccess />,
            },
        ],
    },
    {
        title: 'Additional inforamtion',
        list: [
            {
                label: 'Additional Notes',
                content: <AdditionalNotes />,
            },
        ],
    },
];

// TODO: Change for true questions and forms:
const SMM_QUESTIONS: TTopic[] = [
    {
        title: 'SMM TEST Basic features',
        list: [
            {
                label: 'Calendar access',
                content: <CalendarAccess />,
            },
            {
                label: 'Contact Info',
                content: <ContactInfo />,
            },
            {
                label: 'Meeting applications access',
                content: <MeetingAppAccess />,
            },
            {
                label: 'Cloud Data Access',
                content: <CloudDataAccess />,
            },
            {
                label: 'Database Access',
                content: <DatabaseAccess />,
            },
            {
                label: 'Email access',
                content: <EmailAccess />,
            },
            {
                label: "Phone's reminders and to-do lists",
                content: <PhoneReminders />,
            },
        ],
    },
    {
        title: 'Additional features',
        list: [
            {
                label: 'Bank access',
                content: <BankAccess />,
            },
        ],
    },
    {
        title: 'Additional inforamtion',
        list: [
            {
                label: 'Additional Notes',
                content: <AdditionalNotes />,
            },
        ],
    },
];

export const QUESTION_LIST = SECRETARY_QUESTIONS.reduce((prev: TQuestion[], cur) => {
    return [...prev, ...cur.list];
}, []);

export const QUESTIONS_CONFIG = {
    [FormType.SECRETARY]: SECRETARY_QUESTIONS,
    [FormType.SMM]: SMM_QUESTIONS,
    [FormType.ACOUNTANT]: SECRETARY_QUESTIONS,
};
