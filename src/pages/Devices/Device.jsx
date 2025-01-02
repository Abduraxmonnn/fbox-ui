import React, {useState, useEffect, useCallback} from 'react';
import {FloatButton, Table} from 'antd';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';
import {extractDateBySecond, handleTableChange, useRowNavigation} from '../../utils';
import "./Device.scss"
import {FileAddOutlined} from "@ant-design/icons";
import DevicesColumns from "./device.constants";

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

const Device = () => {
    let defaultPageSize = 20;

    const columns = DevicesColumns();
    const [deviceStatusData, setDeviceStatusData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [totalDevices, setTotalDevices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const fetchDeviceStatusData = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/device_status/`, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            const data = response.data.results.map(device_status => ({
                key: device_status.id,
                device_serial: device_status.device_serial,
                is_active: device_status.is_active,
                is_active_time: device_status.is_active_time,
                teamviewer: device_status.teamviewer === null ? '-' : device_status.teamviewer,
                device_ip_addr: device_status.device_ip_address === null ? '-' : device_status.device_ip_address,
                terminal_id: device_status.terminal_id === null ? '-' : device_status.terminal_id,
                orders_not_sent_count: device_status.orders_not_sent_count === null ? '-' : device_status.orders_not_sent_count,
                z_report_left_count: device_status.z_report_left_count === null ? '-' : device_status.z_report_left_count,
                updated_date: extractDateBySecond(device_status.updated_date),
                version_number: device_status.version_number === null ? '-' : device_status.version_number,
            }));
            setDeviceStatusData(data);
            setTotalDevices(response.data.count);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, []);

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
        routePrefix: '/device/status/detail',
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
            <Link to="/create/device">
                <FloatButton
                    type="primary"
                    icon={<FileAddOutlined/>}
                    tooltip={<div>Add Company</div>}
                />
            </Link>
        </div>
    );
}

export default Device;
