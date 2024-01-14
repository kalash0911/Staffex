import React, { ReactNode, createContext, useContext, useState } from 'react';
import { FormType, TActiveQuestion, TTopic } from '../models/question';
import { QUESTIONS_CONFIG } from '../constants/questions';
import { TCommonFormValues } from '../models/form';

interface IAppFormProviderProps {
    children: ReactNode;
}

interface IAppFormProviderValues {
    answers: TCommonFormValues | null;
    formType: FormType;
    questions: TTopic[];
    activeQuestion: TActiveQuestion;
    handleNextQuestion: (formData?: TCommonFormValues) => void;
    handleActiveQuestion: (question: IAppFormProviderValues['activeQuestion']) => void;
}

const AppFormContext = createContext<IAppFormProviderValues | null>(null);

const AppFormProvider = ({ children }: IAppFormProviderProps) => {
    const [formType, setFormType] = useState<IAppFormProviderValues['formType']>(FormType.SECRETARY);
    const [questions, setQuestions] = useState<IAppFormProviderValues['questions']>(QUESTIONS_CONFIG[formType]);
    const [activeQuestion, setActiveQuestion] = useState<IAppFormProviderValues['activeQuestion']>({
        configInd: 0,
        questionInd: 0,
    });
    // TODO: set list of question here related to form type
    // store fields from all separate forms:
    const [answers, setAnswers] = useState<IAppFormProviderValues['answers']>(null);
    // console.log('answers: ', answers);

    const { configInd, questionInd } = activeQuestion;

    const isLastTopic = questions.length === configInd + 1;
    const isLastQuestionInTopic = questions[configInd].list.length === questionInd + 1;
    const isLastQuestion = isLastTopic && isLastQuestionInTopic;

    const handleNextQuestion = (formData?: TCommonFormValues) => {
        if (formData) {
            setAnswers((prevState) => ({
                ...prevState,
                ...formData,
            }));
        }
        // TODO: Show skip modal
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

    const handleActiveQuestion = (question: IAppFormProviderValues['activeQuestion']) => {
        setActiveQuestion(question);
    };

    return (
        <AppFormContext.Provider
            value={{
                answers,
                formType,
                questions,
                activeQuestion,
                handleNextQuestion,
                handleActiveQuestion,
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
