import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Tag} from 'antd'

import {APIv1} from '../../../api'
import Orders from "../../Orders/Orders";
import './DeviceStatusDetail.scss'
import {images} from "../../../constants";

const DeviceStatusDetail = () => {
    const {serial_number} = useParams();
    const [device, setDevice] = useState(null);
    const [relatedDevices, setRelatedDevices] = useState([]);
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);

    const extractDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().slice(0, 10) : '----/--/--';
    };

    const toggleSection = (section) => {
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceResponse = await APIv1.get(`/devices/${serial_number}`);
                const relatedDevicesResponse = await APIv1.get(`/devices/get_related_devices/?serial=${deviceResponse.data.device_serial_number}`);

                setDevice(deviceResponse.data);
                setRelatedDevices(relatedDevicesResponse.data);
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        };

        fetchData();
    }, [serial_number]);

    if (!device) {
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
                        <h1 className="detail-view__main-title">{device.company.name}</h1>
                        <span className="detail-view__subtitle">
              <span className="detail-view__subtitle-label">Device serial number: </span>
                            {device.device_serial_number}
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
                                <h2 className="detail-view__section-title">Base information</h2>
                                <ul className="detail-view__list">
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">User:</span>
                                        <span className="detail-view__value">{device.company.name}</span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Multiple user:</span>
                                        <span
                                            className={`detail-view__tag ${device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                      {device.is_multi_user ? 'ACCESS' : 'DECLINE'}
                    </span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Updated Available:</span>
                                        <span
                                            className={`detail-view__tag ${device.is_multi_user ? 'detail-view__tag--success' : 'detail-view__tag--error'}`}>
                      {device.is_multi_user ? 'ACCESS' : 'DECLINE'}
                    </span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">Start date:</span>
                                        <span className="detail-view__value">{extractDate(device.start_date)}</span>
                                    </li>
                                    <li className="detail-view__item">
                                        <span className="detail-view__label">End date:</span>
                                        <span className="detail-view__value">{extractDate(device.end_date)}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="detail-view__section detail-view__section--half">
                                <h2 className="detail-view__section-title">Printer information</h2>
                                <ul className="detail-view__list">
                                    {['version', 'mac_address', 'printer_name', 'printer_model', 'printer_number', 'printer_type'].map(field => (
                                        <li key={field} className="detail-view__item">
                                            <span
                                                className="detail-view__label">{field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)}:</span>
                                            <span className="detail-view__value">
                        {device[field] || <span className="detail-view__tag detail-view__tag--empty">empty</span>}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="detail-view__section">
                            <button
                                className="detail-view__expand-button"
                                onClick={() => toggleSection('payment')}
                                aria-expanded={expandedSection === 'payment'}
                            >
                                <span className="detail-view__expand-button-text">Payment providers</span>
                                {expandedSection === 'payment' ? <img src={images.collapse} alt="collapse"/> :
                                    <img src={images.expand} alt="expand"/>}
                            </button>

                            {expandedSection === 'payment' && (
                                <div className="detail-view__expanded-content">
                                    <ul className="expanded-data-list">
                                        <h3 className="expanded-data-list__title">Click</h3>
                                        <li>
                                            <span>Click access:</span>
                                            <span>
                                              <Tag color={device.click ? 'green' : 'volcano'}>
                                                {device.click ? 'ACCESS' : 'DECLINE'}
                                              </Tag>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Click service id:</span>
                                            <span>
                        {device.click_service_id ? device.click_service_id :
                            <Tag color={!device.click_service_id && 'lightgray'}>
                                {device.click_service_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>Click merchant user id:</span>
                                            <span>
                        {device.click_merchant_user_id ? device.click_merchant_user_id :
                            <Tag color={!device.click_merchant_user_id && 'lightgray'}>
                                {device.click_merchant_user_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>Click secret key:</span>
                                            <span>
                        {device.click_secret_key ? device.click_secret_key :
                            <Tag color={!device.click_secret_key && 'lightgray'}>
                                {device.click_secret_key || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                    </ul>
                                    <ul className="expanded-data-list">
                                        <h3 className="expanded-data-list__title">PayMe</h3>
                                        <li>
                                            <span>PayMe access:</span>
                                            <span>
                        <Tag color={device.pay_me ? 'green' : 'volcano'}>
                          {device.pay_me ? 'ACCESS' : 'DECLINE'}
                        </Tag>
                      </span>
                                        </li>
                                        <li>
                                            <span>PayMe merchant user id:</span>
                                            <span>
                        {device.payme_merchant_id ? device.payme_merchant_id :
                            <Tag color={!device.payme_merchant_id && 'lightgray'}>
                                {device.payme_merchant_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>PayMe secret key:</span>
                                            <span>
                        {device.payme_token ? device.payme_token :
                            <Tag color={!device.payme_token && 'lightgray'}>
                                {device.payme_token || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                    </ul>
                                    <ul className="expanded-data-list">
                                        <h3 className="expanded-data-list__title">Uzum</h3>
                                        <li>
                                            <span>Uzum access:</span>
                                            <span>
                        <Tag color={device.apelsin ? 'green' : 'volcano'}>
                                        {device.apelsin ? 'ACCESS' : 'DECLINE'}
                                    </Tag>
                      </span>
                                        </li>
                                        <li>
                                            <span>Uzum service id:</span>
                                            <span>
                        {device.apelsin_merchant_service_id ? device.apelsin_merchant_service_id :
                            <Tag color={!device.apelsin_merchant_service_id && 'lightgray'}>
                                {device.apelsin_merchant_service_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>Uzum merchant id:</span>
                                            <span>
                        {device.apelsin_merchant_id ? device.apelsin_merchant_id :
                            <Tag color={!device.apelsin_merchant_id && 'lightgray'}>
                                {device.apelsin_merchant_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>Uzum secret key:</span>
                                            <span>
                        {device.apelsin_merchant_secret_key ? device.apelsin_merchant_secret_key :
                            <Tag color={!device.apelsin_merchant_secret_key && 'lightgray'}>
                                {device.apelsin_merchant_secret_key || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>Uzum user id:</span>
                                            <span>
                        {device.apelsin_merchant_user_id ? device.apelsin_merchant_user_id :
                            <Tag color={!device.apelsin_merchant_user_id && 'lightgray'}>
                                {device.apelsin_merchant_user_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                    </ul>
                                    <ul className="expanded-data-list">
                                        <h3 className="expanded-data-list__title">Anor</h3>
                                        <li>
                                            <span>Anor access:</span>
                                            <span>
                        <Tag color={device.anor ? 'green' : 'volcano'}>
                          {device.anor ? 'ACCESS' : 'DECLINE'}
                        </Tag>
                      </span>
                                        </li>
                                        <li>
                                            <span>Anor branch id:</span>
                                            <span>
                        {device.anor_branch_id ? device.anor_branch_id :
                            <Tag color={!device.anor_branch_id && 'lightgray'}>
                                {device.anor_branch_id || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                        <li>
                                            <span>PayMe secret key:</span>
                                            <span>
                        {device.anor_secret_key ? device.anor_secret_key :
                            <Tag color={!device.anor_secret_key && 'lightgray'}>
                                {device.anor_secret_key || 'empty'}
                            </Tag>}
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="detail-view__section">
                            <h2 className="detail-view__section-title">Related devices</h2>
                            <h3 className="detail-view__subtitle">Total: {relatedDevices.length}</h3>
                            {renderRelatedDevices()}
                        </div>
                    </div>
                </div>

                <div className="detail-view__orders">
                    <Orders serialNumber={device.device_serial_number} defaultPageSize={10}/>
                </div>
            </div>
        </div>
    );
}

export default DeviceStatusDetail;
