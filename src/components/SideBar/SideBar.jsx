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
	ApiOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import CustomHeader from '../CutsomHeader/CustomHeader'
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
	getItem('Analysis', 'analysis_item', <PieChartOutlined />),
	getItem('Devices', 'devices_item', <DesktopOutlined />, [
		getItem('Company', 'devices_company_item', <ProfileOutlined />),
		getItem('Device', 'devices_device_item', <DesktopOutlined />),
		getItem('SMS', 'devices_sms_item', <MessageOutlined />),
		getItem('Versions', 'devices_versions_item', <ClusterOutlined />),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem(
		'Orders',
		'orders_orders_item',
		<Link to='https://www.google.com/' target='_blank'>
			<CheckCircleOutlined />
		</Link>
	),
	getItem('Pricing', 'pricing_pricing_item', <DollarOutlined />),
	getItem('Equipments', 'equipments_equipment_item', <ApiOutlined />),
]

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	console.log('-----> ', items)

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
					<Header isCollapse={collapsed} />
					{/* <CustomHeader /> */}
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
