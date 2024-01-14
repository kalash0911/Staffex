import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';

export const BankAccess = () => {
    const { handleNextQuestion } = useAppFormState();

    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <Typography>
                    To enable the <span>"Expense Tracking and Reporting"</span> feature, our app requires access to your bank
                    account details. You can't skip this access.
                </Typography>
            </div>
            <form className="email-access">
                <Checkbox text="JPMorgan Chase" />
                <Checkbox text="Bank of America" />
                <Checkbox text="Wells Fargo" />
                <Checkbox text="Other" />
            </form>
            <div className="btn-wrap">
                <Button label="Skip" variant="secondary" onClick={handleNextQuestion} />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
