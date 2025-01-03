import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../api";
import {Table} from "antd";
import {useOutletContext} from "react-router-dom";
import {defaultExtractDate, handleTableChange, useRowNavigation} from "../../utils";
import OrdersColumns from "./orders.constants";

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
}

const Orders = (props) => {
    let serialNumber = props.serialNumber !== undefined ? props.serialNumber : null;
    let defaultPageSize = props.defaultPageSize !== undefined ? props.defaultPageSize : 40;

    const columns = OrdersColumns();
    const [userData, setUserData] = useState({});
    const [ordersData, setOrdersData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')
    const [loading, setLoading] = useState(true)
    const [totalOrders, setTotalOrders] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const {searchText} = useOutletContext()

    const fetchOrdersData = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        try {
            const url = serialNumber === null ? `/orders/list/by_user/` : `/orders/list/?serial=${serialNumber}`
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
            const data = response.data.results.map((report) => ({
                key: report.id,
                market_name: report.market_name ?? '-',
                cashier: report.cashier ?? '-',
                cash_desc_serial: report.cash_desc_serial,
                received_cash: report.received_cash,
                received_card: report.received_card,
                time: report.time ? defaultExtractDate(report.time) : '----/--/--'
            }));
            setOrdersData(data)
            setTotalOrders(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token])

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
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

    const onRowClick = useRowNavigation({
        routePrefix: '/order/detail',
        idField: 'key'
    });

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={ordersData}
                    loading={loading}
                    onChange={tableChangeHandler}
                    onRow={onRowClick}
                    pagination={{
                        total: totalOrders,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPageSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                        pageSizeOptions: ['10', '20', '50', '100']
                    }}
                />
            </div>
        </>
    )
}

export default Orders;