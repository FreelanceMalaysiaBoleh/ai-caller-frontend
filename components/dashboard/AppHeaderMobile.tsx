import { Layout } from 'antd';
import Image from 'next/image';


import {
    MenuFoldOutlined,
} from '@ant-design/icons';
import { useGetAgent } from '@/hooks/agent/useGetAgent';
import NavModal from './NavModal';
import { useState } from 'react';
import logo from "../../public/images/logo.png"

const { Header } = Layout;

const AppHeaderMobile = () => {

    const { agent } = useGetAgent();
    const [open, setOpen] = useState(false);

    return (
        <Header
            style={{
                position: 'fixed',
                zIndex: 1000,
                width: '100%',
                backgroundColor: '#2C2C2C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                paddingTop: "10px"
            }}
        >
            <NavModal open={open} setOpen={setOpen} />
            <div
                onClick={() => {setOpen(true) }}
                style={{
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: 18,
                    marginRight: 10
                }}
            >
                <MenuFoldOutlined />
            </div>

            <h2 style={{ fontSize: 20, lineHeight: 1 }}>{agent ? `${agent.name}` : "No agent created"}</h2>
            <Image
                style={{
                    marginLeft: "auto"
                }}
                src={logo}
                width={100}
                height={19}
                alt={"logo"}
            />


        </Header>
    );
};

export default AppHeaderMobile;