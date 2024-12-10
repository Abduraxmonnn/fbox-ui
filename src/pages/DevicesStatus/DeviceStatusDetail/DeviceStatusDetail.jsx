import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {MonitorCheck, MonitorDot} from 'lucide-react';

import {APIv1} from '../../../api'
import Orders from "../../Orders/Orders";
import './DeviceStatusDetail.scss'
import {DeviceStatusProviders, DeviceStatusQRProviders} from "../../../components";
import {deviceStatusInactiveTime, deviceStatusInactiveTimeToText} from "../../../utils";

const DeviceStatusDetail = () => {
    const {serial_number} = useParams();
    const [deviceData, setDeviceData] = useState(null);
    const [relatedDevices, setRelatedDevices] = useState([]);
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);
    const [expandedSecondSection, setExpandedSecondSection] = useState(null);

    const extractDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().slice(0, 10) : '----/--/--';
    };

    const toggleSection = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    const toggleSecondSection = (section) => {
        setExpandedSecondSection(prevSection => prevSection === section ? null : section);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceResponse = await APIv1.get(`/device/status/${serial_number}`);
                const relatedDevicesResponse = await APIv1.get(`/devices/get_related_devices/?serial=${deviceResponse.data.device_serial_number}`);

                console.log(deviceResponse.data)
                setDeviceData(deviceResponse.data);
                setRelatedDevices(relatedDevicesResponse.data);
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        };

        fetchData();
    }, [serial_number]);

    if (!deviceData) {
        return <div>Device not found</div>;
    }

    const renderRelatedDevices = () => {
        if (relatedDevices.length === 0) {
            return <li>No related devices found.</li>;
        } else {
            return (
                <div className="detail-view__related-devices">
                    {relatedDevices.map(item => (
                        <div
                            key={item.device_serial_number || Math.random()}
                            className={`detail-view__related-device ${Number(serial_number) === Number(item.id) ? 'detail-view__related-device--active' : ''}`}
                            onClick={() => onRelatedDevices(item)}
                        >
                            <span>{item.device_serial_number}</span>
                        </div>
                    ))}
                </div>
            );
        }
    };

    const onScrollToTop = () => {
        window.scrollTo(0, 0)
    }

    const onRelatedDevices = (item) => {
        navigate(`/device/status/detail/${item.device_serial_number}`);
        onScrollToTop()
    }

    return (
        <div className="detail-view">
            <div className="detail-view__container">
                <div className="detail-view__header">
                    <div className="detail-view__title">
                        <h1 className="detail-view__main-title">{deviceData.company.name}</h1>
                        <span className="detail-view__subtitle">
              <span className="detail-view__subtitle-label">Device serial number: </span>
                            {deviceData.device_serial_number}
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
                    <div className="detail-view__main-info">
                        <div className="detail-view__row">

                            <div className="detail-view__section detail-view__section--half">
                                <h2 className="detail-view__section-title">Base</h2>
                                <ul className="detail-view__list">
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">User:</span>
                                        <span className="detail-view__value">{deviceData.device.user__username}</span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Multiple user:</span>
                                        <span
                                            className={`detail-view__tag ${deviceData.device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                                          {deviceData.device.is_multi_user ? 'ACCESS' : 'DECLINE'}
                                        </span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Updated Available:</span>
                                        <span
                                            className={`detail-view__tag ${deviceData.device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                                          {deviceData.device.is_multi_user ? 'ACCESS' : 'DECLINE'}
                                        </span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Activity:</span>
                                        <span
                                            className="detail-view__value">{deviceStatusInactiveTimeToText[deviceData.is_active_time]} ... {deviceData.is_active ?
                                            <MonitorCheck size={18} color={'#1cb344'}/> :
                                            <MonitorDot size={18}
                                                        color={deviceStatusInactiveTime[deviceData.is_active_time]}/>}
                                        </span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Start date:</span>
                                        <span
                                            className="detail-view__value">{extractDate(deviceData.device.start_date)}</span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">End date:</span>
                                        <span
                                            className="detail-view__value">{extractDate(deviceData.device.end_date)}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="detail-view__section detail-view__section--half">
                                <h2 className="detail-view__section-title">Status</h2>
                                <ul className="detail-view__list">
                                    {['z_report_left_count', 'device_ip_address', 'orders_not_sent_count', 'version_number', 'teamviewer', 'terminal_id'].map(field => (
                                        <li key={field} className="detail-view__item">
                                            <span
                                                className="detail-view__label">{field.replace(/_/g, ' ').charAt(0).toUpperCase() + field.replace(/_/g, ' ').slice(1).toLowerCase()}:</span>
                                            <span className="detail-view__value">
                                                {deviceData[field] ||
                                                    <span
                                                        className="detail-view__tag detail-view__tag--empty">empty</span>}
                                              </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-view__section detail-view__section--half">
                                <h2 className="detail-view__section-title">Printer</h2>
                                <ul className="detail-view__list">
                                    {['version', 'mac_address', 'printer_name', 'printer_model', 'printer_number', 'printer_type'].map(field => (
                                        <li key={field} className="detail-view__item">
                                            <span
                                                className="detail-view__label">{field.replace(/_/g, ' ').charAt(0).toUpperCase() + field.replace(/_/g, ' ').slice(1).toLowerCase()}:</span>
                                            <span className="detail-view__value">
                                                {deviceData.device[field] ||
                                                    <span className="detail-view__tag detail-view__tag--empty">
                                                        empty
                                                    </span>}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="detail-view__section">
                            <DeviceStatusProviders expandedSection={expandedSection} deviceData={deviceData}
                                                   toggleSection={toggleSection}/>
                        </div>
                        <div className="detail-view__section">
                            <DeviceStatusQRProviders expandedSection={expandedSecondSection} deviceData={deviceData}
                                                     toggleSection={toggleSecondSection}/>
                        </div>

                        <div className="detail-view__section">
                            <h2 className="detail-view__section-title">Related devices</h2>
                            <h3 className="detail-view__subtitle">Total: {relatedDevices.length}</h3>
                            {renderRelatedDevices()}
                        </div>
                    </div>
                </div>

                <div className="detail-view__orders">
                    <Orders serialNumber={deviceData.device_serial_number} defaultPageSize={10}/>
                </div>
            </div>
        </div>
    );
}

export default DeviceStatusDetail;
