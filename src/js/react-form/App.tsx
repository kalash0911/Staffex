import React from 'react';
import { SECRETARY_QUESTIONS } from './constants/questions';
import { useAppFormState } from './context/app-form-context';
import { Typography } from './components/shared/typography/typography';

const App = () => {
    const { questions, activeQuestion, handleActiveQuestion } = useAppFormState();

    const { configInd, questionInd } = activeQuestion;
    const currentForm = questions[configInd].list[questionInd].content;

    return (
        <>
            <div className="title-wrap">
                <Typography variant="h1">Share Your Details with Us!</Typography>
            </div>

            <div className="block">
                <div className="list-wrap">
                    <div className="list-box">
                        {SECRETARY_QUESTIONS.map(({ title }, configInd) => {
                            const currentTopicList = SECRETARY_QUESTIONS.find((conf) => conf.title === title)?.list;

                            return (
                                <React.Fragment key={title}>
                                    <h2 className="title">{title}</h2>
                                    <ul className="list">
                                        {currentTopicList?.map((question, questionInd) => {
                                            const isActive =
                                                activeQuestion.configInd === configInd &&
                                                activeQuestion.questionInd === questionInd;
                                            return (
                                                <li
                                                    className={`list-item ${isActive ? 'active' : ''}`}
                                                    onClick={() => handleActiveQuestion({ configInd, questionInd })}
                                                    key={question.label}
                                                >
                                                    <button className="list-link click-song">{question.label}</button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <p className="text-bot">
                        &#60;!--&nbsp;Elevate your business with Staffex's custom AI solutions, optimizing workforce efficiency
                        through seamless integration of advanced digital workers.&nbsp;--&#62;
                    </p>
                </div>

                <div className="content-wrap">{currentForm}</div>
            </div>
        </>
    );
};

export default App;
