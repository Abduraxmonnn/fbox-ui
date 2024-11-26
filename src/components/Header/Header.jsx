import React, {useState, useEffect, useRef} from 'react';
import {Avatar, Spin} from 'antd';
import {UserOutlined, NotificationOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import {images} from '../../constants';
import {logout} from '../../store/auth/user.action';
import SearchComponent from '../Search/Search';
import './Header.scss';
import {fetchExpireDeviceData} from "../../utils";

const Header = ({isCollapse, searchText, setSearchText}) => {
    const [isUserOptions, setIsUserOptions] = useState(false)
    const formRef = useRef()
    const avatarRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    // const [isActive, setIsActive] = useState({})
    // const [userData, setUserData] = useState({})

    const isActive = useSelector((state) => state.isActive);
    const expireDeviceData = useSelector((state) => state.expireDeviceData);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'))
        if (items) {
            setUserData(items)
        }
        fetchExpireDeviceData(items.data.username, userData.token, dispatch);
    }, [dispatch, userData.token, isActive])

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

    const toggleUserOptions = () => {
        setIsUserOptions((prevState) => !prevState)
    };

    if (!userData.token) {
        return <Spin size="large"/>
    }

    return (
        // <section className={`header${isCollapse ? ' close' : ''}`}>
        <section className={`header${isCollapse ? ' close' : ''}${isActive ? '' : ' inactive'}`}>
            <a href="/analysis"><img src={images.logo} alt="logo"/></a>
            <SearchComponent searchText={searchText} setSearchText={setSearchText}/>
            <div className="user_info">
                <NotificationOutlined className="header_notification"/>
                <div className="header_user_data">
                    <span>{userData.data.username}</span>
                    <span>{userData.data.is_superuser ? 'Admin' : 'Client'}</span>
                </div>
                <Avatar
                    size={30}
                    icon={<UserOutlined/>}
                    className="user_avatar"
                    onClick={toggleUserOptions}
                    ref={avatarRef}
                />
                {isUserOptions && (
                    <div ref={formRef} className={`header-menu${isUserOptions ? ' show-menu' : ''}`}>
                        <ul>
                            <li>
                                <img src={images.manage_account} alt="manage"/>
                                <span>Manage Account</span>
                            </li>
                            <hr/>
                            <li>
                                <img src={images.activity_log} alt="activity"/>
                                <span><Link to={`/feedback/`}>Feedback</Link></span>
                            </li>
                            <hr/>
                            <Link to="/">
                                <li onClick={handleLogout} role="button" tabIndex={0}>
                                    <img src={images.logout} alt="log out"/>
                                    <span>Log out</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Header;
