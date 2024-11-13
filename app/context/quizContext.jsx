// app/context/quizContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import questions from "../data/quizQuestions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [timer, setTimer] = useState(1000);
    const [showResultModal, setShowResultModal] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [unattempted, setUnattempted] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); 

    const handleShowResult = () => setShowResultModal(true);

    useEffect(() => {
        // Randomly select 6 questions on each load
        const randomQuestions = questions
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
        setQuizQuestions(randomQuestions);
        setUserAnswers(Array(6).fill(null)); 
    }, []);

    const setUserAnswer = (index, answer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = answer;
        setUserAnswers(updatedAnswers);
    };

    return (
        <QuizContext.Provider
            value={{
                timer,
                setTimer,
                showResultModal,
                handleShowResult,
                correct,
                setCorrect,
                incorrect,
                setIncorrect,
                unattempted,
                setUnattempted,
                quizQuestions,
                userAnswers,
                setUserAnswer,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
