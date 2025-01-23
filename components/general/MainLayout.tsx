import React, { useEffect, useState } from 'react'
import SidebarNav from '../dashboard/SidebarNav';
import { Layout } from 'antd';
import AppHeader from '../dashboard/AppHeader';
const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const [collapsed, setCollapsed] = useState(false);
    
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
            <AppHeader />
            <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} toggleCollapse={toggleCollapse} />
            <Layout style={{
                marginTop: 70,
                paddingLeft: collapsed ? 100 : 400,
                paddingRight: 100
            }}>
                <Content style={{
                    backgroundColor: "#2C2C2C",
                }}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
