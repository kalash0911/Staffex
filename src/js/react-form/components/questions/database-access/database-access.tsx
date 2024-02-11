import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { schema } from './validation';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TDataBase, TDataBaseFormValues, TDataBaseSelectType, TDataBaseTypes } from '../../../models/form';
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
import Select, { StylesConfig } from 'react-select';

const options: TDataBaseSelectType[] = [
    { value: 'Oracle', label: 'Oracle' },
    { value: 'MySql', label: 'MySQL' },
    { value: 'SqlServer', label: 'SQL Server' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Redis', label: 'Redis' },
];

const defaultValues: TDataBase = {
    databaseType: options[0],
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
    url: '',
    connection_status: 'hold',
};

const selectStyles: StylesConfig = {
    control: (baseStyles, state) => {
        return {
            ...baseStyles,
            background: 'transparent',
            borderRadius: 0,
            border: 'none',
            borderBottom: '1px solid',
            color: 'rgba(255, 255, 255, .3)',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#5CFF4F',
                cursor: 'pointer',
            },
            borderColor: state.isFocused || state.menuIsOpen ? '#5CFF4F' : 'rgba(255, 255, 255, .3)',
        };
    },
    indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, .3)',
    }),
    valueContainer: (baseStyles) => {
        return {
            ...baseStyles,
            padding: 0,
        };
    },
    singleValue: (baseStyles) => {
        return {
            ...baseStyles,
            color: '#fff',
        };
    },
    menu: (baseStyles) => {
        return {
            ...baseStyles,
            borderRadius: 0,
            background: '#000',
            border: '1px solid rgba(255, 255, 255, .3)',
            borderTop: 0,
        };
    },
    option: (baseStyles, { isSelected }) => {
        return {
            ...baseStyles,
            background: '#000',
            color: isSelected ? '#5CFF4F' : '#fff',
            '&:hover': {
                cursor: 'pointer',
                background: '#000',
                color: '#5CFF4F',
            },
            ':active': {
                ...baseStyles[':active'],
            },
        };
    },
};

