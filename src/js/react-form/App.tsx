import React, { useEffect, useRef } from 'react';
import { useAppFormState } from './context/app-form-context';
import { Typography } from './components/shared/typography/typography';
import { CrossIcon } from './icons/cross';
import { BotInfo } from './components/bot-info/bot-info';
import { FetureChoosenButton } from './components/buttons/feature-choosen-btn/feature-choosen-btn';

const App = () => {
    const { questions, activeQuestion, handleActiveQuestion, isClickStepsDisabled } = useAppFormState();

    const listWrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollListToActiveQuestion();
    }, [activeQuestion]);

    const scrollListToActiveQuestion = () => {
        if (listWrapRef.current) {
            const activeItem = listWrapRef.current.querySelector('li.active') as HTMLLIElement;
            if (!activeItem) return;
            listWrapRef.current?.scrollTo({
                left: activeItem.offsetLeft - 20,
                behavior: 'smooth',
            });
        }
    };

    const { configInd, questionInd } = activeQuestion;
    const currentForm = questions[configInd].list[questionInd].content;

    return (
        <>
            <div className="title-wrap">
                <Typography variant="h1">
                    Let <span>Monica</span> take your case
                </Typography>
                <div className="box-btn">
                    <a className="back-btn" href="/">
                        <CrossIcon />
                    </a>
                    <div className="bot-info-mobile">
                        <FetureChoosenButton />
                    </div>
                </div>
            </div>

            <div className="block">
                <div className="list-wrap" ref={listWrapRef}>
                    <div className="bot-info">
                        <BotInfo />
                    </div>
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
                                            const { label, isViewed } = question;
                                            return (
                                                <li className={`list-item ${isActive ? 'active' : ''}`} key={label}>
                                                    <button
                                                        className="list-link click-song"
                                                        onClick={() => {
                                                            if (!isClickStepsDisabled || isViewed) {
                                                                handleActiveQuestion({ configInd, questionInd });
                                                            }
                                                        }}
                                                        disabled={isClickStepsDisabled || !isViewed}
                                                        // Note: uncommect to enable clicks on steps:
                                                        // onClick={() => handleActiveQuestion({ configInd, questionInd })}
                                                    >
                                                        {label}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="content-wrap">{currentForm}</div>
            </div>
        </>
    );
};

export default App;
