import {Link} from "react-router-dom";
import React from "react";
import {NotifyStatusIcon} from "../../utils/statusIcons";
import {DatePicker} from "antd";
import usePeriodPresets from "../../optionsComponents/usePeriodOptions";
import dayjs, {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;

const EmailColumns = (t, handleChangePeriod) => {
    const disabledDate = (current: Dayjs) => {
        return dayjs().add(1, 'day') < current;
    };

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
    ]

};

export default EmailColumns;