export const DatabaseAccess = () => {
    const { answers, handleNextQuestion, showToast } = useAppFormState();
    const databaseList = answers?.databaseList;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        trigger,
        watch,
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
        const rejectedDatabaseInd = data.databaseList?.findIndex((db) => db.connection_status !== 'fulfilled');
        if (typeof rejectedDatabaseInd === 'number' && rejectedDatabaseInd >= 0) {
            showToast.warning(`Database ${rejectedDatabaseInd + 1} isn't connected`);
            return;
        }
        handleNextQuestion(data);
    };

    const onAddDatabase = () => {
        append(defaultValues);
    };

    const onDeleteDatabase = (index: number) => {
        remove(index);
    };

    const isFormValid = !fields.some((field) => field.connection_status !== 'fulfilled') && isValid;

    const connectDataBase = (index: number) => {
        const submitBeforeConnect = (data: TDataBaseFormValues) => {
            const currentDatabase = data.databaseList?.[index];
            if (!currentDatabase) return;

            setValue(`databaseList.${index}.connection_status`, 'pending');

            staffexApi
                .connectDataBase({
                    host: currentDatabase.host,
                    port: currentDatabase.port,
                    password: currentDatabase.password,
                    user: currentDatabase.user,
                    database: currentDatabase.database,
                    databaseType: currentDatabase.databaseType.value,
                    url: currentDatabase.url,
                })
                .then(() => {
                    setValue(`databaseList.${index}.connection_status`, 'fulfilled');
                    trigger(`databaseList.${index}.connection_status`);
                })
                .catch(() => {
                    setValue(`databaseList.${index}.connection_status`, 'rejected');
                    trigger(`databaseList.${index}.connection_status`);
                });
        };
        handleSubmit(submitBeforeConnect)();
    };

    const placeholderConfig = {
        Oracle: 'User Id={User};Password={Password};Data Source={Host}:{port}/{DataBaseName};',
        MySql: 'Server={Host};Port={Port};User ID={User};Password={Password};Database={DataBaseName};',
        SqlServer: 'Data Source={Host},{Port};Initial Catalog={DataBaseName};User ID={User};Password={Password};',
        PostgreSQL: 'Host={Host};Port={Port};Username={User};Password={Password};Database={DataBaseName};',
        MongoDB: 'mongodb://[{User}:{Password}@]{Host}:{Port}/{DataBaseName}',
        Redis: '{Host}:{Port},password={Password},user={User}',
    } as Record<TDataBaseTypes, string>;

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
                    {fields.map((field, index) => {
                        const { value: selectValue } = watch(`databaseList.${index}.databaseType`);
                        const isFieldsDisabled =
                            (getValues(`databaseList.${index}.connection_status`) as TConnectButtonStatus) === 'fulfilled';
                        const urlPlaceholder = placeholderConfig[selectValue];
                        const isRedisDB = selectValue === 'Redis';
                        return (
                            <OpenClose
                                key={field.id}
                                title={`Database ${index + 1}`}
                                onDelete={fields.length > 1 ? () => onDeleteDatabase(index) : undefined}
                            >
                                <div className="select-wrapper">
                                    <Controller
                                        name={`databaseList.${index}.databaseType`}
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    isDisabled={isFieldsDisabled}
                                                    options={options}
                                                    styles={selectStyles}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <TextField
                                    {...register(`databaseList.${index}.host`)}
                                    id={`databaseList.${index}.host`}
                                    label="Host"
                                    placeholder="5.161.178.89"
                                    type="text"
                                    className={`${isRedisDB ? 'half' : 'min'}`}
                                    errorMsg={errors.databaseList?.[index]?.host?.message}
                                    maxLength={HOST_MAX_LENGTH}
                                    disabled={isFieldsDisabled}
                                />
                                <TextField
                                    {...register(`databaseList.${index}.port`)}
                                    id={`databaseList.${index}.port`}
                                    label="Port"
                                    placeholder="33060"
                                    type="text"
                                    className={`${isRedisDB ? 'half' : 'min'}`}
                                    errorMsg={errors.databaseList?.[index]?.port?.message}
                                    maxLength={PORT_MAX_LENGTH}
                                    disabled={isFieldsDisabled}
                                />
                                {!isRedisDB && (
                                    <TextField
                                        {...register(`databaseList.${index}.database`)}
                                        id={`databaseList.${index}.database`}
                                        label="Database"
                                        placeholder="Enter Database"
                                        type="text"
                                        className="min"
                                        errorMsg={errors.databaseList?.[index]?.database?.message}
                                        maxLength={DATABASE_NAME_MAX_LENGTH}
                                        disabled={isFieldsDisabled}
                                    />
                                )}

                                <TextField
                                    {...register(`databaseList.${index}.user`)}
                                    id={`databaseList.${index}.user`}
                                    label="User"
                                    placeholder="Bublik"
                                    type="text"
                                    className="half"
                                    errorMsg={errors.databaseList?.[index]?.user?.message}
                                    maxLength={DATABASE_USER_MAX_LENGTH}
                                    disabled={isFieldsDisabled}
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
                                    disabled={isFieldsDisabled}
                                />
                                <p className="enter-text">Or you can enter</p>
                                <TextField
                                    {...register(`databaseList.${index}.url`)}
                                    id={`databaseList.${index}.url`}
                                    label="URL"
                                    placeholder={urlPlaceholder}
                                    type="url"
                                    className="max"
                                    errorMsg={errors.databaseList?.[index]?.url?.message}
                                    disabled={isFieldsDisabled}
                                />
                                <div className="link-btn-wrap">
                                    <ConnectButton
                                        disabled={isFieldsDisabled}
                                        status={getValues(`databaseList.${index}.connection_status`) as TConnectButtonStatus}
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
                        );
                    })}
                    <div className="btn-add-wrap">
                        <button className="btn-add" type="button" onClick={onAddDatabase}>
                            <IconPlus />
                            Add one more database
                        </button>
                    </div>
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton disabled={isFormValid} requiredText={`You have already added access to the database`} />
                <Button
                    label="Next"
                    type="submit"
                    onClick={() => {
                        handleSubmit(onSubmit)();
                    }}
                />
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
