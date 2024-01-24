import React from 'react';
import { Typography } from '../../shared/typography/typography.tsx';
import { Button } from '../../shared/button/button.tsx';
import { useAppFormState } from '../../../context/app-form-context.tsx';
import { SkipButton } from '../../skip-btn/skip-btn.tsx';
import { ServiceItem } from '../../shared/service-item/service-item.tsx';
import { ServiceButton } from '../../shared/service-button/service-button.tsx';
import { GoogleDrive as GDriveIcon } from '../../../icons/GoogleDrive.tsx';
import { FilePlus as FilePlusIcon } from '../../../icons/FilePlus.tsx';
import { useModal } from '../../../context/modal-context.tsx';
import { CloudDataLink, ICloudDataLinkProps } from '../../modals/cloud-data-link/cloud-data-link.tsx';
import { TServiceItemInfo } from '../../../models/form.ts';

export const CloudDataAccess = () => {
    const { answers, setAnswers, handleDeleteServiceItem, handleNextQuestion } = useAppFormState();
    const { openModal, hideModal } = useModal();

    const cloudData = answers?.accessCloudData;

    const handleAnotherCloudLink = () => [
        openModal<ICloudDataLinkProps>(CloudDataLink, {
            onAdd: (value) => {
                const cloudData: TServiceItemInfo = {
                    email: '',
                    serviceType: 'anotherCloud',
                    refreshToken: '',
                    accessToken: '',
                    cloudLink: value,
                };
                updateCloudDataList(cloudData);
                hideModal();
            },
        }),
    ];

    const updateCloudDataList = (cloudData: TServiceItemInfo) => {
        setAnswers((prevState) => {
            if (!prevState?.accessCloudData?.length) {
                return {
                    ...prevState,
                    accessCloudData: [cloudData],
                };
            }
            if (!prevState.accessCloudData.find((el) => el.cloudLink === cloudData.cloudLink)) {
                return {
                    ...prevState,
                    accessCloudData: [...prevState?.accessCloudData, cloudData],
                };
            }
            return prevState;
        });
    };

    const cloudDataList = cloudData?.length ? (
        cloudData.map(({ email, serviceType, cloudLink }, index) => {
            return (
                <ServiceItem
                    key={email || cloudLink}
                    variant={serviceType}
                    textContent={cloudLink}
                    serviceTitle={serviceType === 'anotherCloud' ? `Link ${index + 1}` : ''}
                    onDelete={() => {
                        handleDeleteServiceItem('accessCloudData', index);
                    }}
                />
            );
        })
    ) : (
        <Typography>The list of emails you added is empty.</Typography>
    );

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
                <div className="choose-wrap">
                    <ServiceButton icon={<GDriveIcon />} onClick={() => alert('In progress...')}>
                        Google Drive
                    </ServiceButton>
                    <ServiceButton icon={<FilePlusIcon />} onClick={handleAnotherCloudLink}>
                        Add link to your file(s)
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added emails</Typography>
                    {cloudDataList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
