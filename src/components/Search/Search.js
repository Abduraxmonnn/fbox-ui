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
                placeholder="search..."
                value={searchText}
                onChange={handleSearch}
                style={{width: 300}}
            />
        </div>
    );
};

export default SearchComponent;
