import React, {useState, useEffect, useCallback} from 'react';
import {FloatButton, Table} from 'antd';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';
import {defaultExtractDate, extractDateBySecond, handleTableChange, useRowNavigation} from '../../utils';
import "./Device.scss"
import {FileAddOutlined} from "@ant-design/icons";
import DevicesColumns from "./device.constants";
import {useTranslation} from "react-i18next";

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

const Device = (props) => {
    let defaultPageSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    let companyInn = props.companyInn;

    const {t} = useTranslation();
    const columns = DevicesColumns(t);
    const [deviceStatusData, setDeviceStatusData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isUserStaff, setIsUserStaff] = useState({});
    const [totalDevices, setTotalDevices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const fetchDeviceStatusData = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        const mapDeviceStatusData = (deviceStatusArray) => {
            return deviceStatusArray.map(device_status => ({
                key: device_status.id,
                device_serial: device_status.device_serial,
                is_active: device_status.is_active,
                is_active_time: device_status.is_active_time,
                teamviewer: device_status.teamviewer ?? '-',
                device_ip_addr: device_status.device_ip_address ?? '-',
                terminal_id: device_status.terminal_id ?? '-',
                orders_not_sent_count: device_status.orders_not_sent_count ?? '-',
                z_report_left_count: device_status.z_report_left_count ?? '-',
                updated_date: extractDateBySecond(device_status.updated_date),
                end_date: defaultExtractDate(device_status.end_date),
                version_number: device_status.version_number ?? '-',
            }));
        };

        try {
            const url = companyInn !== undefined ? `/company/related/devices/${companyInn}/` : '/device_status/';

            const response = await APIv1.get(url, {
                params: {page, page_size: size, search, ordering},
                headers: {Authorization: `Token ${userData.token}`},
            });

            const data = companyInn !== undefined
                ? mapDeviceStatusData(response.data)
                : mapDeviceStatusData(response.data.results);

            setDeviceStatusData(data);
            setTotalDevices(response.data.count);

        } catch (err) {
            console.error('Error fetching device status data:', err);
            // You might also want to set some error state here
        } finally {
            setLoading(false);
        }
    }, [companyInn, userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setIsUserStaff(items.data.is_staff)
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        let ordering = '';
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }

        fetchDeviceStatusData(currentPage, pageSize, searchText, ordering);
    }, [currentPage, pageSize, searchText, sortOrder, sortField, userData.token, fetchDeviceStatusData]);

    useEffect(() => {
        setCurrentPage(1);  // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

    const onRowClick = useRowNavigation({
        routePrefix: '/device/detail',
        idField: 'device_serial'
    });

    return (
        <div className='content_container'>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={deviceStatusData}
                loading={loading}
                onChange={tableChangeHandler}
                onRow={onRowClick}
                pagination={{
                    total: totalDevices,
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: onChange,
                    defaultPageSize: defaultPageSize,
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            {isUserStaff && (
                <Link to="/create/device">
                    <FloatButton
                        type="primary"
                        icon={<FileAddOutlined/>}
                        tooltip={<div>{t('pages.devices.addNewDeviceTitle')}</div>}
                    />
                </Link>
            )}
        </div>
    );
}

export default Device;
