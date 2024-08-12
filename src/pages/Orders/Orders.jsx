import React, {useCallback, useEffect, useState} from "react";
import {APIv1} from "../../api";
import {Table} from "antd";
import {Link, useOutletContext} from "react-router-dom";
import {defaultExtractDate, handleTableChange} from "../../utils";

const columns = [
    {
        title: 'Market name',
        dataIndex: 'market_name',
        render: (text, record) => (
            <Link to={`/order/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "market_name",
    },
    {
        title: 'Cashier',
        dataIndex: 'cashier',
        render: (text, record) => (
            <Link to={`/order/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "cashier",
    },
    {
        title: 'Cash desc serial',
        dataIndex: 'cash_desc_serial',
        sorter: true,
        orderIndex: "cash_desc_serial",
    },
    {
        title: 'Received cash',
        dataIndex: 'received_cash',
        sorter: true,
        orderIndex: "received_cash",
    },
    {
        title: 'Received card',
        dataIndex: 'received_card',
        sorter: true,
        orderIndex: "received_card",
    },
    {
        title: 'Time',
        dataIndex: 'time',
        sorter: true,
        orderIndex: "time",
    },
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
}

const Orders = () => {
    let defaultPageSize = 40
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
            const response = await APIv1.get(`/orders/list/`, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering
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
    })

    useEffect(() => {
        let ordering = ''
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`
        }
        fetchOrdersData(currentPage, pageSize, searchText, ordering)
    }, [currentPage, pageSize, searchText, sortOrder, sortField])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

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