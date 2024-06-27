import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {LoadingOutlined} from '@ant-design/icons';
import {Button, Tag, Spin} from 'antd'

import {APIv1} from '../../../api'
import './DeviceDetail.scss'

const DeviceDetail = () => {
    const {id} = useParams();
    const [device, setDevice] = useState(null);
    const [relatedDevices, setRelatedDevices] = useState([]); // Use an array for related devices
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const extractDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceResponse = await APIv1.get(`/devices/${id}`);
                const relatedDevicesResponse = await APIv1.get(
                    `/devices/get_related_devices/?serial=${deviceResponse.data.device_serial_number}`
                );
                setDevice(deviceResponse.data);
                setRelatedDevices(relatedDevicesResponse.data);
            } catch (err) {
                console.error('Something went wrong:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (!device) {
        return <div>Device not found</div>;
    }

    const renderRelatedDevices = () => {
        if (relatedDevices.length === 0) {
            return <li>No related devices found.</li>;
        } else {
            return relatedDevices.map((item) => (
                <li key={item.device_serial_number || Math.random()}
                    className="related_device"
                    onClick={() => navigate(`/device/detail/${item.id}`)}
                >
                    <span>{item.device_serial_number}
                        {Number(id) === Number(item.id) && <span className="current_text">- picked</span>}</span>
                </li>
            ));
        }
    };

    return (
        <section className='content_container'>
            <div className='device_detail__title'>
                <div>
                    <h1>{device.company.name}</h1>
                    <span>
						<span className='device_detail__device_serial_number_title'>
							Device serial number:{' '}
						</span>
                        {device.device_serial_number}
					</span>
                </div>
                <Button
                    style={{
                        width: '15%',
                        display: 'inline-block',
                        marginRight: '1%',
                    }}
                    type='dashed'
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            </div>
            <div className='device_detail_graphBox'>
                <div className='device_detail_box'>
                    <ul className='data_list'>
                        <h1>Base information</h1>
                        <li>
                            <span>User: </span>
                            <span>{device.company.name}</span>
                        </li>
                        <li>
                            <span>Multiple user:</span>
                            <span>
								<Tag color={device.is_multi_user ? 'green' : 'volcano'}>
									{device.is_multi_user ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Updated Available:</span>
                            <span>
								<Tag color={device.is_multi_user ? 'green' : 'volcano'}>
									{device.is_multi_user ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Start date:</span>
                            <span>
								{device.start_date
                                    ? extractDate(device.start_date)
                                    : '----/--/--'}
							</span>
                        </li>
                        <li>
                            <span>End date:</span>
                            <span>
								{device.end_date
                                    ? extractDate(device.end_date)
                                    : '----/--/--'}
							</span>
                        </li>
                    </ul>
                    <ul className="data_list">
                        <h1>Click</h1>
                        <li>
                            <span>Click access:</span>
                            <span>
								<Tag color={device.click ? 'green' : 'volcano'}>
									{device.click ? 'TRUE' : 'FALSE'}
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
                    <ul className="data_list">
                        <h1>PayMe</h1>
                        <li>
                            <span>PayMe access:</span>
                            <span>
								<Tag color={device.pay_me ? 'green' : 'volcano'}>
									{device.pay_me ? 'TRUE' : 'FALSE'}
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
                    <ul className="data_list">
                        <h1>Uzum</h1>
                        <li>
                            <span>Uzum access:</span>
                            <span>
								<Tag color={device.apelsin ? 'green' : 'volcano'}>
									{device.apelsin ? 'TRUE' : 'FALSE'}
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
                    <ul className="data_list">
                        <h1>Anor</h1>
                        <li>
                            <span>Anor access:</span>
                            <span>
								<Tag color={device.anor ? 'green' : 'volcano'}>
									{device.anor ? 'TRUE' : 'FALSE'}
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
                    <ul className='data_list'>
                        <h1>Printer information</h1>
                        <li>
                            <span>Version:</span>
                            <span>
                                {device.version ? device.version :
                                    <Tag color={!device.version && 'lightgray'}>
                                        {device.version || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                        <li>
                            <span>Mac address:</span>
                            <span>
                                {device.mac_address ? device.mac_address :
                                    <Tag color={!device.mac_address && 'lightgray'}>
                                        {device.mac_address || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                        <li>
                            <span>Name:</span>
                            <span>
                                {device.printer_name ? device.printer_name :
                                    <Tag color={!device.printer_name && 'lightgray'}>
                                        {device.printer_name || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                        <li>
                            <span>Model:</span>
                            <span>
                                {device.printer_model ? device.printer_model :
                                    <Tag color={!device.printer_model && 'lightgray'}>
                                        {device.printer_model || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                        <li>
                            <span>Number:</span>
                            <span>
                                {device.printer_number ? device.printer_number :
                                    <Tag color={!device.printer_number && 'lightgray'}>
                                        {device.printer_number || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                        <li>
                            <span>Type:</span>
                            <span>
                                {device.printer_type ? device.printer_type :
                                    <Tag color={!device.printer_type && 'lightgray'}>
                                        {device.printer_type || 'empty'}
                                    </Tag>}
                            </span>
                        </li>
                    </ul>
                    <ul className="data_list">
                        <h1>Related Devices</h1>
                        <h3>Total: {relatedDevices.length}</h3>
                        {renderRelatedDevices()}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default DeviceDetail;
