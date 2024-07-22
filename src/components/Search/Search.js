import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

const SearchComponent = ({searchText, setSearchText}) => {
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 16}}>
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
