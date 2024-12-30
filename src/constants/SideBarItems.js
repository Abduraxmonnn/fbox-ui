// import {
//     PieChartOutlined,
//     MessageOutlined,
//     CheckCircleOutlined,
//     ClusterOutlined,
//     FileDoneOutlined,
//     CreditCardOutlined,
//     HistoryOutlined
// } from '@ant-design/icons'
import {
    IoGiftOutline,
    IoSnowOutline,
    IoCloudOutline,
    IoStarOutline,
    IoHomeOutline,
    IoPeopleOutline,
    IoMoonOutline,
    IoCalendarOutline
} from 'react-icons/io5';
import {Link} from 'react-router-dom'
import {Landmark} from 'lucide-react';
import {MailOutlined} from "@ant-design/icons";

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
            {/*<PieChartOutlined/>*/}
            <IoSnowOutline/>
        </Link>
    ),
    getItem(
        'Company',
        'devices_company_item',
        <Link to='/devices/company'>
            {/*<Landmark size={14}/>*/}
            <IoHomeOutline/>
        </Link>
    ),
    getItem(
        'Devices',
        'devices_status_item',
        <Link to='/devices/status'>
            {/*<CheckCircleOutlined/>*/}
            <IoStarOutline/>
        </Link>
    ),
    // <HistoryOutlined/>
    getItem('Logs', 'payments_items', <IoCalendarOutline/>, [
        getItem(
            'Payment Logs',
            'log_payments_items',
            <Link to='/payments/logs'>
                {/*<CreditCardOutlined/>*/}
                <IoMoonOutline />
            </Link>
        ),
        getItem(
            'SMS',
            'sms_payments_items',
            <Link to='/payments/sms'>
                {/*<MessageOutlined/>*/}
                <IoPeopleOutline />
            </Link>
        ),
        getItem(
            'Email',
            'email_payments_items',
            <Link to='/email/list'>
                <MailOutlined/>
            </Link>
        ),
    ]),
    getItem(
        'Orders',
        'orders_orders_item',
        <Link to='/orders'>
            {/*<FileDoneOutlined/>*/}
            <IoGiftOutline/>
        </Link>
    ),
    getItem(
        'Versions',
        'devices_versions_item',
        <Link to='/devices/version'>
            {/*<ClusterOutlined/>*/}
            <IoCloudOutline/>
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
