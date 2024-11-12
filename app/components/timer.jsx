// utility function to format the remaining time as minutes:seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function Timer({ timer }) {

    return (
        <div className="bg-white dark:bg-[#252526] px-4 text-black/85 dark:text-white text-3xl rounded-full">
            {formatTime(timer)}
        </div>
    );
}

export default Timer;
