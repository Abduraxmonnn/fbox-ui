import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../../api";
import "../../../styles/BaseDetailStyle.scss"
import {extractDateBySecond, isBoolean} from "../../../utils";
import {Button} from "antd";

const CompanyDetail = () => {
    const {id} = useParams()
    const [company, setCompany] = useState({})
    const [userData, setUserData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        const fetchCompanyDetail = async () => {
            try {
                const response = await APIv1.get(`/company/${id}`)
                setCompany(response.data)
            } catch (err) {
                console.error('Something went wrong:', err)
            }
        }
        fetchCompanyDetail()
    }, [id, userData.token])

    const handleRedirect = (provider) => {
        navigate(`/payments/logs/`)
    }

    if (!company) {
        return <div>Company not found</div>
    }

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
                            {label: "Address", value: company.address},
                            {label: "Phone number", value: company.phone_number},
                            {label: "Start date", value: extractDateBySecond(company.start_date)},
                            {label: "End date", value: extractDateBySecond(company.end_date)},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span className="detail-view__value">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">Payment permissions</h2>
                    <ul className="detail-view__list">
                        {[
                            {label: "Click", value: company.click},
                            {label: "PayMe", value: company.pay_me},
                            {label: "Uzum", value: company.apelsin},
                            {label: "Anor", value: company.anor},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <div className="detail-view__value-group">
                                    <Button
                                        onClick={() => handleRedirect(label)}
                                        variant="outline"
                                        size="sm"
                                        className="detail-view__redirect-button"
                                    >
                                        More
                                    </Button>
                                    <span
                                        className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}
                                    >
                {value ? 'ACCESS' : 'DECLINE'}
              </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">SMS information</h2>
                    <ul className="detail-view__list">
                        {[
                            {label: "Sens sms status", value: company.send_sms},
                            {label: "Sent sms", value: company.count_sent_sms},
                            {label: "Last month sent sms", value: company.last_month_sms_count},
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                {
                                    isBoolean(value) ? (
                                        <span
                                            className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                                            {value ? 'ACCESS' : 'DECLINE'}
                                        </span>
                                    ) : (
                                        <span className="detail-view__value">{value}</span>
                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </div>

                {/*<div className="detail-view__orders">*/}
                {/*    <Orders serialNumber={company.device_serial_number} defaultPageSize={10}/>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}

export default CompanyDetail;