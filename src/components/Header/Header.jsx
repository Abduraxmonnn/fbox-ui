import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Spin} from 'antd';
import {UserRoundCog, MessageCircleMore, LogOut} from "lucide-react";
import {NotificationOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import {images} from '../../constants';
import {logout} from '../../store/auth/user.action';
import SearchComponent from '../Search/Search';
import {APIv1} from "../../api";
import Localization from "../Localizations/Localization";
import {useTranslation} from "react-i18next";
import {truncateUsername} from "../../utils/userUtils";
import './Header.scss';

const Header = ({isCollapse, searchText, setSearchText}) => {
    const {t} = useTranslation();
    const [isUserOptions, setIsUserOptions] = useState(false)
    const formRef = useRef()
    const avatarRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [isActive, setIsActive] = useState(true)
    const [expireDeviceData, setExpireDeviceData] = useState({});

    const fetchExpireDeviceData = useCallback(async () => {
        try {
            const response = await APIv1.get('subscription/expire/devices/', {
                headers: {
                    Authorization: `Token ${userData.token}`,
                }
            })
            const {min_day_to_expire, min_day_to_expire_serial_number} = response.data;

            const expireDeviceData = {
                min_day_to_expire: min_day_to_expire,
                min_day_to_expire_serial_number: min_day_to_expire_serial_number
            };

            setIsActive(response.data.is_active)
            setExpireDeviceData(expireDeviceData)
        } catch (err) {
            console.error('Something went wrong:', err)
        }
    }, [userData.token, isActive])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'))
        if (items) {
            setUserData(items)
        }
    }, [userData.token])

    useEffect(() => {
        fetchExpireDeviceData()
    }, [fetchExpireDeviceData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                formRef.current && !formRef.current.contains(event.target) &&
                avatarRef.current && !avatarRef.current.contains(event.target)
            ) {
                setIsUserOptions(false)
            }
        };

        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout(navigate))
    }

    const navigateUserProfile = () => {
        navigate('/profile')
    }

    const toggleUserOptions = () => {
        setIsUserOptions((prevState) => !prevState)
    };

    if (!userData.token) {
        return <Spin size="large"/>
    }

    const isExpiredSoon = expireDeviceData.min_day_to_expire <= 5; // E.g., expires in 5 or fewer days
    const isWarning = expireDeviceData.min_day_to_expire <= 10; // E.g., expires in 10 or fewer days

    return (
        <section className={`header${isCollapse ? ' close' : ''}${isActive ? '' : ' inactive'}`}>
            <div className="header-content">
                <div className="header-left">
                    <a href="/analysis" className="logo">
                        <img src={images.logo_hat} alt="logo"/>
                    </a>
                    {expireDeviceData.min_day_to_expire !== null && (
                        <span className={`expiration ${isExpiredSoon ? 'alert' : isWarning ? 'warning' : ''}`}>
                            {expireDeviceData.min_day_to_expire} day(s) left to turn off the device {expireDeviceData.min_day_to_expire_serial_number}
                        </span>
                    )}
                </div>

                <div className="header-center">
                    <SearchComponent t={t} searchText={searchText} setSearchText={setSearchText}/>
                </div>

                <div className="header-right">
                    <div className="user_info">
                        <Localization/>
                        <NotificationOutlined className="header_notification"/>
                        <div className="header_user_data">
                            <span>{userData.data.username}</span>
                            <span>{userData.data.is_superuser ? 'Admin' : 'Client'}</span>
                        </div>
                        {/*<Avatar*/}
                        {/*    size={30}*/}
                        {/*    icon={<UserOutlined/>}*/}
                        {/*    className="user_avatar"*/}
                        {/*    onClick={toggleUserOptions}*/}
                        {/*    ref={avatarRef}*/}
                        {/*/>*/}
                        <img src={images.greyAvatar} className="user_avatar" onClick={toggleUserOptions} ref={avatarRef}
                             alt="avatar"/>
                        {isUserOptions && (
                            <div ref={formRef} className={`header-menu${isUserOptions ? ' show-menu' : ''}`}>
                                <ul className="user-menu">
                                    <li onClick={navigateUserProfile}>
                                        <UserRoundCog size={18} color="#6cb4fc"/>
                                        <span>{t('header.userMenuBar.column1')}</span>
                                    </li>
                                    <hr/>
                                    <li>
                                        {/*<img src={images.activity_log} alt="activity"/>*/}
                                        <MessageCircleMore size={18} color="#ac9cfc"/>
                                        <span><Link to={`/feedback/`}>{t('header.userMenuBar.column2')}</Link></span>
                                    </li>
                                    <hr/>
                                    <Link to="/">
                                        <li onClick={handleLogout} role="button" tabIndex={0}>
                                            {/*<img src={images.logout} alt="log out"/>*/}
                                            <LogOut size={18} color="#fc9c9c"/>
                                            <span>{t('header.userMenuBar.column3')}</span>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
