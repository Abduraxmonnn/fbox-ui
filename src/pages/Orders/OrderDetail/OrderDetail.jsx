import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import {Button, Tag} from "antd";

import './OrderDetail.scss'

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
            <div className="order_detail__title">
                <div>
                    <h1>{order.market_name}</h1>
                    <span>
						<span className='order_detail__cash_desc_serial'>
							Cash desc serial:{' '}
						</span>
                        {order.cash_desc_serial}
					</span>
                </div>
                <Button
                    style={{
                        width: '15%',
                        display: 'inline-block',
                        marginRight: '1%',
                    }}
                    type='dashed'
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </div>
            <div className="detail_graphBox">
                <div className="detail_box">
                    <ul className="data_list">
                        <h1>Base information</h1>
                        <li>
                            <span>Market name: </span>
                            <span>{order.market_name}</span>
                        </li>
                        <li>
                            <span>INN: </span>
                            <span>{order.inn}</span>
                        </li>
                        <li>
                            <span>Number: </span>
                            <span>{order.number}</span>
                        </li>
                        <li>
                            <span>Cashier: </span>
                            <span>{order.cashier}</span>
                        </li>
                        <li>
                            <span>Received cash: </span>
                            <span>{order.received_cash}</span>
                        </li>
                        <li>
                            <span>Cash desc serial: </span>
                            <span>{order.cash_desc_serial}</span>
                        </li>
                        <li>
                            <span>Cash desc number: </span>
                            <span>{order.cash_desc_number}</span>
                        </li>
                        <li>
                            <span>End date:</span>
                            <span>
								{order.time
                                    ? extractDate(order.time)
                                    : '----/--/--'}
							</span>
                        </li>
                    </ul>
                    <ul className="data_list">
                        <h1>Notification information</h1>
                        <li>
                            <span>Email: </span>
                            <span>{order.email || '-'}</span>
                        </li>
                        <li>
                            <span>Send email: </span>
                            <span>
								<Tag color={order.send_email ? 'green' : 'volcano'}>
									{order.send_email ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Email Sync: </span>
                            <span>
								<Tag color={order.sync_email ? 'green' : 'volcano'}>
									{order.sync_email ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>SMS Phone number: </span>
                            <span>
								<Tag color={order.sms_phone_number ? 'green' : 'volcano'}>
									{order.sms_phone_number ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>SMS Sync: </span>
                            <span>
								<Tag color={order.sync_sms ? 'green' : 'volcano'}>
									{order.sync_sms ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Fiscal URL: </span>
                            <span><a href={order.result_url}>link</a></span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default OrderDetail;