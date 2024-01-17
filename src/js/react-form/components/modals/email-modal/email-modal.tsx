import React from 'react';
import { Button } from '../../shared/button/button';
import { TextField } from '../../shared/text-field/text-field';

export interface IEmailModalProps {
    handleAddEmail: () => void;
}

export const EmailModal = ({ handleAddEmail }: IEmailModalProps) => {
    return (
        <div>
            <h2>Add another email</h2>
            <form>
                <TextField label="Email" />
                <TextField label="Password" type="password" />
                <Button label="Add Email" onClick={handleAddEmail} type="submit" />
            </form>
        </div>
    );
};
