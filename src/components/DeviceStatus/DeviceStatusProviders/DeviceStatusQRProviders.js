import {Tag} from "antd";
import React from "react";
import {ChevronDown, ChevronUp} from "lucide-react";


export default function DeviceStatusQRProviders(props) {
    let t = props.t;
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
                <span className="detail-view__expand-button-text">{t("pages.devices.detailColumns.section2.title")}</span>
                {/*{expandedSection === 'payment' ? <img src={images.collapse} alt="collapse"/> :*/}
                {/*    <img src={images.expand} alt="expand"/>}*/}
                {expandedSection === 'payment' ? <ChevronUp size={22}/> :
                    <ChevronDown size={22}/>}
            </button>

            {expandedSection === 'payment' && (
                <div className="detail-view__expanded-content">
                    <ul className="expanded-data-list">
                        <h3 className="expanded-data-list__title">{t("common.providers.click")}</h3>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container1.row1")}:</span>
                            <span>
                                              <Tag color={deviceData.device.click ? 'green' : 'volcano'}>
                                                {deviceData.device.click ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                                              </Tag>
                                            </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container1.row2")}:</span>
                            <span>
                        {deviceData.device.click_qr_pay_service_id ? deviceData.device.click_qr_pay_service_id :
                            <Tag color={!deviceData.device.click_qr_pay_service_id && 'lightgray'}>
                                {deviceData.device.click_qr_pay_service_id || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container1.row3")}:</span>
                            <span>
                        {deviceData.device.click_qr_pay_merchant_user_id ? deviceData.device.click_qr_pay_merchant_user_id :
                            <Tag color={!deviceData.device.click_qr_pay_merchant_user_id && 'lightgray'}>
                                {deviceData.device.click_qr_pay_merchant_user_id || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container1.row4")}:</span>
                            <span>
                        {deviceData.device.click_qr_pay_secret_key ? deviceData.device.click_qr_pay_secret_key :
                            <Tag color={!deviceData.device.click_qr_pay_secret_key && 'lightgray'}>
                                {deviceData.device.click_qr_pay_secret_key || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                    <ul className="expanded-data-list">
                        <h3 className="expanded-data-list__title">{t("common.providers.payme")}</h3>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container2.row1")}:</span>
                            <span>
                        <Tag color={deviceData.device.pay_me ? 'green' : 'volcano'}>
                          {deviceData.device.pay_me ? `${t("common.detailPages.access")}` : `${t("common.detailPages.decline")}`}
                        </Tag>
                      </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container2.row2")}</span>
                            <span>
                        {deviceData.device.payme_merchant_id ? deviceData.device.payme_merchant_id :
                            <Tag color={!deviceData.device.payme_merchant_id && 'lightgray'}>
                                {deviceData.device.payme_merchant_id || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container2.row2")}:</span>
                            <span>
                        {deviceData.device.payme_merchant_token ? deviceData.device.payme_merchant_token :
                            <Tag color={!deviceData.device.payme_merchant_token && 'lightgray'}>
                                {deviceData.device.payme_merchant_token || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                        <li>
                            <span>{t("pages.devices.detailColumns.section2.container2.row3")}:</span>
                            <span>
                        {deviceData.device.payme_merchant_test_token ? deviceData.device.payme_merchant_test_token :
                            <Tag color={!deviceData.device.payme_merchant_test_token && 'lightgray'}>
                                {deviceData.device.payme_merchant_test_token || `${t("common.detailPages.empty")}`}
                            </Tag>}
                      </span>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}
