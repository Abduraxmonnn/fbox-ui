import React from 'react';
import {Select, Space} from 'antd';

const options = [
    {
        value: 'hour',
        label: 'Last hour',
    },
    {
        value: 'day',
        label: 'Last day',
    },
    {
        value: 'week',
        label: 'Last week',
    },
    {
        value: 'total',
        label: 'All time',
    },
]

const Period = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Space wrap>
                <span>Group By</span>
                <Select
                    defaultValue="hour"
                    style={{
                        width: 120,
                    }}
                    allowClear
                    onChange={handleChange}
                    options={options}
                    placeholder="select it"
                />
            </Space>
        </>
    )
};

export default Period;