import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './Search.scss';

const { Search } = Input;

const SearchComponent = ({ searchText, setSearchText }) => {
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
                allowClear={true}
                showCount={true}
                placeholder="search..."
                value={searchText}
                onChange={handleSearch}
                style={{ width: 500 }}
            />
        </div>
    );
};

export default SearchComponent;
