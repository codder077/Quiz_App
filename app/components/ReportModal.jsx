// ReportModal.js
import React, { useState } from "react";
import { useTheme } from "next-themes";

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
    const { theme } = useTheme();
    const [selectedReason, setSelectedReason] = useState(null);
    const [reportNote, setReportNote] = useState(""); // New state for additional notes

    const reportOptions = [
        "Question is wrong",
        "Answer is wrong",
        "Spelling mistake",
        "Subject is different",
        "Other"
    ];

    const handleReportSubmit = () => {
        if (selectedReason) {
            const reportData = {
                reason: selectedReason,
                note: selectedReason === "Other" ? reportNote : null // Include note if "Other" is selected
            };
            onSubmit(reportData);
            setSelectedReason(null);
            setReportNote(""); // Reset the note
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`w-80 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-[#f5f5f5] text-gray-800'}`}>
                <h2 className="text-lg font-semibold mb-4">Report</h2>
                <div className="space-y-2">
                    {reportOptions.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="report"
                                className={`mr-2 ${theme === 'dark' ? 'bg-gray-700' : ''}`}
                                checked={selectedReason === option}
                                onChange={() => setSelectedReason(option)}
                            />
                            <label htmlFor={`option-${index}`} className="text-sm">{option}</label>
                        </div>
                    ))}

                    {/* Conditionally render text area if "Other" is selected */}
                    {selectedReason === "Other" && (
                        <textarea
                            value={reportNote}
                            onChange={(e) => setReportNote(e.target.value)}
                            placeholder="Please specify your report..."
                            className={`mt-3 w-full p-2 border rounded-md resize-none ${
                                theme === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-200 text-gray-800 border-gray-300'
                            }`}
                            rows="3"
                        />
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className={`font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'}`}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleReportSubmit}
                        className={`font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'}`}
                        disabled={!selectedReason || (selectedReason === "Other" && !reportNote)}
                    >
                        REPORT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
