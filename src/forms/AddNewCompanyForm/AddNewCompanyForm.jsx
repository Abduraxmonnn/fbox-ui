import './AddNewCompanyForm.scss'
import {Button, DatePicker, Space, Input, Checkbox, Select} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {APIv1} from "../../api";

const {RangePicker} = DatePicker

const initialFormData = {
    startDate: "",
    endDate: "",
    name: "",
    address: "",
    inn: "",
    phoneNumber: "",
    status: {
        sentSms: false,
        permClick: false,
        permPayme: false,
        permUzum: false,
        permAnor: false,
    },
}

const AddNewCompanyForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([])

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;

        setFormData((prevFormData) => {
            if (name in prevFormData.status) {
                return {
                    ...prevFormData,
                    status: {
                        ...prevFormData.status,
                        [name]: type === 'checkbox' ? checked : value
                    }
                };
            }
            return {
                ...prevFormData,
                [name]: value
            };
        });
    };
    console.log(formData)

    const handleChange = value => {
        console.log(`selected ${value}`)
    }

    const handleDateChange = (dates, dateStrings) => {
        // Extract start and end dates from the selected range
        const [startDate, endDate] = dates;

        setFormData((prevFormData) => ({
            ...prevFormData,
            startDate: startDate?.format('YYYY-MM-DD HH:mm'),
            endDate: endDate?.format('YYYY-MM-DD HH:mm'),
        }));
    };

    const getUsersData = async () => {
        try {
            const response = await APIv1.get('/user/list');
            const optionsData = response.data.map(user => ({
                label: user.username,
                value: user.username,
                desc: `${user.username}`,
                emoji: '👤'
            }));
            setUserData(optionsData);
        } catch (err) {
            console.error('Something went wrong:', err);
        }
    };

    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <>
            <div className='content_container'>
                <div className='addNewCompany_main'>
                    <div className='addNewCompany_main__title'>
                        <h1>Add Company</h1>
                        <Button
                            style={{
                                width: '15%',
                                display: 'inline-block',
                                marginRight: '1%'
                            }}
                            type='dashed'
                            onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>
                    <ul className='input_form'>
                        <li>
                            <p>Start / End date</p>
                            <Space direction='vertical' size={12}>
                                <RangePicker
                                    showTime={{
                                        format: 'HH:mm',
                                    }}
                                    format='YYYY-MM-DD HH:mm'
                                    onChange={handleDateChange}
                                    // onOk={onOk}
                                />
                            </Space>
                        </li>
                        <li className='not_required_field'>
                            <p>Name</p>
                            <Input
                                style={{
                                    width: '29.5%',
                                    display: 'inline-block',
                                    marginRight: '1%'
                                }}
                                rules={{required: true, message: "Please input company name"}}
                                placeholder="Company Name"
                                name="name"
                                onChange={handleInputChange}/>
                        </li>
                        <li className='not_required_field'>
                            <p>Address</p>
                            <Input
                                style={{
                                    width: '29.5%',
                                    display: 'inline-block',
                                    marginRight: '1%'
                                }}
                                placeholder="Company Address"
                                name="address"
                                onChange={handleInputChange}/>
                        </li>
                        <li>
                            <p>INN</p>
                            <Input
                                style={{
                                    width: '29.5%',
                                    display: 'inline-block',
                                    marginRight: '1%'
                                }}
                                placeholder="Company INN"
                                name="inn"
                                onChange={handleInputChange}/>
                        </li>
                        <li className='not_required_field'>
                            <p>Sent sms</p>
                            <Checkbox
                                name="sentSms"
                                onChange={handleInputChange}/>
                        </li>
                        <li>
                            <p>Phone number</p>
                            <Space.Compact>
                                <Input
                                    style={{
                                        width: '20%',
                                    }}
                                    defaultValue="+998"
                                    disabled
                                />
                                <Input
                                    style={{
                                        width: '80%',
                                    }}
                                    type="number"
                                    name="phoneNumber"
                                    onChange={handleInputChange}
                                />
                            </Space.Compact>
                        </li>
                        <li className='user_list'>
                            <p>Choose user</p>
                            <Select
                                mode='single'
                                style={{
                                    width: '50%',
                                }}
                                placeholder='select one USER'
                                onChange={handleChange}
                                optionLabelProp='label'
                                options={userData}
                                optionRender={option => (
                                    <Space>
										<span
                                            role='img'
                                            aria-label={option.data.label}>
											{option.data.emoji}
										</span>
                                        {option.data.desc}
                                    </Space>
                                )}
                                allowClear={true}
                            />
                        </li>
                        <li className='not_required_field'>
                            <p>Permission to PayMe</p>
                            <Checkbox
                                name="parmPayme"
                                onChange={handleInputChange}/>
                        </li>
                        <li className='not_required_field'>
                            <p>Permission to Click</p>
                            <Checkbox
                                name="parmClick"
                                onChange={handleInputChange}/>
                        </li>
                        <li className='not_required_field'>
                            <p>Permission to Uzum</p>
                            <Checkbox
                                name="parmUzum"
                                onChange={handleInputChange}/>
                        </li>
                        <li className='not_required_field'>
                            <p>Permission to Anor</p>
                            <Checkbox
                                name="parmAnor"
                                onChange={handleInputChange}/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AddNewCompanyForm;