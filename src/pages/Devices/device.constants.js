import {Link} from "react-router-dom";
import {Tag, Tooltip} from 'antd';
import {MonitorCheck, MonitorDot} from 'lucide-react';
import {deviceStatusInactiveText, deviceStatusInactiveTime} from '../../utils';
import React from "react";

const DevicesColumns = (t) => {

    return [
        {
            title: t('pages.devices.listColumns.column1'),
            dataIndex: 'updated_date',
            sorter: true,
            orderIndex: 'updated_date',
            render: (text, record) => (
                <>
                    {[record.is_active].map(tag => (
                        tag ?
                            <Tooltip key={tag} title="Device is Active">
                                <MonitorCheck size={18} color={'#1cb344'}/>
                            </Tooltip>
                            :
                            <Tooltip key={tag}
                                     title={`Inactive ${deviceStatusInactiveText[record.is_active_time]}`}>
                                <MonitorDot size={18} color={deviceStatusInactiveTime[record.is_active_time]}/>
                            </Tooltip>
                    ))}
                </>
            ),
        },
        {
            title: t('pages.devices.listColumns.column2'),
            dataIndex: 'device_serial',
            sorter: true,
            orderIndex: 'device_serial',
            render: (text, record) => (
                <Link to={`/device/detail/${record.device_serial}`}>{text}</Link>
            ),
        },
        {
            title: t('pages.devices.listColumns.column3'),
            dataIndex: 'device_ip_addr',
            sorter: true,
            orderIndex: 'device_ip_address',
        },
        {
            title: t('pages.devices.listColumns.column4'),
            dataIndex: 'terminal_id',
            sorter: true,
            orderIndex: 'terminal_id',
        },
        {
            title: t('pages.devices.listColumns.column5'),
            dataIndex: 'orders_not_sent_count',
            sorter: true,
            orderIndex: 'orders_not_sent_count',
            render: (_, {orders_not_sent_count}) => (
                <>
                    {[orders_not_sent_count].map(tag => (
                        <Tag color={tag <= 10 ? 'green' : 'red'} key={tag}>
                            {`${String(tag)}`.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: t('pages.devices.listColumns.column6'),
            dataIndex: 'z_report_left_count',
            sorter: true,
            orderIndex: 'z_report_left_count',
            render: (_, {z_report_left_count}) => (
                <>
                    {[z_report_left_count].map(tag => (
                        <Tag color={tag <= 50 ? 'red' : 'green'} key={tag}>
                            {`${String(tag)}`.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: t('pages.devices.listColumns.column7'),
            dataIndex: 'updated_date',
            sorter: (a, b) => new Date(a.updated_date) - new Date(b.updated_date),
        },
        {
            title: t('pages.devices.listColumns.column9'),
            dataIndex: 'end_date',
            orderIndex: 'end_date',
            sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
        },
        {
            title: t('pages.devices.listColumns.column8'),
            dataIndex: 'version_number',
            sorter: true,
            orderIndex: 'version_number',
            render: (text: string, record: DeviceStatusRecord) => {
                if (!record.teamviewer || record.teamviewer === '-') {
                    return <span className="version-number">{text}</span>;
                } else {
                    return (
                        <a
                            href={`https://start.teamviewer.com/${record.teamviewer}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="version-number-link"
                        >
                            {text}
                        </a>
                    );
                }
            },
        },
    ]
};

export default DevicesColumns;
