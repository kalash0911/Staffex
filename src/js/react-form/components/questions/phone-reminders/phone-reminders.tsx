import React from 'react';
import { Radio } from '../../shared/radio/radio';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { useForm } from 'react-hook-form';
import { shape } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { TPhoneReminderFormValues } from '../../../models/form';

export const PhoneReminders = () => {
    const { answers, handleNextQuestion } = useAppFormState();
    const { setValue, handleSubmit } = useForm<TPhoneReminderFormValues>({
        resolver: yupResolver(shape),
        defaultValues: { isPhoneRemindersAccept: answers?.isPhoneRemindersAccept || true },
    });

    const onSubmit = (data: TPhoneReminderFormValues) => {
        handleNextQuestion(data);
    };

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Are you ready to provide access to your phone's reminders and to-do lists? If you refuse, the following
                        basic features will not be available:
                    </Typography>
                    <Typography variant="sm">
                        <span>Task Management and To-Do Lists:</span> Keeping track of tasks and to-do lists, setting reminders
                        for deadlines, and assisting in prioritizing tasks.
                    </Typography>
                    <Typography variant="sm">
                        <span>Personal Reminders:</span> Setting personal reminders such as birthdays, anniversaries, or other
                        significant dates.
                    </Typography>
                </div>
                <form className="email-access" onSubmit={handleSubmit(onSubmit)}>
                    <Radio text="Accept" checked onChange={() => setValue('isPhoneRemindersAccept', true)} />
                    <Radio text="Decline" onChange={() => setValue('isPhoneRemindersAccept', true)} />
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
