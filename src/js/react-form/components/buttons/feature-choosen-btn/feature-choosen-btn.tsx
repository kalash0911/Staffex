import React from 'react';
import { EyeOpen as EyeOpenIcon } from '../../../icons/eye-open';
import { getFeaturesFromLocalStorage } from '../../../utils/general';
import { Link } from '../../shared/link/link';
import { useModal } from '../../../context/modal-context';
import { FeatureInfo } from '../../modals/feature-info/feature-info';

export const FetureChoosenButton = () => {
    const { openModal } = useModal();
    const features = getFeaturesFromLocalStorage();
    const featureLength = features && Object.values(features).filter((val) => val).length;

    const handleFeatureModal = () => {
        openModal(FeatureInfo);
    };

    return (
        <>
            {featureLength ? (
                <Link onClick={handleFeatureModal}>
                    {featureLength} Features <EyeOpenIcon />
                </Link>
            ) : null}
        </>
    );
};
