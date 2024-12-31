import React from 'react'
import SidebarNav from '../dashboard/SidebarNav';
import { Layout } from 'antd';
import AppHeader from '../dashboard/AppHeader';
const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <AppHeader />
            <SidebarNav />
            <Layout style={{
                marginTop: 70,
                paddingLeft: 400,
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
