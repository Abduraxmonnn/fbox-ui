export const generatePieChartOptions = (showPercentage = true) => {
    return {
        plugins: {
            datalabels: {
                formatter: (value, context) => {
                    if (showPercentage) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${percentage}%`;
                    } else {
                        return `${value}`;
                    }
                },
                color: 'black',
                align: 'center',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${tooltipItem.label}: ${!showPercentage ? `${percentage}%` : `${value}`}`;
                    },
                },
            },
        },
        responsive: true,
    };
};
