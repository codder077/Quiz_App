import React from 'react'

function SubmitModal({ isOpen, onClose, showResult, selectedAnswers }) {
    if (!isOpen) return null;

    console.log(selectedAnswers);
    let attempted=0;
    selectedAnswers.map((answer)=>{
        if(answer==false || answer==true){
            attempted++;
        }
    })
    const unattempted = (6-attempted);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl p-5 shadow-md w-92 md:w-fit dark:text-black">
                <h1 className='text-2xl text-red-500 font-bold mb-4'>Submit Quiz</h1>
                <h3 className='mb-3 '>Unattempted  : <span className='font-bold'>{unattempted}</span></h3>
                <h3 className='mb-3'>Once submitted you will not be able to modify your answers.</h3>
                <h3 className='mb-4 font-semibold'>Are you sure you want to submit?</h3>


                <div className='flex justify-end space-x-2'>
                    <button onClick={showResult} className="px-5 py-1 bg-gray-300 text-sm md:text-md text-purple-500 rounded-full">Yes</button>
                    <button onClick={onClose} className="px-5 py-1 bg-black/90 text-sm md:text-md text-purple-300 rounded-full">No</button>
                </div>
            </div>
        </div>

    )
}

export default SubmitModal