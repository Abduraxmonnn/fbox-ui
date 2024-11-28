import React, {useEffect, useState} from 'react';
import {Input, Select, Button, DatePicker, message} from 'antd';
import {X, Save} from 'lucide-react';
import './UserProfile.scss';
import {images} from "../../constants";

const {Option} = Select;

const defaultProfileData = {
    username: 'arthur_nancy',
    firstName: 'Arthur',
    lastName: 'Nancy',
    email: 'bradley.ortiz@gmail.com',
    phone: '477-046-1827',
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
    const [initialData, setInitialData] = useState(defaultProfileData);

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

    // const handleInputChange = (e) => {
    //     const {name, value} = e.target;
    //     setProfileData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };
    //
    // const handleSelectChange = (value, name) => {
    //     setProfileData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

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

    return (
        <section className="user-profile">
            <h1 className='profile-title'>Manage profile</h1>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <img src={images.defaultAvatar} alt="Profile"/>
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
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={profileData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <Input
                                    id="password"
                                    type="password"
                                    value="••••••••••"
                                    readOnly
                                />
                                <button className="change-password">CHANGE PASSWORD</button>
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
        </section>
    );
};

export default UserProfile;
