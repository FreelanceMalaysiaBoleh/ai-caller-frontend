import React from 'react'
import SidebarNav from '../dashboard/SidebarNav';
import { Flex, Layout } from 'antd';

const { Content } = Layout;

const MainLayout = ({ children }: any) => {

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <SidebarNav />
            <Layout style={{
                marginTop: 35,
                paddingLeft: 400,
                paddingRight: 100
            }}>
                <Content style={{
                    backgroundColor: "#F5F5F5",
                }}>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;