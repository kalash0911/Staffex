import React from 'react';
import { Textarea } from '../../shared/textarea/textarea';
import { Typography } from '../../shared/typography/typography';
import { Button } from '../../shared/button/button';
import { useAppFormState } from '../../../context/app-form-context';

export const AdditionalNotes = () => {
    const { handleNextQuestion } = useAppFormState();

    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    Fill in the field if you would like to leave <span>additional information or have questions.</span>
                </Typography>
            </div>
            <form className="email-access">
                <Textarea label="Additional Notes" placeholder="Enter Additional Notes" />
            </form>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
