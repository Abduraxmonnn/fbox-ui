import "../../../styles/BaseLogsStyle.scss"
import {StatusIcon} from "../../../utils/statusIcons";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import {extractDateBySecond} from "../../../utils";

const SmsDetail = () => {
    const {id} = useParams();
    const [smsData, setSmsData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const {data} = await APIv1(`sms/list/${id}`, {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    }
                });

                const logData = {
                    key: data.id,
                    inn: data.inn,
                    recipient: data.recipient,
                    message: data.message,
                    response: data.response,
                    status: data.is_success,
                    monthlySent: data.monthly_sent,
                    lastDay: data.last_day,
                    createdDate: extractDateBySecond(data.created_date),
                };

                setSmsData(logData);
            } catch (error) {
                console.error('Something went wrong:', error);
            }
        };

        fetchLogs();
    }, [id, userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    if (!smsData) {
        return <div>Sms not found</div>;
    }

    return (
        <div className="detail-view">
            <h1 className="payment-log__title">Sms #{smsData.key}</h1>

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">INN:</span>
                    <span className="payment-log__value">{smsData.inn}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Recipient phone number:</span>
                    <span className="payment-log__value">{smsData.recipient}</span>
                </div>

            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Message:</span>
                <pre className="payment-log__pre">{smsData.message}</pre>
            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Response:</span>
                <pre className="payment-log__pre">{smsData.response}</pre>
            </div>

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">Sms sent month:</span>
                    <span className="payment-log__value">{smsData.monthlySent}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Sms sent last day:</span>
                    <span className="payment-log__value">{smsData.lastDay}</span>
                </div>

                <div className="payment-log__field payment-log__field--row">
                    <span className="payment-log__label">Status:</span>
                    <div className="payment-log__status">
                        <StatusIcon status={smsData.status}/>
                        <span className="payment-log__status-text">{smsData.status}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SmsDetail;