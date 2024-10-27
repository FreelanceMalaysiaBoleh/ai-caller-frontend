import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    SettingOutlined,
    FileTextOutlined,
    LogoutOutlined,
    BarChartOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Sider } = Layout;

const SidebarNav = () => {

    const router = useRouter();

    console.log(router.asPath);

    return (
        <Sider width={345} style={{ minHeight: '100vh', backgroundColor: "#313B00", position: "fixed" }}>
            <Menu theme="dark" style={{ display: 'flex', flexDirection: "column", backgroundColor: "#313B00", width: 345, minHeight: '100vh' }} mode="inline" defaultSelectedKeys={[router.asPath]}>
                <Menu.Item onClick={()=>{
                    router.push("/")
                }} style={{ marginBottom: 20, marginTop: 35 }} key="/" icon={<HomeOutlined />} >
                    <h2>Home</h2>
                </Menu.Item>
                <Menu.Item style={{ marginBottom: 20 }} key="2" icon={<UserOutlined />}>
                    <h2>Profile</h2>
                </Menu.Item>
                <Menu.Item onClick={()=>{
                    router.push("/ai-assistant")
                }} style={{ marginBottom: 20 }} key="/ai-assistant" icon={<SmileOutlined />}>
                    <h2>AI Assistant</h2>
                </Menu.Item>
                <Menu.Item style={{ marginBottom: 20 }} key="4" icon={<FileTextOutlined />}>
                    <h2>Data Management</h2>
                </Menu.Item>
                <Menu.Item style={{ marginBottom: 20 }} key="5" icon={<BarChartOutlined />}>
                    <h2>Interaction Logs</h2>
                </Menu.Item>
                <Menu.Item style={{ marginBottom: "auto" }} key="6" icon={<SettingOutlined />}>
                    <h2>Settings</h2>
                </Menu.Item>
                <Menu.Item style={{ marginBottom: 20 }} key="7" icon={<LogoutOutlined />}>
                    <h2>Logout</h2>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarNav;
