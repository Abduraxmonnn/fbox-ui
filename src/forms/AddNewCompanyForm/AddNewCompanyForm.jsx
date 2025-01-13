import {Button, Checkbox, DatePicker, Flex, Input, Select, Space, message} from "antd";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Save, X} from 'lucide-react';
import {APIv1} from "../../api";
import './AddNewCompanyForm.scss'
import {useTranslation} from "react-i18next";

const {RangePicker} = DatePicker;

const initialFormData = {
    start_date: null,
    end_date: null,
    name: "",
    address: "",
    inn: "",
    phone: "",
    user: [],
    status: {
        sent_sms: false,
        perm_click: false,
        perm_payme: false,
        perm_uzum: false,
        perm_anor: false,
    },
};

const AddNewCompanyForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [userOptionsData, setUserOptionsData] = useState([]);
    const [userData, setUserData] = useState([]);

    const getUsersData = async () => {
        try {
            const response = await APIv1.get('/user/list');
            const optionsData = response.data.map(user => ({
                label: user.username,
                value: user.username,
                desc: `${user.username}`,
                emoji: '👤',
            }));
            setUserOptionsData(optionsData);
        } catch (err) {
            console.error('Something went wrong:', err);
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        getUsersData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        if (name.startsWith('perm')) {
            setFormData(prev => ({
                ...prev,
                status: {
                    ...prev.status,
                    [name]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleDateChange = (dates) => {
        setFormData(prev => ({
            ...prev,
            start_date: dates[0],
            end_date: dates[1]
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
            setFormData(initialFormData);
            try {
                const body = {
                    name: formData.name,
                    inn: formData.inn,
                    phone_number: formData.phone,
                    user: formData.user[0],
                    pay_me: formData.status.perm_payme,
                    click: formData.status.perm_click,
                    uzum: formData.status.perm_uzum,
                    anor: formData.status.perm_anor,
                    send_sms: formData.status.sent_sms,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                }
                const response = await APIv1.post('/company/create/', body, {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    },
                });

                if (response.status === 201) {
                    message.success(t("pages.companies.createColumns.messages.success1"));
                } else {
                    message.info(t("pages.companies.createColumns.messages.info1"));
                }

            } catch (err) {
                console.error('Error submitting feedback:', err);
                message.info(t("pages.companies.createColumns.messages.error1"));
            }
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };

    const handleClear = () => {
        setFormData(initialFormData);
        message.info(t("pages.companies.createColumns.messages.info1"));
    };

    return (
        <div className='content_container'>
            <div className='addNewCompany_main'>
                <div className='addNewCompany_main__title'>
                    <h1>{t("pages.companies.createColumns.title")}</h1>
                    <Button
                        style={{
                            width: '15%',
                            display: 'inline-block',
                            marginRight: '1%'
                        }}
                        type='dashed'
                        onClick={() => navigate(-1)}>
                        {t("pages.companies.createColumns.button1")}
                    </Button>
                </div>
                <ul className='input_form'>
                    <li>
                        <p>{t("pages.companies.createColumns.row1")}</p>
                        <Space direction='vertical' size={12}>
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format='YYYY-MM-DD HH:mm:ss'
                                onChange={handleDateChange}
                                value={[formData.start_date, formData.end_date]}
                                placeholder={[`${t("pages.companies.createColumns.placeholder1")}`, `${t("pages.companies.createColumns.placeholder2")}`]}
                            />
                        </Space>
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row2")}</p>
                        <Input
                            style={{
                                width: '29.5%',
                                display: 'inline-block',
                                marginRight: '1%'
                            }}
                            placeholder={t("pages.companies.createColumns.placeholder3")}
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row3")}</p>
                        <Input
                            style={{
                                width: '29.5%',
                                display: 'inline-block',
                                marginRight: '1%'
                            }}
                            placeholder={t("pages.companies.createColumns.placeholder4")}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <p>{t("pages.companies.createColumns.row4")}</p>
                        <Input
                            style={{
                                width: '29.5%',
                                display: 'inline-block',
                                marginRight: '1%'
                            }}
                            placeholder={t("pages.companies.createColumns.placeholder5")}
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row5")}</p>
                        <Checkbox
                            name="sent_sms"
                            checked={formData.status.sent_sms}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                status: {...prev.status, sent_sms: e.target.checked}
                            }))}
                        />
                    </li>
                    <li>
                        <p>{t("pages.companies.createColumns.row6")}</p>
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
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Space.Compact>
                    </li>
                    <li className='user_list'>
                        <p>{t("pages.companies.createColumns.row7")}</p>
                        <Select
                            mode='tags'
                            style={{
                                width: '50%',
                            }}
                            placeholder={t("pages.companies.createColumns.placeholder6")}
                            value={formData.user}
                            onChange={handleSelectChange}
                            optionLabelProp='label'
                            options={userOptionsData}
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
                        <p>{t("pages.companies.createColumns.row8")}</p>
                        <Checkbox
                            name="perm_payme"
                            checked={formData.status.perm_payme}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row9")}</p>
                        <Checkbox
                            name="perm_click"
                            checked={formData.status.perm_click}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row10")}</p>
                        <Checkbox
                            name="perm_uzum"
                            checked={formData.status.perm_uzum}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li className='not_required_field'>
                        <p>{t("pages.companies.createColumns.row11")}</p>
                        <Checkbox
                            name="perm_anor"
                            checked={formData.status.perm_anor}
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
                        {t("pages.companies.createColumns.button2")}
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
                        {t("pages.companies.createColumns.button3")}
                    </Button>
                </Flex>
            </div>
        </div>
    )
}

export default AddNewCompanyForm;