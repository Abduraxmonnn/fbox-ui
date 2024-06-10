import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1 as API} from '../../api'
import {useNavigate} from "react-router-dom";
import {userSignIn} from "../../store/auth/user.action";

const columns = [
    {
        title: 'Company',
        dataIndex: 'company_name',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: title => <a>{title}</a>,
    },
    {
        title: 'Inn',
        dataIndex: 'company_inn',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: title => <a>{title}</a>,
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
    const [subscriptionData, setSubscriptionData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')

    async function getSubscriptionData() {
        try {
            const response = await API.get('/subscription/get-last-20/')
            const data = response.data.map(subs => ({
                key: subs.id,
                company_name: subs.company.name,
                company_inn: subs.company.inn,
                is_multi_user: subs.is_multi_user,
            }))
            setSubscriptionData(data)
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }

    useEffect(() => {
        getSubscriptionData()
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
                    dataSource={subscriptionData}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${subscriptionData.length}`,
                        pageSizeOptions: ['5', '10', '15', '20'],
                    }}
                />
            </div>
        </>
    )
}

export default Subscription
