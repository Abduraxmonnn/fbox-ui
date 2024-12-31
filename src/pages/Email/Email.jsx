import {APIv1} from '../../api'
import React, {useState, useEffect, useCallback} from 'react'
import {Link, useOutletContext} from "react-router-dom";
import {extractDateBySecond, handleTableChange, useRowNavigation} from "../../utils";
import {Table} from 'antd'
import {NotifyStatusIcon} from "../../utils/statusIcons";

const columns = [
    {
        title: 'Status',
        dataIndex: 'is_success',
        sorter: true,
        orderIndex: "is_success",
        size: "large",
        width: 100,

        render: (text, record) => (
            <>
                {[record.is_success].map(tag => (
                    <NotifyStatusIcon size={18} status={tag}/>
                ))}
            </>
        ),
    },
    {
        title: 'Inn',
        dataIndex: 'inn',
        render: (text, record) => (
            <Link to={`/payments/email/detail/${record.key}`}>{text}</Link>
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
        title: 'Created date',
        dataIndex: 'created_date',
        sorter: true,
        orderIndex: "created_date",
        filters: [
            {text: 'Today', value: 'day'},
            {text: 'Last hour', value: 'hour'},
            {text: 'Last 30 days', value: 'month'},
        ],
        filterMultiple: false,
        onFilter: (value, record) => true,
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

const Email = (props) => {
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    const [userData, setUserData] = useState({});
    const [EmailData, setEmailData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalEmail, setTotalEmail] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPaginationSize)
    const [sortField, setSortField] = useState('')
    const [sortEmail, setSortEmail] = useState('')
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const fetchEmailData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const queryParams = {
                page,
                page_size: size,
                search,
                ordering,
                ...filters,
            };

            if (filters.period) {
                queryParams.period = filters.period;
            }

            const response = await APIv1.get('/email/list/', {
                params: queryParams,
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            })
            const data = response.data.results.map(item => ({
                key: item.id,
                inn: item.inn,
                recipient: item.recipient,
                is_success: item.is_success,
                created_date: extractDateBySecond(item.created_date),
            }))
            setEmailData(data)
            setTotalEmail(response.data.count)
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
            ordering = sortEmail === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchEmailData(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortEmail, sortField, filters, fetchEmailData])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const tableChangeHandler = handleTableChange(setSortField, setSortEmail, columns, setFilters, 'is_success');

    const handleCreatedDateChange = (value) => {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters, period: value};

            const url = new URL(window.location.href);
            url.searchParams.set('period', value);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortEmail) url.searchParams.set('ordering', sortEmail === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleCreatedDateFilter = (value) => {
        console.log(value)
        handleCreatedDateChange(value);
    };

    const onRowClick = useRowNavigation({
        routePrefix: '/payments/email/detail',
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
                    dataSource={EmailData}
                    loading={loading}
                    onChange={(pagination, filters, sorter) => {
                        tableChangeHandler(pagination, filters, sorter);

                        if (filters.created_date && filters.created_date.length > 0) {
                            handleCreatedDateFilter(filters.created_date[0]);
                        } else {
                            handleCreatedDateFilter(null);
                        }
                    }}
                    onRow={onRowClick}
                    pagination={{
                        total: totalEmail,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPaginationSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${EmailData.length}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
            </div>
        </>
    )
}

export default Email;
