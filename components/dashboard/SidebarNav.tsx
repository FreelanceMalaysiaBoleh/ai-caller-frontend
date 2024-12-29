import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    SettingOutlined,
    BranchesOutlined,
    DatabaseOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Sider } = Layout;

const   SidebarNav = () => {

    const router = useRouter();

    const ItemText = ({ text, isSelected }: { text: string, isSelected: boolean }) => {
        return <h2 style={{
            color: isSelected ? "#FFFFFF" : "#909090"
        }}>{text}</h2>
    }

    return (
        <Sider width={345} style={{ minHeight: '100vh', backgroundColor: "#313B00", position: "fixed" }}>
            <Menu
                theme="dark"
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    backgroundColor: "#2C2C2C",
                    paddingTop: 100, 
                    width: 345,
                    minHeight: '100vh'
                }}
                mode="inline"
                defaultSelectedKeys={[router.asPath]}
            >
                <Menu.Item onClick={() => {
                    router.push("/")
                }} style={{ marginBottom: 20, marginTop: 35 }} key="/" icon={<HomeOutlined />} >
                    <ItemText text='Dashboard' isSelected={router.asPath == "/"} />
                </Menu.Item>
                <Menu.Item onClick={() => {
                    router.push("/ai-assistant")
                }} style={{ marginBottom: 20 }} key="/ai-assistant" icon={<BranchesOutlined />}>
                    <ItemText text='AI Assistant Blueprint' isSelected={router.asPath == "/ai-assistant"} />
                </Menu.Item>
                <Menu.Item onClick={()=>{}} style={{ marginBottom: 20 }} key="2" icon={<DatabaseOutlined />}>
                    <ItemText text='Data Management' isSelected={router.asPath == "2"} />
                </Menu.Item>
                <Menu.Item style={{ marginBottom: 20 }} key="4" icon={<MessageOutlined />}>
                    <ItemText text='Interaction Logs' isSelected={router.asPath == "5"} />
                </Menu.Item>
                <Menu.Item style={{ marginBottom: "auto" }} key="6" icon={<SettingOutlined />}>
                    <ItemText text='Settings' isSelected={router.asPath == "4"} />
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarNav;
