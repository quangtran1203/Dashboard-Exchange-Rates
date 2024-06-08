import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const ExchangeRateChart = ({ data }) => {

    let datasets;
    if (data.usd.length === 0) {
        datasets = [
            {
                label: 'CAD',
                data: data.cad,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
            {
                label: 'EUR',
                data: data.eur,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
        ]
    }
    else if (data.cad.length === 0) {
        datasets = [
            {
                label: 'USD',
                data: data.usd,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
            {
                label: 'EUR',
                data: data.eur,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
        ]
    }
    else {
        datasets = [
            {
                label: 'CAD',
                data: data.cad,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
            {
                label: 'USD',
                data: data.usd,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
        ]
    }

    const chartData = {
        labels: data.dates,
        datasets,
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Exchange Rate',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        responsive: true,
        maintainAspectRatio: true,
    };

    return <Line data={chartData} options={options} />;
};

export default ExchangeRateChart;
