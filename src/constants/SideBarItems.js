import {
    DesktopOutlined,
    ProfileOutlined,
    PieChartOutlined,
    MessageOutlined,
    CheckCircleOutlined,
    ClusterOutlined,
    FileDoneOutlined, RetweetOutlined, CreditCardOutlined, HistoryOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'

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
            <PieChartOutlined/>
        </Link>
    ),
    getItem('Devices', 'devices_item', <DesktopOutlined/>, [
        getItem(
            'Company',
            'devices_company_item',
            <Link to='/devices/company'>
                <ProfileOutlined/>
            </Link>
        ),
        getItem(
            'Device',
            'devices_subscription_item',
            <Link to='/devices/device'>
                <RetweetOutlined/>
            </Link>
        ),
        getItem(
            'Status',
            'devices_status_item',
            <Link to='/devices/status'>
                <CheckCircleOutlined/>
            </Link>
        ),
        getItem(
            'Versions',
            'devices_versions_item',
            <Link to='/devices/version'>
                <ClusterOutlined/>
            </Link>
        ),
    ]),
    getItem('Payments', 'payments_items', <CreditCardOutlined/>, [
        getItem(
            'Logs',
            'log_payments_items',
            <Link to='/payments/logs'>
                <HistoryOutlined/>
            </Link>
        ),
        // getItem(
        //     'Email',
        //     'email_payments_items',
        //     <Link to='/payments/email'>
        //         <MailOutlined/>
        //     </Link>
        // ),
        getItem(
            'SMS',
            'sms_payments_items',
            <Link to='/payments/sms'>
                <MessageOutlined/>
            </Link>
        ),
    ]),
    getItem(
        'Orders',
        'orders_orders_item',
        <Link to='/orders'>
            <FileDoneOutlined/>
        </Link>
    ),
    // getItem(
    // 	'Z-Reports',
    // 	'zreports_item',
    // 	<Link to='/z-reports'>
    // 		<AlertOutlined />
    // 	</Link>
    // ),
    // getItem('Equipments', 'equipments_equipment_item', <ApiOutlined />),
    // getItem('Pricing', 'pricing_pricing_item', <DollarOutlined />),
]
