import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1, APIv1 as API} from '../../api'
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {userSignIn} from "../../store/auth/user.action";

const columns = (searchText) => [
    {
        title: 'Company',
        dataIndex: 'company_name',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: (text, record) => (
            <Link to={`/device/detail/${record.key}`}>{text}</Link>
        ),
    },
    {
        title: 'Inn',
        dataIndex: 'company_inn',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: (text, record) => (
            <Link to={`/device/detail/${record.key}`}>{text}</Link>
        ),
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
    const [totalDevices, setTotalDevices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const {searchText} = useOutletContext()

    useEffect(() => {
        getSubscriptionData(currentPage, pageSize);
    }, [currentPage, pageSize])

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    async function getSubscriptionData(page, size) {
        setLoading(true);
        try {
            const response = await APIv1.get(`/subscription?page=${page}&page_size=${size}`);
            const data = response.data.results.map(subs => ({
                key: subs.id,
                company_name: subs.company.name,
                company_inn: subs.company.inn,
                is_multi_user: subs.is_multi_user,
            }))
            setSubscriptionData(data)
            setTotalDevices(response.data.count);
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredSubscriptions = subscriptionData.filter((data) =>
        data.company_name.toLowerCase().includes(searchText.toLowerCase()) ||
        data.company_inn.toLowerCase().includes(searchText.toLowerCase())
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
                    dataSource={filteredSubscriptions}
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
            </div>
        </>
    )
}

export default Subscription
