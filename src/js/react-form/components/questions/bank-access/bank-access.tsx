import React from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { Bank } from '../../../icons/Bank';
import { ServiceItem } from '../../shared/service-item/service-item';
import { TServiceItemInfo } from '../../../models/form';
import axios from 'axios';

export const BankAccess = () => {
    const { answers, handleNextQuestion, handleDeleteServiceItem, setAnswers } = useAppFormState();

    const banks = answers?.accessBankAccounts;

    const handleBankAccount = () => {
        // Mock data:
        // Login: marxschuppe
        // Password: TaKZNNhKsYxP
        const APP_TOKEN = 'f4a1ca0a-043e-4263-88ac-425e078acfdf';
        Lean.connect({
            app_token: APP_TOKEN,
            permissions: ['identity', 'accounts', 'transactions', 'balance'],
            customer_id: 'a574570a-6acc-4bde-9022-f5070dcc2d09',
            sandbox: true,
            callback: (res: any) => {
                console.log('res: ', res);
                const bankName = res?.bank?.bank_identifier || 'Unknown bank';
                // TODO: This code should be in webhook?
                if (res.secondary_status === 'ENTITY_ALREADY_CONNECTED' || res.secondary_status === 'OK') {
                    axios
                        .post(
                            'https://sandbox.leantech.me/data/v1/identity',
                            {
                                entity_id: 'bdabeaf8-da21-4f1e-b40f-3a5c61886e28',
                            },
                            {
                                headers: {
                                    'lean-app-token': APP_TOKEN,
                                },
                            },
                        )
                        .then(({ data }) => {
                            const userEmail = data?.payload?.email_address || '';
                            const bankData: TServiceItemInfo = {
                                email: userEmail,
                                bankName: bankName,
                                refreshToken: '',
                                accessToken: '',
                                id: crypto.randomUUID(),
                                serviceType: 'bank',
                            };
                            updateBanksList(bankData);
                        });
                }
            },
        });
    };

    const updateBanksList = (bankData: TServiceItemInfo) => {
        setAnswers((prevState) => {
            if (!prevState?.accessBankAccounts?.length) {
                return {
                    ...prevState,
                    accessBankAccounts: [bankData],
                };
            }
            if (!banks?.find((bank) => bank.bankName === bankData.bankName && bank.email === bankData.email)) {
                return {
                    ...prevState,
                    accessBankAccounts: [...prevState?.accessBankAccounts, bankData],
                };
            }
            return prevState;
        });
    };

    console.log('banks: ', banks);
    const bankAccountList = banks?.length ? (
        banks.map(({ email, serviceType, id, bankName }) => {
            return (
                <ServiceItem
                    key={id}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={bankName}
                    onDelete={() => {
                        handleDeleteServiceItem('accessBankAccounts', id);
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
