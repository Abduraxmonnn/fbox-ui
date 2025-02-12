import { useEffect, useRef } from "react"
import { Line } from "@antv/g2plot"
import "./TransactionsLineChart.scss"
import carbonEmissionsData from "./carbonEmissions.json"

const TransactionsLineChart = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            const line = new Line(chartRef.current, {
                data: carbonEmissionsData,
                xField: "day",
                yField: "value",
                seriesField: "provider",
                xAxis: {
                    type: "time",
                    tickCount: 10,
                },
                yAxis: {
                    label: {
                        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                    },
                },
                legend: {
                    position: "top",
                },
                smooth: true,
                animation: {
                    appear: {
                        animation: "path-in",
                        duration: 5000,
                    },
                },
            })

            line.render()
        }
    }, [])

    return (
        <div className="analysis__chart-card analysis__chart-card--wide transactions-line-chart">
            <h3 className="analysis__chart-subtitle">Carbon Emissions by Source (1850-2014)</h3>
            <div ref={chartRef} className="transactions-line-chart__container"></div>
        </div>
    )
}

export default TransactionsLineChart