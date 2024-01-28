import { useState } from 'react'
import { images } from '../../constants'
import { UserOutlined, NotificationOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import './Header.scss'
import { Link } from 'react-router-dom'

const Header = (props) => {
	const [isUserOptions, setIsUserOptions] = useState(false)

	return (
		<section className={`header${props.isCollapse ? ' close' : ''}`}>
			<img src={images.logo} alt='logo' />
			<div className='search'>
				<input
					type='text'
					id='search'
					placeholder='Search...'
					className='search_input'
				/>
			</div>
			<div className='user_info'>
				<NotificationOutlined className='header_notification' />
				<div className='header_user_data'>
					<span>Dua Lipa</span>
					<span>Admin</span>
				</div>
				<Avatar
					size={30}
					icon={<UserOutlined />}
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
								<img src={images.manage_account} alt='manage' />
								<span>Manage Account</span>
							</li>
							<hr />
							<li>
								<img src={images.activity_log} alt='activity' />
								<span>Activity Log</span>
							</li>
							<hr />
							<Link to='/sign_in'>
								<li>
									<img src={images.logout} alt='log out' />
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
