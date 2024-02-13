import React from 'react';
import { Typography } from '../../shared/typography/typography.tsx';
import { Button } from '../../shared/button/button.tsx';
import { useAppFormState } from '../../../context/app-form-context.tsx';
import { SkipButton } from '../../buttons/skip-btn/skip-btn.tsx';
import { ServiceItem } from '../../shared/service-item/service-item.tsx';
import { ServiceButton } from '../../buttons/service-button/service-button.tsx';
import { GoogleDrive as GDriveIcon } from '../../../icons/GoogleDrive.tsx';
import { FilePlus as FilePlusIcon } from '../../../icons/FilePlus.tsx';
import { useModal } from '../../../context/modal-context.tsx';
import { CloudDataLink, ICloudDataLinkProps } from '../../modals/cloud-data-link/cloud-data-link.tsx';
import { TServiceItemInfo } from '../../../models/form.ts';
import { GDRIVE_SCOPE } from '../../../constants/google.ts';
import { staffexApi } from '../../../api/staffex.ts';
import { useGoogleLogin } from '@react-oauth/google';

export const CloudDataAccess = () => {
    const { answers, setAnswers, handleDeleteServiceItem, handleNextQuestion, showToast } = useAppFormState();
    const { openModal, hideModal } = useModal();

    const cloudData = answers?.accessCloudData;

    const onGoogleMeet = useGoogleLogin({
        flow: 'auth-code',
        scope: GDRIVE_SCOPE,
        onSuccess: async (codeResponse) => {
            await staffexApi
                .postGoogleAuth({ code: codeResponse.code })
                .then(({ data }) => {
                    if (!cloudData?.find(({ email, serviceType }) => email === data.email && serviceType === 'gdrive')) {
                        const meetAppData: TServiceItemInfo = {
                            email: data.email,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                            serviceType: 'gdrive',
                            id: crypto.randomUUID(),
                        };
                        updateCloudDataList(meetAppData);
                    }
                })
                .catch(() => {
                    showToast.error();
                });
        },
        onError: () => {
            showToast.error();
        },
    });

    const handleAnotherCloudLink = () => [
        openModal<ICloudDataLinkProps>(CloudDataLink, {
            onAdd: (value) => {
                const cloudData: TServiceItemInfo = {
                    email: '',
                    serviceType: 'anotherCloud',
                    refreshToken: '',
                    accessToken: '',
                    cloudLink: value,
                    id: crypto.randomUUID(),
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
        cloudData.map(({ email, serviceType, cloudLink, id }, index) => {
            return (
                <ServiceItem
                    key={id}
                    variant={serviceType}
                    textContent={email || cloudLink}
                    serviceTitle={serviceType === 'anotherCloud' ? `Link ${index + 1}` : ''}
                    onDelete={() => {
                        handleDeleteServiceItem('accessCloudData', id);
                    }}
                />
            );
        })
    ) : (
        <Typography>The list of your added files is empty.</Typography>
    );

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography>
                        Want to organize your files? Let us access your cloud data, and you will stay informed and work
                        efficiently. Imagine your crucial work files, named randomly, are stored in various cloud storages and you
                        need them right now. With a single click, you'll have all your files organized and ready for use
                        immediately. Please note, the following functions depend on access to operate correctly.
                    </Typography>
                    <Typography variant="sm">
                        <span>Data Entry and Management:</span> Entering data into databases or spreadsheets, updating records,
                        and maintaining databases with current information.
                    </Typography>
                    <Typography variant="sm">
                        <span>File Organisation:</span> Organizing digital files, managing cloud storage, and ensuring easy
                        retrieval of documents and information.
                    </Typography>
                </div>
                <Typography variant="ft">Click to connect your data</Typography>
                <div className="choose-wrap">
                    <ServiceButton icon={<GDriveIcon />} onClick={onGoogleMeet}>
                        Google Drive
                    </ServiceButton>
                    <ServiceButton icon={<FilePlusIcon />} onClick={handleAnotherCloudLink}>
                        Add link to your file(s)
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added files</Typography>
                    {cloudDataList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton disabled={!!cloudData?.length} requiredText={`You have already added access to cloud data`} />
                <Button
                    label="Next"
                    type="submit"
                    onClick={() => {
                        if (!cloudData?.length) {
                            showToast.warning('The list of your added files is empty.');
                            return;
                        }
                        handleNextQuestion();
                    }}
                />
            </div>
        </div>
    );
};
