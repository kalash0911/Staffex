import React, { useEffect } from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { Typography } from '../../shared/typography/typography';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { TCommonFormValues } from '../../../models/form';
import { maskPhoneNumber } from '../../../utils/form';
import { Radio } from '../../shared/radio/radio';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { DEFAULT_MAX_LENGTH, MAX_NAME_LENGTH, MAX_PHONE_LENGTH } from '../../../constants/form';
import { staffexApi } from '../../../api/staffex';
import { toast } from 'react-toastify';
import { EMAIL_EXIST, GENERAL_ERROR_MSG } from '../../../constants/err-msgs';
import { DEFAULT_TOAST_CONFIG } from '../../../constants/toast';

export const ContactInfo = () => {
    const { answers, handleNextQuestion, setClickStepsDisabled } = useAppFormState();

    const {
        control,
        watch,
        setValue,
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid, isDirty },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            isB2B: !!answers?.isB2B,
            companyName: answers?.companyName || '',
            contactFirstName: answers?.contactFirstName || '',
            contactLastName: answers?.contactFirstTitle || '',
            contactFirstTitle: answers?.contactFirstTitle || '',
            firstName: answers?.firstName || '',
            lastName: answers?.lastName || '',
            phone: answers?.phone || '',
            altPhone: answers?.altPhone || '',
            email: answers?.email || '',
        },
    });

    useEffect(() => {
        if (!isValid) {
            setClickStepsDisabled(true);
        } else if (isValid && !isDirty) {
            setClickStepsDisabled(false);
        }
    }, [isValid]);

    const isB2B = watch('isB2B');

    const onChangeToB2B = () => {
        setValue('isB2B', false);
        setValue('companyName', '');
        setValue('contactFirstName', '');
        setValue('contactLastName', '');
        setValue('contactFirstTitle', '');
    };

    const onChangeToB2C = () => {
        setValue('isB2B', true);
        setValue('firstName', '');
        setValue('lastName', '');
    };

    const onSubmit = async (data: TCommonFormValues) => {
        await toast.promise(
            staffexApi.isEmailExist(data.email!).then((res) => {
                if (res.data) {
                    setError('email', { message: EMAIL_EXIST });
                    throw new Error();
                }
            }),
            {
                pending: 'Checking your email...',
                error: EMAIL_EXIST,
            },
            {
                ...DEFAULT_TOAST_CONFIG,
            },
        );

        setClickStepsDisabled(false);
        handleNextQuestion(data);
    };

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Kindly share your contact details with us. Rest assured, we will solely use this information exclusively
                        for communication purposes.
                    </Typography>
                </div>
                <form className="contact-info" onSubmit={handleSubmit(onSubmit)}>
                    <div className="controls">
                        <Controller
                            control={control}
                            name="isB2B"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <Radio text="Individual" {...rest} checked={!value} onChange={onChangeToB2B} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="isB2B"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <Radio text="Business" {...rest} checked={value} onChange={onChangeToB2C} />
                            )}
                        />
                    </div>
                    {isB2B ? (
                        <>
                            <TextField
                                {...register('companyName')}
                                label="Company Name"
                                placeholder="Enter company name"
                                type="text"
                                required
                                errorMsg={errors.companyName?.message}
                                maxLength={DEFAULT_MAX_LENGTH}
                            />
                            <TextField
                                {...register('contactFirstName')}
                                label="Contact First Name"
                                placeholder="Enter contact first name"
                                type="text"
                                required
                                errorMsg={errors.contactFirstName?.message}
                                maxLength={MAX_NAME_LENGTH}
                            />
                            <TextField
                                {...register('contactLastName')}
                                label="Contact Last Name"
                                placeholder="Enter contact last name"
                                type="text"
                                required
                                errorMsg={errors.contactLastName?.message}
                                maxLength={MAX_NAME_LENGTH}
                            />
                            <TextField
                                {...register('contactFirstTitle')}
                                label="Contact First Title"
                                placeholder="Enter contact title (CEO, CFO, etc.)"
                                type="text"
                                required
                                errorMsg={errors.contactFirstTitle?.message}
                                maxLength={DEFAULT_MAX_LENGTH}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                {...register('firstName')}
                                label="First name"
                                placeholder="Enter your name"
                                type="text"
                                required
                                errorMsg={errors.firstName?.message}
                                maxLength={MAX_NAME_LENGTH}
                            />
                            <TextField
                                {...register('lastName')}
                                label="Last name"
                                placeholder="Enter your Last name"
                                type="text"
                                required
                                errorMsg={errors.lastName?.message}
                                maxLength={MAX_NAME_LENGTH}
                            />
                        </>
                    )}
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                value={value}
                                label="Phone"
                                placeholder="Enter your phone number"
                                type="phone"
                                required
                                errorMsg={errors.phone?.message}
                                maxLength={MAX_PHONE_LENGTH}
                                onBlur={onBlur}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.target.value = maskPhoneNumber(event.target.value.replace(/[\)\( -]/gm, ''));
                                    onChange(event);
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="altPhone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                value={value}
                                label="Alt. Phone"
                                placeholder="Enter your alternate number"
                                type="phone"
                                errorMsg={errors.altPhone?.message}
                                maxLength={MAX_PHONE_LENGTH}
                                onBlur={onBlur}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.target.value = maskPhoneNumber(event.target.value.replace(/[\)\( -]/gm, ''));
                                    onChange(event);
                                }}
                            />
                        )}
                    />
                    <TextField
                        {...register('email')}
                        className="max"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        required
                        errorMsg={errors.email?.message}
                        maxLength={DEFAULT_MAX_LENGTH}
                    />
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton disabled />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
