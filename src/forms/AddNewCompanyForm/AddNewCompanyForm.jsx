import {Button, Checkbox, DatePicker, Flex, Input, Select, Space, Modal, message} from "antd";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1} from "../../api";
import {Save, X} from 'lucide-react';
import './AddNewCompanyForm.scss'

const {RangePicker} = DatePicker

const initialFormData = {
    startDate: null,
    endDate: null,
    name: "",
    address: "",
    inn: "",
    phoneNumber: "",
    user: [],
    status: {
        sentSms: false,
        permClick: false,
        permPayme: false,
        permUzum: false,
        permAnor: false,
    },
};

const AddNewCompanyForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [userData, setUserData] = useState([]);
    const [savedData, setSavedData] = useState(null);

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

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (dates) => {
        setFormData(prev => ({
            ...prev,
            startDate: dates[0],
            endDate: dates[1]
        }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            user: value
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log('Company data saved:', formData);
            setSavedData(formData);
            setFormData(initialFormData);
            message.success('Profile updated successfully');
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    const handleClear = () => {
        setFormData(initialFormData);
        setSavedData(null);
        message.info('Changes discarded');
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
                                value={[formData.startDate, formData.endDate]}
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
                            value={formData.name}
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
                            value={formData.address}
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
                            value={formData.inn}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Sent sms</p>
                        <Checkbox
                            name="sentSms"
                            checked={formData.status.sentSms}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                status: {...prev.status, sentSms: e.target.checked}
                            }))}
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
                                value={formData.phoneNumber}
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
                            value={formData.user}
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
                            name="permPayme"
                            checked={formData.status.permPayme}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Click</p>
                        <Checkbox
                            name="permClick"
                            checked={formData.status.permClick}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Uzum</p>
                        <Checkbox
                            name="permUzum"
                            checked={formData.status.permUzum}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>Permission to Anor</p>
                        <Checkbox
                            name="permAnor"
                            checked={formData.status.permAnor}
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
                        onClick={handleSubmit}
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