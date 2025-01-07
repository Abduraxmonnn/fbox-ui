import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {APIv1} from "../../../api";
import CurrencyFormatted from "../../../utils/costFormatter";
import '../../../styles/BaseDetailStyle.scss'

const OrderDetail = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get(`orders/get/${id}`);
                setOrder(response.data)
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        }

        fetchData()
    }, [id]);

    if (!order) {
        return <div>{t("pages.orders.detailColumns.errorNotFound")}</div>
    }

    return (
        <section className="detail-view">
            <div className="detail-view__header">
                <div className="detail-view__title">
                    <h1 className="detail-view__main-title">{order.market_name}</h1>
                    <span className="detail-view__subtitle">
              <span className="detail-view__subtitle-label">{t("common.deviceSerial")}: </span>
                        {order.cash_desc_serial}
            </span>
                </div>
                <button
                    className="detail-view__action-button detail-view__action-button--secondary"
                    onClick={() => navigate(-1)}
                >
                    {t("pages.orders.detailColumns.button1")}
                </button>
            </div>

            <div className="detail-view__content">
                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.orders.detailColumns.container1.title")}</h2>
                    <ul className="detail-view__list">
                        {[
                            {label: `${t("pages.orders.detailColumns.container1.row1")}`, value: order.market_name},
                            {label: `${t("common.inn")}`, value: order.inn},
                            {label: `${t("pages.orders.detailColumns.container1.row2")}`, value: order.number},
                            {label: `${t("pages.orders.detailColumns.container1.row3")}`, value: order.cashier},
                            {label: `${t("common.deviceSerial")}`, value: order.cash_desc_serial},
                            {label: `${t("pages.orders.detailColumns.container1.row4")}`, value: order.cash_desc_number},
                            {label: `${t("pages.orders.detailColumns.container1.row5")}`, value: extractDate(order.time)},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span className="detail-view__value">{value}</span>
                            </li>
                        ))}
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span className="detail-view__label">{t("pages.orders.detailColumns.container1.row6")}:</span>
                            <span
                                className="detail-view__value detail-view__value--highlighted">{CurrencyFormatted(order.received_cash)}</span>
                        </li>
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.orders.detailColumns.container2.title")}</h2>
                    <ul className="detail-view__list">
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.orders.detailColumns.container2.row1")}:</span>
                            <span className="detail-view__value">{order.email || '-'}</span>
                        </li>
                        {[
                            {label: `${t("pages.orders.detailColumns.container2.row2")}`, value: order.send_email},
                            {label: `${t("pages.orders.detailColumns.container2.row3")}`, value: order.sync_email},
                            {label: `${t("pages.orders.detailColumns.container2.row4")}`, value: order.sms_phone_number},
                            {label: `${t("pages.orders.detailColumns.container2.row5")}`, value: order.sync_sms},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span
                                    className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                    {value ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                  </span>
                            </li>
                        ))}
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.orders.detailColumns.container2.row6")}:</span>
                            <span className="detail-view__value">
                  <a href={order.result_url} target="_blank" rel="noopener noreferrer"
                     className="detail-view__link">{t("pages.orders.detailColumns.container2.row7")}</a>
                </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default OrderDetail;