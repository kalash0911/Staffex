import React from 'react';
import { Textarea } from '../../shared/textarea/textarea';

export const AdditionalNotes = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    Fill in the field if you would like to leave{' '}
                    <span>additional information or have questions.</span>
                </p>
            </div>
            <form className="email-access">
                <Textarea
                    label="Additional Notes"
                    placeholder="Enter Additional Notes"
                />
            </form>
        </div>
    );
};
