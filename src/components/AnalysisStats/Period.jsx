import {Select, Space} from 'antd';

const options = [
    {
        value: 'hour',
        label: 'Last hour',
    },
    {
        value: 'day',
        label: 'Today',
    },
    {
        value: 'month',
        label: 'Last 30 days',
    }
]

const Period = ({handleChangePeriod}) => {
    return (
        <>
            <Space wrap>
                <span>Group By</span>
                <Select
                    defaultValue="day"
                    style={{
                        width: "max-content",
                    }}
                    allowClear
                    onChange={handleChangePeriod}
                    options={options}
                    placeholder="select it"
                />
            </Space>
        </>
    )
};

export default Period;