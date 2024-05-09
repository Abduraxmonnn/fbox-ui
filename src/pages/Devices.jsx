import React, {useState, useEffect} from 'react'
import {Table, Tag, FloatButton} from 'antd'
import {
    FileAddOutlined,
    FileExcelOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import {API} from '../api'
import {Link} from 'react-router-dom'

const columns = [
    {
        title: 'Device serial number',
        dataIndex: 'device_serial_number',
        sorter: (a, b) => a.device_serial_number - b.device_serial_number,
        onFilter: (value, record) =>
            record.device_serial_number.startsWith(value),
        render: title => <a>{title}</a>,
        width: 300,
    },
    {
        title: 'Multiple user',
        dataIndex: 'is_multi_user',
        filters: [
            {
                text: 'True',
                value: true,
            },
            {
                text: 'False',
                value: false,
            },
        ],

        onFilter: (value, record) => record.is_multi_user[0] === value,

        render: (_, {is_multi_user}) => (
            <>
                {is_multi_user.map(tag => (
                    <Tag color={tag === true ? 'green' : 'volcano'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Start date',
        dataIndex: 'start_date',
        // defaultSortOrder: 'ascend',
        sorter: {
            compare: (a, b) => new Date(a.start_date) - new Date(b.end_date),
        },
        filters: [
            {
                text: 'Today',
                value: 'today',
            },
            {
                text: 'Past 7 days',
                value: 'pastSevenDays',
            },
            {
                text: 'No Date',
                value: 'noDate',
            },
            {
                text: 'Has Date',
                value: 'hasDate',
            },
        ],
    },
    {
        title: 'End date',
        dataIndex: 'end_date',
        sorter: {
            compare: (a, b) => new Date(a.start_date) - new Date(b.end_date),
        },
        filters: [
            {
                text: 'Today',
                value: 'today',
            },
            {
                text: 'Past 7 days',
                value: 'pastSevenDays',
            },
            {
                text: 'No Date',
                value: 'noDate',
            },
            {
                text: 'Has Date',
                value: 'hasDate',
            },
        ],
    },
]

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
}

const Devices = () => {
    const [devices, setDevices] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }

    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    async function getDevicesData() {
        try {
            const response = await API.get('/devices')
            const devicesData = response.data.map(device => ({
                key: device.id,
                device_serial_number: device.device_serial_number,
                is_multi_user: [device.is_multi_user],
                start_date:
                    device.start_date === null
                        ? '----/--/--'
                        : extractDate(device.start_date),
                end_date:
                    device.end_date === null
                        ? '----/--/--'
                        : extractDate(device.end_date),
            }))
            setDevices(devicesData)
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }

    useEffect(() => {
        getDevicesData()
    }, [])

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={devices}
                    onChange={onChange}
                    pagination={{
                        defaultPageSize: 20,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${devices.length}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
                <FloatButton.Group
                    trigger='click'
                    type='primary'
                    style={{
                        right: 24,
                    }}
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
        </>
    )
}

export default Devices
