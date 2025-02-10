import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../api";
import {Table} from "antd";
import {useOutletContext} from "react-router-dom";
import {handleTableChange, useRowNavigation} from "../../utils";
import ProductsColumns from "./products.constants";
import {useTranslation} from "react-i18next";

const Products = (props) => {
    let orderId = props.orderId !== undefined ? props.orderId : null;

    const {t} = useTranslation();
    const columns = ProductsColumns(t);
    const [userData, setUserData] = useState({});
    const [ordersData, setOrdersData] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const {searchText} = useOutletContext()

    const fetchOrdersData = useCallback(async (search = '', ordering = '') => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/order/related/products/${orderId}/`, {
                params: {
                    search,
                    ordering
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            });

            const data = response.data.map((item) => ({
                key: item.id,
                name: item.name,
                barcode: item.barcode === "" ? '-' : item.barcode,
                amount: item.amount,
                product_price: item.product_price,
                price: item.price,
                discount_percent: item.discount_percent,
            }));
            setOrdersData(data)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token, orderId])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        let ordering = ''
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`
        }
        fetchOrdersData(searchText, ordering)
    }, [searchText, sortOrder, sortField, userData.token])

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

    const onRowClick = useRowNavigation({
        routePrefix: '/product/detail',
        idField: 'key'
    });

    return (
        <>
            <div className='content_container'>
                <Table
                    columns={columns}
                    dataSource={ordersData}
                    onRow={onRowClick}
                    loading={loading}
                    onChange={tableChangeHandler}
                />
            </div>
        </>
    )
}

export default Products;
