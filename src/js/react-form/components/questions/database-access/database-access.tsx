import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { schema } from './validation';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TDataBase, TDataBaseFormValues } from '../../../models/form';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { OpenClose } from '../../shared/open-close/open-close';
import { ConnectButton, TConnectButtonStatus } from '../../buttons/connect-btn/connect-btn';
import { Del } from '../../../icons/Del';
import { IconPlus } from '../../../icons/plus';
import {
    DATABASE_NAME_MAX_LENGTH,
    DATABASE_PASSWORD_MAX_LENGTH,
    DATABASE_USER_MAX_LENGTH,
    HOST_MAX_LENGTH,
    PORT_MAX_LENGTH,
} from '../../../constants/form';
import { staffexApi } from '../../../api/staffex';

const defaultValues: TDataBase = {
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
    url: '',
    isConnected: 'hold',
};

export const DatabaseAccess = () => {
    const { answers } = useAppFormState();
    const databaseList = answers?.databaseList;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        formState: { errors, isValid },
    } = useForm<TDataBaseFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            databaseList: databaseList || [defaultValues],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'databaseList' });

    const onSubmit = (data: TDataBaseFormValues) => {
        console.log('data: ', data);
        // handleNextQuestion(data);
    };

    const onAddDatabase = () => {
        append(defaultValues);
    };

    const onDeleteDatabase = (index: number) => {
        remove(index);
    };

    const connectDataBase = (index: number) => {
        const submitBeforeConnect = (data: TDataBaseFormValues) => {
            const currentDatabase = data.databaseList?.[index];
            if (!currentDatabase) return;

            setValue(`databaseList.${index}.isConnected`, 'pending');

            staffexApi
                .connectDataBase(currentDatabase)
                .then(() => {
                    setValue(`databaseList.${index}.isConnected`, 'fulfilled');
                    trigger(`databaseList.${index}.isConnected`);
                })
                .catch(() => {
                    setValue(`databaseList.${index}.isConnected`, 'rejected');
                    trigger(`databaseList.${index}.isConnected`);
                });
        };
        handleSubmit(submitBeforeConnect)();
    };

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Need to keep employee information or expenses up-to-date in your databases? Imagine urgently needing to
                        wrap up the expenses for a significant marketing campaign. Assigning the task to an employee might take
                        the entire workday. Grant access, and spendings for the past period will integrate into your database with
                        just one click. Please note, the following functions depend on access to operate correctly.
                    </Typography>
                    <Typography variant="sm">
                        <span>Data Entry and Management:</span> Entering data into databases or spreadsheets, updating records,
                        and maintaining databases with current information.
                    </Typography>
                    <Typography variant="sm">
                        <span>File Organisation:</span> Organizing digital files, managing cloud storage, and ensuring easy
                        retrieval of documents and information.
                    </Typography>
                </div>
                <form className="database-access" onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <OpenClose
                            key={field.id}
                            title={`Database ${index + 1}`}
                            onDelete={fields.length > 1 ? () => onDeleteDatabase(index) : undefined}
                        >
                            <TextField
                                {...register(`databaseList.${index}.host`)}
                                id={`databaseList.${index}.host`}
                                label="Host"
                                placeholder="5.161.178.89"
                                type="text"
                                className="min"
                                errorMsg={errors.databaseList?.[index]?.host?.message}
                                maxLength={HOST_MAX_LENGTH}
                            />
                            <TextField
                                {...register(`databaseList.${index}.port`)}
                                id={`databaseList.${index}.port`}
                                label="Port"
                                placeholder="33060"
                                type="text"
                                className="min"
                                errorMsg={errors.databaseList?.[index]?.port?.message}
                                maxLength={PORT_MAX_LENGTH}
                            />
                            <TextField
                                {...register(`databaseList.${index}.database`)}
                                id={`databaseList.${index}.database`}
                                label="Database"
                                placeholder="Enter Database"
                                type="text"
                                className="min"
                                errorMsg={errors.databaseList?.[index]?.database?.message}
                                maxLength={DATABASE_NAME_MAX_LENGTH}
                            />
                            <TextField
                                {...register(`databaseList.${index}.user`)}
                                id={`databaseList.${index}.user`}
                                label="User"
                                placeholder="Bublik"
                                type="text"
                                className="half"
                                errorMsg={errors.databaseList?.[index]?.user?.message}
                                maxLength={DATABASE_USER_MAX_LENGTH}
                            />
                            <TextField
                                {...register(`databaseList.${index}.password`)}
                                id={`databaseList.${index}.password`}
                                label="Password"
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                type="password"
                                className="half"
                                errorMsg={errors.databaseList?.[index]?.password?.message}
                                maxLength={DATABASE_PASSWORD_MAX_LENGTH}
                            />
                            <p className="enter-text">Or you can enter</p>
                            <TextField
                                {...register(`databaseList.${index}.url`)}
                                id={`databaseList.${index}.url`}
                                label="URL"
                                placeholder="Enter connection string"
                                type="url"
                                className="max"
                                errorMsg={errors.databaseList?.[index]?.url?.message}
                            />
                            <div className="link-btn-wrap">
                                <ConnectButton
                                    status={getValues(`databaseList.${index}.isConnected`) as TConnectButtonStatus}
                                    onClick={() => connectDataBase(index)}
                                />
                                {fields.length > 1 && (
                                    <button className="link-btn remove" type="button" onClick={() => onDeleteDatabase(index)}>
                                        <Del />
                                        Remove
                                    </button>
                                )}
                            </div>
                        </OpenClose>
                    ))}
                    <div className="btn-add-wrap">
                        <button className="btn-add" type="button" onClick={onAddDatabase}>
                            <IconPlus />
                            Add one more database
                        </button>
                    </div>
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton disabled={isValid} requiredText={`You have already added access to the database`} />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

/*
    status="hold"
    status="fulfilled"
    status="rejected"
    status="pending"
*/
