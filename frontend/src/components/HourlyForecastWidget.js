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

const HourlyForecastWidget = ({ data, forecastType }) => {
    const displayData = forecastType === "5day"
        ? calculateDailyAverages(data.list)
        : data.list.slice(0, 8);

    const chartData = {
        labels: forecastType === "5day"
            ? displayData.map(item => new Date(item.dt * 1000).toLocaleDateString())
            : displayData.map(item => new Date(item.dt * 1000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true
            })),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: displayData.map(item => Math.round(item.main.temp)),
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
                text: forecastType === "5day" ? '5-Day Temperature Forecast' : "Today's Hourly Forecast",
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: forecastType === "5day" ? 'Date' : 'Time'
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
            <div className="chart-container">
                <Line options={options} data={chartData} />
            </div>

            <div className="hourly-container">
                {displayData.map((item, idx) => {
                    const timeLabel = forecastType === "5day"
                        ? new Date(item.dt * 1000).toLocaleDateString()
                        : new Date(item.dt * 1000).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            hour12: true
                        });

                    return (
                        <div key={idx} className="hourly-item">
                            <span className="time">{timeLabel}</span>
                            <img
                                alt="weather"
                                className="icon-small"
                                src={`icons/${item.weather[0].icon}.png`}
                            />
                            <span className="temperature">
                                {Math.round(item.main.temp)}°C
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const calculateDailyAverages = (hourlyData) => {
    const dailyData = {};

    hourlyData.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyData[date]) {
            dailyData[date] = {
                temps: [],
                weather: item.weather,
                main: { ...item.main },
                dt: item.dt
            };
        }
        dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).map(day => ({
        ...day,
        main: {
            ...day.main,
            temp: day.temps.reduce((a, b) => a + b) / day.temps.length
        }
    }));
};

export default HourlyForecastWidget;