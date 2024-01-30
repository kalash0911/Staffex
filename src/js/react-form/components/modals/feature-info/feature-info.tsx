import React from 'react';
import { getFeaturesFromLocalStorage } from '../../../utils/general';

export const FeatureInfo = () => {
    const features = getFeaturesFromLocalStorage();
    const featureLength = features && Object.values(features).filter((val) => val).length;

    return (
        <div className="features-block">
            <p className="modal-title">{featureLength} features you&apos;ve added</p>
            <div className="features-item-wrap">
                {features?.communicationCoordination && (
                    <div className="features-item">
                        <div className="features-img">
                            <img src="./images/communication-coordination.png" alt="communication-coordination" />
                        </div>
                        <p className="features-text">Communication Coordination</p>
                    </div>
                )}
                {features?.voiceRecognation && (
                    <div className="features-item">
                        <div className="features-img">
                            <img src="./images/voice-recognation.png" alt="voice-recognatio" />
                        </div>
                        <p className="features-text">Voice Recognition and Command</p>
                    </div>
                )}
                {features?.documentPreparation && (
                    <div className="features-item">
                        <div className="features-img">
                            <img src="./images/document-preparation.png" alt="document-preparation" />
                        </div>
                        <p className="features-text">Document Preparation and Management</p>
                    </div>
                )}
                {features?.crm && (
                    <div className="features-item">
                        <div className="features-img">
                            <img src="./images/crm.png" alt="crm" />
                        </div>
                        <p className="features-text">Customer Relationship Management(CRM)</p>
                    </div>
                )}
            </div>
        </div>
    );
};
