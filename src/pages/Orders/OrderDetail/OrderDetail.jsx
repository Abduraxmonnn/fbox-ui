import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";

import '../../../styles/BaseDetailStyle.scss'
import CurrencyFormatted from "../../../utils/costFormatter";

const OrderDetail = () => {
    const {id} = useParams();
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
        return <div>Order not found</div>
    }

    return (
        <section className="content_container">
            <div className="detail-view__header">
                <div className="detail-view__title">
                    <h1 className="detail-view__main-title">{order.market_name}</h1>
                    <span className="detail-view__subtitle">
              <span className="detail-view__subtitle-label">Cash desc serial: </span>
                        {order.cash_desc_serial}
            </span>
                </div>
                <button
                    className="detail-view__action-button detail-view__action-button--secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>

            <div className="detail-view__content">
                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">Base information</h2>
                    <ul className="detail-view__list">
                        {[
                            {label: "Market name", value: order.market_name},
                            {label: "INN", value: order.inn},
                            {label: "Number", value: order.number},
                            {label: "Cashier", value: order.cashier},
                            {label: "Cash desc serial", value: order.cash_desc_serial},
                            {label: "Cash desc number", value: order.cash_desc_number},
                            {label: "End date", value: extractDate(order.time)},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span className="detail-view__value">{value}</span>
                            </li>
                        ))}
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span className="detail-view__label">Received cash:</span>
                            <span
                                className="detail-view__value detail-view__value--highlighted">{CurrencyFormatted(order.received_cash)}</span>
                        </li>
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">Notification information</h2>
                    <ul className="detail-view__list">
                        <li className="detail-view__item">
                            <span className="detail-view__label">Email:</span>
                            <span className="detail-view__value">{order.email || '-'}</span>
                        </li>
                        {[
                            {label: "Send email", value: order.send_email},
                            {label: "Email Sync", value: order.sync_email},
                            {label: "SMS Phone number", value: order.sms_phone_number},
                            {label: "SMS Sync", value: order.sync_sms},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span
                                    className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                    {value ? 'TRUE' : 'FALSE'}
                  </span>
                            </li>
                        ))}
                        <li className="detail-view__item">
                            <span className="detail-view__label">Fiscal URL:</span>
                            <span className="detail-view__value">
                  <a href={order.result_url} target="_blank" rel="noopener noreferrer"
                     className="detail-view__link">link</a>
                </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    );
}

export default OrderDetail;