import {DatePicker, Input, Select, Space} from "antd";

const {RangePicker} = DatePicker


// DATA PICKER START DATE END DATE
const onChangeDatePicker = (value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
}

const onOk = value => {
    console.log('onOk: ', value)
}


// DEVICE SERIAL NUMBER INPUT
const onChangeDeviceSerialNumber = e => {
    console.log(e.target.value)
}

// USER / COMPANY CHECKBOX
const handleChange = value => {
    console.log(`selected ${value}`)
}

const options = [
    {
        label: 'China',
        value: 'china',
        desc: 'China (中国)',
    },
    {
        label: 'USA',
        value: 'usa',
        desc: 'USA (美国)',
    },
    {
        label: 'Japan',
        value: 'japan',
        desc: 'Japan (日本)',
    },
    {
        label: 'Korea',
        value: 'korea',
        desc: 'Korea (韩国)',
    },
]

const MainFieldsComponent = () => {
    return (
        <>
            <ul className='create-device__forms-list'>
                <li>
                    <p>Start / End date</p>
                    <Space direction='vertical' size={12}>
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format='YYYY-MM-DD HH:mm'
                            onChange={onChangeDatePicker}
                            onOk={onOk}
                        />
                    </Space>
                </li>
                <li>
                    <p className='create-device__forms-list--required'>Choose user</p>
                    <Select
                        mode='multiple'
                        style={{
                            width: '20%',
                        }}
                        placeholder='select one USER'
                        onChange={handleChange}
                        optionLabelProp='label'
                        options={options}
                        optionRender={option => (
                            <Space>
										<span
                                            role='img'
                                            aria-label={option.data.label}
                                        >
											{option.data.emoji}
										</span>
                                {option.data.desc}
                            </Space>
                        )}
                        allowClear={true}
                        autoFocus={true}
                    />
                </li>
                <li>
                    <p className='create-device__forms-list--required'>Choose company</p>
                    <Select
                        mode='multiple'
                        style={{
                            width: '20%',
                        }}
                        placeholder='select one COMPANY'
                        onChange={handleChange}
                        optionLabelProp='label'
                        options={options}
                        optionRender={option => (
                            <Space>
										<span
                                            role='img'
                                            aria-label={option.data.label}
                                        >
											{option.data.emoji}
										</span>
                                {option.data.desc}
                            </Space>
                        )}
                        allowClear={true}
                        autoFocus={true}
                    />
                </li>
                <li>
                    <p className='create-device__forms-list--required'>
                        Device serial number
                    </p>
                    <Input
                        style={{
                            width: '20%',
                        }}
                        placeholder='text'
                        allowClear
                        onChange={onChangeDeviceSerialNumber}
                    />
                </li>
            </ul>
        </>
    )
}

export default MainFieldsComponent;