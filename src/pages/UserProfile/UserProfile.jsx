import React, {useEffect, useState} from 'react';
import {Input, Button, DatePicker, message, Modal, Badge, Space, Switch} from 'antd';
import {X, Save, Maximize, CircleX} from 'lucide-react';
import * as moment from "dayjs";
import {getSmsBadgeCount} from "../../utils";
import {images} from "../../constants";
import './UserProfile.scss';

const {RangePicker} = DatePicker;

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
    nation: 'Colombia',
    gender: 'Male',
    language: 'English',
    twitter: 'twitter.com/envato',
    linkedin: 'linked.in/envato',
    facebook: 'facebook.com/envato',
    google: 'zachary Ruiz',
    slogan: 'Land acquisition Specialist',
    startDate: moment.utc('2024-08-19T17:00:49.785517', 'YYYY-MM-DD[T]HH:mm[Z]'),
    endDate: moment.utc('2025-08-19T17:00:49.785517', 'YYYY-MM-DD[T]HH:mm[Z]'),
};

const defaultProfilePictures = [
    {
        id: 'billing',
        divClassName: 'billing-picture',
        srcClassName: 'billing-img',
        src: images.defaultAvatar2,
        alt: 'Billing',
        label: 'Billing image'
    },
    {
        id: 'qrLogo',
        divClassName: 'qr-logo',
        srcClassName: null,
        src: images.defaultAvatar,
        alt: 'scan2pay logo',
        label: 'scan2pay logo'
    },
    {
        id: 'qrBanner',
        divClassName: 'qr-banner',
        srcClassName: null,
        src: images.testAvatar,
        alt: 'scan2pay banner',
        label: 'scan2pay banner'
    },
]

const UserProfile = () => {
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [profilePicturesData, setProfilePicturesData] = useState(defaultProfilePictures);
    const [initialData, setInitialData] = useState(defaultProfileData);
    const [badgeCounts, setBadgeCounts] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [isSmsShow, setIsSmsShow] = useState(true);

    useEffect(() => {
        // Simulating data fetch from an API
        const fetchData = async () => {
            // In a real application, you would fetch data from an API here
            // For now, we'll just use the default data
            setInitialData(defaultProfileData);
            setProfileData(defaultProfileData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBadgeCounts = async () => {
            // Simulate API request to fetch new badge counts
            // You would replace this with your actual API request logic
            const apiBadgeData = {
                badge1: 42, // Replace with real API data
                badge2: 56, // Replace with real API data
                badge3: 999, // Replace with real API data
            };

            // Update the badge counts state with fetched data
            setBadgeCounts(apiBadgeData);
        };

        fetchBadgeCounts();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (value, name) => {
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // In a real application, you would send the updated data to an API here
        console.log('Saving profile data:', profileData);
        setInitialData(profileData);
        message.success('Profile updated successfully');
    };

    const handleCancel = () => {
        setProfileData(initialData);
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

    const openFullscreen = (imageSrc: string) => {
        setFullscreenImage(imageSrc);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <section className="user-profile">
            <h1 className='profile-title'>Manage profile</h1>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        {profilePicturesData.map((picture) => (
                            <div
                                key={picture.id}
                                className={picture.divClassName}
                                onClick={() => openFullscreen(picture.src)}
                            >
                                <img className={picture.srcClassName} src={picture.src} alt={picture.alt}/>
                                <span>{picture.label}</span>
                                <div className="hover-overlay">
                                    <Maximize size={24} color={'#3f96ff'}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="profile-actions">
                        <Button
                            icon={<Save size={16}/>}
                            type="primary"
                            className="save-button"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            icon={<X size={16}/>}
                            type="text"
                            className="cancel-button"
                            onClick={handleCancel}
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
                                    placeholder="Enter password"
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    visibilityToggle={{
                                        visible: passwordVisible,
                                        onVisibleChange: setPasswordVisible,
                                    }}
                                />
                                <Button className="change-password-btn" onClick={showChangePasswordModal}>
                                    Change
                                </Button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
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
                                    console.log('Focus:');
                                }}
                                onBlur={(_, info) => {
                                    console.log('Blur:');
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Send SMS</label>
                            <Space>
                                <Switch checked={isSmsShow} onChange={() => setIsSmsShow(!isSmsShow)}/>
                                <Badge count={getSmsBadgeCount(isSmsShow, badgeCounts.badge1)} showZero
                                       color="#faad14"/>
                                <Badge count={getSmsBadgeCount(isSmsShow, badgeCounts.badge2)}/>
                                <Badge count={getSmsBadgeCount(isSmsShow, 'clock')}/>
                                <Badge
                                    className="site-badge-count-109"
                                    count={getSmsBadgeCount(isSmsShow, badgeCounts.badge3)}
                                    style={{
                                        backgroundColor: '#52c41a',
                                    }}
                                />
                            </Space>
                        </div>

                        <div className="form-group">
                            <label htmlFor="linkedin">Linked In</label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                value={profileData.linkedin}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="facebook">Facebook</label>
                            <Input
                                id="facebook"
                                name="facebook"
                                value={profileData.facebook}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="google">Google</label>
                            <Input
                                id="google"
                                name="google"
                                value={profileData.google}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="slogan">Slogan</label>
                            <Input
                                id="slogan"
                                name="slogan"
                                value={profileData.slogan}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {fullscreenImage && (
                <div className="fullscreen-image" onClick={closeFullscreen}>
                    <img src={fullscreenImage} alt="Full-screen view"/>
                    <div className="close-button" onClick={(e) => {
                        e.stopPropagation();
                        closeFullscreen();
                    }}>
                        <CircleX size={26}/>
                    </div>
                </div>
            )}

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
