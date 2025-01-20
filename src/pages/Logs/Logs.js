import React, {useCallback, useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {APIv1} from "../../api";
import {Table} from "antd";
import {ConvertLogsPaymentProvider} from "../../utils/logsUtils";
import {useTranslation} from "react-i18next";
import {extractDateBySecond, handleTableChange} from "../../utils";
import LogsColumns from "./logs.constants";

const Logs = (props) => {
    let defaultPaginationSize = props.defaultPaginationSize !== undefined ? props.defaultPaginationSize : 20;
    let companyInn = props.companyInn;

    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [logsData, setLogsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startPeriod, setStartPeriod] = useState(0 || null);
    const [endPeriod, setEndPeriod] = useState(0 || null);
    const [totalLogs, setTotalLogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPaginationSize);
    const [sortField, setSortField] = useState('');
    const [sortLog, setSortLog] = useState('');
    const [filters, setFilters] = useState({});
    const {searchText} = useOutletContext();

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

    const columns = LogsColumns(t, handleChangePeriod);

    const fetchLogsData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            let pre_url = companyInn !== undefined ? `/logs/list/get_related_logs/?company_inn=${companyInn}` : '/logs/list/';
            let url = ((startPeriod !== 0 && endPeriod !== 0) && (startPeriod !== null && endPeriod !== null)) ? `${pre_url}?start_period=${startPeriod}&end_period=${endPeriod}` : pre_url

            const queryParams = {
                page,
                page_size: size,
                search,
                ordering,
                ...filters,
            };

            if (filters.status) {
                queryParams.status = filters.status;
            }

            if (filters.period) {
                queryParams.period = filters.period;
            }

            if (filters.provider) {
                queryParams.provider = filters.provider;
            }

            const response = await APIv1.get(url, {
                params: queryParams,
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            });
            const data = response.data.results.map((log) => ({
                key: log.id,
                deviceSerial: log.device_serial === 'None' ? 'Unknown' : log.device_serial,
                companyName: log.company_name,
                paymentId: log.payment_id === null ? 'Unknown' : log.payment_id,
                amount: log.amount,
                isSuccess: log.is_success,
                status: log.status,
                logType: ConvertLogsPaymentProvider(log.log_type),
                paymentResponse: log.payment_response,
                confirmResponse: log.confirm_response,
                createdDate: extractDateBySecond(log.created_date),
            }));

            setLogsData(data);
            setTotalLogs(response.data.count);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, [companyInn, userData.token, startPeriod, endPeriod]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        if (!userData.token) return;

        let ordering = '';
        if (sortField) {
            ordering = sortLog === 'ascend' ? sortField : `-${sortField}`;
        }

        fetchLogsData(currentPage, pageSize, searchText, ordering, filters);
    }, [currentPage, pageSize, searchText, sortLog, sortField, userData.token, filters, fetchLogsData, startPeriod, endPeriod]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    const onChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const tableChangeHandler = handleTableChange(setSortField, setSortLog, columns, setFilters, 'log_type');

    const handleStatusChange = (value) => {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters, status: value};

            const url = new URL(window.location.href);
            url.searchParams.set('status', value);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortLog) url.searchParams.set('ordering', sortLog === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleCreatedDateChange = (value) => {
        setFilters(prevFilters => {
            const newFilters = {...prevFilters, period: value};

            const url = new URL(window.location.href);
            url.searchParams.set('period', value);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortLog) url.searchParams.set('ordering', sortLog === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleLogTypeChange = (value) => {
        const providerValue = value;

        setFilters((prevFilters) => {
            const newFilters = {...prevFilters, provider: providerValue};

            const url = new URL(window.location.href);
            url.searchParams.set('provider', providerValue);
            url.searchParams.set('page', currentPage);
            url.searchParams.set('page_size', pageSize);
            if (filters.period) url.searchParams.set('period', filters.period);
            if (searchText) url.searchParams.set('search', searchText);
            if (sortField && sortLog) url.searchParams.set('ordering', sortLog === 'ascend' ? sortField : `-${sortField}`);
            window.history.pushState({}, '', url.toString());

            return newFilters;
        });
    };

    const handleStatusFilter = (value) => {
        handleStatusChange(value);
    };

    const handleCreatedDateFilter = (value) => {
        handleCreatedDateChange(value);
    };

    const handleLogTypeFilter = (value) => {
        handleLogTypeChange(value);
    };

    return (
        <>
            <div className="content_container">
                <Table
                    expandable={{
                        expandedRowRender: (record) => (
                            <p style={{margin: 0}}>
                                {record.paymentResponse ?? record.confirmResponse}
                            </p>
                        ),
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                    }}
                    columns={columns}
                    dataSource={logsData}
                    loading={loading}
                    onChange={(pagination, filters, sorter) => {
                        tableChangeHandler(pagination, filters, sorter);

                        if (filters.status && filters.status.length > 0) {
                            handleStatusFilter(filters.status[0]);
                        } else {
                            handleStatusFilter(null);
                        }

                        if (filters.createdDate && filters.createdDate.length > 0) {
                            handleCreatedDateFilter(filters.createdDate[0]);
                        } else {
                            handleCreatedDateFilter(null);
                        }

                        if (filters.logType && filters.logType.length > 0) {
                            handleLogTypeFilter(filters.logType[0]);
                        } else {
                            handleLogTypeFilter(null);
                        }
                    }}
                    pagination={{
                        total: totalLogs,
                        current: currentPage,
                        pageSize: pageSize,
                        onChange: onChange,
                        defaultPageSize: defaultPaginationSize,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                        pageSizeOptions: ['10', '20', '50', '100']
                    }}

                />
            </div>
        </>
    );
};

export default Logs;

