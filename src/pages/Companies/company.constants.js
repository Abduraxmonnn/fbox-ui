import {Link} from "react-router-dom";
import React from "react";
import {DatePicker} from "antd";
import usePeriodPresets from "../../optionsComponents/usePeriodOptions";
import dayjs, {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;

const CompaniesColumns = (t, handleChangePeriod) => {
    const disabledDate = (current: Dayjs) => {
        return dayjs().add(1, 'day') < current;
    };

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
            dataIndex: 'current_month_sms_count',
            // sorter: true,
            sorter: (a, b) => a.current_month_sms_count - b.current_month_sms_count,
            orderIndex: "current_month_sms_count",
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
        {
            title: t('pages.companies.listColumns.column5'),
            dataIndex: 'company_phone_number',
            sorter: true,
            orderIndex: "phone_number",
        },
    ];
};

export default CompaniesColumns;
