import { Layout, Drawer, Affix } from 'antd'
import { SideBar } from '../components/'
import Sms from './Sms'

const { Header: AntHeader, Content, Sider } = Layout

const Home = () => {
	return (
		<Layout>
			<SideBar />
		</Layout>
	)
}

export default Home
