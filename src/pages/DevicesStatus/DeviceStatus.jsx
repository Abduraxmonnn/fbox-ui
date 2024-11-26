import React, {useState, useEffect, useCallback} from 'react';
import {Table, Tag} from 'antd';
import {APIv1} from '../../api';
import {MonitorCheck, MonitorDot} from 'lucide-react';
import {Link, useOutletContext} from 'react-router-dom';
import {deviceStatusInactiveTime, extractDateBySecond, handleTableChange} from '../../utils';
import "./DeviceStatus.scss"

const columns = [
    {
        title: 'id',
        dataIndex: 'status_id',
        sorter: true,
        orderIndex: 'id',
        render: (text, record) => (
            <Link to={`/device/status/detail/${record.device_serial}`}>{text}</Link>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'updated_date',
        sorter: true,
        orderIndex: 'updated_date',
        render: (text, record) => (
            <>
                {[record.is_active].map(tag => (
                    tag ? <MonitorCheck size={18} color={'#1cb344'}/> :
                        <MonitorDot size={18} color={deviceStatusInactiveTime[record.is_active_time]}/>
                ))}
            </>
        ),
    },
    {
        title: 'Device serial number',
        dataIndex: 'device_serial',
        sorter: true,
        orderIndex: 'device_serial',
        render: (text, record) => (
            <Link to={`/device/status/detail/${record.device_serial}`}>{text}</Link>
        ),
    },
    {
        title: 'DNS',
        dataIndex: 'teamviewer',
        sorter: true,
        orderIndex: 'teamviewer',
        render: (text) =>
            text === '-' ? (
                <span>-</span>
            ) : (
                <a
                    href={`https://start.teamviewer.com/${text}`}
                    className='connect-link'
                >
                    {text}
                </a>
            ),
    },
    {
        title: 'Device IP address',
        dataIndex: 'device_ip_addr',
        sorter: true,
        orderIndex: 'device_ip_address',
    },
    {
        title: 'Terminal ID',
        dataIndex: 'terminal_id',
        sorter: true,
        orderIndex: 'terminal_id',
    },
    {
        title: 'Orders not sent count',
        dataIndex: 'orders_not_sent_count',
        sorter: true,
        orderIndex: 'orders_not_sent_count',
        render: (_, {orders_not_sent_count}) => (
            <>
                {[orders_not_sent_count].map(tag => (
                    <Tag color={tag <= 10 ? 'red' : 'green'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Z report left count',
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
        title: 'Updated date',
        dataIndex: 'updated_date',
        sorter: (a, b) => new Date(a.updated_date) - new Date(b.updated_date),
    },
    {
        title: 'Version number',
        dataIndex: 'version_number',
        sorter: true,
        orderIndex: 'version_number',
    },
]

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

const DeviceStatus = () => {
    const defaultPageSize = 20;
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
                status_id: device_status.id,
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
        </div>
    )
}

export default DeviceStatus;
