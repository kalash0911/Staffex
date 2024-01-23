import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';
import { Button } from '../../shared/button/button';
import { TextField } from '../../shared/text-field/text-field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shema } from './validation';

export interface ICloudDataLinkProps extends IModalBasicProps {
    onAdd: (value: string) => void;
}

export type TCloudDataLinkValues = {
    cloudDataLink: string;
};

export const CloudDataLink = ({ onAdd }: ICloudDataLinkProps) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<TCloudDataLinkValues>({
        defaultValues: { cloudDataLink: '' },
        resolver: yupResolver<TCloudDataLinkValues>(shema),
    });

    const onSubmit = (data: TCloudDataLinkValues) => {
        onAdd(data.cloudDataLink);
    };

    return (
        <div>
            <h2>Add link to your file(s)</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('cloudDataLink')}
                    label="Link"
                    type="text"
                    placeholder="http:/example2.com"
                    errorMsg={errors.cloudDataLink?.message}
                ></TextField>
                <Button variant="primary" label="Add link" onClick={handleSubmit(onSubmit)} />
            </form>
        </div>
    );
};
