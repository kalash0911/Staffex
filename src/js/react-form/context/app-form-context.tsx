import React, { ReactNode, createContext, useContext, useState } from 'react';

enum FormType {
  SECRETARY = 'SECRETARY',
  SMM = 'SMM',
  ACOUNTANT = 'ACOUNTANT',
}

interface IAppFormProviderProps {
  children: ReactNode;
}

interface IIAppFormProviderValues {
  formType: FormType;
}

const AppFormContext = createContext<IIAppFormProviderValues | null>(null);

const AppFormProvider = ({ children }: IAppFormProviderProps) => {
  const [formType, setFormType] = useState(FormType.SECRETARY);
  // TODO: set list of question here related to form type
  const [questions, setQuestions] = useState([]);
  // store fields from all separate forms:
  const [answers, setAnswers] = useState([]);

  return (
    <AppFormContext.Provider
      value={{
        formType,
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
