import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {Link, useOutletContext} from "react-router-dom";
import {APIv1} from "../../api";

const columns = (searchText) => [
    {
        title: 'Market name',
        dataIndex: 'market_name',
        render: (text, record) => (
            <Link to={`/order/detail/${record.key}`}>{text}</Link>
        ),
        sorter: (a, b) => a.market_name - b.market_name,
    },
    {
        title: 'Cash desc serial',
        dataIndex: 'cash_desc_serial',
        render: (text, record) => (
            <Link to={`/order/detail/${record.key}`}>{text}</Link>
        ),
        sorter: (a, b) => a.cash_desc_serial - b.cash_desc_serial,
    },
    {
        title: 'Received cash',
        dataIndex: 'received_cash',
        sorter: (a, b) => a.received_cash - b.received_cash,
    },
    {
        title: 'Received card',
        dataIndex: 'received_card',
        sorter: (a, b) => a.received_card - b.received_card,
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
    let defaultPageSize = 10
    const [ordersData, setOrdersData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')
    const [loading, setLoading] = useState(true)
    const [totalOrders, setTotalOrders] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const {searchText} = useOutletContext()

    useEffect(() => {
        getOrderData(currentPage, pageSize)
    }, [currentPage, pageSize])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    async function getOrderData(page, size) {
        setLoading(true);
        try {
            const response = await APIv1.get(`/orders/list?page=${page}&page_size=${size}`);
            const data = response.data.results.map((report) => ({
                key: report.id,
                market_name: report.market_name ?? '-',
                cash_desc_serial: report.cash_desc_serial,
                received_cash: report.received_cash,
                received_card: report.received_card,
            }));
            setOrdersData(data)
            setTotalOrders(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false);
        }
    }

    const filteredOrders = ordersData.filter((order) =>
        order.market_name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.cash_desc_serial.toLowerCase().includes(searchText.toLowerCase()) ||
        order.received_cash.toString().includes(searchText.toLowerCase()) ||
        order.received_card.toString().includes(searchText.toLowerCase())
    )

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType
                    }}
                    columns={columns(searchText)}
                    dataSource={filteredOrders}
                    loading={loading}
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