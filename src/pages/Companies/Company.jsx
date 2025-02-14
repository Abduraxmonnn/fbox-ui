import React, {useState, useEffect, useCallback} from 'react';
import {Table, FloatButton} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';
import {getFormattedPeriod, handleTableChange, useRowNavigation} from "../../utils";
import CompaniesColumns from "./company.constants";
import {useTranslation} from "react-i18next";

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys: ', selectedRowKeys);
    },
};

const Company = () => {
    let defaultPageSize = 20;

    const {t} = useTranslation();
    const [userData, setUserData] = useState({});
    const [isUserStaff, setIsUserStaff] = useState({});
    const [companies, setCompanies] = useState([]);
    const [selectionType] = useState('checkbox');
    const [totalCompaniesCount, setTotalCompaniesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [startPeriod, setStartPeriod] = useState(null);
    const [endPeriod, setEndPeriod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const handleChangePeriod = (value) => {
        if (value === null || value === 0) {
            setStartPeriod(null);
            setEndPeriod(null);
        } else {
            const {startPeriod, endPeriod} = getFormattedPeriod(value[0], value[1]);
            console.log(startPeriod);
            console.log(endPeriod);
            setStartPeriod(startPeriod);
            setEndPeriod(endPeriod);
        }
    };

    const columns = CompaniesColumns(t, handleChangePeriod);

    const fetchCompanies = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        try {
            let pre_url = '/company/list/';

            // Conditionally add date filters only if they are set
            let url = pre_url;
            if (startPeriod && endPeriod) {
                url = `${pre_url}?start_period=${startPeriod}&end_period=${endPeriod}`;
            }
            const response = await APIv1.get(url, {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                },
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            });

            const companiesData = response.data.results.map((company) => ({
                key: company.id,
                company_name: company.name,
                company_address: company.address ?? '-',
                company_inn: company.inn,
                current_month_sms_count: company.current_month_sms_count,
                company_phone_number: company.phone_number,
            }));

            setCompanies(companiesData);
            setTotalCompaniesCount(response.data.count);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, [userData.token, startPeriod, endPeriod]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setIsUserStaff(items.data.is_staff)
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        let ordering = '';
        if (sortField) {
            ordering = sortOrder === 'ascend' ? sortField : `-${sortField}`;
        }
        fetchCompanies(currentPage, pageSize, searchText, ordering);
    }, [currentPage, pageSize, searchText, sortField, sortOrder, fetchCompanies, userData.token]);

    const tableChangeHandler = handleTableChange(setSortField, setSortOrder, columns);

    const onRowClick = useRowNavigation({
        routePrefix: '/company/detail',
        idField: 'key'
    });

    const onPaginationChange = (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
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
                onChange={tableChangeHandler}
                onRow={onRowClick}
                loading={loading}
                pagination={{
                    total: totalCompaniesCount,
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: onPaginationChange,
                    defaultPageSize: defaultPageSize,
                    defaultCurrent: 1,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
            />
            {isUserStaff && (
                <Link to="/create_company">
                    <FloatButton
                        type="primary"
                        icon={<FileAddOutlined/>}
                        tooltip={<div>{t('pages.companies.addNewCompanyTitle')}</div>}
                    />
                </Link>
            )}
        </div>
    )
}

export default Company;
