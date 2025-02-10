import {Link} from "react-router-dom";

const OrdersColumns = (t) => {
    return [
        {
            title: t('common.id'),
            dataIndex: 'key',
            sorter: true,
            orderIndex: "id",
        },
        {
            title: t('pages.orders.listColumns.column1'),
            dataIndex: 'market_name',
            render: (text, record) => (
                <Link to={`/order/detail/${record.key}`}>{text}</Link>
            ),
            sorter: true,
            orderIndex: "market_name",
        },
        {
            title: t('pages.orders.listColumns.column2'),
            dataIndex: 'cash_desc_serial',
            render: (text, record) => (
                <Link to={`/order/detail/${record.key}`}>{text}</Link>
            ),
            sorter: true,
            orderIndex: "cash_desc_serial",
        },
        {
            title: t('pages.orders.listColumns.column3'),
            dataIndex: 'cashier',
            sorter: true,
            orderIndex: "cashier",
        },
        {
            title: t('pages.orders.listColumns.column4'),
            dataIndex: 'received_cash',
            sorter: true,
            orderIndex: "received_cash",
        },
        {
            title: t('pages.orders.listColumns.column5'),
            dataIndex: 'received_card',
            sorter: true,
            orderIndex: "received_card",
        },
        {
            title: t('pages.orders.listColumns.column6'),
            dataIndex: 'time',
            sorter: true,
            orderIndex: "time",
        },
    ]
};

export default OrdersColumns;
