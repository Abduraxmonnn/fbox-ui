import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {APIv1} from "../../../api";
import {Button, message, Modal} from "antd";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useTranslation} from "react-i18next";
import Logs from "../../Logs/Logs";
import {extractDateBySecond, isBoolean} from "../../../utils";
import {Sms} from "../../index";
import Device from "../../Devices/Device";
import "../../../styles/BaseDetailStyle.scss";

const CompanyDetail = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [company, setCompany] = useState({});
    const [userData, setUserData] = useState({});
    const [isUserStaff, setIsUserStaff] = useState({});
    const [expandedSecondSection, setExpandedSecondSection] = useState(null);
    const [expandedThirdSection, setExpandedThirdSection] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // For controlling the modal visibility

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setIsUserStaff(items.data.is_staff);
            setUserData(items);
        }
    }, [userData.token]);

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

    const onSendSelectedCompaniesToDelete = async () => {
        const response = await APIv1.delete(`/company/delete/${company.inn}`, {
            headers: {
                Authorization: `Token ${userData.token}`,
            },
        });

        if (response.status === 200) {
            message.success(t("pages.companies.deleteItem.messages.success1"));
            navigate(-1);
        } else {
            message.error(t("pages.companies.deleteItem.messages.error1"));
        }
    };

    const handleCreateCompanyNavigate = () => {
        navigate(`/create_company/${company.id}`);
    };

    const handleRedirect = (provider) => {
        navigate(`/payments/logs/`);
    };

    const toggleSecondSection = (section) => {
        setExpandedSecondSection(prevSection => prevSection === section ? null : section);
    };

    const toggleThirdSection = (section) => {
        setExpandedThirdSection(prevSection => prevSection === section ? null : section);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        onSendSelectedCompaniesToDelete();
        setIsModalVisible(false);
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
                        {value ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                    </span>
                </div>
            ) : isBoolean(value) ? (
                <span className={`detail-view__tag ${value ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                    {value ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
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
                        <span className="detail-view__subtitle-label">{t("common.inn")}: </span>
                        {company.inn}
                    </span>
                </div>
                <div className="detail-view__action-buttons">
                    {isUserStaff && (
                        <button
                            className="detail-view__action-button detail-view__action-button--delete"
                            onClick={showModal}
                        >
                            {t("pages.companies.detailColumns.button1")}
                        </button>
                    )}

                    <button
                        className="detail-view__action-button detail-view__action-button--secondary"
                        onClick={() => handleCreateCompanyNavigate()}
                    >
                        {t("pages.companies.detailColumns.button2")}
                    </button>

                    <button
                        className="detail-view__action-button detail-view__action-button--secondary"
                        onClick={() => navigate(-1)}
                    >
                        {t("pages.companies.detailColumns.button3")}
                    </button>
                </div>
            </div>

            <div className="detail-view__content">
                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.companies.detailColumns.container1.title")}</h2>
                    <ul className="detail-view__list">
                        {renderListItem(`${t("pages.companies.detailColumns.container1.row1")}`, company.address)}
                        {renderListItem(`${t("pages.companies.detailColumns.container1.row2")}`, company.phone_number)}
                        {renderListItem(`${t("pages.companies.detailColumns.container1.row3")}`, extractDateBySecond(company.start_date))}
                        {renderListItem(`${t("pages.companies.detailColumns.container1.row4")}`, extractDateBySecond(company.end_date))}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.companies.detailColumns.container2.title")}</h2>
                    <ul className="detail-view__list">
                        {renderListItem(`${t("common.providers.click")}`, company.click, true)}
                        {renderListItem(`${t("common.providers.payme")}`, company.pay_me, true)}
                        {renderListItem(`${t("common.providers.uzum")}`, company.apelsin, true)}
                        {renderListItem(`${t("common.providers.anor")}`, company.anor, true)}
                    </ul>
                </div>

                <div className="detail-view__section">
                    <h2 className="detail-view__section-title">{t("pages.companies.detailColumns.container3.title")}</h2>
                    <ul className="detail-view__list">
                        {renderListItem(`${t("pages.companies.detailColumns.container3.row1")}`, company.send_sms)}
                        {renderListItem(`${t("pages.companies.detailColumns.container3.row2")}`, company.count_sent_sms)}
                        {renderListItem(`${t("pages.companies.detailColumns.container3.row3")}`, company.last_month_sms_count)}
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="related-device-title">{t("pages.companies.detailColumns.relatedSection1.title")}</h2>
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
                    <span
                        className="related-device-title">{t("pages.companies.detailColumns.relatedSection2.title")}</span>
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
                    <span
                        className="related-device-title">{t("pages.companies.detailColumns.relatedSection3.title")}</span>
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

            <Modal
                title={t("pages.companies.deleteItem.header")}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={t("pages.companies.deleteItem.button1")}
                cancelText={t("pages.companies.deleteItem.button2")}
                okType="danger"
            >
                <p>{t("pages.companies.deleteItem.title")}: <strong>{company.name}</strong>?</p>
            </Modal>
        </section>
    );
};

export default CompanyDetail;
