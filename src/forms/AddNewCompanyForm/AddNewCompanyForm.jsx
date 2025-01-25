import {Button, Checkbox, DatePicker, Flex, Input, Select, Space, message} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {Save, X} from 'lucide-react';
import {APIv1} from "../../api";
import './AddNewCompanyForm.scss'
import {useTranslation} from "react-i18next";
import {checkIsPhoneCorrect} from "../../utils";

const {RangePicker} = DatePicker;

const initialFormData = {
    start_date: null,
    end_date: null,
    name: "",
    address: "",
    inn: "",
    version: "",
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
    const {id} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [companyVersions, setCompanyVersions] = useState([]);
    const [newCreatedData, setNewCreatedData] = useState(null);  // New state to track the new created data
    const [fetchedData, setFetchedData] = useState(null); // New state to track fetched data
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
        const fetchCompanyDetail = async () => {
            try {
                const response = await APIv1.get(`/company/${id}`);
                setFetchedData(response.data);
                setFormData({
                    start_date: dayjs(response.data.start_date),
                    end_date: dayjs(response.data.end_date),
                    name: response.data.name,
                    address: response.data.address,
                    inn: response.data.inn,
                    version: response.data.versions,
                    phone: checkIsPhoneCorrect(response.data.phone_number),
                    user: [response.data.user.username],
                    status: {
                        sent_sms: response.data.send_sms,
                        perm_click: response.data.click,
                        perm_payme: response.data.pay_me,
                        perm_uzum: response.data.apelsin,
                        perm_anor: response.data.anor,
                    }
                });
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        };

        if (id !== undefined) {
            fetchCompanyDetail();
        }
    }, [id, userData.token]);

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                const versionsResponse = await APIv1.get('/version/list/', {
                    headers: {
                        Authorization: `Token ${userData.token}`
                    },
                });
                setCompanyVersions(versionsResponse.data.map(item => ({
                    value: item.version_number,
                    label: item.version_number,
                })))
            } catch (err) {
                console.error('Something went wrong with versions:', err);
            }
        }

        fetchVersions();
    }, [userData.token])

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

    const handleSelectChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const user = Array.isArray(formData.user) ? formData.user[0] : formData.user;

            const body = {
                name: formData.name,
                inn: formData.inn,
                version: formData.version,
                phone_number: formData.phone,
                user: user,
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

            if (response.status === 201 || response.status === 200) {
                message.success(t("pages.companies.createColumns.messages.success1"));

                setFetchedData(response.data);
                setNewCreatedData(response.data);
                setFormData({
                    start_date: dayjs(response.data.start_date),
                    end_date: dayjs(response.data.end_date),
                    name: response.data.name,
                    address: response.data.address,
                    inn: response.data.inn,
                    version: formData.version,
                    phone: checkIsPhoneCorrect(response.data.phone_number),
                    user: response.data.user ? [response.data.user.username] : [],
                    status: {
                        sent_sms: response.data.send_sms,
                        perm_click: response.data.click,
                        perm_payme: response.data.pay_me,
                        perm_uzum: response.data.apelsin,
                        perm_anor: response.data.anor,
                    }
                });
                window.location.reload();  // keep till fixing bug (fields goes to empty after click submit)

            } else {
                message.info(t("pages.companies.createColumns.messages.info1"));
            }
        } catch (err) {
            console.error('Error submitting feedback:', err);
            message.info(t("pages.companies.createColumns.messages.error1"));
        }
    };

    const handleClear = () => {
        if (fetchedData) {
            setFormData({
                start_date: dayjs(fetchedData.start_date),
                end_date: dayjs(fetchedData.end_date),
                name: fetchedData.name,
                address: fetchedData.address,
                inn: fetchedData.inn,
                version: formData.version,
                phone: checkIsPhoneCorrect(fetchedData.phone_number),
                user: [fetchedData.user.username],
                status: {
                    sent_sms: fetchedData.send_sms,
                    perm_click: fetchedData.click,
                    perm_payme: fetchedData.pay_me,
                    perm_uzum: fetchedData.apelsin,
                    perm_anor: fetchedData.anor,
                }
            });
        } else if (newCreatedData) {
            setFormData({
                start_date: dayjs(newCreatedData.start_date),
                end_date: dayjs(newCreatedData.end_date),
                name: newCreatedData.name,
                address: newCreatedData.address,
                inn: newCreatedData.inn,
                version: formData.version,
                phone: checkIsPhoneCorrect(newCreatedData.phone_number),
                user: [newCreatedData.user.username],
                status: {
                    sent_sms: newCreatedData.send_sms,
                    perm_click: newCreatedData.click,
                    perm_payme: newCreatedData.pay_me,
                    perm_uzum: newCreatedData.apelsin,
                    perm_anor: newCreatedData.anor,
                }
            });
        } else {
            setFormData(initialFormData);
        }
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
                            onChange={(value) => handleSelectChange("user", value)}
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
                    <li>
                        <p>Version</p>
                        <Space wrap>
                            <Select
                                value={formData.version}
                                style={{
                                    width: 120,
                                }}
                                onChange={(value) => handleSelectChange("version", value)}
                                options={companyVersions}
                            />
                        </Space>
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
