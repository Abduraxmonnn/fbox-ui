import { Layout } from 'antd';
import SideBar from './SideBar';

const { Header: AntHeader, Content, Sider } = Layout;

const RootLayout = () => {
	return (
		<Layout>
			<SideBar />
		</Layout>
	)
}

export default RootLayout
