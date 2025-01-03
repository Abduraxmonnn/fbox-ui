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

const SideBarItems = (t) => {
    return [
        getItem(
            t('sideBar.items.column1'),
            'analysis_item',
            <Link to='/analysis'>
                {/*<PieChartOutlined/>*/}
                <IoSnowOutline/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column2'),
            'devices_company_item',
            <Link to='/devices/company'>
                {/*<Landmark size={14}/>*/}
                <IoHomeOutline/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column3'),
            'devices_status_item',
            <Link to='/devices'>
                {/*<CheckCircleOutlined/>*/}
                <IoStarOutline/>
            </Link>
        ),
        // <HistoryOutlined/>
        getItem(t('sideBar.items.column4'), 'payments_items', <IoCalendarOutline/>, [
            getItem(
                t('sideBar.items.column5'),
                'log_payments_items',
                <Link to='/payments/logs'>
                    {/*<CreditCardOutlined/>*/}
                    <IoMoonOutline/>
                </Link>
            ),
            getItem(
                t('sideBar.items.column6'),
                'sms_payments_items',
                <Link to='/payments/sms'>
                    {/*<MessageOutlined/>*/}
                    <IoPeopleOutline/>
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
                {/*<FileDoneOutlined/>*/}
                <IoGiftOutline/>
            </Link>
        ),
        getItem(
            t('sideBar.items.column9'),
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
}

export default SideBarItems;
