import {Button, Checkbox, DatePicker, Flex, Input, Select, Space} from "antd";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../api";
import './AddNewCompanyForm.scss'
import {Save, X} from "lucide-react";

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
    const [formData, setFormData] = useState({});
    const [userData, setUserData] = useState([]);
    const [initialData, setInitialData] = useState({});

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

    useEffect(() => {
        // Fetch user data
        const fetchUsers = async () => {
            try {
                const response = await APIv1.getUsers();
                setUserData(response.data.map(user => ({
                    value: user.id,
                    label: user.name,
                    desc: user.email,
                    emoji: '👤'
                })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
        });
    };

    const handleDateChange = (dates) => {
        setFormData(prev => {
            return {
                ...prev,
                startDate: dates[0],
                endDate: dates[1]
            };
        });
    };

    const handleSelectChange = (value, options) => {
        if (options?.length === 0 || options?.length === 1) {
            setFormData(prev => {
                return {
                    ...prev,
                    user: value
                }
            })
        }
    };

    const handleSave = async () => {
        try {
            // Implement your save logic here
            // For example: await APIv1.saveCompany(formData);
            setInitialData(formData);
            console.log(formData);
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    const handleClear = () => {
        setFormData(initialData);
    };

    return (
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
                            placeholder="Company Name"
                            name="name"
                            onChange={handleInputChange}
                        />
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
                            onChange={handleInputChange}
                        />
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
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Sent sms</p>
                        <Checkbox
                            name="sentSms"
                            onChange={handleInputChange}
                        />
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
                            mode='tags'
                            style={{
                                width: '50%',
                            }}
                            placeholder='select one USER'
                            onChange={handleSelectChange}
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
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Click</p>
                        <Checkbox
                            name="parmClick"
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Uzum</p>
                        <Checkbox
                            name="parmUzum"
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Anor</p>
                        <Checkbox
                            name="parmAnor"
                            onChange={handleInputChange}
                        />
                    </li>
                </ul>
            </div>
            <div className="company-actions">
                <Flex gap="small" justify="flex-end">
                    <Button
                        icon={<Save size={16}/>}
                        type="primary"
                        onClick={handleSave}
                        className="save-button"
                        style={{
                            backgroundColor: '#4caf50',
                            borderColor: '#4caf50',
                            width: '15%',
                            marginRight: '1%'
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        icon={<X size={16}/>}
                        type="dashed"
                        danger
                        onClick={handleClear}
                        className="cancel-button"
                        style={{
                            width: '15%',
                            marginRight: '1%'
                        }}
                    >
                        Clear
                    </Button>
                </Flex>
            </div>
        </div>
    )
}

export default AddNewCompanyForm;