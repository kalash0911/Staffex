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
            <div className="title-wrap">
                <h1 className="main-title">Fill in the information</h1>
            </div>

            <div className="block">
                <div className="list-wrap">
                    <div className="list-box">
                        <h2 className="title">basic features</h2>

                        <ul className="list">
                            {QUESTIONS.map((question, ind) => {
                                return (
                                    question.isViewed && (
                                        <li
                                            className="list-item"
                                            onClick={() =>
                                                setCurrentQuestionIndex(ind)
                                            }
                                            key={question.label}
                                        >
                                            <button className="list-link">
                                                {question.label}
                                            </button>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </div>

                    <p className="text-bot">
                        &#60;!--&nbsp;Elevate your business with Staffex's
                        custom AI solutions, optimizing workforce efficiency
                        through seamless integration of advanced digital
                        workers.&nbsp;--&#62;
                    </p>
                </div>

                <div className="content-wrap">
                    {currentForm}

                    <div className="btn-wrap">
                        <button
                            className="main-btn transp click-song"
                            disabled={QUESTIONS.length === questionIndex + 1}
                            onClick={handleNextQuestion}
                        >
                            <span className="btn-text">skip</span>
                            <span className="icon-line top-left-line"></span>
                            <span className="icon-line top-right-line"></span>
                            <span className="icon-line bot-left-line"></span>
                            <span className="icon-line bot-right-line"></span>
                        </button>

                        <button
                            className="main-btn click-song"
                            disabled={QUESTIONS.length === questionIndex + 1}
                            onClick={handleNextQuestion}
                        >
                            <span className="btn-text">next</span>
                            <span className="icon-line top-left-line"></span>
                            <span className="icon-line top-right-line"></span>
                            <span className="icon-line bot-left-line"></span>
                            <span className="icon-line bot-right-line"></span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
