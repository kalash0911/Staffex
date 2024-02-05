import { SECRETARY_FEATURES_KEY } from '../constants/form';
import { TAdditionalFeatures } from '../models/question';

const SAVED_FEATURES_VALUE = localStorage.getItem(SECRETARY_FEATURES_KEY);

export const getFeaturesFromLocalStorage = (): TAdditionalFeatures | null =>
    SAVED_FEATURES_VALUE ? JSON.parse(SAVED_FEATURES_VALUE) : '';

export const getActiveFeatures = () => {
    const features = getFeaturesFromLocalStorage();
    if (!features) return null;

    return Object.keys(features).filter((key) => {
        if (features[key as keyof TAdditionalFeatures]) {
            return key;
        }
    });
};
