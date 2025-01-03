import React, {useState, useEffect} from 'react';
import SideBarItems from "../constants/SideBarItems";
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import Header from '../components/Header/Header';
import {useLocation, NavLink, Outlet} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const {Content, Footer, Sider} = Layout;

const SideBar = () => {
    const {t} = useTranslation();
    const items = SideBarItems(t);
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken()
    const [placement, setPlacement] = useState('right')
    const [searchText, setSearchText] = useState('')

    let {pathname} = useLocation();
    pathname = pathname.replace('/', '')

    useEffect(() => {
        if (pathname === 'rtl') {
            setPlacement('left')
        } else {
            setPlacement('right')
        }
    }, [pathname])

    return (
        <section className='sidebar'>
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    theme='light'
                >
                    <div className='demo-logo-vertical'/>
                    <Menu defaultSelectedKeys={['1']} mode='inline' items={items}/>
                </Sider>
                <Layout>
                    <Header isCollapse={collapsed} searchText={searchText} setSearchText={setSearchText}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>
                                <NavLink to='/analysis'>Main</NavLink>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item style={{textTransform: 'capitalize'}}>
                                {pathname.replace('/', '')}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Outlet context={{searchText, setSearchText}}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        BCTechnologies ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        </section>
    )
}

export default SideBar;
