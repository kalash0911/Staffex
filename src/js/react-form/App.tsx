import React from 'react';
import { useAppFormState } from './context/app-form-context';
import { Typography } from './components/shared/typography/typography';
import { CrossIcon } from './icons/cross';
import { BotInfo } from './components/bot-info/bot-info';

const App = () => {
    const { questions, activeQuestion, handleActiveQuestion } = useAppFormState();

    const { configInd, questionInd } = activeQuestion;
    const currentForm = questions[configInd].list[questionInd].content;

    return (
        <>
            <div className="title-wrap">
                <Typography variant="h1">
                    Let <span>Monica</span> take your case
                </Typography>
                <a className="back-btn" href="/">
                    <CrossIcon />
                </a>
            </div>

            <div className="block">
                <div className="list-wrap">
                    <BotInfo />
                    <div className="list-block">
                        {questions.map(({ title }, configInd) => {
                            const currentTopicList = questions.find((conf) => conf.title === title)?.list;

                            return (
                                <div className="list-box" key={title}>
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
                                </div>
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
