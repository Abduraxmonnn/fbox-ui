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
    const [ordersData, setOrdersData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')

    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    useEffect(() => {
        getReportData()
    }, [])

    async function getReportData() {
        try {
            const response = await APIv1.get('/orders/list/');
            const data = response.data.map(report => ({
                market_name: report.market_name ?? '-',
                cashier: report.cashier ?? '-',
                cash_desc_serial: report.cash_desc_serial,
                received_cash: report.received_cash,
                received_card: report.orders_not_sent_count,
                time: report.time ? extractDate(report.time) : '----/--/--'
            }));
            setOrdersData(data);
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }


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
                    pagination={{
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${ordersData.length}`,
                    }}
                />
            </div>
        </>
    )
}

export default Orders;