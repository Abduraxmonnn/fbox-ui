import React, {useState, useEffect, useCallback} from 'react'
import {Table, Tag} from 'antd'
import {APIv1} from '../../api'
import {Link, useOutletContext} from "react-router-dom";
import {defaultExtractDate, handleTableChange, useRowNavigation} from "../../utils";

const columns = [
    {
        title: 'Inn',
        dataIndex: 'inn',
        render: (text, record) => (
            <Link to={`/payments/sms/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "inn",
    },
    {
        title: 'Recipient',
        dataIndex: 'recipient',
        sorter: true,
        orderIndex: "recipient",
    },
    {
        title: 'Is Success',
        dataIndex: 'is_success',
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
        sorter: true,
        orderIndex: "is_success",
        onFilter: (value, record) => record.is_success === value,

        render: (_, {is_success}) => (
            <>
                {[is_success].map(tag => (
                    <Tag color={tag === true ? 'green' : 'volcano'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
        title: 'Created date',
        dataIndex: 'created_date',
        sorter: true,
        orderIndex: "created_date",
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

const Sms = (props) => {
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    const [userData, setUserData] = useState({});
    const [smsData, setSmsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalSms, setTotalSms] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPaginationSize)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const fetchSmsData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const response = await APIv1.get('/sms/list/', {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                    ...filters,
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            })
            const data = response.data.results.map(sms => ({
                key: sms.id,
                sms_id: sms.id,
                inn: sms.inn,
                recipient: sms.recipient,
                is_success: sms.is_success,
                created_date: defaultExtractDate(sms.created_date),
            }))
            setSmsData(data)
            setTotalSms(response.data.count)
        } catch (err) {
            console.error('Something went wrong', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        let ordering = ''
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchSmsData(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortOrder, sortField, filters, fetchSmsData])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns, setFilters, 'is_success');

    const onRowClick = useRowNavigation({
        routePrefix: '/payments/sms/detail',
        idField: 'key'
    });

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={smsData}
                    loading={loading}
                    onChange={tableChangeHandler}
                    onRow={onRowClick}
                    pagination={{
                        total: totalSms,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPaginationSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${smsData.length}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
            </div>
        </>
    )
}

export default Sms;
