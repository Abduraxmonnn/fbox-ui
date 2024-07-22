import React from 'react';
import {Input} from 'antd';
import './Search.scss'

const {Search} = Input;

const SearchComponent = ({searchText, setSearchText}) => {
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="search">
            <Search
                allowClear={true}
                showCount={true}
                placeholder="search..."
                value={searchText}
                onChange={handleSearch}
                style={{width: 500}}
            />
        </div>
    );
};

export default SearchComponent;
