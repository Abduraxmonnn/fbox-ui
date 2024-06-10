import {
	DesktopOutlined,
	ProfileOutlined,
	PieChartOutlined,
	DollarOutlined,
	MessageOutlined,
	CheckCircleOutlined,
	ClusterOutlined,
	ApiOutlined,
	FileDoneOutlined, QuestionCircleOutlined, AlertOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	}
}

export const items = [
	getItem(
		'Analysis',
		'analysis_item',
		<Link to='/analysis'>
			<PieChartOutlined />
		</Link>
	),
	getItem('Devices', 'devices_item', <DesktopOutlined />, [
		getItem(
			'Company',
			'devices_company_item',
			<Link to='/company'>
				<ProfileOutlined />
			</Link>
		),
		getItem(
			'Device',
			'devices_device_item',
			<Link to='/device'>
				<DesktopOutlined />
			</Link>
		),
		getItem(
			'Status',
			'devices_status_item',
			<Link to='/device/status'>
				<CheckCircleOutlined />
			</Link>
		),
		getItem(
			'SMS',
			'devices_sms_item',
			<Link to='/sms'>
				<MessageOutlined />
			</Link>
		),
		getItem(
			'Versions',
			'devices_versions_item',
			<Link to='/version'>
				<ClusterOutlined />
			</Link>
		),
	]),
	getItem(
		'Orders',
		'orders_orders_item',
		<Link to='/orders'>
			<FileDoneOutlined />
		</Link>
	),
	getItem(
		'Z-Reports',
		'zreports_item',
		<Link to='/z-reports'>
			<AlertOutlined />
		</Link>
	),
	getItem('Equipments', 'equipments_equipment_item', <ApiOutlined />),
	getItem('Pricing', 'pricing_pricing_item', <DollarOutlined />),
]
