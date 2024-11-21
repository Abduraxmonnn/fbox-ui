import {images} from "../../../constants";
import {Tag} from "antd";
import React from "react";


export default function DeviceStatusQRProviders(props) {
    let expandedSection = props.expandedSection;
    let deviceData = props.deviceData;
    let toggleSection = props.toggleSection;

    return (
        <>
            <button
                className="detail-view__expand-button"
                onClick={() => toggleSection('payment')}
                aria-expanded={expandedSection === 'payment'}
            >
                <span className="detail-view__expand-button-text">Payment providers - QR Pay</span>
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
                                              <Tag color={deviceData.device.click ? 'green' : 'volcano'}>
                                                {deviceData.device.click ? 'ACCESS' : 'DECLINE'}
                                              </Tag>
                                            </span>
                        </li>
                        <li>
                            <span>Click service id:</span>
                            <span>
                        {deviceData.device.click_qr_pay_service_id ? deviceData.device.click_qr_pay_service_id :
                            <Tag color={!deviceData.device.click_qr_pay_service_id && 'lightgray'}>
                                {deviceData.device.click_qr_pay_service_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Click merchant user id:</span>
                            <span>
                        {deviceData.device.click_qr_pay_merchant_user_id ? deviceData.device.click_qr_pay_merchant_user_id :
                            <Tag color={!deviceData.device.click_qr_pay_merchant_user_id && 'lightgray'}>
                                {deviceData.device.click_qr_pay_merchant_user_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Click secret key:</span>
                            <span>
                        {deviceData.device.click_qr_pay_secret_key ? deviceData.device.click_qr_pay_secret_key :
                            <Tag color={!deviceData.device.click_qr_pay_secret_key && 'lightgray'}>
                                {deviceData.device.click_qr_pay_secret_key || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                    <ul className="expanded-data-list">
                        <h3 className="expanded-data-list__title">PayMe</h3>
                        <li>
                            <span>PayMe access:</span>
                            <span>
                        <Tag color={deviceData.device.pay_me ? 'green' : 'volcano'}>
                          {deviceData.device.pay_me ? 'ACCESS' : 'DECLINE'}
                        </Tag>
                      </span>
                        </li>
                        <li>
                            <span>PayMe merchant user id:</span>
                            <span>
                        {deviceData.device.payme_merchant_id ? deviceData.device.payme_merchant_id :
                            <Tag color={!deviceData.device.payme_merchant_id && 'lightgray'}>
                                {deviceData.device.payme_merchant_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>PayMe secret key:</span>
                            <span>
                        {deviceData.device.payme_merchant_token ? deviceData.device.payme_merchant_token :
                            <Tag color={!deviceData.device.payme_merchant_token && 'lightgray'}>
                                {deviceData.device.payme_merchant_token || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>PayMe secret test key:</span>
                            <span>
                        {deviceData.device.payme_merchant_test_token ? deviceData.device.payme_merchant_test_token :
                            <Tag color={!deviceData.device.payme_merchant_test_token && 'lightgray'}>
                                {deviceData.device.payme_merchant_test_token || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}
