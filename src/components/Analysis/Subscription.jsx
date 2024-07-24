import React, {useState, useEffect, useCallback} from 'react'
import {Table, Tag} from 'antd'
import {APIv1, APIv1 as API} from '../../api'
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {userSignIn} from "../../store/auth/user.action";
import {defaultExtractDate, handleTableChange} from "../../utils";

const columns = [
    {
        title: 'Company',
        dataIndex: 'company_name',
        render: (text, record) => (
            <Link to={`/subscription/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "company__name",
    },
    {
        title: 'Inn',
        dataIndex: 'company_inn',
        render: (text, record) => (
            <Link to={`/subscription/detail/${record.key}`}>{text}</Link>
        ),
        sorter: true,
        orderIndex: "company__inn",
    },
    {
        title: 'Multi user',
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
        orderIndex: "is_multi_user",
        onFilter: (value, record) => record.is_multi_user === value,

        render: (_, {is_multi_user}) => (
            <>
                {[is_multi_user].map(tag => (
                    <Tag color={tag === true ? 'green' : 'volcano'} key={tag}>
                        {`${String(tag)}`.toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
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

const Subscription = () => {
    let defaultPageSize = 10
    const [subscriptionData, setSubscriptionData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalSubscriptions, setTotalSubscriptions] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const fetchSubscriptions = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/devices/`, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                    ...filters
                }
            })
            const data = response.data.results.map(subs => ({
                key: subs.id,
                company_name: subs.company.name,
                company_inn: subs.company.inn,
                is_multi_user: subs.is_multi_user,
            }))
            setSubscriptionData(data)
            setTotalSubscriptions(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        let ordering = ''
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`
        }
        fetchSubscriptions(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortOrder, sortField, filters])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns, setFilters, 'is_multi_user');

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={subscriptionData}
                    loading={loading}
                    onChange={tableChangeHandler}
                    pagination={{
                        total: totalSubscriptions,
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
            </div>
        </>
    )
}

export default Subscription
