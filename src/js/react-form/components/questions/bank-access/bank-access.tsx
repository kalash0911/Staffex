import React from 'react';
import { Checkbox } from '../../shared/checkbox/checkbox';

export const BankAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    To enable the <span>"Expense Tracking and Reporting"</span>{' '}
                    feature, our app requires access to your bank account
                    details. You can't skip this access.
                </p>
            </div>
            <form className="email-access">
                <Checkbox text="JPMorgan Chase" />
                <Checkbox text="Bank of America" />
                <Checkbox text="Wells Fargo" />
                <Checkbox text="Other" />
            </form>
        </div>
    );
};
