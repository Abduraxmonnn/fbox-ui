import React, { useEffect, useRef } from 'react'

import { Chart, Legend, Tooltip } from 'chart.js/auto'

Chart.register(Legend, Tooltip)

const PieChart = () => {
	const chartRef = useRef(null)
	const chartInstance = useRef(null)

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy()
		}
		const myChartRef = chartRef.current.getContext('2d')

		chartInstance.current = new Chart(myChartRef, {
			type: 'polarArea',
			data: {
				labels: ['Online', 'Offline'],
				datasets: [
					{
						data: [300, 100],
						backgroundColor: [
							'rgb(51, 204, 51)',
							'rgb(128, 128, 128)',
						],
					},
				],
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

export default PieChart
