import React, {useState, useEffect} from 'react'
import {Table, Tag, FloatButton} from 'antd'
import {
    FileAddOutlined,
    FileExcelOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import {APIv1} from '../../api'
import {Link, useOutletContext} from 'react-router-dom'

const columns = (searchText) => [
    {
        title: 'Device serial number',
        dataIndex: 'device_serial_number',
        sorter: (a, b) =>
            a.device_serial_number.localeCompare(b.device_serial_number),
        onFilter: (value, record) => record.device_serial_number.startsWith(value),
        render: (text, record) => (
            <Link to={`/device/detail/${record.key}`}>{text}</Link>
        ),
        width: 300,
    },
    {
        title: 'Multiple user',
        dataIndex: 'is_multi_user',
        filters: [
            {text: 'True', value: true},
            {text: 'False', value: false},
        ],
        onFilter: (value, record) => record.is_multi_user[0] === value,
        render: (_, {is_multi_user}) => (
            <>
                {is_multi_user.map((tag, index) => (
                    <Tag color={tag ? 'green' : 'volcano'} key={index}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Start date',
        dataIndex: 'start_date',
        sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
        filters: [
            {text: 'Today', value: 'today'},
            {text: 'Past 7 days', value: 'pastSevenDays'},
            {text: 'No Date', value: 'noDate'},
            {text: 'Has Date', value: 'hasDate'},
        ],
        onFilter: (value, record) => {
            const today = new Date().toISOString().slice(0, 10)
            const pastSevenDays = new Date(
                new Date().setDate(new Date().getDate() - 7)
            )
                .toISOString()
                .slice(0, 10)
            switch (value) {
                case 'today':
                    return record.start_date === today
                case 'pastSevenDays':
                    return (
                        record.start_date >= pastSevenDays && record.start_date <= today
                    )
                case 'noDate':
                    return record.start_date === '----/--/--'
                case 'hasDate':
                    return record.start_date !== '----/--/--'
                default:
                    return true
            }
        },
    },
    {
        title: 'End date',
        dataIndex: 'end_date',
        sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
        filters: [
            {text: 'Today', value: 'today'},
            {text: 'Past 7 days', value: 'pastSevenDays'},
            {text: 'No Date', value: 'noDate'},
            {text: 'Has Date', value: 'hasDate'},
        ],
        onFilter: (value, record) => {
            const today = new Date().toISOString().slice(0, 10)
            const pastSevenDays = new Date(
                new Date().setDate(new Date().getDate() - 7)
            )
                .toISOString()
                .slice(0, 10)
            switch (value) {
                case 'today':
                    return record.end_date === today
                case 'pastSevenDays':
                    return record.end_date >= pastSevenDays && record.end_date <= today
                case 'noDate':
                    return record.end_date === '----/--/--'
                case 'hasDate':
                    return record.end_date !== '----/--/--'
                default:
                    return true
            }
        },
    },
]

const Device = () => {
    let defaultPageSize = 20
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalDevices, setTotalDevices] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const {searchText} = useOutletContext();

    useEffect(() => {
        getDevicesData(currentPage, pageSize);
    }, [currentPage, pageSize])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const extractDate = (dateString) => {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    };

    async function getDevicesData(page, size) {
        setLoading(true);
        try {
            const response = await APIv1.get(`/devices?page=${page}&page_size=${size}`);
            const devicesData = response.data.results.map((device) => ({
                key: device.id,
                device_serial_number: device.device_serial_number,
                is_multi_user: [device.is_multi_user],
                start_date: device.start_date ? extractDate(device.start_date) : '----/--/--',
                end_date: device.end_date ? extractDate(device.end_date) : '----/--/--',
            }));
            setDevices(devicesData)
            setTotalDevices(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false);
        }
    }

    const filteredDevices = devices.filter((device) =>
        device.device_serial_number.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='content_container'>
            <Table
                rowSelection={{type: selectionType}}
                columns={columns(searchText)}
                dataSource={filteredDevices}
                loading={loading}
                pagination={{
                    total: totalDevices,
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: onChange,
                    defaultPageSize: defaultPageSize,
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                    pageSizeOptions: ['10', '20', '50', '100']
                }}
            />
            <FloatButton.Group
                trigger='click'
                type='primary'
                style={{right: 24}}
                icon={<UploadOutlined/>}
            >
                <FloatButton
                    icon={<FileExcelOutlined/>}
                    tooltip={<div>Delete Device</div>}
                />
                <Link to='/create_device'>
                    <FloatButton
                        type='primary'
                        icon={<FileAddOutlined/>}
                        tooltip={<div>Add Device</div>}
                    />
                </Link>
            </FloatButton.Group>
        </div>
    )
}

export default Device;
