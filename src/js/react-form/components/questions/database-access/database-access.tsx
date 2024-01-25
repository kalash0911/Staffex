import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { schema } from './validation';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TDataBaseFormValues } from '../../../models/form';
import { SkipButton } from '../../skip-btn/skip-btn';
import { OpenClose } from '../../shared/open-close/open-close';
import { ConnectButton } from '../../connect-btn/connect-btn';

const defaultValues = {
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
    url: '',
};

export const DatabaseAccess = () => {
    const { answers, handleNextQuestion } = useAppFormState();
    const databaseList = answers?.databaseList;

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TDataBaseFormValues>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            databaseList: databaseList || [defaultValues],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'databaseList' });

    const onSubmit = (data: TDataBaseFormValues) => {
        handleNextQuestion(data);
    };

    const onAddDatabase = () => {
        append(defaultValues);
    };

    const onDeleteDatabase = (index: number) => {
        remove(index);
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
                            />
                            <TextField
                                {...register(`databaseList.${index}.port`)}
                                id={`databaseList.${index}.port`}
                                label="Port"
                                placeholder="33060"
                                type="text"
                                className="min"
                                errorMsg={errors.databaseList?.[index]?.port?.message}
                            />
                            <TextField
                                {...register(`databaseList.${index}.database`)}
                                id={`databaseList.${index}.database`}
                                label="Database"
                                placeholder="Enter Database"
                                type="text"
                                className="min"
                                errorMsg={errors.databaseList?.[index]?.database?.message}
                            />
                            <TextField
                                {...register(`databaseList.${index}.user`)}
                                id={`databaseList.${index}.user`}
                                label="User"
                                placeholder="Bublik"
                                type="text"
                                className="half"
                                errorMsg={errors.databaseList?.[index]?.user?.message}
                            />
                            <TextField
                                {...register(`databaseList.${index}.password`)}
                                id={`databaseList.${index}.password`}
                                label="Password"
                                type="text"
                                className="half"
                                errorMsg={errors.databaseList?.[index]?.password?.message}
                            />
                            <p>Or you can enter</p>
                            <TextField
                                {...register(`databaseList.${index}.url`)}
                                id={`databaseList.${index}.url`}
                                label="URL"
                                placeholder="Enter connection string"
                                type="url"
                                className="max"
                                errorMsg={errors.databaseList?.[index]?.url?.message}
                            />
                            <ConnectButton status="hold" onClick={() => alert('In progress')} />
                            {fields.length > 1 && (
                                <button type="button" onClick={() => onDeleteDatabase(index)}>
                                    Remove
                                </button>
                            )}
                        </OpenClose>
                    ))}
                    <button type="button" onClick={onAddDatabase}>
                        + Add one more database
                    </button>
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
