import React, {useState, useEffect} from 'react'
import {Table, FloatButton} from 'antd'
import {
    FileAddOutlined,
    FileExcelOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import {APIv1} from '../api'
import {Link} from 'react-router-dom'

const columns = [
    {
        title: 'Name',
        dataIndex: 'company_name',
        sorter: (a, b) => a.company_name.localeCompare(b.company_name),
        render: title => <a>{title}</a>,
        width: 300,
    },
    {
        title: 'INN',
        dataIndex: 'company_inn',
        sorter: (a, b) => a.company_inn - b.company_inn,
        render: title => <a>{title}</a>,
        onFilter: (value, record) => record.company_inn[0] === value,
    },
    {
        title: 'Address',
        dataIndex: 'company_address',
        // defaultSortOrder: 'ascend',
        sorter: (a, b) => {
            a = a.company_name || '';
            b = b.company_name || '';
            return a.localeCompare(b);
        },
    },
    {
        title: 'Sent SMS',
        dataIndex: 'company_count_sent_sms',
        sorter: (a, b) => a.company_count_sent_sms - b.company_count_sent_sms,
    },
    {
        title: 'Phone Number',
        dataIndex: 'company_phone_number',
        // defaultSortOrder: 'ascend',
        sorter: (a, b) => a.company_phone_number - b.company_phone_number,
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

const Company = () => {
    const [companies, setCompanies] = useState([])
    const [selectionType] = useState('checkbox')

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }

    useEffect(() => {
        getCompaniesData()
    }, [])

    async function getCompaniesData() {
        try {
            const response = await APIv1.get('/company');
            const companiesData = response.data.map((company) => ({
                ...company,
                key: company.id ? company.id.toString() : Math.random().toString(),
            }));
            setCompanies(companiesData);
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }

    return (
        <>
            <div className='content_container'>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={companies}
                    onChange={onChange}
                    pagination={{
                        defaultPageSize: 20,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${companies.length}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
                <FloatButton.Group
                    trigger='click'
                    type='primary'
                    style={{
                        right: 24,
                    }}
                    icon={<UploadOutlined/>}
                >
                    <FloatButton
                        icon={<FileExcelOutlined/>}
                        tooltip={<div>Delete Company</div>}
                    />
                    <Link to='/create_company'>
                        <FloatButton
                            type='primary'
                            icon={<FileAddOutlined/>}
                            tooltip={<div>Add Company</div>}
                        />
                    </Link>
                </FloatButton.Group>
            </div>
        </>
    )
}

export default Company;
