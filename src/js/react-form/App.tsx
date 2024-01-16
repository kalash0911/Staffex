import React from 'react';
import { useAppFormState } from './context/app-form-context';
import { Typography } from './components/shared/typography/typography';

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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1471_1371)">
                            <rect x="17.1016" y="0.161133" width="1" height="24" transform="rotate(45 17.1016 0.161133)" />
                            <rect x="0.132812" y="0.868164" width="1" height="10.5" transform="rotate(-45 0.132812 0.868164)" />
                            <rect x="17.8086" y="17.1309" width="1" height="10.5" transform="rotate(135 17.8086 17.1309)" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1471_1371">
                                <rect width="18" height="18" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>

            <div className="block">
                <div className="list-wrap">
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
