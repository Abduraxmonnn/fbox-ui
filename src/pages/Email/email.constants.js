import {Link} from "react-router-dom";
import React from "react";
import {NotifyStatusIcon} from "../../utils/statusIcons";

const EmailColumns = (t) => {
    return [
        {
            title: t('pages.email.listColumns.column1'),
            dataIndex: 'is_success',
            sorter: true,
            orderIndex: "is_success",
            size: "large",
            width: 100,

            render: (text, record) => (
                <>
                    {[record.is_success].map(tag => (
                        <NotifyStatusIcon size={18} status={tag}/>
                    ))}
                </>
            ),
        },
        {
            title: t('pages.email.listColumns.column2'),
            dataIndex: 'inn',
            render: (text, record) => (
                <Link to={`/payments/email/detail/${record.key}`}>{text}</Link>
            ),
            sorter: true,
            orderIndex: "inn",
        },
        {
            title: t('pages.email.listColumns.column3'),
            dataIndex: 'recipient',
            sorter: true,
            orderIndex: "recipient",
        },
        {
            title: t('pages.email.listColumns.column4'),
            dataIndex: 'created_date',
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
    ]

};

export default EmailColumns;
