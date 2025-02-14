import React, { useState, useEffect, useCallback } from 'react';
import { FloatButton, Table } from 'antd';
import { APIv1 } from '../../api';
import { Link, useOutletContext } from 'react-router-dom';
import { extractDateBySecond, handleTableChange, useRowNavigation } from '../../utils';
import { extractStringDate } from '../../utils/dateUtils';
import { FileAddOutlined } from '@ant-design/icons';
import DevicesColumns from './device.constants';
import { useTranslation } from 'react-i18next';
import './Device.scss';

const Device = ({ defaultPaginationSize = 20, companyInn }) => {
    const { t } = useTranslation();
    const { searchText } = useOutletContext();

    const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
    const [isUserStaff, setIsUserStaff] = useState(userData?.data?.is_staff || false);
    const [deviceStatusData, setDeviceStatusData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalDevices, setTotalDevices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPaginationSize);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [filters, setFilters] = useState({});

    const columns = DevicesColumns(t, isUserStaff);
    const onRowClick = useRowNavigation({ routePrefix: '/device/detail', idField: 'device_serial' });

    const fetchDeviceStatusData = useCallback(async () => {
        if (!userData.token) return;

        setLoading(true);

        try {
            const url = companyInn ? `/company/related/devices/${companyInn}/` : '/device_status/';
            const ordering = sortField ? (sortOrder === 'ascend' ? sortField : `-${sortField}`) : '';

            const response = await APIv1.get(url, {
                params: { page: currentPage, page_size: pageSize, search: searchText, ordering, ...filters },
                headers: { Authorization: `Token ${userData.token}` },
            });

            setDeviceStatusData(response.data.results.map(device => ({
                key: device.id,
                device_serial: device.device_serial,
                company_name: device.company_name,
                is_active: device.is_active,
                is_active_time: device.is_active_time,
                teamviewer: device.teamviewer ?? '-',
                device_ip_addr: device.device_ip_address ?? '-',
                terminal_id: device.terminal_id ?? '-',
                orders_not_sent_count: device.orders_not_sent_count ?? '-',
                z_report_left_count: device.z_report_left_count ?? '-',
                updated_date: extractDateBySecond(device.updated_date),
                end_date: extractStringDate(device.end_date),
                version_number: device.version_number ?? '-',
                device_serial__status: device.device_serial__status,
            })));

            setTotalDevices(response.data.count);
        } catch (error) {
            console.error('Error fetching device status data:', error);
        } finally {
            setLoading(false);
        }
    }, [companyInn, userData.token, currentPage, pageSize, searchText, sortField, sortOrder, filters]);

    useEffect(() => {
        fetchDeviceStatusData();
    }, [fetchDeviceStatusData]);

    useEffect(() => {
        setCurrentPage(1); // Reset page when search text changes
    }, [searchText]);

    const handleTableChangeWrapper = (pagination, filters, sorter) => {
        handleTableChange(setSortField, setSortOrder, columns, setFilters, 'device_serial__status')(pagination, filters, sorter);
        setFilters(prevFilters => ({ ...prevFilters, status: filters.status?.[0] || null }));
    };

    return (
        <div className='content_container'>
            <Table
                rowSelection={{ type: 'checkbox' }}
                columns={columns}
                dataSource={deviceStatusData}
                loading={loading}
                onRow={onRowClick}
                onChange={handleTableChangeWrapper}
                pagination={{
                    total: totalDevices,
                    current: currentPage,
                    pageSize,
                    onChange: setCurrentPage,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            {isUserStaff && (
                <Link to="/create/device">
                    <FloatButton
                        type="primary"
                        icon={<FileAddOutlined />}
                        tooltip={<div>{t('pages.devices.addNewDeviceTitle')}</div>}
                    />
                </Link>
            )}
        </div>
    );
};

export default Device;
