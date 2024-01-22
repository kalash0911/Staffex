import React from 'react';
import { Textarea } from '../../shared/textarea/textarea';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { SkipButton } from '../../skip-btn/skip-btn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import { TAdditionalNotesFormValues } from '../../../models/form';

export const AdditionalNotes = () => {
    const { handleNextQuestion } = useAppFormState();

    const { register, handleSubmit } = useForm<TAdditionalNotesFormValues>({ resolver: yupResolver(schema) });

    const onSubmit = (data: TAdditionalNotesFormValues) => {
        handleNextQuestion(data);
    };

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Fill in the field if you would like to leave <span>additional information or have questions.</span>
                    </Typography>
                </div>
                <form className="email-access" onSubmit={handleSubmit(onSubmit)}>
                    <Textarea {...register('additionalNotes')} label="Additional Notes" placeholder="Enter Additional Notes" />
                </form>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
