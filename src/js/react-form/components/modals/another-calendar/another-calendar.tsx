import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';
import { Button } from '../../shared/button/button';
import { Typography } from '../../shared/typography/typography';
import { TextField } from '../../shared/text-field/text-field';
import { WarningSign } from '../../../icons/warning-sign';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shema } from './validation';
import { SERVICE_NAME_MAX_LENGTH } from '../../../constants/form';

export interface IAnotherCalendarProps extends IModalBasicProps {
    onAdd: (value: string) => void;
}

export type TAnotherCalendarValues = {
    anotherCalendar: string;
};

export const AnotherCalendar = ({ onAdd }: IAnotherCalendarProps) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<TAnotherCalendarValues>({
        defaultValues: { anotherCalendar: '' },
        // @ts-ignore
        resolver: yupResolver(shema),
    });

    const onSubmit = (data: TAnotherCalendarValues) => {
        onAdd(data.anotherCalendar);
    };

    return (
        <div>
            <h2 className="modal-title">Add another calendar</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('anotherCalendar')}
                    label="Calendar"
                    type="text"
                    placeholder="Enter the name of the calendar you use"
                    errorMsg={errors.anotherCalendar?.message}
                    maxLength={SERVICE_NAME_MAX_LENGTH}
                ></TextField>
                <div className="hint">
                    <WarningSign />
                    <Typography>Enter the calendar you use and we&apos;ll contact you to integrate it.</Typography>
                </div>
                <Button variant="primary" label="Add calendar" onClick={handleSubmit(onSubmit)} />
            </form>
        </div>
    );
};
