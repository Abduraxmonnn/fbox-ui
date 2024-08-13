import React, {useState, useEffect, useCallback} from 'react';
import {Table, Tag} from 'antd';
import {APIv1} from '../api';
import {useOutletContext} from 'react-router-dom';
import {defaultExtractDate, handleTableChange} from '../utils';

const columns = [
    {
        title: 'ID',
        dataIndex: 'sms_id',
        sorter: true,
        orderIndex: 'id',
        render: (title) => <a>{title}</a>,
        width: 300,
    },
    {
        title: 'Inn',
        dataIndex: 'inn',
        sorter: true,
        orderIndex: 'inn',
        render: (title) => <a>{title}</a>,
    },
    {
        title: 'Recipient',
        dataIndex: 'recipient',
        sorter: true,
        orderIndex: 'recipient',
    },
    {
        title: 'Is Success',
        dataIndex: 'is_success',
        filters: [
            {text: 'True', value: true},
            {text: 'False', value: false},
        ],
        sorter: true,
        orderIndex: 'is_success',
        onFilter: (value, record) => record.is_success === value,
        render: (_, {is_success}) => (
            <Tag color={is_success ? 'green' : 'volcano'} key={is_success}>
                {is_success.toString().toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Created Date',
        dataIndex: 'created_date',
        sorter: true,
        orderIndex: 'created_date',
    },
];

const Sms = (props) => {
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    const [smsData, setSmsData] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalSms, setTotalSms] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPaginationSize);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [filters, setFilters] = useState({});
    const {searchText} = useOutletContext();

    const fetchSmsData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/list_sms_by_user`, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                    ...filters,
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });
            console.log(response)
            const data = response.data.map((sms) => ({
                key: sms.id,
                sms_id: sms.id,
                inn: sms.inn,
                recipient: sms.recipient,
                is_success: sms.is_success,
                created_date: defaultExtractDate(sms.created_date),
            }));
            setSmsData(data);
            setTotalSms(365);
        } catch (err) {
            console.error('Something went wrong', err);
        } finally {
            setLoading(false);
        }
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items && items.token) {
            setUserData(items);
        } else {
            console.error('Token not found in localStorage');
        }
    }, []);

    useEffect(() => {
        if (!userData.token) return;

        let ordering = '';
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchSmsData(currentPage, pageSize, searchText, ordering, filters);
    }, [currentPage, pageSize, searchText, sortOrder, sortField, filters, userData.token, fetchSmsData]);

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when search text or filters change
    }, [searchText, filters]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns, setFilters, 'is_success');

    return (
        <div className='content_container'>
            <Table
                columns={columns}
                dataSource={smsData}
                loading={loading}
                onChange={tableChangeHandler}
                pagination={{
                    total: totalSms,
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: onChange,
                    defaultPageSize: defaultPaginationSize,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total} items`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
        </div>
    );
};

export default Sms;
