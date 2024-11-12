import React from 'react';
import DoughnutChart from './doughnutChart';
import { MdLeaderboard } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useQuizContext } from '../context/quizContext';

function Result() {
  const { correct, incorrect } = useQuizContext();

  const positive = (1 * correct).toFixed(2);
  const negative = (-0.33 * incorrect).toFixed(2);
  const total = (parseFloat(positive) + parseFloat(negative)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#252526] p-4">
      <div className="flex flex-col flex-grow overflow-y-auto no-scrollbar">
        <h1 className="text-3xl p-2 mt-10 text-center">Quiz by Quiz20</h1>
        <h2 className="text-3xl font-semibold mt-4 text-center">Quiz20</h2>

        {/* Doughnut Chart */}
        <div className="flex flex-col items-center p-2 mt-12 dark:text-white">
          <DoughnutChart total={total} />
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-3 gap-2 px-8 text-sm font-semibold text-gray-600 dark:text-white my-4 mt-auto pb-7 text-center">
          <div>
            <p>Positive</p>
            <p className="font-bold mt-2">{positive}</p>
          </div>
          <div>
            <p>Negative</p>
            <p className="font-bold mt-2">{negative}</p>
          </div>
          <div>
            <p>Total</p>
            <p className="font-bold mt-2">{total}</p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="w-full space-y-2 mt-auto">
        <button className="ml-1 flex items-center justify-around bg-[#ff0a54] text-white py-4  font-semibold w-full rounded-lg rounded-br-full">
          LEADERBOARD <MdLeaderboard size={24} />
        </button>

        <div className="flex gap-2 w-full">
          <button className="flex items-center justify-around py-4 w-full sm:w-1/2 bg-[#252526] dark:bg-[#d4e09b] dark:text-[#252526] rounded-xl text-gray-100 font-semibold gap-2">
            <IoMdShare size={24} /> Share
          </button>
          <button className="flex items-center justify-around py-4 w-full sm:w-1/2 bg-[#252526] dark:bg-[#d4e09b] dark:text-[#252526] rounded-xl text-gray-100 font-semibold gap-2">
            <MdOutlineRemoveRedEye size={24} /> Answers
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
