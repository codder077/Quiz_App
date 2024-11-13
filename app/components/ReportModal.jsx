// ReportModal.js
import React, { useState } from "react";

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const [selectedReason, setSelectedReason] = useState(null);
    const reportOptions = [
        "Question is wrong",
        "Answer is wrong",
        "Spelling mistake",
        "Subject is different",
        "Other"
    ];

    const handleReportSubmit = () => {
        if (selectedReason) {
            onSubmit(selectedReason);
            setSelectedReason(null);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#f5f5f5] w-80 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Report</h2>
                <div className="space-y-2">
                    {reportOptions.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="report"
                                className="mr-2"
                                checked={selectedReason === option}
                                onChange={() => setSelectedReason(option)}
                            />
                            <label htmlFor={`option-${index}`} className="text-sm">{option}</label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="text-blue-500">CANCEL</button>
                    <button
                        onClick={handleReportSubmit}
                        className="text-blue-500 font-semibold"
                        disabled={!selectedReason}
                    >
                        REPORT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
