import {
    PieChartOutlined,
    MessageOutlined,
    ClusterOutlined,
    FileDoneOutlined,
    CreditCardOutlined,
    HistoryOutlined,
    MailOutlined,
    DesktopOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {Landmark} from 'lucide-react';

export function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const SideBarItems = (t) => {
    return [
        getItem(
            t('sideBar.items.column1'),
            'analysis_item',
            <Link to='/analysis'>
                <PieChartOutlined/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column2'),
            'devices_company_item',
            <Link to='/devices/company'>
                <Landmark size={14}/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column3'),
            'devices_status_item',
            <Link to='/devices'>
                <DesktopOutlined/>
            </Link>
        ),
        getItem(t('sideBar.items.column4'), 'payments_items', <HistoryOutlined/>, [
            getItem(
                t('sideBar.items.column5'),
                'log_payments_items',
                <Link to='/payments/logs'>
                    <CreditCardOutlined/>
                </Link>
            ),
            getItem(
                t('sideBar.items.column6'),
                'sms_payments_items',
                <Link to='/payments/sms'>
                    <MessageOutlined/>
                </Link>
            ),
            getItem(
                t('sideBar.items.column7'),
                'email_payments_items',
                <Link to='/email/list'>
                    <MailOutlined/>
                </Link>
            ),
        ]),
        getItem(
            t('sideBar.items.column8'),
            'orders_orders_item',
            <Link to='/orders'>
                <FileDoneOutlined/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column9'),
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
}

export default SideBarItems;
