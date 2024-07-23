import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1 as API} from '../../api'
import {useOutletContext} from "react-router-dom";

const columns = (searchText) => [
    {
        title: 'id',
        dataIndex: 'status_id',
        sorter: {},
        render: title => <a>{title}</a>,
    },
    {
        title: 'Subscription serial number',
        dataIndex: 'device_serial',
        render: title => <a>{title}</a>,
    },
    {
        title: 'Teamviewer',
        dataIndex: 'teamviewer',
    },
    {
        title: 'Subscription IP address',
        dataIndex: 'device_ip_addr',
    },
    {
        title: 'Terminal ID',
        dataIndex: 'terminal_id',
    },
    {
        title: 'Orders not sent count',
        dataIndex: 'orders_not_sent_count',
    },
    {
        title: 'Z report left count',
        dataIndex: 'z_report_left_count',
    },
    {
        title: 'Updated date',
        dataIndex: 'updated_date',
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
        title: 'Version number',
        dataIndex: 'version_number',
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

const DeviceStatus = () => {
    let defaultPageSize = 20
    const [deviceStatusData, setDeviceStatusData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [totalDevices, setTotalDevices] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const {searchText} = useOutletContext()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'))
        if (items) {
            setUserData(items)
        }
    }, [])

    useEffect(() => {
        if (userData.token) {
            getDeviceStatusData(currentPage, pageSize)
        }
    }, [currentPage, pageSize, userData.token])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    function extractDate(dateString) {
        const utcDate = new Date(dateString);

        if (isNaN(utcDate.getTime())) {
            console.error('Invalid date string:', dateString);
            return 'Invalid Date';
        }

        const tashkentDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000 + 5 * 60 * 60 * 1000);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };

        return tashkentDate.toLocaleString([], options);
    }

    async function getDeviceStatusData(page, size) {
        setLoading(true)
        try {
            const response = await API.get(`/device_status?page=${page}&page_size=${size}`, {
                headers: {
                    Authorization: `Token ${userData.token}`
                }
            })
            const data = response.data.results.map(device_status => ({
                key: device_status.id,
                status_id: device_status.id,
                device_serial: device_status.device_serial,
                teamviewer:
                    device_status.teamviewer === null
                        ? '-'
                        : device_status.teamviewer,
                device_ip_addr:
                    device_status.device_ip_address === null
                        ? '-'
                        : device_status.device_ip_address,
                terminal_id:
                    device_status.terminal_id === null
                        ? '-'
                        : device_status.terminal_id,
                orders_not_sent_count:
                    device_status.orders_not_sent_count === null
                        ? '-'
                        : device_status.orders_not_sent_count,
                z_report_left_count:
                    device_status.z_report_left_count === null
                        ? '-'
                        : device_status.z_report_left_count,
                updated_date: extractDate(device_status.updated_date),
                version_number:
                    device_status.version_number === null
                        ? '-'
                        : device_status.version_number,
            }))
            setDeviceStatusData(data)
            setTotalDevices(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredDevices = deviceStatusData.filter((device) =>
        device.device_serial.toLowerCase().includes(searchText.toLowerCase()) ||
        device.teamviewer.toLowerCase().includes(searchText.toLowerCase()) ||
        device.device_ip_addr.toLowerCase().includes(searchText.toLowerCase()) ||
        device.terminal_id.toLowerCase().includes(searchText.toLowerCase()) ||
        device.z_report_left_count.toString().includes(searchText.toLowerCase())
    )

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
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
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
            </div>
        </>
    )
}

export default DeviceStatus
