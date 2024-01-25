import React from 'react';
import { getFeaturesFromLocalStorage } from '../../utils/general';
import { BASIC_PRICE, FEATURE_PRICE } from '../../constants/currency';

// export type TBotInfoProps = {
//     title: string | ReactNode;
// };

export const BotInfo = () => {
    const features = getFeaturesFromLocalStorage();
    const featureLength = features && Object.values(features).filter((val) => val).length;

    const title = 'Secretary Monica';
    const additionalPrice = featureLength ? featureLength * FEATURE_PRICE : 0;
    const price = (BASIC_PRICE + additionalPrice)
        .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
        .replace('.00', '')
        .replace(/,/g, '.');

    const basicContent = (
        <div>
            <div>
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
            <div>
                <img src="./images/monica-avatar.png" alt="monica-avatar" />
            </div>
        </div>
    );

    const additionalFeaturesContent = (
        <div>
            <div>
                <h3>{title}</h3>
                <p>{price}</p>
            </div>
            <p>additional features you&apos;ve added</p>
            <div>
                <div>
                    {features?.communicationCoordination && (
                        <div>
                            <img src="./images/communication-coordination.png" alt="communication-coordination" />
                        </div>
                    )}
                    {features?.voiceRecognation && (
                        <div>
                            <img src="./images/voice-recognation.png" alt="voice-recognatio" />
                        </div>
                    )}
                    {features?.documentPreparation && (
                        <div>
                            <img src="./images/document-preparation.png" alt="document-preparation" />
                        </div>
                    )}
                    {features?.crm && (
                        <div>
                            <img src="./images/crm.png" alt="crm" />
                        </div>
                    )}
                </div>
                <div>
                    <img src="./images/monica-avatar.png" alt="monica-avatar" />
                </div>
            </div>
        </div>
    );

    const content = featureLength ? additionalFeaturesContent : basicContent;

    return content;
};
