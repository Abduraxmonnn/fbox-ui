import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1} from '../api'
import {useOutletContext} from "react-router-dom";

const columns = (searchText) => [
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
    let {defaultPageSize} = props
    const [smsData, setSmsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalSms, setTotalSms] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const {searchText} = useOutletContext()

    useEffect(() => {
        getSmsData(currentPage, pageSize)
    }, [currentPage, pageSize])

    function extractDate(dateString) {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    async function getSmsData(page, size) {
        setLoading(true)
        try {
            const response = await APIv1.get(`/list_sms/?page=${page}&page_size=${size}`)
            const data = response.data.results.map(sms => ({
                key: sms.id,
                sms_id: sms.id,
                inn: sms.inn,
                recipient: sms.recipient,
                is_success: sms.is_success,
                created_date: extractDate(sms.created_date),
            }))
            setSmsData(data)
            setTotalSms(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }

    const filteredSms = smsData.filter((data) =>
        data.sms_id.toString().includes(searchText.toLowerCase()) ||
        data.inn.toLowerCase().includes(searchText.toLowerCase()) ||
        data.recipient.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns(searchText)}
                    dataSource={filteredSms}
                    loading={loading}
                    pagination={{
                        total: totalSms,
                        current: currentPage,
                        pageSize: pageSize,
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
