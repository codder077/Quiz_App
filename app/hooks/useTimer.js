import { useEffect } from 'react';

const useTimer = (
    timer,
    setTimer,
    showResultModal,
    handleShowResult
) => {
    useEffect(() => {
        if (showResultModal) return;
        if (timer <= 0) {
            setTimer(0);
            handleShowResult()
        }
    }, [timer, setTimer]);

    useEffect(() => {
        if (showResultModal) return; // Do nothing if the result modal is shown

        const countTimer = setTimeout(() => {
            setTimer((prevTimer) => prevTimer - 1); // Decrease timer
        }, 1000);

        return () => clearTimeout(countTimer); // Cleanup the timeout
    }, [timer, setTimer, showResultModal]);
};

export default useTimer;
