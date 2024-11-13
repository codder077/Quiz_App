import React, { useEffect, useState } from "react";
import ProgressBar from "./progressbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SubmitModal from "./submitModal";
import ReportModal from "./ReportModal"; 
import { useQuizContext } from "../context/quizContext";
import axios from "axios";
import { MdGTranslate } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import { IoMdShare } from "react-icons/io";
import { translate } from "../utils/translate";


function Quiz() {
    const { setCorrect, setIncorrect, setUnattempted, handleShowResult, quizQuestions, showResultModal } = useQuizContext();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [statuses, setStatuses] = useState(Array(quizQuestions.length).fill(null));
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [translatedQuestions, setTranslatedQuestions] = useState([]);
    const [isTranslated, setIsTranslated] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showReportConfirmation, setShowReportConfirmation] = useState(false);

    const handleReportClick = () => {
        setShowReportModal(true);
    };

    const handleReportSubmit = (selectedReason) => {
        // Logic to submit the report goes here
        console.log("Report submitted for reason:", selectedReason);

        // Show confirmation message
        setShowReportConfirmation(true);

        // Hide confirmation after a short delay
        setTimeout(() => {
            setShowReportConfirmation(false);
        }, 2000);
    };

    const translateText = async (text, targetLang) => {
        try {
            const response = await axios.post('/api/translate', {
                text: text,
                targetLang: targetLang,
            });
            return response.data.translatedText;
        } catch (error) {
            console.error("Translation error:", error);
            return text;
        }
    };
    

    const translateQuestionsToHindi = async () => {
        try {
            const translatedQuestions = await Promise.all(quizQuestions.map(async (question) => {
                const translatedQuestion = await translateText(question.question, "hi");
                const translatedOptions = await Promise.all(
                    question.options.map(async (option) => await translateText(option, "hi"))
                );
                return { ...question, question: translatedQuestion, options: translatedOptions };
            }));
            setTranslatedQuestions(translatedQuestions);
        } catch (error) {
            console.error("Error in translating questions:", error);
        }
    };

    // useEffect(() => {
    //     translateQuestionsToHindi();
    // }, []);

    const calculateResults = () => {
        let correct = 0, incorrect = 0, unattempted = 0;
        selectedAnswers.forEach((isCorrect) => {
            if (isCorrect === null) unattempted++;
            else if (isCorrect) correct++;
            else incorrect++;
        });
        setCorrect(correct);
        setIncorrect(incorrect);
        setUnattempted(unattempted);
    };

    const navigateQuestion = (direction) => {
        const newQuestionIndex = currentQuestion + direction;
        setCurrentQuestion(newQuestionIndex);
        setSelectedAnswer(selectedAnswers[newQuestionIndex]);

        if (!selectedAnswer && statuses[currentQuestion] !== 'solved') {
            setStatuses((prev) => {
                const updatedStatuses = [...prev];
                updatedStatuses[currentQuestion] = 'skipped';
                return updatedStatuses;
            });
        }
        calculateResults();
    };

    const handleAnswerSelection = (option) => {
        const correctAnswer = isTranslated ? translatedQuestions[currentQuestion]?.answer : quizQuestions[currentQuestion]?.answer;
        setSelectedAnswer(option);
        setSelectedAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestion] = option === correctAnswer;
            return updatedAnswers;
        });
        setStatuses((prev) => {
            const updatedStatuses = [...prev];
            updatedStatuses[currentQuestion] = 'solved';
            return updatedStatuses;
        });
        calculateResults();
    };

    const handleOpenSubmitModal = () => {
        // calculateResults();
        setShowSubmitModal(true);
    };
    const handleCloseSubmitModal = () => setShowSubmitModal(false);

    const toggleTranslation = () => {
        translateQuestionsToHindi();
        setIsTranslated((prev) => !prev);
    };

    const currentQuestionData = isTranslated ? translatedQuestions[currentQuestion] : quizQuestions[currentQuestion];

    return (
        <>
            <div className="flex flex-col p-1 mt-1 h-[80vh]">
                <div className="flex justify-between mt-2 px-2 items-center">
                    <h2 className="text-lg font-semibold">Quiz by Quiz20</h2>

                    <button
                        className="text-sm bg-[#2196f3] text-white py-2 px-12 sm:min-w-96 rounded-xl"
                        onClick={handleOpenSubmitModal}
                    >
                        Submit
                    </button>

                </div>

                <ProgressBar
                    questions={isTranslated ? translatedQuestions : quizQuestions}
                    currentQuestionIndex={currentQuestion}
                    statuses={statuses}
                    onCircleClick={(index) => {
                        calculateResults();
                        setCurrentQuestion(index);
                        setSelectedAnswer(selectedAnswers[index]);
                    }}
                />


                <div className="flex justify-between mt-3 px-1">
                    <h2 className="text-[#2196f3] text-md">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                    </h2>
                    <div className="flex gap-4 mr-2">
                        <IoMdShare size={24} />
                        <button
                            className={`${isTranslated ? "text-blue-500" : "text-gray-500 dark:text-white"} `}
                            onClick={toggleTranslation}
                        >
                            <MdGTranslate size={24} />
                        </button>
                        <button onClick={handleReportClick}>
                            <BsExclamationTriangle size={24} />
                        </button>

                    </div>
                </div>
                {/* Render the report modal */}
                <ReportModal
                    isOpen={showReportModal}
                    onClose={() => setShowReportModal(false)}
                    onSubmit={handleReportSubmit}
                />

                {/* Confirmation message */}
                {showReportConfirmation && (
                    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">
                        Report submitted successfully
                    </div>
                )}

                <div className="flex-1 mt-7 px-1 pb-7 overflow-y-auto no-scrollbar">
                    <p className="mb-6 text-sm font-semibold md:text-md">{currentQuestionData?.question}</p>

                    <div className="space-y-4 flex flex-col">
                        {currentQuestionData?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                className={`flex items-center p-1 rounded-lg ${selectedAnswer === option ? 'border-2 border-[#2196f3]' : ''}`}
                            >
                                <div className={`w-9 h-9 mr-4 flex items-center justify-center text-white font-bold rounded-full ${selectedAnswer === option ? 'bg-[#2196f3]' : 'bg-[#9e9e9e]'}`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-xs font-extralight">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 flex px-2 pb-6 gap-x-2 mt-auto">
                    <button
                        onClick={() => navigateQuestion(-1)}
                        disabled={currentQuestion === 0}
                        className="flex justify-around items-center py-3.5 w-full bg-[#252526] dark:bg-[#d4e09b] dark:text-[#252526] rounded-xl text-gray-100 disabled:bg-black/40 dark:disabled:bg-[#7c8261]"
                    >
                        <FaChevronLeft size={16} />
                        <span>Previous</span>
                    </button>
                    <button
                        onClick={() => navigateQuestion(1)}
                        disabled={currentQuestion === quizQuestions.length - 1}
                        className="flex justify-around items-center py-3.5 w-full bg-[#252526] dark:bg-[#d4e09b] dark:text-[#252526] rounded-xl text-gray-100 disabled:bg-black/40 dark:disabled:bg-[#7c8261]"
                    >
                        <span>Next</span>
                        <FaChevronRight size={16} />
                    </button>
                </div>
            </div>

            <SubmitModal
                isOpen={showSubmitModal}
                onClose={handleCloseSubmitModal}
                showResult={handleShowResult}
                selectedAnswers={selectedAnswers}
            />
        </>
    );
}

export default Quiz;
