import React, {useState, useEffect, useCallback} from 'react';
import {Table, FloatButton} from 'antd';
import {
    FileAddOutlined,
    FileExcelOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';
import {handleTableChange} from "../../utils";

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
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
    const [userData, setUserData] = useState({});
    const [companies, setCompanies] = useState([]);
    const [selectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const fetchCompanies = useCallback(async (search = '', ordering = '') => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/company/get_by_user/`, {
                params: {
                    search,
                    ordering
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
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
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        let ordering = '';
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchCompanies(searchText, ordering);
    }, [searchText, sortField, sortOrder, fetchCompanies]);

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

    return (
        <div className="content_container">
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={companies}
                onChange={tableChangeHandler}
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