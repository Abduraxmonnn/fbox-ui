import React, {useEffect} from 'react';
import {Input, Tooltip} from 'antd';
import {useLocation} from 'react-router-dom'; // Import useLocation
import './Search.scss';
import {InfoCircleOutlined, SyncOutlined} from "@ant-design/icons";

const {Search} = Input;

const SearchComponent = ({t, searchText, setSearchText}) => {
    const location = useLocation(); // Track route changes

    useEffect(() => {
        setSearchText('');
    }, [location, setSearchText]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="search">
            <Search
                prefix={
                    <Tooltip title="Type anything to search with system">
                        <InfoCircleOutlined
                            style={{
                                color: 'rgba(0,0,0,.45)',
                            }}
                        />
                    </Tooltip>
                }
                allowClear={true}
                showCount={true}
                placeholder={t("header.placeholder1")}
                value={searchText}
                onChange={handleSearch}
                style={{width: 500}}
            />
        </div>
    );
};

export default SearchComponent;
