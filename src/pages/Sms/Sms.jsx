import React, {useState, useEffect, useCallback} from 'react'
import {Table} from 'antd'
import {APIv1} from '../../api'
import {useOutletContext} from "react-router-dom";
import {extractDateBySecond, handleTableChange, useRowNavigation} from "../../utils";
import SmsColumns from "./sms.constants";
import {useTranslation} from "react-i18next";

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
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;

    const {t} = useTranslation();
    const columns = SmsColumns(t);
    const [userData, setUserData] = useState({});
    const [smsData, setSmsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalSms, setTotalSms] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPaginationSize)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const fetchSmsData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const queryParams = {
                page,
                page_size: size,
                search,
                ordering,
                ...filters,
            };

            if (filters.period) {
                queryParams.period = filters.period;
            }

            const response = await APIv1.get('/sms/list/', {
                params: queryParams,
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            })
            const data = response.data.results.map(sms => ({
                key: sms.id,
                sms_id: sms.id,
                inn: sms.inn,
                recipient: sms.recipient,
                is_success: sms.is_success,
                created_date: extractDateBySecond(sms.created_date),
            }))
            setSmsData(data)
            setTotalSms(response.data.count)
        } catch (err) {
            console.error('Something went wrong', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        let ordering = ''
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchSmsData(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortOrder, sortField, filters, fetchSmsData])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns, setFilters, 'is_success');

    const handleCreatedDateChange = (value) => {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters, period: value};

            const url = new URL(window.location.href);
            url.searchParams.set('period', value);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortOrder) url.searchParams.set('ordering', sortOrder === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleCreatedDateFilter = (value) => {
        handleCreatedDateChange(value);
    };

    const onRowClick = useRowNavigation({
        routePrefix: '/payments/sms/detail',
        idField: 'key'
    });

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
                    onChange={(pagination, filters, sorter) => {
                        tableChangeHandler(pagination, filters, sorter);

                        if (filters.created_date && filters.created_date.length > 0) {
                            handleCreatedDateFilter(filters.created_date[0]);
                        } else {
                            handleCreatedDateFilter(null);
                        }
                    }}
                    onRow={onRowClick}
                    pagination={{
                        total: totalSms,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPaginationSize,
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

export default Sms;
