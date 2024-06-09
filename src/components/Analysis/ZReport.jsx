import React, {useState, useEffect} from 'react'
import {Table, Tag} from 'antd'
import {APIv1} from '../../api'

const columns = [
    {
        title: 'Terminal ID',
        dataIndex: 'terminal_id',
        render: title => <a>{title}</a>,
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

const ZReport = () => {
    const [reportData, setReportData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox')

    async function getReportData() {
        try {
            const response = await APIv1.get('/device_status/')
            const data = response.data.map(report => ({
                key: report.id,
                terminal_id:
                    report.terminal_id === null ? '-' : report.terminal_id,
                z_report_left_count:
                    report.z_report_left_count === null
                        ? '-'
                        : report.z_report_left_count,
            }))
            setReportData(data)
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }

    useEffect(() => {
        getReportData()
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
                    dataSource={reportData}
                    pagination={{
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${reportData.length}`,
                    }}
                />
            </div>
        </>
    )
}

export default ZReport
