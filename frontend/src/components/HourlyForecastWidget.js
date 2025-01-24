import React from 'react';
import '../styles/HourlyForecast.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const HourlyForecastWidget = ({ data }) => {
    const hourlyData = data.list.slice(0, 8);

    const chartData = {
        labels: hourlyData.map(item => new Date(item.dt * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true
        })),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: hourlyData.map(item => Math.round(item.main.temp)),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperature Forecast',
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                ticks: {
                    callback: function (value) {
                        return value + '°C';
                    }
                }
            }
        }
    };

    return (
        <div className="hourly-forecast">
            <label className="label">Today's Hourly Forecast</label>

            {}
            <div className="chart-container">
                <Line options={options} data={chartData} />
            </div>

            <div className="hourly-container">
                {hourlyData.map((item, idx) => {
                    const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        hour12: true
                    });

                    return (
                        <div key={idx} className="hourly-item">
                            <span className="time">{time}</span>
                            <img
                                alt="weather"
                                className="icon-small"
                                src={`icons/${item.weather[0].icon}.png`}
                            />
                            <span className="temp">{Math.round(item.main.temp)}°C</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecastWidget;