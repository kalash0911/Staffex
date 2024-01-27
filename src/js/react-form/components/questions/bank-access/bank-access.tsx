import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { Bank } from '../../../icons/Bank';
import { ServiceItem } from '../../shared/service-item/service-item';

export const BankAccess = () => {
    const { answers, handleNextQuestion, handleDeleteServiceItem } = useAppFormState();

    const banks = answers?.accessBankAccounts;

    const handleBankAccount = () => {};

    const bankAccountList = banks?.length ? (
        banks.map(({ email, serviceType }, index) => {
            return (
                <ServiceItem
                    key={email}
                    variant={serviceType}
                    textContent={email}
                    // serviceTitle={bbankName}
                    onDelete={() => {
                        handleDeleteServiceItem('accessBankAccounts', index);
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
                        To enable the <span>"Expense Tracking and Reporting"</span> feature, our app requires access to your bank
                        account details. You can't skip this access.
                    </Typography>
                </div>
                <div className="choose-wrap">
                    <ServiceButton icon={<Bank />} onClick={handleBankAccount} showPlusIcon={false}>
                        Add bank account
                    </ServiceButton>
                </div>
                <div className="list-add-wrap">
                    <Typography variant="ft">List of added bank accounts</Typography>
                    {bankAccountList}
                </div>
            </div>
            <div className="btn-wrap">
                <SkipButton />
                <Button label="Next" type="submit" onClick={handleNextQuestion} />
            </div>
        </div>
    );
};
