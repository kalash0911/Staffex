import React from 'react';
import { Radio } from '../../shared/radio/radio';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { Controller, useForm } from 'react-hook-form';
import { shape } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { TPhoneReminderFormValues } from '../../../models/form';

export const PhoneReminders = () => {
    const { answers, handleNextQuestion } = useAppFormState();
    const { control, setValue, handleSubmit } = useForm<TPhoneReminderFormValues>({
        resolver: yupResolver(shape),
        defaultValues: {
            isPhoneRemindersAccept: typeof answers?.isPhoneRemindersAccept === 'boolean' ? answers?.isPhoneRemindersAccept : true,
        },
    });

    const onSubmit = (data: TPhoneReminderFormValues) => {
        handleNextQuestion(data);
    };

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Struggling with task management? Grant us access to your phone’s reminders and to-do lists. This enables
                        efficient creation and organization of tasks through a few simple messages. Please note, the following
                        functions depend on access to operate correctly:
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
                    <Controller
                        control={control}
                        name="isPhoneRemindersAccept"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Radio
                                text="Accept"
                                {...rest}
                                checked={value}
                                onChange={() => setValue('isPhoneRemindersAccept', true)}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="isPhoneRemindersAccept"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Radio
                                text="Decline"
                                {...rest}
                                checked={!value}
                                onChange={() => setValue('isPhoneRemindersAccept', false)}
                            />
                        )}
                    />
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
