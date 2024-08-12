import { Layout } from 'antd';
import SideBar from './SideBar';

const { Header: AntHeader, Content, Sider } = Layout;

const RootLayout = () => {
	return (
		<Layout>
			<SideBar />
			<h1>Hello World</h1>
		</Layout>
	)
}

export default RootLayout
