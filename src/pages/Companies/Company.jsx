import React, {useState, useEffect, useCallback} from 'react';
import {Table, FloatButton} from 'antd';
import {CustomerServiceOutlined, FileAddOutlined, FileExcelOutlined, VerticalAlignTopOutlined} from '@ant-design/icons';
import {APIv1} from '../../api';
import {Link, useOutletContext} from 'react-router-dom';
import {handleTableChange, useRowNavigation} from "../../utils";
import CompaniesColumns from "./company.constants";
import {useTranslation} from "react-i18next";

const Company = () => {
    let defaultPageSize = 20;

    const {t} = useTranslation();
    const columns = CompaniesColumns(t);
    const [userData, setUserData] = useState({});
    const [isUserStaff, setIsUserStaff] = useState({});
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectionType] = useState('checkbox');
    const [totalCompaniesCount, setTotalCompaniesCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const {searchText} = useOutletContext();

    const fetchCompanies = useCallback(async (page, size, search = '', ordering = '') => {
        setLoading(true);
        try {
            const response = await APIv1.get(`/company/list/`, {
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
                company_count_sent_sms: company.count_sent_sms,
                company_phone_number: company.phone_number,
            }));

            setCompanies(companiesData);
            setTotalCompaniesCount(response.data.count);
        } catch (err) {
            console.error('Something went wrong:', err);
        } finally {
            setLoading(false);
        }
    }, [userData.token]);

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

    const onSendSelectedCompaniesToDelete = () => {
        console.log('clicked', selectedCompanies);
    }

    const rowSelection = {
        selectedRowKeys: companies.filter(company => selectedCompanies.includes(company.company_inn)).map(company => company.key),
        onChange: (selectedRowKeys, selectedRows) => {
            const selectedNames = selectedRows.map(row => row.company_inn);
            setSelectedCompanies(selectedNames);
        },
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
                <FloatButton.Group
                    trigger="hover"
                    type="primary"
                    icon={<VerticalAlignTopOutlined/>}
                >
                    <FloatButton
                        type="dashed"
                        style={{
                            marginBottom: 15,
                            color: 'white',
                            backgroundColor: '#ff716e',
                        }}
                        onClick={onSendSelectedCompaniesToDelete}
                        icon={<FileExcelOutlined/>}
                        tooltip={<div>{t('pages.companies.addNewDeviceTitle')}</div>}
                    />
                    <Link to="/create_company">
                        <FloatButton
                            type="dashed"
                            style={{
                                color: 'white',
                                backgroundColor: '#4ecb53',
                            }}
                            icon={<FileAddOutlined/>}
                            tooltip={<div>{t('pages.companies.addNewDeviceTitle')}</div>}
                        />
                    </Link>
                </FloatButton.Group>
            )}
        </div>
    )
}

export default Company;
