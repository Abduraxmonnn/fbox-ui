import './SideBar.scss'
import React, { useState } from 'react'
import {
	DesktopOutlined,
	ProfileOutlined,
	PieChartOutlined,
	TeamOutlined,
	DollarOutlined,
	MessageOutlined,
	CheckCircleOutlined,
	ClusterOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import { images } from '../../constants'

const { Content, Footer, Sider } = Layout
function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	}
}

const items = [
	getItem('Analysis', '1', <PieChartOutlined />),
	getItem('Devices', 'device1', <DesktopOutlined />, [
		getItem('Company', '3', <ProfileOutlined />),
		getItem('Device', '4', <DesktopOutlined />),
		getItem('SMS', '5', <MessageOutlined />),
		getItem('Versions', '5', <ClusterOutlined />),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem(
		'Orders',
		'10',
		<Link to='https://www.google.com/'>
			<CheckCircleOutlined />
		</Link>
	),
	getItem('Pricing', '9', <DollarOutlined />),
]

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	return (
		<section className='sidebar'>
			<Layout
				style={{
					minHeight: '100vh',
				}}
			>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={value => setCollapsed(value)}
					theme='light'
				>
					<div className='demo-logo-vertical' />
					<Menu
						defaultSelectedKeys={['1']}
						mode='inline'
						items={items}
					/>
				</Sider>
				<Layout>
					<Header />
					<Content
						style={{
							margin: '0 16px',
						}}
					>
						<Breadcrumb
							style={{
								margin: '16px 0',
							}}
						>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							Bill is a cat.
						</div>
					</Content>
					{/* Footer */}
				</Layout>
			</Layout>
		</section>
	)
}

export default SideBar
