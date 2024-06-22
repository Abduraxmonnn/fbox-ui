import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1} from '../api'

const columns = [
    {
        title: 'id',
        dataIndex: 'sms_id',
        sorter: (a, b) => a.sms_id - b.sms_id,
        render: title => <a>{title}</a>,
        width: 300,
    },
    {
        title: 'Inn',
        dataIndex: 'inn',
        render: title => <a>{title}</a>,
    },
    {
        title: 'Recipient',
        dataIndex: 'recipient',
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
    const [smsData, setSmsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')

    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    async function getSmsData() {
        setLoading(true)
        try {
            const response = await APIv1.get('/list_sms/')
            const data = response.data.map(sms => ({
                key: sms.id,
                sms_id: sms.id,
                inn: sms.inn,
                recipient: sms.recipient,
                is_success: sms.is_success,
                created_date: extractDate(sms.created_date),
            }))
            setSmsData(data)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
			setLoading(false)
		}
    }

    useEffect(() => {
        getSmsData()
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
                    dataSource={smsData}
                    loading={loading}
                    pagination={{
                        defaultPageSize: props.defaultPaginationSize,
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

export default Sms
