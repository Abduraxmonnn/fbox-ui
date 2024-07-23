import React, {useState, useEffect, useCallback} from 'react';
import {Table, FloatButton} from 'antd';
import {
    FileAddOutlined,
    FileExcelOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';

const columns = [
    {
        title: 'Name',
        dataIndex: 'company_name',
        sorter: true,
        orderIndex: "name",
        render: (text, record) => (
            <Link to={`/company/detail/${record.key}`}>{text}</Link>
        ),
        width: 300,
    },
    {
        title: 'INN',
        dataIndex: 'company_inn',
        sorter: true,
        orderIndex: "inn",
        render: title => <a>{title}</a>,
    },
    {
        title: 'Address',
        dataIndex: 'company_address',
        sorter: true,
        orderIndex: "address",
    },
    {
        title: 'Sent SMS',
        dataIndex: 'company_count_sent_sms',
        sorter: true,
        orderIndex: "send_sms",
    },
    {
        title: 'Phone Number',
        dataIndex: 'company_phone_number',
        sorter: true,
        orderIndex: "phone_number",
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        );
    },
};
const Company = () => {
    const [companies, setCompanies] = useState([]);
    const [selectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const fetchCompanies = useCallback(async (search = '', ordering = '') => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/company/`, {
                params: {
                    search,
                    ordering
                }
            });
            const companiesData = response.data.map((company) => ({
                key: company.id,
                company_name: company.name,
                company_address: company.address ?? '-',
                company_inn: company.inn,
                company_count_sent_sms: company.count_sent_sms,
                company_phone_number: company.phone_number,
            }));
            setCompanies(companiesData);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let ordering = '';
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchCompanies(searchText, ordering);
    }, [searchText, sortField, sortOrder, fetchCompanies]);

    const handleTableChange = (pagination, filters, sorter) => {
        let field = sorter.field;
        let order = sorter.order;
        let orderIndex = columns.find(column => column.dataIndex === field)?.orderIndex || field;

        if (order === 'ascend') {
            setSortField(orderIndex);
            setSortOrder('ascend');
        } else if (order === 'descend') {
            setSortField(orderIndex);
            setSortOrder('descend');
        } else {
            setSortField('');
            setSortOrder('');
        }
    };

    return (
        <div className="content_container">
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={companies}
                onChange={handleTableChange}
                loading={loading}
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
                trigger="click"
                type="primary"
                style={{right: 24}}
                icon={<UploadOutlined/>}
            >
                <FloatButton
                    icon={<FileExcelOutlined/>}
                    tooltip={<div>Delete Company</div>}
                />
                <Link to="/create_company">
                    <FloatButton
                        type="primary"
                        icon={<FileAddOutlined/>}
                        tooltip={<div>Add Company</div>}
                    />
                </Link>
            </FloatButton.Group>
        </div>
    )
}

export default Company;