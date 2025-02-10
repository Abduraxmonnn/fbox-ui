import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {APIv1} from "../../../api";
import CurrencyFormatted from "../../../utils/baseFormatter";
import Products from "../../Products/Products";
import '../../../styles/BaseDetailStyle.scss'
import {extractDateBySecond} from "../../../utils";

const OrderDetail = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get(`orders/get/${id}`);
                setOrderData(response.data)
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        }

        fetchData()
    }, [id]);

    if (!orderData) {
        return <div>{t("pages.orders.detailColumns.errorNotFound")}</div>
    }

    return (
        <section className="detail-view">
            <div className="detail-view__header">
                <div className="detail-view__title">
                    <h1 className="detail-view__main-title">{orderData.market_name}</h1>
                    <span className="detail-view__subtitle">
              <span className="detail-view__subtitle-label">{t("common.deviceSerial")}: </span>
                        {orderData.cash_desc_serial}
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
                            {label: `${t("pages.orders.detailColumns.container1.row1")}`, value: orderData.market_name},
                            {label: `${t("common.inn")}`, value: orderData.inn},
                            {label: `${t("pages.orders.detailColumns.container1.row2")}`, value: orderData.number},
                            {label: `${t("pages.orders.detailColumns.container1.row3")}`, value: orderData.cashier},
                            {label: `${t("common.deviceSerial")}`, value: orderData.cash_desc_serial},
                            {
                                label: `${t("pages.orders.detailColumns.container1.row4")}`,
                                value: orderData.cash_desc_number
                            },
                            {
                                label: `${t("pages.orders.detailColumns.container1.row5")}`,
                                value: extractDateBySecond(orderData.time)
                            },
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span className="detail-view__value">{value}</span>
                            </li>
                        ))}
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span
                                className="detail-view__label">{t("pages.orders.detailColumns.container1.row6")}:</span>
                            <span
                                className="detail-view__value detail-view__value--highlighted">{CurrencyFormatted(orderData.received_cash)}</span>
                        </li>
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.orders.detailColumns.container2.title")}</h2>
                    <ul className="detail-view__list">
                        <li className="detail-view__item">
                            <span
                                className="detail-view__label">{t("pages.orders.detailColumns.container2.row1")}:</span>
                            <span className="detail-view__value">{orderData.email || '-'}</span>
                        </li>
                        {[
                            {label: `${t("pages.orders.detailColumns.container2.row2")}`, value: orderData.send_email},
                            {label: `${t("pages.orders.detailColumns.container2.row3")}`, value: orderData.sync_email},
                            {
                                label: `${t("pages.orders.detailColumns.container2.row4")}`,
                                value: orderData.sms_phone_number
                            },
                            {label: `${t("pages.orders.detailColumns.container2.row5")}`, value: orderData.sync_sms},
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
                            <span
                                className="detail-view__label">{t("pages.orders.detailColumns.container2.row6")}:</span>
                            <span className="detail-view__value">
                  <a href={orderData.result_url} target="_blank" rel="noopener noreferrer"
                     className="detail-view__link">{t("pages.orders.detailColumns.container2.row7")}</a>
                </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="related-device-title">{t("pages.products.title")}</h2>
                <Products related={true} defaultPageSize={10} orderId={id}/>
            </div>
        </section>
    );
}

export default OrderDetail;