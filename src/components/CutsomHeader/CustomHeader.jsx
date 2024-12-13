import {UserOutlined, NotificationOutlined} from '@ant-design/icons'
import {UserRoundCog, MessageCircleMore, LogOut} from "lucide-react";
import {Avatar} from 'antd'
import {Link} from 'react-router-dom'
import React, {useState} from 'react'
import CustomHeaderStyle from "./CustomHeaderStyle"
import {images} from '../../constants'
import './CustomHeader.scss'

const CustomHeader = (props) => {
    const [isUserOptions, setIsUserOptions] = useState(false)

    return (
        <>
            <CustomHeaderStyle className='header'>
                <img src={images.logo} alt='logo'/>
                <div className='search'>
                    <input
                        type='text'
                        id='search'
                        placeholder='Search...'
                        className='search_input'
                    />
                </div>
                <div className='user_info'>
                    <NotificationOutlined className='header_notification'/>
                    <div className='header_user_data'>
                        <span className='header_user_username'>Dua Lipa</span>
                        <span className='header_user_role'>Admin</span>
                    </div>
                    <Avatar
                        size={30}
                        icon={<UserOutlined/>}
                        className='user_avatar'
                        onClick={() => setIsUserOptions(prev => !prev)}
                    />
                    {isUserOptions && (
                        <div
                            className={`header-menu${
                                isUserOptions ? ' show-menu' : ''
                            }`}
                        >
                            <ul>
                                <li>
                                    <UserRoundCog size={18} color="#6cb4fc"/>
                                    <span>Manage Account</span>
                                </li>
                                <hr/>
                                <li>
                                    <MessageCircleMore size={18} color="#ac9cfc"/>
                                    <span>Activity Log</span>
                                </li>
                                <hr/>
                                <Link to='/sign_in'>
                                    <li>
                                        <LogOut size={18} color="#fc9c9c"/>
                                        <span>Log out</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
            </CustomHeaderStyle>
        </>
    )
}

export default CustomHeader
