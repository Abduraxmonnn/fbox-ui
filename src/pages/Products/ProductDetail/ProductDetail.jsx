import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {APIv1} from "../../../api";
import CurrencyFormatted from "../../../utils/baseFormatter";
import '../../../styles/BaseDetailStyle.scss'
import {extractStringDateBySecond} from "../../../utils";

const ProductDetail = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [productData, setProductData] = useState(null);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get(`/order/product/retrieve/${id}`, {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    }
                });
                console.log(response.data)
                setProductData(response.data)
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        }

        fetchData()
    }, [userData.token, id]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    if (!productData) {
        return <div>{t("pages.orders.detailColumns.errorNotFound")}</div>
    }

    return (
        <section className="detail-view">
            <div className="detail-view__header">
                <div className="detail-view__title">
                    <h1 className="detail-view__main-title">{productData.name}</h1>
                    <span className="detail-view__subtitle">
                    <span className="detail-view__subtitle-label">{t("common.inn")}: </span>
                        {productData.order.inn}
                    </span>
                </div>
                <button
                    className="detail-view__action-button detail-view__action-button--secondary"
                    onClick={() => navigate(-1)}
                >
                    {t("pages.orders.detailColumns.button1")}
                </button>
            </div>

            <div className="detail-view__content">
                <div className="detail-view__section">
                    <ul className="detail-view__list">
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase9")}:</span>
                            <span className="detail-view__value">{productData.order.market_name}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase1")}:</span>
                            <span className="detail-view__value">{productData.name}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase2")}:</span>
                            <span className="detail-view__value">{productData.barcode ?? '-'}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase3")}:</span>
                            <span className="detail-view__value">{productData.amount / 1000}</span>
                        </li>
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase4")}:</span>
                            <span className="detail-view__value">{CurrencyFormatted(productData.product_price / 100)}</span>
                        </li>
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase5")}:</span>
                            <span className="detail-view__value">{CurrencyFormatted(productData.price / 100)}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase6")}:</span>
                            <span className="detail-view__value">{productData.discount}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase7")}:</span>
                            <span className="detail-view__value">{productData.discount_percent}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase8")}:</span>
                            <span className="detail-view__value">{productData.class_code}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase10")}:</span>
                            <span className="detail-view__value">{extractStringDateBySecond(productData.created_date)}</span>
                        </li>
                        <li className="detail-view__item">
                            <span className="detail-view__label">{t("pages.products.detailColumns.showcase11")}:</span>
                            <span className="detail-view__value">{extractStringDateBySecond(productData.updated_date)}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;