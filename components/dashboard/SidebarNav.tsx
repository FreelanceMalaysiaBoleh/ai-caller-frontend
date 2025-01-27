import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    SettingOutlined,
    BranchesOutlined,
    DatabaseOutlined,
    MessageOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { TbArrowBackUp } from 'react-icons/tb';

const { Sider } = Layout;

const SidebarNav = ({ collapsed, setCollapsed, toggleCollapse }: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>, toggleCollapse: () => void }) => {

    const router = useRouter();

    const ItemText = ({ text, isSelected }: { text: string, isSelected: boolean }) => {
        return <h2 style={{
            color: isSelected ? "#FFFFFF" : "#909090"
        }}>{text}</h2>
    }

    return (
        <Sider
            width={345}
            style={{
                minHeight: '100vh',
                backgroundColor: "#313B00",
                position: "fixed"
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
        >
            <Menu
                theme="dark"
                style={{
                    backgroundColor: "#2C2C2C",
                    paddingTop: 100,
                    width: "100%",
                    minHeight: "100vh",
                }}
                mode="inline"
                defaultSelectedKeys={[router.asPath]}
            >
                <div
                    onClick={toggleCollapse}
                    style={{
                        cursor: "pointer",
                        color: "#fff",
                        fontSize: 18,
                        paddingLeft: collapsed ? 32 : 26,
                        marginBottom: 50,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
                <Menu.Item
                    onClick={() => router.push("/")}
                    key="/"
                    icon={<HomeOutlined />}
                    style={{ marginBottom: 20 }}
                >
                    <ItemText text="Dashboard" isSelected={router.asPath === "/"} />
                </Menu.Item>
                <Menu.Item
                    onClick={() => router.push("/ai-assistant")}
                    key="/ai-assistant"
                    icon={<BranchesOutlined />}
                    style={{ marginBottom: 20 }}
                >
                    <ItemText
                        text="AI Assistant Blueprint"
                        isSelected={router.asPath === "/ai-assistant"}
                    />
                </Menu.Item>
                <Menu.Item
                    onClick={() => router.push("/data-management")}
                    key="2"
                    icon={<DatabaseOutlined />}
                    style={{ marginBottom: 20 }}
                >
                    <ItemText
                        text="Data Management"
                        isSelected={router.asPath === "/data-management"}
                    />
                </Menu.Item>
                <Menu.Item
                    key="4"
                    icon={<MessageOutlined />}
                    style={{ marginBottom: 20 }}
                >
                    <ItemText
                        text="Interaction Logs"
                        isSelected={router.asPath === "5"}
                    />
                </Menu.Item>
                <Menu.Item
                    onClick={() => router.push("/profile/123")}
                    key="6"
                    icon={<SettingOutlined />}
                    style={{ marginBottom: 20 }}
                >
                    <ItemText text="Settings" isSelected={router.asPath === "/profile/123"} />
                </Menu.Item>

                <div style={{
                    border: "2px solid #FFFFFF",
                    borderRadius: "5px",
                    backgroundColor: "#555555",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "3px",
                    height: "35px",
                    width: "35px",
                    cursor: "pointer",
                    marginLeft: 26,
                    marginTop: 50,
                }}
                    onClick={() => {
                        router.back()
                    }}
                >
                    <TbArrowBackUp size={100} color="#FFF" style={{ marginRight: "10px" }} />
                </div>
            </Menu>
        </Sider>
    );
};

export default SidebarNav;
