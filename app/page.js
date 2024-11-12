"use client";

import Timer from "./components/timer";
import Quiz from "./components/quiz";
import Result from "./components/result";
import useTimer from "./hooks/useTimer";
import { useQuizContext } from "./context/quizContext";
import Header from "./components/header";


export default function Home() {
  const { timer, setTimer, showResultModal, handleShowResult } = useQuizContext();

  // Initialize and manage the quiz timer
  useTimer(timer, setTimer, showResultModal, handleShowResult);

  return (
    <>
      <Header timer={timer} />
      <Quiz />
      {showResultModal && <Result />}
    </>
  );
}


