import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {APIv1} from "../../../api";
import CurrencyFormatted from "../../../utils/baseFormatter";
import Products from "../../Products/Products";
import '../../../styles/BaseDetailStyle.scss'

const ProductDetail = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const [productData, setProductData] = useState(null);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const extractDate = (dateString) => {
        if (!dateString) return '-'; // Return a placeholder if no date is available
        const date = new Date(dateString);
        return isNaN(date) ? '-' : date.toISOString().slice(0, 10); // Check if the date is invalid
    };

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
              <span className="detail-view__subtitle-label">{t("common.deviceSerial")}: </span>
                        {productData.barcode}
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
                    <h2 className="detail-view__section-title">{t("pages.products.title")}</h2>
                    <ul className="detail-view__list">
                        {[
                            {
                                label: `${t("pages.products.detailColumns.showcase1")}`,
                                value: productData.name
                            },
                            {label: `${t("pages.products.detailColumns.showcase2")}`, value: productData.barcode},
                            {
                                label: `${t("pages.products.detailColumns.showcase3")}`,
                                value: CurrencyFormatted(productData.amount)
                            },
                            {
                                label: `${t("pages.products.detailColumns.showcase4")}`,
                                value: CurrencyFormatted(productData.product_price)
                            },
                            {label: `${t("pages.products.detailColumns.showcase5")}`, value: CurrencyFormatted(productData.price)},
                            {
                                label: `${t("pages.products.detailColumns.showcase6")}`,
                                value: productData.discount
                            },
                            {
                                label: `${t("pages.products.detailColumns.showcase7")}`,
                                value: productData.discount_percent
                            },
                        ].map(({label, value}) => (
                            <li key={label} className="detail-view__item">
                                <span className="detail-view__label">{label}:</span>
                                <span className="detail-view__value">{value}</span>
                            </li>
                        ))}
                        <li className="detail-view__item detail-view__item--highlighted">
                            <span
                                className="detail-view__label">{t("pages.products.detailColumns.showcase8")}:</span>
                            <span
                                className="detail-view__value">{productData.class_code}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;