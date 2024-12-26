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
        value: 'month',
        label: 'Last 30 days',
    }
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
                    defaultValue="month"
                    style={{
                        width: "max-content",
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