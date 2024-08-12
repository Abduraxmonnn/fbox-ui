import { Layout, Drawer, Affix } from 'antd';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const { Header: AntHeader, Content, Sider } = Layout;

const RootLayout = ({ isDarkMode, toggleTheme }) => {
	return (
		<Layout>
			<SideBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
			<h1>Hello World</h1>
		</Layout>
	)
}

export default RootLayout
