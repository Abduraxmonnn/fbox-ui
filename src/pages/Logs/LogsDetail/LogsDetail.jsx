import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import {StatusIcon} from "../../../utils/statusIcons";
import "../../../styles/BaseLogsStyle.scss"
import {useParams} from "react-router-dom";
import {extractDateBySecond} from "../../../utils";

const LogsDetail = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState({});
    const [logsData, setLogsData] = useState({});

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const {data: {message}} = await APIv1(`logs/list/${id}`, {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    }
                });

                const logData = {
                    key: message.id,
                    inn: message.inn,
                    deviceSerial: message.device_serial === 'None' ? '-' : message.device_serial,
                    transactionId: message.transaction_id === 'None' ? '-' : message.transaction_id,
                    headers: message.headers,
                    request: message.request,
                    response: message.response,
                    status: message.is_success,
                    logType: message.log_type,
                    createdDate: extractDateBySecond(message.created_date)
                };

                setLogsData(logData);
            } catch (error) {
                console.log('Something went wrong:', error);
            }
        };

        fetchLogs();
    }, [userData.token, id, setLogsData]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    if (!logsData) {
        return <div>Log not found</div>;
    }

    return (
        <div className="content_container">
            <h1 className="payment-log__title">Payment Log</h1>

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">INN:</span>
                    <span className="payment-log__value">{logsData.inn}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Device serial:</span>
                    <span className="payment-log__value">{logsData.deviceSerial}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Transaction id:</span>
                    <span className="payment-log__value">{logsData.transactionId || '-'}</span>
                </div>
            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Headers:</span>
                <pre className="payment-log__pre">{logsData.headers}</pre>
            </div>

            <div className="payment-log__field payment-log__field--full">
            <span className="payment-log__label">Request:</span>
                <pre className="payment-log__pre">{logsData.request}</pre>
            </div>

            <div className="payment-log__field payment-log__field--full">
                <span className="payment-log__label">Response:</span>
                <pre className="payment-log__pre">{logsData.response}</pre>
            </div>

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">Provider:</span>
                    <span className="payment-log__value">{logsData.logType}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Transaction processed date:</span>
                    <span className="payment-log__value">{logsData.createdDate}</span>
                </div>

                <div className="payment-log__field payment-log__field--row">
                    <span className="payment-log__label">Status:</span>
                    <div className="payment-log__status">
                        <StatusIcon status={logsData.status}/>
                        <span className="payment-log__status-text">{logsData.status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LogsDetail;