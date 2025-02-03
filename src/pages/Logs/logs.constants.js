import {Link} from "react-router-dom";
import {LogsStatusIcon} from "../../utils/statusIcons";
import React from "react";
import dayjs, {Dayjs} from "dayjs";
import {DatePicker, Tag} from "antd";
import usePeriodPresets from "../../optionsComponents/usePeriodOptions";
import {transactionStatusToColorFormatter} from "../../utils";

const {RangePicker} = DatePicker;

const LogsColumns = (t, handleChangePeriod) => {
    const disabledDate = (current: Dayjs) => {
        return dayjs().add(1, 'day') < current;
    };

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
                {text: t('pages.logs.listColumns.filter1'), value: 'PAID'},
                {text: t('pages.logs.listColumns.filter2'), value: 'FISCALIZED'},
                {text: t('pages.logs.listColumns.filter3'), value: 'FAILED'},
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
            render: (text, record) => (
                <>
                    {[record.amount].map(tag => (
                        <Tag
                            color={transactionStatusToColorFormatter(record.status)}
                            key={tag}
                        >
                            {`${String(tag)}`.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
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
            orderIndex: "created_date",
            sorter: true,
            filterDropdown: () => (
                <div style={{padding: 8}}>
                    <RangePicker
                        presets={usePeriodPresets}
                        onChange={handleChangePeriod}
                        disabledDate={disabledDate}
                        allowClear={true}
                        style={{marginBottom: 16}}
                        placeholder={[`${t("common.filter.dateFilter1")}`, `${t("common.filter.dateFilter2")}`]}
                    />
                </div>
            ),
        },
    ];
};

export default LogsColumns;
