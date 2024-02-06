import React from 'react';
import { Textarea } from '../../shared/textarea/textarea';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';
import { TAdditionalNotesFormValues } from '../../../models/form';
import { ADDITIONAL_NOTES_MAX_LENGTH } from '../../../constants/form';

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
                    <Typography>Use this space to add extra information or pose any questions you may have.</Typography>
                </div>
                <form className="email-access" onSubmit={handleSubmit(onSubmit)}>
                    <Textarea
                        {...register('additionalNotes')}
                        label="Additional Notes"
                        placeholder="Enter Additional Notes"
                        maxLength={ADDITIONAL_NOTES_MAX_LENGTH}
                    />
                </form>
            </div>
            <div className="btn-wrap">
                <Button label="Confirm" type="submit" onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};
