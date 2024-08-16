import React, {useCallback, useEffect, useState} from "react";
import {Link, useOutletContext} from "react-router-dom";
import {APIv1} from "../../api";
import {defaultExtractDate, handleTableChange} from "../../utils";
import {Table, Tag} from "antd";
import {log_types} from "../../utils/log_types";

const columns = [
    {
        title: 'Device serial number',
        dataIndex: 'device_serial',
        render: (text, record) => <a>{text}</a>,
        sorter: true,
        orderIndex: "device_serial",
    },
    {
        title: 'Is success',
        dataIndex: 'is_success',
        render: (_, {is_success}) => (
            <>
                {[is_success].map(tag => (
                    <Tag color={tag === true ? 'green' : 'volcano'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
        sorter: true,
        orderIndex: "is_success",
    },
    {
        title: 'Payment Provider',
        dataIndex: 'log_type',
        filters: log_types,
        sorter: true,
        orderIndex: "log_type",
    },
    {
        title: 'Created date',
        dataIndex: 'created_date',
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
            console.log(response)
            const data = response.data.results.map((log) => ({
                key: log.id,
                device_serial: log.device_serial === 'None' ? '-' : log.device_serial,
                is_success: log.is_success,
                log_type: log.log_type,
                created_date: defaultExtractDate(log.created_date)
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