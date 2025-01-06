import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import {extractDateBySecond, isBoolean} from "../../../utils";
import {Button} from "antd";
import {RelatedDeviceStatus, RelatedLogs, RelatedSms} from "../../../components";
import "../../../styles/BaseDetailStyle.scss"
import Logs from "../../Logs/Logs";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Sms} from "../../index";
import Device from "../../Devices/Device";

const CompanyDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({});
    const [userData, setUserData] = useState({});
    const [expandedSecondSection, setExpandedSecondSection] = useState(null);
    const [expandedThirdSection, setExpandedThirdSection] = useState(null);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, []);

    useEffect(() => {
        const fetchCompanyDetail = async () => {
            try {
                const response = await APIv1.get(`/company/${id}`);
                setCompany(response.data);
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        };
        fetchCompanyDetail();
    }, [id, userData.token]);

    if (!company) {
        return <div>Company not found</div>;
    }

    const handleRedirect = (provider) => {
        navigate(`/payments/logs/`);
    };

    const toggleSecondSection = (section) => {
        setExpandedSecondSection(prevSection => prevSection === section ? null : section);
    };

    const toggleThirdSection = (section) => {
        setExpandedThirdSection(prevSection => prevSection === section ? null : section);
    };

    const renderListItem = (label, value, isPayment = false) => (
        <li key={label} className="detail-view__item">
            <span className="detail-view__label">{label}:</span>
            {isPayment ? (
                <div className="detail-view__value-group">
                    <Button
                        onClick={() => handleRedirect(label)}
                        className="detail-view__redirect-button"
                    >
                        More
                    </Button>
                    <span
                        className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                        {value ? 'ACCESS' : 'DECLINE'}
                    </span>
                </div>
            ) : isBoolean(value) ? (
                <span className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                    {value ? 'ACCESS' : 'DECLINE'}
                </span>
            ) : (
                <span className="detail-view__value">{value}</span>
            )}
        </li>
    );

    return (
        <section className="detail-view">
            <div className="detail-view__header">
                <div className="detail-view__title">
                    <h1 className="detail-view__main-title">{company.name}</h1>
                    <span className="detail-view__subtitle">
                        <span className="detail-view__subtitle-label">INN: </span>
                        {company.inn}
                    </span>
                </div>
                <div className="detail-view__action-buttons">
                    <button
                        className="detail-view__action-button detail-view__action-button--secondary"
                        onClick={() => navigate(-1)}
                    >
                        Edit
                    </button>
                    <button
                        className="detail-view__action-button detail-view__action-button--secondary"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </div>

            <div className="detail-view__content">
                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">Base information</h2>
                    <ul className="detail-view__list">
                        {renderListItem("Address", company.address)}
                        {renderListItem("Phone number", company.phone_number)}
                        {renderListItem("Start date", extractDateBySecond(company.start_date))}
                        {renderListItem("End date", extractDateBySecond(company.end_date))}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">Payment permissions</h2>
                    <ul className="detail-view__list">
                        {renderListItem("Click", company.click, true)}
                        {renderListItem("PayMe", company.pay_me, true)}
                        {renderListItem("Uzum", company.apelsin, true)}
                        {renderListItem("Anor", company.anor, true)}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">SMS information</h2>
                    <ul className="detail-view__list">
                        {renderListItem("Send sms status", company.send_sms)}
                        {renderListItem("Sent sms", company.count_sent_sms)}
                        {renderListItem("Last month sent sms", company.last_month_sms_count)}
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="related-device-title">Devices</h2>
                <Device
                    defaultPageSize={10}
                    companyInn={company.inn}
                />
            </div>
            <div className="detail-view__section">
                <button
                    className="detail-view__expand-button"
                    onClick={() => toggleSecondSection('related-logs')}
                    aria-expanded={expandedSecondSection === 'related-logs'}
                >
                    <span className="related-device-title">Logs</span>
                    {expandedSecondSection === 'related-logs' ? <ChevronUp size={22}/> :
                        <ChevronDown size={22}/>}
                </button>
                {expandedSecondSection === 'related-logs' && (
                    <Logs
                        defaultPaginationSize={10}
                        companyInn={company.inn}
                    />
                )}
            </div>
            <div className="detail-view__section">
                <button
                    className="detail-view__expand-button"
                    onClick={() => toggleThirdSection('related-sms')}
                    aria-expanded={expandedThirdSection === 'related-sms'}
                >
                    <span className="related-device-title">Sms</span>
                    {expandedThirdSection === 'related-sms' ? <ChevronUp size={22}/> :
                        <ChevronDown size={22}/>}
                </button>
                {expandedThirdSection === 'related-sms' && (
                    <Sms
                        defaultPaginationSize={10}
                        companyInn={company.inn}
                    />
                )}
            </div>

        </section>
    );
}

export default CompanyDetail;
