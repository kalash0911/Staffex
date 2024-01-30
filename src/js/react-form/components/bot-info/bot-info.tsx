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
        <div className="block-standart">
            <div className="bot-info-text">
                <h3 className="bot-info-title">{title}</h3>
                <p className="bot-info-price">{price}</p>
            </div>
            <div className="bot-info-avatar">
                <img src="./images/monica-avatar.png" alt="monica-avatar" />
            </div>
        </div>
    );

    const additionalFeaturesContent = (
        <div className="block-full">
            <div className="bot-info-text">
                <h3 className="bot-info-title">{title}</h3>
                <p className="bot-info-price">{price}</p>
                <p className="bot-info-par">additional features you&apos;ve added</p>
            </div>
            <div className="bot-info-img-wrap">
                <div className="bot-info-item-wrap">
                    {features?.communicationCoordination && (
                        <div className="bot-info-item">
                            <img src="./images/communication-coordination.png" alt="communication-coordination" />
                        </div>
                    )}
                    {features?.voiceRecognation && (
                        <div className="bot-info-item">
                            <img src="./images/voice-recognation.png" alt="voice-recognatio" />
                        </div>
                    )}
                    {features?.documentPreparation && (
                        <div className="bot-info-item">
                            <img src="./images/document-preparation.png" alt="document-preparation" />
                        </div>
                    )}
                    {features?.crm && (
                        <div className="bot-info-item">
                            <img src="./images/crm.png" alt="crm" />
                        </div>
                    )}
                </div>
                <div className="bot-info-avatar">
                    <img src="./images/monica-avatar.png" alt="monica-avatar" />
                </div>
            </div>
        </div>
    );

    const content = featureLength ? additionalFeaturesContent : basicContent;

    return content;
};
