import React, { useState } from 'react';
import { ContactInfo } from './components/questions/contact-info/contact-info';
import { MeetingAppAccess } from './components/questions/meeting-app-access/meeting-app-access';
import { CalendarAccess } from './components/questions/calendar-access/calendar-access';

// TODO: move question logic to form-context.
const QUESTIONS = [
  {
    label: 'Contact Info',
    content: <ContactInfo />,
    isViewed: true,
  },
  {
    label: 'Calendar access',
    content: <CalendarAccess />,
    isViewed: false,
  },
  {
    label: 'Meeting applications access',
    content: <MeetingAppAccess />,
    isViewed: false,
  },
];

const App = () => {
  const [questionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentForm = QUESTIONS[questionIndex].content;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevState) => {
      if (QUESTIONS.length === questionIndex + 1) {
        return prevState;
      }
      QUESTIONS[prevState + 1].isViewed = true;
      return prevState + 1;
    });
  };

  return (
    <>
      <h1>Fill in the information</h1>

      <ul>
        {QUESTIONS.map((question, ind) => {
          return (
            question.isViewed && (
              <li
                onClick={() => setCurrentQuestionIndex(ind)}
                key={question.label}
              >
                {question.label}
              </li>
            )
          );
        })}
      </ul>

      {currentForm}

      <button
        disabled={QUESTIONS.length === questionIndex + 1}
        onClick={handleNextQuestion}
      >
        Skip
      </button>
      <button
        disabled={QUESTIONS.length === questionIndex + 1}
        onClick={handleNextQuestion}
      >
        Next
      </button>
    </>
  );
};

export default App;
