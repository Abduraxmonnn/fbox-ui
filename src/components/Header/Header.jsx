import {useState, useEffect} from 'react';
import {Avatar, Button, Spin} from 'antd';
import {UserOutlined, NotificationOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

import {images} from '../../constants';
import {logout} from '../../store/auth/user.action';
import SearchComponent from '../Search/Search';
import './Header.scss';

const Header = ({isCollapse, searchText, setSearchText, isDarkMode, toggleTheme}) => {
    const [isUserOptions, setIsUserOptions] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'))
        if (items) {
            setUserData(items)
        }
    }, [userData.token])

    const handleLogout = () => {
        dispatch(logout(navigate))
    };

    if (!userData.token) {
        return <Spin size="large"/>
    }

    return (
        <section className={`header${isCollapse ? ' close' : ''}`}>
            <a href="/analysis"><img src={images.logo} alt="logo"/></a>
            <SearchComponent searchText={searchText} setSearchText={setSearchText}/>
            <div className="user_info">
                <Button
                    onClick={toggleTheme}
                    style={{
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {isDarkMode ? <SunOutlined/> : <MoonOutlined/>}
                </Button>
                <NotificationOutlined className="header_notification"/>
                <div className="header_user_data">
                    <span>{userData.data.username}</span>
                    <span>{userData.data.is_superuser ? 'Admin' : 'Client'}</span>
                </div>
                <Avatar
                    size={30}
                    icon={<UserOutlined/>}
                    className="user_avatar"
                    onClick={() => setIsUserOptions((prev) => !prev)}
                />
                {isUserOptions && (
                    <div className={`header-menu${isUserOptions ? ' show-menu' : ''}`}>
                        <ul>
                            <li>
                                <img src={images.manage_account} alt="manage"/>
                                <span>Manage Account</span>
                            </li>
                            <hr/>
                            <li>
                                <img src={images.activity_log} alt="activity"/>
                                <span>Activity Log</span>
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
    )
}

export default Header;
