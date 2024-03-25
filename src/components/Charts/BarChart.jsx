import React, { useEffect, useRef } from 'react'

import { Chart } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const BarChart = () => {
	const chartRef = useRef(null)
	const chartInstance = useRef(null)

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy()
		}
		const myChartRef = chartRef.current.getContext('2d')

		chartInstance.current = new Chart(myChartRef, {
			type: 'bar',
			data: {
				labels: ['PayMe', 'Click', 'Uzum', 'Anor'],
				maxBarThickness: 8,
				datasets: [
					{
						label: 'Success',
						data: [3000, 2000, 2500, 3000],
						backgroundColor: '#33cc33',
					},
					{
						label: 'Failure',
						data: [300, 120, 80, 50],
						backgroundColor: '#fc0303',
					},
				],
			},
			options: {
				scales: {
					y: {
						max: 4000,
					},
				},
			},
		})
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy()
			}
		}
	}, [])

	return <canvas ref={chartRef} />
}

export default BarChart
