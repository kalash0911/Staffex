import React from 'react';
import { TextField } from '../../shared/text-field/text-field';

export const ContactInfo = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    Please provide us with your contact information. We will use
                    it only for contacting you.
                </p>
            </div>
            <form className="contact-info">
                <TextField
                    label="First name"
                    placeholder="Enter your name"
                    type="text"
                    required
                />
                <TextField
                    label="Last name"
                    placeholder="Enter your Last name"
                    type="text"
                    required
                />
                <TextField
                    label="Phone"
                    placeholder="Enter your phone number"
                    type="phone"
                    required
                />
                <TextField
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                />
            </form>
        </div>
    );
};
