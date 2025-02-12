import { useEffect, useRef } from "react"
import { Line, Area } from "@antv/g2plot"
import "./TransactionsLineChart.scss"
import carbonEmissionsData from "./carbonEmissions.json"

const TransactionsLineChart = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            const linePlot = new Area(chartRef.current, {
                data: carbonEmissionsData,
                xField: "day",
                yField: "value",
                seriesField: "provider",
                yAxis: {
                    label: {
                        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                    },
                },
                slider: {
                    start: 0.1,
                    end: 0.9,
                },
                legend: {
                    position: "top",
                },
                smooth: true,
                // Configure area fill for trend lines
                area: {
                    style: {
                        fillOpacity: 0.15,
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
            })

            linePlot.render()
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