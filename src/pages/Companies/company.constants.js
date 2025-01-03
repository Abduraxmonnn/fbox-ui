import {Link} from "react-router-dom";
import React from "react";

const CompaniesColumns = (t) => {
    return [
        {
            title: t('pages.companies.listColumns.column1'),
            dataIndex: 'company_name',
            sorter: true,
            orderIndex: "name",
            render: (text, record) => (
                <Link to={`/company/detail/${record.key}`}>{text}</Link>
            ),
            width: 300,
        },
        {
            title: t('pages.companies.listColumns.column2'),
            dataIndex: 'company_inn',
            sorter: true,
            orderIndex: "inn",
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: title => <a>{title}</a>,
        },
        {
            title: t('pages.companies.listColumns.column3'),
            dataIndex: 'company_address',
            sorter: true,
            orderIndex: "address",
        },
        {
            title: t('pages.companies.listColumns.column4'),
            dataIndex: 'company_count_sent_sms',
            sorter: true,
            orderIndex: "send_sms",
        },
        {
            title: t('pages.companies.listColumns.column5'),
            dataIndex: 'company_phone_number',
            sorter: true,
            orderIndex: "phone_number",
        },
    ];
};

export default CompaniesColumns;
