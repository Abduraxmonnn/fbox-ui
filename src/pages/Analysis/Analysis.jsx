import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {analysisStats} from "../../components/AnalysisStats";
import {Logs} from "../index";
import './Analysis.css';
import dayjs from "dayjs";

const {
    Period,
    TransactionFinancialCard,
    TransactionNumberCard,
    DeviceStatusCard,
    NotifyNumberCard,
    PayMeTransactionsPieChart,
    ClickTransactionsPieChart,
    UzumTransactionsPieChart,
    AnorTransactionsPieChart,

} = analysisStats;

const Analysis = () => {
    const {t} = useTranslation();
    const [period, setPeriod] = useState([] && 0);
    const navigate = useNavigate();

    const handleNavigate = (targetRoute) => {
        navigate(targetRoute);
    };

    const handleChangePeriod = (value) => {
        let startPeriod = value[0].format('YYYY-MM-DD');
        let endPeriod = value[1].format('YYYY-MM-DD');
        setPeriod([startPeriod, endPeriod]);
    }

    return (
        <div className='analysis'>
            <div className='analysis__header'>
                <Period handleChangePeriod={handleChangePeriod}/>
            </div>

            <div className="analysis__metrics">
                <div className='analysis__metric-card'>
                    <TransactionFinancialCard period={period}/>
                    <TransactionNumberCard period={period}/>
                </div>
                <div className='analysis__metric-card'>
                    <DeviceStatusCard/>
                    <NotifyNumberCard period={period}/>
                </div>
            </div>

            <div className='analysis__charts'>
                <div className='analysis__chart-card analysis__chart-card--wide'>
                    <h2 className='analysis__chart-title'>{t("analysis.charts.title")}</h2>
                    <div className='analysis__chart-grid'>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>{t("common.providers.payme")}</h3>
                            <PayMeTransactionsPieChart period={period} offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>{t("common.providers.click")}</h3>
                            <ClickTransactionsPieChart period={period} offset="down"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>{t("common.providers.uzum")}</h3>
                            <UzumTransactionsPieChart period={period} offset="up"/>
                        </div>
                        <div className='analysis__chart-content'>
                            <h3 className='analysis__chart-subtitle'>{t("common.providers.anor")}</h3>
                            <AnorTransactionsPieChart period={period} offset="down"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='analysis__orders'>
                <div className='analysis__orders-card'>
                    <h2
                        className='analysis__orders-title'
                        onClick={() => handleNavigate("/payments/logs")}
                    >
                        {t("analysis.footerData.title")}
                    </h2>
                    <Logs defaultPaginationSize={10}/>
                </div>
            </div>
        </div>
    )
        ;
};

export default Analysis;