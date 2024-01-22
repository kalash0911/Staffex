import React from 'react';
import { TextField } from '../../shared/text-field/text-field';
import { IconPlus } from '../../../icons/plus.tsx';
import { Typography } from '../../shared/typography/typography.tsx';
import { Button } from '../../shared/button/button.tsx';
import { useAppFormState } from '../../../context/app-form-context.tsx';
import { SkipButton } from '../../skip-btn/skip-btn.tsx';
import { TServiceItemInfo } from '../../../models/form.ts';
import { ServiceItem } from '../../shared/service-item/service-item.tsx';

export const CloudDataAccess = () => {
    const { handleNextQuestion } = useAppFormState();

    // TODO: Remove mocks
    const mocksApps: TServiceItemInfo[] = [
        {
            serviceType: 'gdrive',
            email: 'test@gmail.com',
            refreshToken: '123',
        },
        {
            serviceType: 'anotherCloud',
            email: 'test2@gmail.com',
            refreshToken: '1233',
        },
    ];

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        In order for us to manage your calendar, do you agree to provide access to your Google and/and Microsoft
                        accounts? If you do not agree, the following basic functions will not be available:
                    </Typography>
                    <Typography variant="sm">
                        <span>Appointment Scheduling and Calendar Management:</span> Managing the user's calendar, scheduling
                        appointments, meetings, and reminders, and sending notifications for upcoming events.
                    </Typography>
                </div>
                <form className="cloud-data-access">
                    <TextField label="Link 1" placeholder="http:/example.com" type="url" />
                    <div className="btn-wrap">
                        <button className="btn-add click-song">
                            <IconPlus />
                            Add one more link
                        </button>
                    </div>
                </form>
                {/* TODO: remove mocks */}
                {mocksApps.map(({ email, serviceType }, index) => {
                    return (
                        <ServiceItem
                            key={email}
                            variant={serviceType}
                            textContent={email}
                            serviceTitle={serviceType === 'anotherCloud' ? `Link ${index}` : ''}
                        />
                    );
                })}
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
