import React, {useEffect, useState} from 'react';
import {Input, Button, DatePicker, message, Modal, Badge, Space, Switch} from 'antd';
import {X, Save} from 'lucide-react';
import * as moment from "dayjs";
import {getSmsClockBadgeColor} from "../../utils";
import './UserProfile.scss';
import {UploadUserProfile} from "../../components";
import {APIv1} from "../../api";
import ShowUserPicture from "../../components/UserProfileCom/ShowUserPicture";
import {Device} from "../index";
import PaymentProvidersPermissionCheckBox
    from "../../components/UserProfileCom/PaymentProvidersPermissions/PaymentProvidersPermission";
import {updateUserData} from "../../components/UserProfileCom/updateUserData";
import {useTranslation} from "react-i18next";

const {RangePicker} = DatePicker;

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

const UserProfile = () => {
    const {t} = useTranslation();
    const [profileData, setProfileData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [userData, setUserData] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSmsShow, setIsSmsShow] = useState(true);
    const [providerPermissions, setProviderPermissions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await APIv1.get('/company/profile/', {
                    headers: {
                        Authorization: `Token ${userData.token}`
                    }
                });

                const data = {
                    key: response.data.id,
                    companyName: response.data.name,
                    inn: response.data.inn,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    phone: response.data.phone_number,
                    address: response.data.address,
                    isSendSms: response.data.send_sms,
                    totalSms: response.data.count_sent_sms,
                    successSms: response.data.count_sent_sms - Math.floor(response.data.count_sent_sms * 0.9),
                    errorSms: response.data.count_sent_sms - Math.floor(response.data.count_sent_sms * 0.1),
                    logo: response.data.logo,
                    banner: response.data.banner,
                    payme: response.data.pay_me,
                    click: response.data.click,
                    uzum: response.data.apelsin,
                    anor: response.data.anor,
                    startDate: moment.utc(response.data.start_date),
                    endDate: moment.utc(response.data.end_date),
                };

                setProfileData(data);
                setInitialData(data);
                setIsSmsShow(data.isSendSms)
                setProviderPermissions({
                    payme: data.payme,
                    click: data.click,
                    uzum: data.uzum,
                    anor: data.anor,
                });
            } catch (err) {
                console.error('Something went wrong', err);
            }
        };

        fetchData();
    }, [userData.token]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    useEffect(() => {
        // Check for changes whenever profileData is updated
        const hasChanges = Object.keys(profileData).some(key => {
            if (dayjs.isDayjs(profileData[key])) {
                return !profileData[key].isSame(initialData[key]);
            }
            return profileData[key] !== initialData[key];
        });
        setHasChanges(hasChanges);
    }, [profileData]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSwitchChange = (checked, name) => { // Added for switch
        setProfileData(prevData => ({
            ...prevData,
            [name]: checked
        }));
    };

    const handleSave = async (profileData, companyInn, token, setInitialData, setHasChanges) => {
        console.log('Saving profile data:', profileData);
        companyInn = profileData.inn
        const isUpdateSuccessful = await updateUserData({data: profileData, companyInn, token});

        if (isUpdateSuccessful) {
            setInitialData(profileData);
            setHasChanges(false);
            message.success(t("pages.user.profile.messages.success1"));
        } else {
            message.error(t("pages.user.profile.messages.error1"));
        }
    };

    const handleCancel = () => {
        setProfileData(initialData);
        setHasChanges(false);
        message.info(t("pages.user.profile.messages.info1"));
    };

    const showChangePasswordModal = () => {
        setIsChangePasswordModalVisible(true);
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            message.error(t("pages.user.profile.messages.error2"));
            return;
        }
        // In a real application, you would send the new password to an API here
        setProfileData(prevData => ({
            ...prevData,
            password: newPassword
        }));
        setIsChangePasswordModalVisible(false);
        setNewPassword('');
        setConfirmPassword('');
        message.success(t("pages.user.profile.messages.success2"));
    };

    const handleProviderPermissionChange = (newCheckedList) => {
        setProfileData(prevData => ({
            ...prevData,
            payme: newCheckedList.includes('payme'),
            click: newCheckedList.includes('click'),
            uzum: newCheckedList.includes('uzum'),
            anor: newCheckedList.includes('anor'),
        }));
    };

    return (
        <section className="user-profile">
            <h1 className='profile-title'>{t("pages.user.profile.title")}</h1>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <ShowUserPicture data={{logo: profileData.logo, banner: profileData.banner}}/>
                    </div>
                    <div className="profile-actions">
                        <Button
                            icon={<Save size={16}/>}
                            type="primary"
                            className={`save-button ${hasChanges ? '' : 'no-changes'}`}
                            // onClick={handleSave}
                            onClick={() =>
                                handleSave(
                                    profileData,
                                    profileData.inn,
                                    userData.token,
                                    setInitialData,
                                    setHasChanges
                                )}
                            disabled={!hasChanges}
                        >
                            {t("pages.user.profile.buttons.button1")}
                        </Button>
                        <Button
                            icon={<X size={16}/>}
                            type="text"
                            className="cancel-button"
                            onClick={handleCancel}
                            disabled={!hasChanges}
                        >
                            {t("pages.user.profile.buttons.button2")}
                        </Button>
                    </div>
                </div>

                <div className="profile-form">
                    <div className="form-column">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="companyName">{t("pages.user.profile.label1")}</label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    value={profileData.companyName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inn">{t("common.inn")}</label>
                                <Input
                                    id="inn"
                                    name="inn"
                                    value={profileData.inn}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="form-group password-group">
                            <label htmlFor="password">{t("pages.user.profile.label2")}</label>
                            <div className="password-input">
                                <Input.Password
                                    id="password"
                                    name="password"
                                    placeholder={t("pages.user.profile.label2")}
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    visibilityToggle={false}
                                />
                                <Button className="change-password-btn" onClick={showChangePasswordModal}>
                                    {t("pages.user.profile.buttons.button3")}
                                </Button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">{t("pages.user.profile.label3")}</label>
                            <Input
                                id="username"
                                name="username"
                                type="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t("pages.user.profile.label4")}</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">{t("pages.user.profile.label5")}</label>
                            <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="address">{t("pages.user.profile.label6")}</label>
                            <Input
                                id="address"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>{t("pages.user.profile.label7")}</label>
                            <RangePicker
                                picker="date"
                                id={{
                                    start: 'startInput',
                                    end: 'endInput',
                                }}
                                value={[profileData.startDate, profileData.endDate]}
                                disabled={true}
                                showTime
                                format='DD-MM-YYYY   HH:mm:ss'
                                onFocus={(_, info) => {
                                    console.log('Focus:', info);
                                }}
                                onBlur={(_, info) => {
                                    console.log('Blur:', info);
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sms">{t("pages.user.profile.label8")}</label>
                            <Space>
                                <Switch
                                    value={isSmsShow}
                                    onChange={(checked) => {
                                        setIsSmsShow(checked);
                                        handleSwitchChange(checked, 'isSendSms');
                                    }}
                                    checkedChildren={t("common.onStatus")} unCheckedChildren={t("common.offStatus")}
                                    style={{backgroundColor: isSmsShow ? "var(--color-status-on)" : "var(--color-status-off"}}/>
                                <Badge count={profileData.totalSms} color={isSmsShow ? "#faad14" : "gray"}
                                       overflowCount={Infinity}/>
                                <Badge count={profileData.successSms} color={isSmsShow ? "#52c41a" : "gray"}
                                       overflowCount={Infinity}/>
                                <Badge count={getSmsClockBadgeColor(isSmsShow, 'clock')}
                                       overflowCount={Infinity}/>
                                <Badge
                                    className="site-badge-count-109"
                                    count={profileData.errorSms}
                                    color={isSmsShow ? "#f5222d" : "gray"}
                                    overflowCount={Infinity}
                                />
                            </Space>
                        </div>

                        <div className="form-group-providers">
                            <PaymentProvidersPermissionCheckBox
                                t={t}
                                providerPermissions={providerPermissions}
                                onChange={handleProviderPermissionChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="userPicture">{t("pages.user.profile.label11")}</label>
                            <UploadUserProfile t={t}/>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="related-device-title">{t("pages.user.profile.section1.title")}</h2>
                    <Device companyInn={profileData.inn}/>
                </div>
            </div>

            <Modal
                title="Change Password"
                visible={isChangePasswordModalVisible}
                onOk={handleChangePassword}
                onCancel={() => setIsChangePasswordModalVisible(false)}
            >
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <Input.Password
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input.Password
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </Modal>
        </section>
    );
};

export default UserProfile;
