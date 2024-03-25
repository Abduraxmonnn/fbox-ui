import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
import {APIv1 as API} from '../../api'

const columns = [
    {
        title: 'Terminal ID',
        dataIndex: 'terminal_id',
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: title => <a>{title}</a>,
    },
    {
        title: 'Left count',
        dataIndex: 'z_report_left_count',
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: title => <a>{title}</a>,
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
            const response = await API.get('/device_status/')
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
