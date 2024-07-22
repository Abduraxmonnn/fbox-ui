import React, {useEffect, useState} from "react";
import {APIv1} from "../api";
import {Table} from "antd";

const columns = [
    {
        title: 'Market name',
        dataIndex: 'market_name',
        render: title => <a>{title}</a>,
        sorter: (a, b) => a.market_name - b.market_name,
    },
    {
        title: 'Cashier',
        dataIndex: 'cashier',
        render: title => <a>{title}</a>,
        sorter: (a, b) => a.cashier - b.cashier,
    },
    {
        title: 'Cash desc serial',
        dataIndex: 'cash_desc_serial',
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
    {
        title: 'Time',
        dataIndex: 'time',
        sorter: (a, b) => a.time - b.time,
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

    useEffect(() => {
        getReportData(currentPage, pageSize)
    }, [currentPage, pageSize])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    async function getReportData(page, size) {
        setLoading(true);
        try {
            const response = await APIv1.get(`/orders/list?page=${page}&page_size=${size}`);
            const data = response.data.results.map((report) => ({
                key: report.id,
                market_name: report.market_name ?? '-',
                cashier: report.cashier ?? '-',
                cash_desc_serial: report.cash_desc_serial,
                received_cash: report.received_cash,
                received_card: report.received_card,
                time: report.time ? extractDate(report.time) : '----/--/--'
            }));
            setOrdersData(data)
            setTotalOrders(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType
                    }}
                    columns={columns}
                    dataSource={ordersData}
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