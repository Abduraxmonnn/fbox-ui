import React, {useEffect, useState} from 'react';
import {Input, Button, DatePicker, message, Modal, Badge, Space, Switch, Checkbox} from 'antd';
import {X, Save} from 'lucide-react';
import * as moment from "dayjs";
import {getSmsClockBadgeColor} from "../../utils";
import './UserProfile.scss';
import {UploadUserProfile} from "../../components";
import {APIv1} from "../../api";
import ShowUserPicture from "../../components/UserProfileCom/ShowUserPicture";

const {RangePicker} = DatePicker;
const CheckboxGroup = Checkbox.Group;

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

const defaultProfileData = {
    username: 'arthur_nancy',
    companyName: 'TEST_FBOX_COMPANY',
    inn: '0000001',
    email: 'bradley.ortiz@gmail.com',
    phone: '+998 99 471 00 07',
    password: "123456789",
    address: '136 Jaskolski Stravenue Suite 883',
    isSendSms: true,
    nation: 'Colombia',
    language: 'English',
    totalSms: 250,
    successSms: 242,
    errorSms: 3,
    startDate: moment.utc('2024-08-19T17:00:49.785517', 'YYYY-MM-DD[T]HH:mm[Z]'),
    endDate: moment.utc('2025-08-19T17:00:49.785517', 'YYYY-MM-DD[T]HH:mm[Z]'),
};

const UserProfile = () => {
    const [profileData, setProfileData] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [userData, setUserData] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSmsShow, setIsSmsShow] = useState(true);

    const [checkedProvidersPermissionList, setCheckedProvidersPermissionList] = useState(['click', 'uzum', 'anor']);
    const plainOptions = ['payme', 'click', 'uzum', 'anor'];
    const checkAllProvidersPermissions = plainOptions.length === checkedProvidersPermissionList.length;
    const indeterminateProvidersPermission = checkedProvidersPermissionList.length > 0 && checkedProvidersPermissionList.length < plainOptions.length;

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
                    nation: 'Uzbek',
                    logo: response.data.logo,
                    banner: response.data.banner,
                    payme: response.data.pay_me,
                    click: response.data.click,
                    uzum: response.data.apelsin,
                    anor: response.data.anor,
                    startDate:  moment.utc(response.data.start_date),
                    endDate:  moment.utc(response.data.end_date),
                };

                setProfileData(data);
                setInitialData(data);
                setIsSmsShow(data.isSendSms)
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
                return !profileData[key].isSame(defaultProfileData[key]);
            }
            return profileData[key] !== defaultProfileData[key];
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

    const handleSave = () => {
        // In a real application, you would send the updated data to an API here
        console.log('Saving profile data:', profileData);
        setInitialData(profileData);
        setHasChanges(false);
        message.success('Profile updated successfully');
    };

    const handleCancel = () => {
        setProfileData(initialData);
        setHasChanges(false);
        message.info('Changes discarded');
    };

    const showChangePasswordModal = () => {
        setIsChangePasswordModalVisible(true);
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            message.error('Passwords do not match');
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
        message.success('Password changed successfully');
    };

    const onProviderPermissionChange = (list) => {
        setCheckedProvidersPermissionList(list);
    };
    const onCheckAllProviderPermissionChange = (e) => {
        setCheckedProvidersPermissionList(e.target.checked ? plainOptions : []);
    };

    return (
        <section className="user-profile">
            <h1 className='profile-title'>Manage profile</h1>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <ShowUserPicture data={{logo: profileData.logo, banner: profileData.banner}} />
                    </div>
                    <div className="profile-actions">
                        <Button
                            icon={<Save size={16}/>}
                            type="primary"
                            className={`save-button ${hasChanges ? '' : 'no-changes'}`}
                            onClick={handleSave}
                            disabled={!hasChanges}
                        >
                            Save
                        </Button>
                        <Button
                            icon={<X size={16}/>}
                            type="text"
                            className="cancel-button"
                            onClick={handleCancel}
                            disabled={!hasChanges}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>

                <div className="profile-form">
                    <div className="form-column">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="companyName">Name</label>
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    value={profileData.companyName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inn">Inn</label>
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
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <Input.Password
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                                <Button className="change-password-btn" onClick={showChangePasswordModal}>
                                    Change
                                </Button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                id="username"
                                name="username"
                                type="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nation">Nation</label>
                            <Input
                                id="nation"
                                name="nation"
                                value={profileData.nation}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Input
                                id="address"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Subscription Active Period</label>
                            <RangePicker
                                picker="date"
                                id={{
                                    start: 'startInput',
                                    end: 'endInput',
                                }}
                                value={[profileData.startDate, profileData.endDate]}
                                disabled={true}
                                showTime
                                onFocus={(_, info) => {
                                    console.log('Focus:', info);
                                }}
                                onBlur={(_, info) => {
                                    console.log('Blur:', info);
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sms">Send SMS</label>
                            <Space>
                                <Switch value={isSmsShow} onChange={() => setIsSmsShow(!isSmsShow)}
                                        checkedChildren="On" unCheckedChildren="Off"
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
                            <label htmlFor="linkedin">Providers Permission</label>
                            <>
                                <Checkbox indeterminate={indeterminateProvidersPermission}
                                          onChange={onCheckAllProviderPermissionChange}
                                          checked={checkAllProvidersPermissions}>
                                    Full Permission
                                </Checkbox>
                                <CheckboxGroup options={plainOptions} value={checkedProvidersPermissionList}
                                               onChange={onProviderPermissionChange}/>
                            </>
                        </div>

                        <div className="form-group">
                            <label htmlFor="userPicture">Upload Picture</label>
                            <UploadUserProfile/>
                        </div>
                    </div>
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
