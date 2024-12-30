import {StatusIcon} from "../../../utils/statusIcons";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import "../../../styles/BaseLogsStyle.scss"
import {extractDateBySecond} from "../../../utils";

const SmsDetail = () => {
    const {id} = useParams();
    const [emailData, setEmailData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const {data} = await APIv1(`email/list/${id}`, {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    }
                });

                const emailResponseData = {
                    key: data.id,
                    inn: data.inn,
                    recipient: data.recipient,
                    message: data.message,
                    response: data.response,
                    status: data.is_success,
                    createdDate: extractDateBySecond(data.created_date),
                };

                setEmailData(emailResponseData);
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

    if (!emailData) {
        return <div>Sms not found</div>;
    }

    return (
        <div className="detail-view">
            <h1 className="payment-log__title">Email #{emailData.key}</h1>

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">INN:</span>
                    <span className="payment-log__value">{emailData.inn}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Recipient email:</span>
                    <span className="payment-log__value">{emailData.recipient}</span>
                </div>

                <div className="payment-log__field payment-log__field--row">
                    <span className="payment-log__label">Status:</span>
                    <div className="payment-log__status">
                        <StatusIcon status={emailData.status}/>
                        <span className="payment-log__status-text">{emailData.status}</span>
                    </div>
                </div>
            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Message:</span>
                <pre className="payment-log__pre">{emailData.message}</pre>
            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Response:</span>
                <pre className="payment-log__pre">{emailData.response}</pre>
            </div>

        </div>
    );
}

export default SmsDetail;