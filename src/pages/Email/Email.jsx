import {APIv1} from '../../api'
import React, {useState, useEffect, useCallback} from 'react'
import {useOutletContext} from "react-router-dom";
import {extractDateBySecond, handleTableChange, useRowNavigation} from "../../utils";
import {Table} from 'antd'
import EmailColumns from "./email.constants";
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

const Email = (props) => {
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;

    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [EmailData, setEmailData] = useState([])
    const [loading, setLoading] = useState(true)
    const [startPeriod, setStartPeriod] = useState(0 || null);
    const [endPeriod, setEndPeriod] = useState(0 || null);
    const [selectionType, setSelectionType] = useState('checkbox')
    const [totalEmail, setTotalEmail] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPaginationSize)
    const [sortField, setSortField] = useState('')
    const [sortEmail, setSortEmail] = useState('')
    const [filters, setFilters] = useState({})
    const {searchText} = useOutletContext()

    const handleChangePeriod = (value) => {
        if (value === null) {
            setStartPeriod(0);
            setEndPeriod(0);
        } else {
            let startPeriod = value[0].format('YYYY-MM-DD');
            let endPeriod = value[1].add(1, 'days').format('YYYY-MM-DD');
            setStartPeriod(startPeriod);
            setEndPeriod(endPeriod);
        }
    }

    const columns = EmailColumns(t, handleChangePeriod);

    const fetchEmailData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
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

            let pre_url = '/email/list/';
            let url = ((startPeriod !== 0 && endPeriod !== 0) && (startPeriod !== null && endPeriod !== null)) ? `${pre_url}?start_period=${startPeriod}&end_period=${endPeriod}` : pre_url
            const response = await APIv1.get(url, {
                params: queryParams,
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            })
            const data = response.data.results.map(item => ({
                key: item.id,
                inn: item.inn,
                recipient: item.recipient,
                is_success: item.is_success,
                created_date: extractDateBySecond(item.created_date),
            }))
            setEmailData(data)
            setTotalEmail(response.data.count)
        } catch (err) {
            console.error('Something went wrong', err)
        } finally {
            setLoading(false)
        }
    }, [userData.token, startPeriod, endPeriod]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        let ordering = ''
        if (sortField) {
            ordering = sortEmail === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchEmailData(currentPage, pageSize, searchText, ordering, filters)
    }, [currentPage, pageSize, searchText, sortEmail, sortField, filters, fetchEmailData, startPeriod, endPeriod])

    useEffect(() => {
        setCurrentPage(1) // Reset to the first page when search text changes
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }

    const tableChangeHandler = handleTableChange(setSortField, setSortEmail, columns, setFilters, 'is_success');

    const handleCreatedDateChange = (value) => {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters, period: value};

            const url = new URL(window.location.href);
            url.searchParams.set('period', value);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortEmail) url.searchParams.set('ordering', sortEmail === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleCreatedDateFilter = (value) => {
        console.log(value)
        handleCreatedDateChange(value);
    };

    const onRowClick = useRowNavigation({
        routePrefix: '/payments/email/detail',
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
                    dataSource={EmailData}
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
                        total: totalEmail,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPaginationSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) =>
                            `${range[0]} - ${range[1]} / ${EmailData.length}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                    }}
                />
            </div>
        </>
    )
}

export default Email;
