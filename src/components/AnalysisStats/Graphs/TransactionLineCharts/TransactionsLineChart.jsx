import {useEffect, useRef, useState} from "react";
import {Area} from "@antv/g2plot";
import "./TransactionsLineChart.scss";
import {APIv1} from "../../../../api";

const TransactionsLineChart = ({t}) => {
    const [userData, setUserData] = useState({});
    const chartRef = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get("analysis/transactions/periodic/summary/", {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchData();
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        if (chartRef.current && data.length > 0) {
            const linePlot = new Area(chartRef.current, {
                data: data,
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
            });

            linePlot.render();
        }
    }, [data]);

    return (
        <div className="analysis__chart-card analysis__chart-card--wide transactions-line-chart">
            <h3 className="analysis__chart-subtitle">{t("analysis.numbersStats.mainTitles.transactionsLineChartTitle")}</h3>
            <div ref={chartRef} className="transactions-line-chart__container"></div>
        </div>
    );
};

export default TransactionsLineChart;
