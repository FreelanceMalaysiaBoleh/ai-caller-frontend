import React, { useEffect, useState } from 'react'
import SidebarNav from '../dashboard/SidebarNav';
import { Layout } from 'antd';
import AppHeader from '../dashboard/AppHeader';
import { responsiveValue, useScreenSize } from '@/context/ViewportContext';
import AppHeaderMobile from '../dashboard/AppHeaderMobile';
const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const [collapsed, setCollapsed] = useState(false);
    const size = useScreenSize();

    useEffect(() => {
        // Only access localStorage on the client
        const savedState = localStorage.getItem("sidebar-collapsed");
        if (savedState !== null) {
            setCollapsed(savedState === "true");
        }
    }, []);

    const toggleCollapse = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem("sidebar-collapsed", newState.toString());
    };

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            {
                size == "small"
                    ?
                    <AppHeaderMobile />
                    :
                    <AppHeader />
            }

            {
                size == "small"
                    ?
                    <></>
                    :
                    <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} toggleCollapse={toggleCollapse} />

            }
            <Layout style={{
                marginTop: 70,
                paddingLeft: responsiveValue(size, 20, 100, collapsed ? 100 : 400),
                paddingRight: responsiveValue(size, 20, 50, 100),
            }}>
                <Content style={{
                    backgroundColor: "#2C2C2C",
                }}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
