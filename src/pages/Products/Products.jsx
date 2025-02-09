import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../api";
import {Table} from "antd";
import {useOutletContext} from "react-router-dom";
import {handleTableChange, useRowNavigation} from "../../utils";
import ProductsColumns from "./products.constants";
import {useTranslation} from "react-i18next";

const Products = (props) => {
    let defaultPageSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    let orderId = props.orderId !== undefined ? props.orderId : null;

    const {t} = useTranslation();
    const columns = ProductsColumns(t);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true)
    const [ordersData, setOrdersData] = useState([])
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const {searchText} = useOutletContext()

    const fetchOrdersData = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        let url = '/order/products/list/';
        if (props.related === true) {
            url = `/order/related/products/${orderId}/`;
        }

        try {
            const response = await APIv1.get(`${url}`, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            });

            const data = (props.related === true ? response.data : response.data.results).map((item) => ({
                key: item.id,
                name: item.name,
                barcode: item.barcode === "" ? '-' : item.barcode,
                amount: item.amount,
                product_price: item.product_price,
                price: item.price,
                discount_percent: item.discount_percent,
            }));

            const totalDevices = props.related ? response.data.count : response.data.results.length;
            setOrdersData(data);
            setTotalProducts(totalDevices);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, [userData.token, orderId, props.related]);

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
        fetchOrdersData(currentPage, pageSize, searchText, ordering)
    }, [currentPage, pageSize, searchText, sortOrder, sortField, userData.token])

    useEffect(() => {
        setCurrentPage(1);  // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

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
                    pagination={{
                        total: totalProducts,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPageSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
            </div>
        </>
    )
}

export default Products;