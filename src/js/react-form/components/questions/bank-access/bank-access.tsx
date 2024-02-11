import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { Bank } from '../../../icons/Bank';
import { ServiceItem } from '../../shared/service-item/service-item';

// Mock data:
// Login: marxschuppe
// Password: TaKZNNhKsYxP

export const BankAccess = () => {
    const { answers, handleNextQuestion, handleDeleteServiceItem, connectBankAccount, showToast } = useAppFormState();

    const bankList = answers?.accessBankAccounts;

    const bankAccountList = bankList?.length ? (
        bankList.map(({ BankLogo, BankName, FullName, EntityId }) => {
            return (
                <ServiceItem
                    key={EntityId}
                    variant="bank"
                    textContent={FullName}
                    serviceTitle={BankName}
                    iconSrc={BankLogo}
                    onDelete={() => {
                        handleDeleteServiceItem('accessBankAccounts', EntityId);
                    }}
                />
            );
        })
    ) : (
        <Typography>The list of applications you added is empty.</Typography>
    );

    return (
        <div className="conetnt-block">
            <div className="conetnt-box">
                <div className="text-wrap">
                    <Typography classNames="mb40">
                        To enable the <span>'Expense Tracking and Reporting'</span> feature, our app requires access to your bank
                        account details. This access cannot be skipped.
                    </Typography>
                    <Typography variant="ft">Click to add a bank account</Typography>
                </div>
                <div className="choose-wrap">
                    <ServiceButton icon={<Bank />} onClick={connectBankAccount} showPlusIcon={false}>
                        Add bank account
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added bank accounts</Typography>
                    {bankAccountList}
                </div>
            </div>
            <div className="btn-wrap">
                {/* TODO: Disable skip button before prod */}
                <SkipButton />
                <Button
                    label="Next"
                    type="submit"
                    onClick={() => {
                        if (!bankList?.length) {
                            showToast.warning('The list of applications you added is empty.');
                            return;
                        }
                        handleNextQuestion();
                    }}
                />
            </div>
        </div>
    );
};
