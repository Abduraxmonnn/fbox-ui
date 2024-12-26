import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import {StatusIcon, LogsStatusIcon} from "../../../utils/statusIcons";
import {useParams} from "react-router-dom";
import {extractDateBySecond} from "../../../utils";
import {LogsConfirmContent, LogsPaymentContent} from "../../../components";
import {ConvertLogsPaymentProvider} from "../../../utils/logsUtils";
import "../../../styles/BaseLogsStyle.scss"

const LogsDetail = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState({});
    const [logsData, setLogsData] = useState({});
    const [expandedSection, setExpandedSection] = useState(null);
    const [expandedSecondSection, setExpandedSecondSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    const toggleSecondSection = (section) => {
        setExpandedSecondSection(prevSection => prevSection === section ? null : section);
    };

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
                    paymentId: message.transaction_id,
                    amount: message.amount,
                    fiscalUrl: message.fiscal_url,
                    phoneNumber: message.phone,
                    paymentHeaders: message.content.payment.headers,
                    paymentRequest: message.content.payment.request,
                    paymentResponse: message.content.payment.response,
                    confirmHeaders: message.content.confirm.headers,
                    confirmRequest: message.content.confirm.request,
                    confirmResponse: message.content.confirm.response,
                    isSuccess: message.is_success,
                    status: message.status,
                    logType: ConvertLogsPaymentProvider(message.log_type),
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
            <h1 className="payment-log__title">Payment Log #{logsData.key}</h1>

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

            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">Amount:</span>
                    <span className="payment-log__value">{logsData.amount}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Payment id:</span>
                    <span className="payment-log__value">{logsData.paymentId}</span>
                </div>

                <div className="payment-log__field">
                    <span className="payment-log__label">Phone number:</span>
                    <span className="payment-log__value">{logsData.phoneNumber || '-'}</span>
                </div>
            </div>

            <div className="payment-log__grid">
                <div className="payment-log__section">
                    <LogsPaymentContent expandedSection={expandedSection} logsData={logsData}
                                        toggleSection={toggleSection}/>
                </div>
            </div>

            <div className="payment-log__grid">
                <div className="payment-log__section">
                    <LogsConfirmContent expandedSection={expandedSecondSection} logsData={logsData}
                                        toggleSection={toggleSecondSection}/>
                </div>
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
                        <StatusIcon status={logsData.isSuccess}/>
                        <span className="payment-log__status-text">{logsData.isSuccess}</span>
                    </div>
                </div>

                <div className="payment-log__field payment-log__field--row">
                    <span className="payment-log__label">Phase:</span>
                    <div className="payment-log__status">
                        <LogsStatusIcon size={22} status={logsData.status}/>
                        <span className="payment-log__status-text">{logsData.status}</span>
                    </div>
                </div>
            </div>
            <div className="payment-log__grid">
                <div className="payment-log__field">
                    <span className="payment-log__label">Fiscal receipt:</span>
                    <a href={logsData.fiscalUrl} className="payment-log__value" target="_blank"
                       rel="noreferrer">{logsData.fiscalUrl}</a>
                </div>
            </div>
        </div>
    );
};


export default LogsDetail;
