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

export interface IAnotherMeetAppProps extends IModalBasicProps {
    onAdd: (value: string) => void;
}

export type TAnotherMeetAppValues = {
    anotherAppName: string;
};

export const AnotherMeetApp = ({ onAdd }: IAnotherMeetAppProps) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<TAnotherMeetAppValues>({
        defaultValues: { anotherAppName: '' },
        // @ts-ignore
        resolver: yupResolver<TAnotherMeetAppValues>(shema),
    });

    const onSubmit = (data: TAnotherMeetAppValues) => {
        onAdd(data.anotherAppName);
    };

    return (
        <div>
            <h2 className="modal-title">Add another application</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('anotherAppName')}
                    label="Application"
                    type="text"
                    placeholder="Enter the name of the application you use"
                    errorMsg={errors.anotherAppName?.message}
                    maxLength={SERVICE_NAME_MAX_LENGTH}
                ></TextField>
                <div className="hint">
                    <WarningSign />
                    <Typography>Enter the app you use and we&apos;ll contact you to integrate it.</Typography>
                </div>
                <Button variant="primary" label="Add application" onClick={handleSubmit(onSubmit)} />
            </form>
        </div>
    );
};
