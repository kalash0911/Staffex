import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FormType, TActiveQuestion, TTopic } from '../models/question';
import { QUESTIONS_CONFIG } from '../constants/questions';
import { TBank, TCommonFormValues, TServiceItemInfo, TServiceListKeys } from '../models/form';
import { TBankCustomerResponse, staffexApi } from '../api/staffex';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { STAFFEX_WEB_SOCKET_URL } from '../constants/urls';
import { TWebSocketStatus } from '../models/websocket';
import { LEAN_APP_TOKEN } from '../constants/lean';
import { ToastContainer, toast } from 'react-toastify';
import { GENERAL_ERROR_MSG } from '../constants/err-msgs';
import { DEFAULT_TOAST_CONFIG } from '../constants/toast';

interface IAppFormProviderProps {
    children: ReactNode;
}

interface IAppFormProviderValues {
    isB2B: boolean;
    answers: TCommonFormValues | null;
    formType: FormType;
    questions: TTopic[];
    activeQuestion: TActiveQuestion;
    setAnswers: React.Dispatch<React.SetStateAction<TCommonFormValues | null>>;
    handleNextQuestion: (formData?: TCommonFormValues) => void;
    handleActiveQuestion: (question: IAppFormProviderValues['activeQuestion']) => void;
    handleDeleteServiceItem: (serviceType: TServiceListKeys, id: string) => void;
    submitAllData: (formData?: TCommonFormValues) => void;
    connectBankAccount: () => Promise<void>;
    showErrorToast: () => void;
}

const AppFormContext = createContext<IAppFormProviderValues | null>(null);

const AppFormProvider = ({ children }: IAppFormProviderProps) => {
    const [formType] = useState<IAppFormProviderValues['formType']>(FormType.SECRETARY);
    const [questions, setQuestions] = useState<IAppFormProviderValues['questions']>(QUESTIONS_CONFIG[formType]);
    const [activeQuestion, setActiveQuestion] = useState<IAppFormProviderValues['activeQuestion']>({
        configInd: 0,
        questionInd: 0,
    });
    const { configInd, questionInd } = activeQuestion;
    // TODO: set list of question here related to form type
    // store fields from all separate forms:
    const [answers, setAnswers] = useState<IAppFormProviderValues['answers']>(null);
    const isLastTopic = questions.length === configInd + 1;
    const isLastQuestionInTopic = questions[configInd].list.length === questionInd + 1;
    const isLastQuestion = isLastTopic && isLastQuestionInTopic;

    const isB2B = !!answers?.isB2B;
    // Bank user data
    const [bankCustomerData, setBankCustomerData] = useState<TBankCustomerResponse | null>(null);
    // Websocket
    const [socketUrl, setSocketUrl] = useState<null | string>(null);
    const { readyState, lastJsonMessage: bankInfoMessage } = useWebSocket(socketUrl);

    const webSocketStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState] as TWebSocketStatus;

    // console.log('webSocketStatus: ', webSocketStatus);
    // console.log('bankInfoMessage: ', bankInfoMessage);

    const showErrorToast = () => toast.error(GENERAL_ERROR_MSG, DEFAULT_TOAST_CONFIG);

    useEffect(() => {
        if (!questions[activeQuestion.configInd].list[activeQuestion.questionInd].isViewed) {
            setQuestions((prevState) => {
                const questions = [...prevState];
                questions[activeQuestion.configInd].list[activeQuestion.questionInd].isViewed = true;
                return questions;
            });
        }
    }, [activeQuestion]);

    useEffect(() => {
        if (bankInfoMessage !== null) {
            const bankData: TBank = {
                ...(bankInfoMessage as TBank[])[0],
                appUserId: bankCustomerData?.app_user_id,
                customerId: bankCustomerData?.customer_id,
            };

            if (bankData.Success) {
                setAnswers((prevState) => {
                    if (!prevState?.accessBankAccounts?.length) {
                        return {
                            ...prevState,
                            accessBankAccounts: [bankData],
                        };
                    }
                    if (
                        !prevState?.accessBankAccounts?.find(
                            (bank) => bank.BankName === bankData.BankName && bank.FullName === bankData.FullName,
                        )
                    ) {
                        return {
                            ...prevState,
                            accessBankAccounts: [...prevState?.accessBankAccounts, bankData],
                        };
                    }
                    return prevState;
                });
            } else {
                showErrorToast();
            }
        }
    }, [bankInfoMessage]);

    const handleNextQuestion = (formData?: TCommonFormValues) => {
        if (formData) {
            setAnswers((prevState) => ({
                ...prevState,
                ...formData,
            }));
        }
        setActiveQuestion((prevState) => {
            if (isLastQuestion) return prevState;
            if (isLastQuestionInTopic)
                return {
                    configInd: prevState.configInd + 1,
                    questionInd: 0,
                };
            return {
                configInd: prevState.configInd,
                questionInd: prevState.questionInd + 1,
            };
        });
    };

    const handleDeleteServiceItem = (serviceType: TServiceListKeys, id: string) => {
        setAnswers((prevState) => {
            if (prevState) {
                const serviceList = prevState[serviceType];
                if (serviceList) {
                    const newServiceList =
                        serviceType === 'accessBankAccounts'
                            ? serviceList.filter((item) => (item as TBank).EntityId !== id)
                            : serviceList.filter((item) => (item as TServiceItemInfo).id !== id);
                    return {
                        ...prevState,
                        [serviceType]: newServiceList,
                    };
                }
            }
            return prevState;
        });
    };

    const handleActiveQuestion = (question: IAppFormProviderValues['activeQuestion']) => {
        setActiveQuestion(question);
    };

    const submitAllData = async (formData?: TCommonFormValues) => {
        const allAnswers = { ...answers, ...formData };

        setAnswers(allAnswers);

        await toast.promise(
            staffexApi.postAllFormData(allAnswers).then(() => {
                // TODO: change to deployed url:
                setTimeout(() => {
                    window.location.pathname = 'Staffex/success-form-page.html';
                }, 1000);
            }),
            {
                pending: 'Submitting...',
                success: 'Success!',
                error: GENERAL_ERROR_MSG,
            },
            {
                ...DEFAULT_TOAST_CONFIG,
            },
        );
    };

    const connectBankAccount = async () => {
        let bankData: TBankCustomerResponse | null = bankCustomerData || null;

        if (webSocketStatus !== 'Open') {
            await staffexApi
                .createBankCustomer()
                .then(({ data }) => {
                    setBankCustomerData(data);
                    bankData = data;
                    setSocketUrl(`${STAFFEX_WEB_SOCKET_URL}?customerId=${data.customer_id}`);
                })
                .catch(() => {
                    showErrorToast();
                });
        }
        if (bankData?.customer_id) {
            Lean.connect({
                app_token: LEAN_APP_TOKEN,
                permissions: ['identity', 'accounts', 'transactions', 'balance'],
                customer_id: bankData.customer_id,
                sandbox: true,
            });
        }
    };

    return (
        <AppFormContext.Provider
            value={{
                isB2B,
                answers,
                formType,
                questions,
                activeQuestion,
                setAnswers,
                submitAllData,
                showErrorToast,
                handleNextQuestion,
                connectBankAccount,
                handleActiveQuestion,
                handleDeleteServiceItem,
            }}
        >
            <ToastContainer />
            {children}
        </AppFormContext.Provider>
    );
};

const useAppFormState = () => {
    const context = useContext(AppFormContext);
    if (!context) {
        throw new Error('useAppFormState must be used within the AppProvider');
    }
    return context;
};

export { useAppFormState, AppFormProvider, AppFormContext };
