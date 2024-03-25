import React, { useState, useEffect } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import Header from '../components/Header/Header'
import { items } from '../constants'
import { useLocation, NavLink, Outlet } from 'react-router-dom'

const { Content, Footer, Sider } = Layout

const SideBar = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()
	const [placement, setPlacement] = useState('right')

	let { pathname } = useLocation()
	pathname = pathname.replace('/', '')

	useEffect(() => {
		if (pathname === 'rtl') {
			setPlacement('left')
		} else {
			setPlacement('right')
		}
	}, [pathname])

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
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>
								<NavLink to='/analysis'>Main</NavLink>
							</Breadcrumb.Item>
							<Breadcrumb.Item
								style={{ textTransform: 'capitalize' }}
							>
								{pathname.replace('/', '')}
							</Breadcrumb.Item>
						</Breadcrumb>
						<Outlet />
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						BCTechnologies ©{new Date().getFullYear()}
					</Footer>
				</Layout>
			</Layout>
		</section>
	)
}

export default SideBar
