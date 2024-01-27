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

    const handleBankAccount = () => {
        Lean.connect({
            app_token: '2c9a80897169b1dd01716a0339e30003',
            permissions: ['identity', 'accounts', 'transactions', 'balance', 'payments'],
            customer_id: 'd57a03bc-ef9d-460b-8fa6-3b17e425326c',
            payment_destination_id: 'f8d6fe12-5cc3-4df2-82c2-48b4dd6f74a7', //if not sent, the default destination ID (your CMA account) will be used
            sandbox: 'true',
            callback: (res: any) => {
                console.log('res: ', res);
            },
        });
    };

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
