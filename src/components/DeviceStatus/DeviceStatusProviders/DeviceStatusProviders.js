import { ChevronDown, ChevronUp } from 'lucide-react';
import {Tag} from "antd";
import React from "react";


export default function DeviceStatusProviders(props) {
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
                <span className="detail-view__expand-button-text">Payment providers</span>
                {expandedSection === 'payment' ? <ChevronUp size={22}/> :
                    <ChevronDown size={22}/>}
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
                        {deviceData.device.click_pass_service_id ? deviceData.device.click_pass_service_id :
                            <Tag color={!deviceData.device.click_pass_service_id && 'lightgray'}>
                                {deviceData.device.click_pass_service_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Click user id:</span>
                            <span>
                        {deviceData.device.click_pass_merchant_user_id ? deviceData.device.click_pass_merchant_user_id :
                            <Tag color={!deviceData.device.click_pass_merchant_user_id && 'lightgray'}>
                                {deviceData.device.click_pass_merchant_user_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Click secret key:</span>
                            <span>
                        {deviceData.device.click_pass_secret_key ? deviceData.device.click_pass_secret_key :
                            <Tag color={!deviceData.device.click_pass_secret_key && 'lightgray'}>
                                {deviceData.device.click_pass_secret_key || 'empty'}
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
                            <span>PayMe user id:</span>
                            <span>
                        {deviceData.device.payme_subscribe_id ? deviceData.device.payme_subscribe_id :
                            <Tag color={!deviceData.device.payme_subscribe_id && 'lightgray'}>
                                {deviceData.device.payme_subscribe_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>PayMe secret key:</span>
                            <span>
                        {deviceData.device.payme_subscribe_token ? deviceData.device.payme_subscribe_token :
                            <Tag color={!deviceData.device.payme_subscribe_token && 'lightgray'}>
                                {deviceData.device.payme_subscribe_token || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                    <ul className="expanded-data-list">
                        <h3 className="expanded-data-list__title">Uzum</h3>
                        <li>
                            <span>Uzum access:</span>
                            <span>
                        <Tag color={deviceData.device.apelsin ? 'green' : 'volcano'}>
                                        {deviceData.device.apelsin ? 'ACCESS' : 'DECLINE'}
                                    </Tag>
                      </span>
                        </li>
                        <li>
                            <span>Uzum service id:</span>
                            <span>
                        {deviceData.device.apelsin_merchant_service_id ? deviceData.device.apelsin_merchant_service_id :
                            <Tag color={!deviceData.device.apelsin_merchant_service_id && 'lightgray'}>
                                {deviceData.device.apelsin_merchant_service_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Uzum merchant id:</span>
                            <span>
                        {deviceData.device.apelsin_merchant_id ? deviceData.device.apelsin_merchant_id :
                            <Tag color={!deviceData.device.apelsin_merchant_id && 'lightgray'}>
                                {deviceData.device.apelsin_merchant_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Uzum secret key:</span>
                            <span>
                        {deviceData.device.apelsin_merchant_secret_key ? deviceData.device.apelsin_merchant_secret_key :
                            <Tag color={!deviceData.device.apelsin_merchant_secret_key && 'lightgray'}>
                                {deviceData.device.apelsin_merchant_secret_key || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Uzum user id:</span>
                            <span>
                        {deviceData.device.apelsin_merchant_user_id ? deviceData.device.apelsin_merchant_user_id :
                            <Tag color={!deviceData.device.apelsin_merchant_user_id && 'lightgray'}>
                                {deviceData.device.apelsin_merchant_user_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                    <ul className="expanded-data-list">
                        <h3 className="expanded-data-list__title">Anor</h3>
                        <li>
                            <span>Anor access:</span>
                            <span>
                        <Tag color={deviceData.device.anor ? 'green' : 'volcano'}>
                          {deviceData.device.anor ? 'ACCESS' : 'DECLINE'}
                        </Tag>
                      </span>
                        </li>
                        <li>
                            <span>Anor branch id:</span>
                            <span>
                        {deviceData.device.anor_branch_id ? deviceData.device.anor_branch_id :
                            <Tag color={!deviceData.device.anor_branch_id && 'lightgray'}>
                                {deviceData.anor_branch_id || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>Anor secret key:</span>
                            <span>
                        {deviceData.device.anor_secret_key ? deviceData.device.anor_secret_key :
                            <Tag color={!deviceData.device.anor_secret_key && 'lightgray'}>
                                {deviceData.device.anor_secret_key || 'empty'}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}
