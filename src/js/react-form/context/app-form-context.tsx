import React, { ReactNode, createContext, useContext, useState } from 'react';
import { FormType, TActiveQuestion, TTopic } from '../models/question';
import { QUESTIONS_CONFIG } from '../constants/questions';
import { TCommonFormValues, TServiceListKeys } from '../models/form';
import { staffexApi } from '../api/staffex';

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
}

const AppFormContext = createContext<IAppFormProviderValues | null>(null);

const AppFormProvider = ({ children }: IAppFormProviderProps) => {
    const [formType] = useState<IAppFormProviderValues['formType']>(FormType.SECRETARY);
    const [questions] = useState<IAppFormProviderValues['questions']>(QUESTIONS_CONFIG[formType]);
    const [activeQuestion, setActiveQuestion] = useState<IAppFormProviderValues['activeQuestion']>({
        configInd: 0,
        questionInd: 0,
    });
    // TODO: set list of question here related to form type
    // store fields from all separate forms:
    const [answers, setAnswers] = useState<IAppFormProviderValues['answers']>(null);
    console.log('answers: ', answers);

    const { configInd, questionInd } = activeQuestion;

    const isLastTopic = questions.length === configInd + 1;
    const isLastQuestionInTopic = questions[configInd].list.length === questionInd + 1;
    const isLastQuestion = isLastTopic && isLastQuestionInTopic;

    const isB2B = !!answers?.isB2B;

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
                    const newServiceList = serviceList.filter((item) => item.id !== id);
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

    const submitAllData = (formData?: TCommonFormValues) => {
        const allAnswers = { ...answers, ...formData };

        setAnswers(allAnswers);

        staffexApi
            .postAllFormData(allAnswers)
            .then(() => {
                console.log('SUCCESS');
            })
            .catch((err) => {
                console.log(err);
            });
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
                handleNextQuestion,
                handleActiveQuestion,
                handleDeleteServiceItem,
            }}
        >
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
