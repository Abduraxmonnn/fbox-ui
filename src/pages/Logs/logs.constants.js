import {Link} from "react-router-dom";
import {LogsStatusIcon} from "../../utils/statusIcons";
import React from "react";

const LogsColumns = (t) => {
    return [
        {
            title: t('pages.logs.listColumns.column1'),
            dataIndex: 'status',
            render: (text, record) => (
                <>
                    {[record.status].map(tag => (
                        <LogsStatusIcon key={tag} size={18} status={tag.toUpperCase()}/>
                    ))}
                </>
            ),
            orderIndex: "status",
            filters: [
                {text: 'Paid', value: 'PAID'},
                {text: 'Fiscalized', value: 'FISCALIZED'},
                {text: 'Failed', value: 'FAILED'},
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: t('pages.logs.listColumns.column2'),
            dataIndex: 'deviceSerial',
            render: (text, record) => (
                <Link to={`/payments/logs/detail/${record.key}`}>{text}</Link>
            ),
            // sorter: true,
            // orderIndex: "device_serial",
        },
        {
            title: t('pages.logs.listColumns.column3'),
            dataIndex: 'companyName',
        },
        {
            title: t('pages.logs.listColumns.column4'),
            dataIndex: 'paymentId',
            render: (text, record) => (
                <Link to={`/payments/logs/detail/${record.key}`}>{text}</Link>
            ),
            // sorter: true,
            // orderIndex: "payment_id",
        },
        {
            title: t('pages.logs.listColumns.column5'),
            dataIndex: 'amount',
            sorter: true,
            orderIndex: "amount",
        },
        {
            title: t('pages.logs.listColumns.column6'),
            dataIndex: 'logType',
            filters: [
                {text: 'PayMe', value: 'PAYME'},
                {text: 'Click', value: 'CLICK'},
                {text: 'Uzum', value: 'UZUM'},
                {text: 'Anor', value: 'ANOR'},
            ],
            filterMultiple: false,
            onFilter: (value, record) => true,
        },
        {
            title: t('pages.logs.listColumns.column7'),
            dataIndex: 'createdDate',
            sorter: true,
            orderIndex: "created_date",
            filters: [
                {text: 'Today', value: 'day'},
                {text: 'Last hour', value: 'hour'},
                {text: 'Last 30 days', value: 'month'},
            ],
            filterMultiple: false,
            onFilter: (value, record) => true,
        },
    ];
};

export default LogsColumns;
