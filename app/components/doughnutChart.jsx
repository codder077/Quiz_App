import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useQuizContext } from '../context/quizContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from 'next-themes';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const DoughnutChart = ({ total }) => {
    const { correct, incorrect, unattempted } = useQuizContext();
    const { theme } = useTheme(); 

    // Chart data and configuration
    const data = {
        labels: ['Correct', 'Incorrect', 'Not Attempted'],
        datasets: [
            {
                data: [correct, incorrect, unattempted],
                backgroundColor: ['#a1c181', '#f07167', '#d9d9d9'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '75%', 
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: theme === 'dark' ? 'white' : 'black', 
                },
            },
            datalabels: {
                display: false,
            },
        },
    };

    // Custom plugin to render score in the center of the chart
    const textCenterPlugin = {
        id: 'textCenter',
        afterDraw(chart) {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;

            ctx.save();
            ctx.font = '20px sans-serif';
            ctx.fillStyle = theme === 'light' ? 'black' : 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Score: ${total}`, centerX, centerY);
            ctx.restore();
        },
    };

    return (
        <div className="flex justify-center items-center dark:text-white">
            <div className="w-64 h-64  dark:text-white" >
                <Doughnut data={data} options={options} plugins={[textCenterPlugin]} />
            </div>
        </div>
    );
};

export default DoughnutChart;
