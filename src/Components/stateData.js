import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js library
import axios from 'axios';

const StateGraph = () => {
    const chartRef = useRef(null);
    const [stateData, setStateData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const states = ['Maharashtra', 'Madhya Pradesh', 'Punjab', 'Kerala']; // Add more states as needed
                const stateData = [];

                for (const state of states) {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=47818291b6f02d28210c629504f5d0da&units=metric`);
                    const temperature = response.data.main.temp;
                    stateData.push({ state, value: temperature });
                }

                setStateData(stateData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const renderGraph = () => {
            const ctx = document.getElementById('state-chart');

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: stateData.map(data => data.state),
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: stateData.map(data => data.value),
                        backgroundColor: stateData.map(data => {
                            // Assign red color if temperature is higher, blue if lower
                            return data.value >= 25 ? 'rgba(255, 99, 132, 0.7)' : 'rgba(54, 162, 235, 0.7)';
                        }),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `Temperature: ${context.dataset.data[context.dataIndex]}°C`;
                                }
                            }
                        }
                    }
                }
            });
        };

        if (stateData.length > 0) {
            renderGraph();
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [stateData]);

    return (
        <div className="state-graph">
            <h2>State Wise Temperature Summary</h2>
            <canvas id="state-chart"></canvas>
        </div>
    );
};

export default StateGraph;
