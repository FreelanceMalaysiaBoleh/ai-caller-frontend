import { Layout } from 'antd';
import Image from 'next/image';
import logo from "../../public/images/logo.png"
import { removeToken } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { useGetAgent } from '@/hooks/agent/useGetAgent';

const { Header } = Layout;

const AppHeader = () => {
    const dispatch = useDispatch();
    const { agent } = useGetAgent();

    return (
        <Header
            style={{
                position: 'fixed',
                zIndex: 1000,
                width: '100%',
                backgroundColor: '#2C2C2C',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                paddingTop: "10px"
            }}
        >
            <Image src={logo} width={158} height={30} alt={"logo"} />
            <div
                style={{
                    borderLeft: "2px solid white",
                    height: 30,
                    marginLeft: 25,
                    marginRight: 25,
                }}
            ></div>
            <h2>{agent ? `${agent.name}`: "No agent created"}</h2>
            <div style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
                marginLeft: "auto",
            }}>
                <h2>Omantel Telecommunications</h2>
                <button
                    onClick={() => {
                        dispatch(removeToken());
                        window.location.reload();
                    }}
                    style={{
                        all: "unset",
                        cursor: "pointer",
                    }}
                >
                    <p

                        style={{
                            fontSize: "18px",
                            color: "#909090",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }}>Logout</p>
                </button>
            </div>
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                    marginLeft: 20
                }}
            >
                <img
                    src="https://picsum.photos/200"
                    alt="Avatar"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
        </Header>
    );
};

export default AppHeader;