import React from 'react';
import { IModalBasicProps } from '../../../models/common/modal';
import { useForm } from 'react-hook-form';
import { shema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '../../shared/text-field/text-field';
import { WarningSign } from '../../../icons/warning-sign';
import { Button } from '../../shared/button/button';
import { Typography } from '../../shared/typography/typography';
import { Play as PlayIcon } from '../../../icons/play';
import { Link } from '../../shared/link/link';

export interface IICloudEmailProps extends IModalBasicProps {
    onAdd: (value: TICloudEmailValues) => void;
}

export type TICloudEmailValues = {
    email: string;
    appPassword: string;
};

export const ICloudEmail = ({ onAdd }: IICloudEmailProps) => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<TICloudEmailValues>({
        defaultValues: { appPassword: '', email: '' },
        // @ts-ignore
        resolver: yupResolver(shema),
    });

    const onSubmit = (data: TICloudEmailValues) => {
        onAdd(data);
    };

    return (
        <div>
            <h2 className="modal-title">Add iCloud Email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('email')}
                    label="iCloud Address"
                    type="text"
                    placeholder="your@example.com"
                    errorMsg={errors.email?.message}
                ></TextField>
                <TextField
                    {...register('appPassword')}
                    label="App-Specific Password"
                    type="password"
                    placeholder="Enter an app-specific password"
                    errorMsg={errors.appPassword?.message}
                ></TextField>
                <div className="hint mb20">
                    <WarningSign />
                    <Typography>
                        iCloud requires you to create a password specifically for Staffex to access your email account.
                    </Typography>
                </div>
                <div className="link-wrap">
                    <Link href="#">Generate an app-specific password</Link>
                </div>
                <div className="how-to-box">
                    <PlayIcon />{' '}
                    <p className="text">
                        Watch video <Link href="#">how to create app-specific password</Link>
                    </p>
                </div>
                <Button variant="primary" label="Add email" onClick={handleSubmit(onSubmit)} />
            </form>
        </div>
    );
};
