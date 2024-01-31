import React from 'react';
import { Button } from '../../shared/button/button';
import { TextField } from '../../shared/text-field/text-field';
import { useForm } from 'react-hook-form';
import { shema } from './validation';
import { IModalBasicProps } from '../../../models/common/modal';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IEmailModalProps extends IModalBasicProps {
    onAdd: (value: TAnotherEmailValues) => void;
}

export type TAnotherEmailValues = {
    email: string;
    password: string;
};

export const EmailModal = ({ onAdd }: IEmailModalProps) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<TAnotherEmailValues>({
        defaultValues: { password: '', email: '' },
        // @ts-ignore
        resolver: yupResolver(shema),
    });

    const onSubmit = (data: TAnotherEmailValues) => {
        onAdd(data);
    };

    return (
        <div>
            <h2 className="modal-title">Add another email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('email')}
                    label="Email"
                    type="text"
                    placeholder="your@example.com"
                    errorMsg={errors.email?.message}
                />
                <TextField
                    {...register('password')}
                    label="Password"
                    type="password"
                    // placeholder="Enter your password"
                    errorMsg={errors.password?.message}
                />
                <Button label="Add Email" onClick={handleSubmit(onSubmit)} type="submit" />
            </form>
        </div>
    );
};
