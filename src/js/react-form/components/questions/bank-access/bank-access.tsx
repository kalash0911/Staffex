import React, { useEffect, useState } from 'react';
import { Typography } from '../../shared/typography/typography';
import { useAppFormState } from '../../../context/app-form-context';
import { Button } from '../../shared/button/button';
import { SkipButton } from '../../buttons/skip-btn/skip-btn';
import { ServiceButton } from '../../buttons/service-button/service-button';
import { Bank } from '../../../icons/Bank';
import { ServiceItem } from '../../shared/service-item/service-item';
import { TServiceItemInfo } from '../../../models/form';
import axios from 'axios';
import { io } from 'socket.io-client';
import { LEAN_APP_TOKEN } from '../../../constants/lean';

// Mock data:
// Login: marxschuppe
// Password: TaKZNNhKsYxP

// TODO: change to Vetal's API:
const nodejs_local_server = 'http://localhost:3000';

const socket = io(nodejs_local_server);

export const BankAccess = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const { answers, handleNextQuestion, handleDeleteServiceItem, setAnswers } = useAppFormState();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        const onUserInfoEvent = (value: any) => {
            const bankData: TServiceItemInfo = {
                bankName: value.bank_details.name,
                bankLogo: value.bank_details.logo,
                email: value.email_address,
                serviceType: 'bank',
                accessToken: '',
                refreshToken: '',
                id: value.entity_id,
            };
            updateBanksList(bankData);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('userinfo', onUserInfoEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('userinfo', onUserInfoEvent);
        };
    }, []);

    useEffect(() => {
        if (!isConnected) {
            console.log("socket io isn't connected");
        }
    }, [isConnected]);

    const banks = answers?.accessBankAccounts;

    const handleBankAccount = async () => {
        // TODO: change to Vetal's API:
        const customerIdPayload = (await axios.get(`${nodejs_local_server}/get-customer-id?socketId=${socket.id}`)).data;

        Lean.connect({
            app_token: LEAN_APP_TOKEN,
            permissions: ['identity', 'accounts', 'transactions', 'balance'],
            customer_id: customerIdPayload.customer_id,
            sandbox: true,
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
            if (
                !prevState?.accessBankAccounts?.find(
                    (bank) => bank.bankName === bankData.bankName && bank.email === bankData.email,
                )
            ) {
                return {
                    ...prevState,
                    accessBankAccounts: [...prevState?.accessBankAccounts, bankData],
                };
            }
            return prevState;
        });
    };

    const bankAccountList = banks?.length ? (
        banks.map(({ email, serviceType, id, bankName, bankLogo }) => {
            return (
                <ServiceItem
                    key={id}
                    variant={serviceType}
                    textContent={email}
                    serviceTitle={bankName}
                    iconSrc={bankLogo}
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
