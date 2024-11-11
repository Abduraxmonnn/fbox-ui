import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1} from "../../api";
import {Link} from "react-router-dom";

const columns = [
    {
        title: 'Teamviewer',
        dataIndex: 'teamviewer',
        sorter: (a, b) => a.teamviewer - b.teamviewer,
        render: (text, record) => (
            <Link to={`/z-reports/detail/${record.key}`}>{text}</Link>
        ),
    },
    {
        title: 'Device IP address',
        dataIndex: 'device_ip_address',
        render: (text, record) => (
            <Link to={`/z-reports/detail/${record.key}`}>{text}</Link>
        ),
    },
    {
        title: 'Terminal ID',
        dataIndex: 'terminal_id',
        render: (text, record) => (
            <Link to={`/z-reports/detail/${record.key}`}>{text}</Link>
        ),
    },
    {
        title: 'Order not sent count',
        dataIndex: 'orders_not_sent_count',
        sorter: (a, b) => a.orders_not_sent_count - b.orders_not_sent_count,
    },
    {
        title: 'Updated date',
        dataIndex: 'updated_date',
        sorter: {
            compare: (a, b) => new Date(a.updated_date) - new Date(b.updated_date),
        },
        filters: [
            {text: 'Today', value: 'today'},
            {text: 'Past 7 days', value: 'pastSevenDays'},
            {text: 'No Date', value: 'noDate'},
            {text: 'Has Date', value: 'hasDate'},
        ],
        onFilter: (value, record) => {
            const today = new Date().toISOString().slice(0, 10);
            const pastSevenDays = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10);

            switch (value) {
                case 'today':
                    return record.updated_date === today;
                case 'pastSevenDays':
                    return record.updated_date >= pastSevenDays && record.updated_date <= today;
                case 'noDate':
                    return record.updated_date === '----/--/--';
                case 'hasDate':
                    return record.updated_date !== '----/--/--';
                default:
                    return true;
            }
        }
    },
    {
        title: 'Version number',
        dataIndex: 'version_number',
    },
    {
        title: 'Left count',
        dataIndex: 'z_report_left_count',
        sorter: (a, b) => a.z_report_left_count - b.z_report_left_count,
        render: (_, {z_report_left_count}) => (
            <>
                {[z_report_left_count].map(tag => (
                    <Tag color={tag <= 10 ? 'red' : 'green'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        )
    },
}

const ZReport = () => {
    const [reportData, setReportData] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({});
    const [paginationState, setPaginationState] = useState({
        totalData: 0,
        currentPage: 1,
        pageSize: 20,
    });

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, []);

    useEffect(() => {
        if (userData.token) {
            getReportData(paginationState.currentPage, paginationState.pageSize);
        }
    }, [userData.token, paginationState.currentPage, paginationState.pageSize]);

    const handlePageChange = (newPage) => {
        setPaginationState((prev) => ({
            ...prev,
            currentPage: newPage,
        }))
    }

    const handlePageSizeChange = (newSize) => {
        setPaginationState((prev) => ({
            ...prev,
            pageSize: newSize,
        }))
    }

    const handleChange = (page, pageSize) => {
        handlePageChange(page);
        handlePageSizeChange(pageSize);
    }


    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    async function getReportData(page, size) {
        setLoading(true)
        try {
            const response = await APIv1.get(`/device_status?page=${page}&page_size=${size}`, {
                headers: {
                    Authorization: `Token ${userData.token}`
                }
            });
            const data = response.data.results.map(report => ({
                key: report.id,
                z_report_left_count: report.z_report_left_count ?? '-',
                teamviewer: report.teamviewer ?? '-',
                device_ip_address: report.device_ip_address,
                terminal_id: report.terminal_id ?? '-',
                orders_not_sent_count: report.orders_not_sent_count,
                updated_date: report.updated_date ? extractDate(report.updated_date) : '----/--/--',
                version_number: report.version_number,
            }));
            setReportData(data);
            setPaginationState((prev) => ({
                ...prev,
                totalDevices: response.data.count
            }))
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={reportData}
                    loading={loading}
                    pagination={{
                        total: paginationState.totalDevices,
                        current: paginationState.currentPage,
                        pageSize: paginationState.pageSize,
                        onChange: handleChange,
                        defaultCurrent: 1,
                        defaultPageSize: 20,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${reportData.length}`,
                        pageSizeOptions: ['10', '20', '50', '100']
                    }}
                />
            </div>
        </>
    )
}

export default ZReport
