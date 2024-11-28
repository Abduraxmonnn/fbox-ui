import React, {useEffect, useState} from 'react';
import {Input, Select, Button, DatePicker, message, Modal} from 'antd';
import {X, Save, Maximize2} from 'lucide-react';
import './UserProfile.scss';
import {images} from "../../constants";

const {Option} = Select;

const defaultProfileData = {
    username: 'arthur_nancy',
    companyName: 'TEST_FBOX_COMPANY',
    inn: '0000001',
    email: 'bradley.ortiz@gmail.com',
    phone: '477-046-1827',
    password: "123456789",
    address: '136 Jaskolski Stravenue Suite 883',
    nation: 'Colombia',
    gender: 'Male',
    language: 'English',
    twitter: 'twitter.com/envato',
    linkedin: 'linked.in/envato',
    facebook: 'facebook.com/envato',
    google: 'zachary Ruiz',
    slogan: 'Land acquisition Specialist'
};

const UserProfile = () => {
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [profilePicturesData, setProfilePicturesData] = useState([
        {id: 'billing', divClassName: 'billing-picture', srcClassName: 'billing-img', src: images.defaultAvatar2, alt: 'Billing', label: 'Billing image'},
        {id: 'qrLogo', divClassName: 'qr-logo', srcClassName: null, src: images.defaultAvatar, alt: 'scan2pay logo', label: 'scan2pay logo'},
        {id: 'qrBanner', divClassName: 'qr-banner', srcClassName: null, src: images.testAvatar, alt: 'scan2pay banner', label: 'scan2pay banner'},
    ]);
    const [initialData, setInitialData] = useState(defaultProfileData);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullscreenImage, setFullscreenImage] = useState(null);

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
                        <div className="billing-picture" onClick={() => openFullscreen(images.defaultAvatar2)}>
                            <img className="billing-img" src={images.defaultAvatar2} alt="Profile"/>
                            <span>Billing image</span>
                            <div className="hover-overlay">
                                <Maximize2 size={24} color={'#3f96ff'}/>
                            </div>
                        </div>
                        <div className="qr-logo" onClick={() => openFullscreen(images.defaultAvatar)}>
                            <img src={images.defaultAvatar} alt="Profile"/>
                            <span>scan2pay logo</span>
                            <div className="hover-overlay">
                                <Maximize2 size={24}/>
                            </div>
                        </div>
                        <div className="qr-banner" onClick={() => openFullscreen(images.testAvatar)}>
                            <img src={images.testAvatar} alt="Profile"/>
                            <span>scan2pay banner</span>
                            <div className="hover-overlay">
                                <Maximize2 size={24}/>
                            </div>
                        </div>
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
                            <label htmlFor="address">Address</label>
                            <Input
                                id="address"
                                name="address"
                                value={profileData.address}
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
                        <div className="form-row">
                            <div className="form-group">
                                <label>Gender</label>
                                <Select
                                    value={profileData.gender}
                                    onChange={(value) => handleSelectChange(value, 'gender')}
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label>Language</label>
                                <Select
                                    value={profileData.language}
                                    onChange={(value) => handleSelectChange(value, 'language')}
                                >
                                    <Option value="English">English</Option>
                                    <Option value="Spanish">Spanish</Option>
                                    <Option value="French">French</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <DatePicker.YearPicker/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="twitter">Twitter</label>
                            <Input
                                id="twitter"
                                name="twitter"
                                value={profileData.twitter}
                                onChange={handleInputChange}
                            />
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
                    <button className="close-button" onClick={(e) => {
                        e.stopPropagation();
                        closeFullscreen();
                    }} aria-label="Close full-screen view">
                        <X size={24}/>
                    </button>
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
