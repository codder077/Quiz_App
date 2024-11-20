import { useEffect } from "react";
import { useQuizContext } from "../context/quizContext";

const useTimer = (timer, setTimer, showResultModal, handleShowResult) => {
    const {paused}=useQuizContext();
    useEffect(() => {
        if (showResultModal || paused) return;

        if (timer <= 0) {
            setTimer(0);
            handleShowResult();
        }
    }, [timer, setTimer, showResultModal, paused]);

    useEffect(() => {
        console.log(timer, paused);


        // Stop timer updates if paused or modal is showing
        if (showResultModal || paused) {
            return;
        }

        const countTimer = setTimeout(() => {
            setTimer((prevTimer) => Math.max(prevTimer - 1, 0)); // Prevent negative values
        }, 1000);

        return () => clearTimeout(countTimer); // Cleanup
    }, [timer, setTimer, showResultModal, paused]);
};

export default useTimer;
