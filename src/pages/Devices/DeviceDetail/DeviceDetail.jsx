import React, {useCallback, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {MonitorCheck, MonitorDot} from 'lucide-react';
import {useTranslation} from "react-i18next";
import {Spin} from "antd";
import {APIv1} from '../../../api'
import Orders from "../../Orders/Orders";
import {DeviceStatusProviders, DeviceStatusQRProviders} from "../../../components";
import {
    deviceStatusInactiveTime,
    deviceStatusInactiveTimeToText,
    extractDateBySecond
} from "../../../utils";
import './DeviceDetail.scss'


const DeviceDetail = () => {
    const {serial_number} = useParams();
    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [deviceData, setDeviceData] = useState(null);
    const [relatedDevices, setRelatedDevices] = useState([]);
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);
    const [expandedSecondSection, setExpandedSecondSection] = useState(null);
    const [loading, setLoading] = useState(true);

    const extractDate = useCallback((dateString) => {
        return dateString ? new Date(dateString).toISOString().slice(0, 10) : '----/--/--';
    }, []);

    const toggleSection = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    const toggleSecondSection = (section) => {
        setExpandedSecondSection(prevSection => prevSection === section ? null : section);
    };

    const fetchData = useCallback(async (serialNumber, token) => {
        setLoading(true);
        try {
            const deviceResponse = await APIv1.get(`/device/status/retrieve/${serialNumber}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            const relatedDevicesResponse = await APIv1.get(`/devices/get_related_devices/?serial=${deviceResponse.data.device_serial_number}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setDeviceData(deviceResponse.data);
            setRelatedDevices(relatedDevicesResponse.data);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'))
        if (items) {
            setUserData(items)
        }
    }, []);

    useEffect(() => {
        if (userData.token && serial_number) {
            fetchData(serial_number, userData.token)
        }
    }, [userData.token, serial_number, fetchData]);

    const renderRelatedDevices = () => {
        if (relatedDevices.length === 0) {
            return <li>No related devices found.</li>
        }

        return (
            <div className="detail-view__related-devices">
                {relatedDevices.map(item => (
                    <div
                        key={item.device_serial_number}
                        className={`detail-view__related-device ${Number(serial_number) === Number(item.id) ? 'detail-view__related-device--active' : ''}`}
                        onClick={() => onRelatedDevices(item)}
                    >
                        <span>{item.device_serial_number}</span>
                    </div>
                ))}
            </div>
        );
    };

    const onScrollToTop = () => {
        window.scrollTo(0, 0)
    }

    const onRelatedDevices = (item) => {
        navigate(`/device/detail/${item.device_serial_number}`)
        onScrollToTop();
    }

    return (
        <div className="detail-view">
            {loading ? (
                <>
                    <div className="detail-view__loading">
                        <Spin size="large"/>
                    </div>
                </>
            ) : (
                <div className="detail-view__container">
                    <div className="detail-view__header">
                        <div className="detail-view__title">
                            <h1 className="detail-view__main-title">{deviceData.company.name}</h1>
                            <span className="detail-view__subtitle">
                        <span className="detail-view__subtitle-label">{t("common.deviceSerialNumber")}: </span>
                                {deviceData.device_serial_number}
                        </span>
                        </div>
                        <div className="detail-view__action-buttons">
                            <button
                                className="detail-view__action-button detail-view__action-button--secondary"
                                onClick={() => navigate(-1)}
                            >
                                {t("pages.devices.detailColumns.button1")}
                            </button>
                            <button
                                className="detail-view__action-button detail-view__action-button--secondary"
                                onClick={() => navigate(-1)}
                            >
                                {t("pages.devices.detailColumns.button2")}
                            </button>
                        </div>
                    </div>

                    <div className="detail-view__content">
                        <div className="detail-view__main-info">
                            <div className="detail-view__row">

                                <div className="detail-view__section detail-view__section--half">
                                    <h2 className="detail-view__section-title">{t("pages.devices.detailColumns.container1.title")}</h2>
                                    <ul className="detail-view__list">
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row1")}:</span>
                                            <span
                                                className="detail-view__value">{deviceData.device.user__username}</span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row2")}:</span>
                                            <span
                                                className={`detail-view__tag ${deviceData.device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                                          {deviceData.device.is_multi_user ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                                        </span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row3")}:</span>
                                            <span
                                                className={`detail-view__tag ${deviceData.device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                                          {deviceData.device.is_multi_user ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                                        </span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row4")}:</span>
                                            <span
                                                className="detail-view__value">{deviceStatusInactiveTimeToText[deviceData.is_active_time]} ... {deviceData.is_active ?
                                                <MonitorCheck size={18} color={'#1cb344'}/> :
                                                <MonitorDot size={18}
                                                            color={deviceStatusInactiveTime[deviceData.is_active_time]}/>}
                                        </span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row5")}:</span>
                                            <span
                                                className="detail-view__value">{extractDateBySecond(deviceData.updated_date)}
                                        </span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row6")}:</span>
                                            <span
                                                className="detail-view__value">{extractDate(deviceData.device.start_date)}</span>
                                        </li>
                                        <li className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t("pages.devices.detailColumns.container1.row7")}:</span>
                                            <span
                                                className="detail-view__value">{extractDate(deviceData.device.end_date)}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="detail-view__section detail-view__section--half">
                                    <h2 className="detail-view__section-title">{t("pages.devices.detailColumns.container2.title")}</h2>
                                    <ul className="detail-view__list">
                                        {['z_report_left_count', 'device_ip_address', 'orders_not_sent_count', 'version_number', 'terminal_id'].map(field => (
                                            <li key={field} className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t(`pages.devices.detailColumns.container2.${field}`)}:</span>
                                                <span className="detail-view__value">
                                                {deviceData[field] ||
                                                    <span
                                                        className="detail-view__tag detail-view__tag--empty">{t("common.detailPages.empty")}</span>}
                                              </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="detail-view__section detail-view__section--half">
                                    <h2 className="detail-view__section-title">{t("pages.devices.detailColumns.container3.title")}</h2>
                                    <ul className="detail-view__list">
                                        {['version', 'mac_address', 'printer_name', 'printer_model', 'printer_number', 'printer_type'].map(field => (
                                            <li key={field} className="detail-view__item">
                                            <span
                                                className="detail-view__label">{t(`pages.devices.detailColumns.container3.${field}`)}:</span>
                                                <span className="detail-view__value">
                                                {deviceData.device[field] ||
                                                    <span className="detail-view__tag detail-view__tag--empty">
                                                        {t("common.detailPages.empty")}
                                                    </span>}
                                            </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="detail-view__section">
                                <DeviceStatusProviders t={t}
                                                       expandedSection={expandedSection}
                                                       deviceData={deviceData}
                                                       toggleSection={toggleSection}/>
                            </div>
                            <div className="detail-view__section">
                                <DeviceStatusQRProviders t={t}
                                                         expandedSection={expandedSecondSection}
                                                         deviceData={deviceData}
                                                         toggleSection={toggleSecondSection}/>
                            </div>

                            <div className="detail-view__section">
                                <h2 className="detail-view__section-title">{t("pages.devices.detailColumns.relatedSection1.title")}</h2>
                                <h3 className="detail-view__subtitle">{t("pages.devices.detailColumns.relatedSection1.subtitle")}: {relatedDevices.length}</h3>
                                {renderRelatedDevices()}
                            </div>
                        </div>
                    </div>

                    <div className="detail-view__orders">
                        <Orders serialNumber={deviceData.device_serial_number} defaultPageSize={10}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeviceDetail;
