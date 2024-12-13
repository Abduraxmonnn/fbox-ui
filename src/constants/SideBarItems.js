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
    getItem(
        'Company',
        'devices_company_item',
        <Link to='/devices/company'>
            <ProfileOutlined/>
        </Link>
    ),
    getItem(
        'Devices',
        'devices_status_item',
        <Link to='/devices/status'>
            <CheckCircleOutlined/>
        </Link>
    ),
    getItem('Logs', 'payments_items', <HistoryOutlined/>, [
        getItem(
            'Payment Logs',
            'log_payments_items',
            <Link to='/payments/logs'>
                <CreditCardOutlined/>
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
    getItem(
        'Versions',
        'devices_versions_item',
        <Link to='/devices/version'>
            <ClusterOutlined/>
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
