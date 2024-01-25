import { SECRETARY_FEATURES_KEY } from '../constants/form';
import { TAdditionalFeatures } from '../models/question';

export const getFeaturesFromLocalStorage = (): TAdditionalFeatures | null =>
    JSON.parse(localStorage.getItem(SECRETARY_FEATURES_KEY) || '');

export const getActiveFeatures = () => {
    const features = getFeaturesFromLocalStorage();
    if (!features) return null;

    return Object.keys(features).filter((key) => {
        if (features[key as keyof TAdditionalFeatures]) {
            return key;
        }
    });
};
