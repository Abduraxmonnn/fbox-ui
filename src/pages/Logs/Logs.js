import React, {useCallback, useEffect, useState} from "react";
import {Link, useOutletContext} from "react-router-dom";
import {APIv1} from "../../api";
import {extractDateBySecond, handleTableChange} from "../../utils";
import {Table, Tag} from "antd";
import {log_types, status_types} from "../../utils/filters";

const columns = [
    {
        title: 'Device serial number',
        dataIndex: 'deviceSerial',
        render: (text, record) => (
            <Link to={`/payments/logs/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "device_serial",
    },
    {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        render: (text, record) => (
            <Link to={`/payments/logs/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "transaction_id",
    },
    {
        title: 'Is success',
        dataIndex: 'isSuccess',
        render: (_, {isSuccess}) => (
            <>
                {[isSuccess].map(tag => (
                    <Tag color={tag === true ? 'green' : 'volcano'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
        filters: status_types,
        sorter: true,
        orderIndex: "is_success",
    },
    {
        title: 'Provider type',
        dataIndex: 'logType',
        filters: log_types,
        sorter: true,
        orderIndex: "log_type",
    },
    {
        title: 'Created date',
        dataIndex: 'createdDate',
        sorter: true,
        orderIndex: "created_date",
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

const Logs = () => {
    const [userData, setUserData] = useState({});
    const [logsData, setLogsData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [totalLogs, setTotalLogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [sortField, setSortField] = useState('');
    const [sortLog, setSortLog] = useState('');
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const fetchLogsData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const response = await APIv1.get('/logs/list/', {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                    ...filters
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            });
            const data = response.data.results.map((log) => ({
                key: log.id,
                deviceSerial: log.device_serial === 'None' ? '-' : log.device_serial,
                transactionId: log.transaction_id === null ? '-' : log.transaction_id,
                isSuccess: log.is_success,
                logType: log.log_type,
                createdDate: extractDateBySecond(log.created_date)
            }));
            setLogsData(data)
            setTotalLogs(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        let ordering = '';
        if (sortField) {
            ordering = sortLog === 'ascend' ? sortField : `-${sortField}`
        }
        fetchLogsData(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortLog, sortField, userData.token, filters, fetchLogsData])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortLog, columns, setFilters, 'log_type');

    return (
        <>
            <div className="content_container">
                <Table
                    rowSelection={{
                        type: selectionType, ...rowSelection
                    }}
                    columns={columns}
                    dataSource={logsData}
                    loading={loading}
                    onChange={tableChangeHandler}
                    pagination={{
                        total: totalLogs,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: 20,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                        pageSizeOptions: ['10', '20', '50', '100']
                    }}
                />
            </div>
        </>
    )
}

export default Logs;
