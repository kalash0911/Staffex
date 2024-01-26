import React from 'react';
import { getFeaturesFromLocalStorage } from '../../../utils/general';

export const FeatureInfo = () => {
    const features = getFeaturesFromLocalStorage();
    const featureLength = features && Object.values(features).filter((val) => val).length;

    return (
        <div>
            <h2 className="modal-title">{featureLength} features you&apos;ve added</h2>
            <div>
                {features?.communicationCoordination && (
                    <div>
                        <img src="./images/communication-coordination.png" alt="communication-coordination" />
                        <p>Communication Coordination</p>
                    </div>
                )}
                {features?.voiceRecognation && (
                    <div>
                        <img src="./images/voice-recognation.png" alt="voice-recognatio" />
                        <p>Voice Recognition and Command</p>
                    </div>
                )}
                {features?.documentPreparation && (
                    <div>
                        <img src="./images/document-preparation.png" alt="document-preparation" />
                        <p>Document Preparation and Management</p>
                    </div>
                )}
                {features?.crm && (
                    <div>
                        <img src="./images/crm.png" alt="crm" />
                        <p>Customer Relationship Management(CRM)</p>
                    </div>
                )}
            </div>
        </div>
    );
};
