import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const StateGraph = ({ stateData }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (chartRef.current && stateData) {
            const ctx = chartRef.current.getContext('2d');
            const chartData = {
                labels: stateData.labels,
                datasets: [{
                    label: 'Temperature',
                    data: stateData.temperature,
                    backgroundColor: stateData.temperature.map(temp => temp > 25 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)'),
                    borderColor: stateData.temperature.map(temp => temp > 25 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'),
                    borderWidth: 1
                }]
            };

            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [stateData]);

    return <canvas ref={chartRef} />;
};

export default StateGraph;
