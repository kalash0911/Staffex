import React from 'react';
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

export const ContactInfo = () => {
    const { answers, handleNextQuestion } = useAppFormState();

    const {
        control,
        watch,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
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

    const isOptional = schema.spec.optional;
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

    const onSubmit = (data: TCommonFormValues) => {
        handleNextQuestion(data);
    };

    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography> Please provide us with your contact information. We will use it only for contacting you.</Typography>
            </div>
            <form className="contact-info" onSubmit={handleSubmit(onSubmit)}>
                <div>
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
                        />
                        <TextField
                            {...register('contactFirstName')}
                            label="Contact First Name"
                            placeholder="Enter contact first name"
                            type="text"
                            required
                            errorMsg={errors.contactFirstName?.message}
                        />
                        <TextField
                            {...register('contactLastName')}
                            label="Contact Last Name"
                            placeholder="Enter contact last name"
                            type="text"
                            required
                            errorMsg={errors.contactLastName?.message}
                        />
                        <TextField
                            {...register('contactFirstTitle')}
                            label="Contact First Title"
                            placeholder="Enter contact title (CEO, CFO, etc.)"
                            type="text"
                            required
                            errorMsg={errors.contactFirstTitle?.message}
                        />
                    </>
                ) : (
                    <>
                        {' '}
                        <TextField
                            {...register('firstName')}
                            label="First name"
                            placeholder="Enter your name"
                            type="text"
                            required
                            errorMsg={errors.firstName?.message}
                        />
                        <TextField
                            {...register('lastName')}
                            label="Last name"
                            placeholder="Enter your Last name"
                            type="text"
                            required
                            errorMsg={errors.lastName?.message}
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
                            maxLength={14}
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
                            maxLength={14}
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
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    errorMsg={errors.email?.message}
                />
            </form>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} disabled={!isOptional} />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
