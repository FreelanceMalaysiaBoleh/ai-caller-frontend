import React, { Dispatch, MouseEvent, SetStateAction } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/router";
import {
    HomeOutlined,
    SettingOutlined,
    BranchesOutlined,
    DatabaseOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { removeToken } from "@/redux/authSlice";

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavModal = ({ open, setOpen }: ModalProps) => {

    const closeModal = () => setOpen(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const ItemText = ({ text, isSelected }: { text: string, isSelected: boolean }) => {
        return <h2 style={{
            color: isSelected ? "#FFFFFF" : "#909090"
        }}>{text}</h2>
    }

    // Reusable style objects
    const overlayStyle = {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };

    const modalStyle = {
        width: "100%",
        height: "100%",
        backgroundColor: "#3e3e3e",
        borderRadius: "10px",
        padding: 20
    };


    return (
        <div>
            {open && (
                <div onClick={closeModal} style={overlayStyle}>
                    <div onClick={handleContentClick} style={{ ...modalStyle, overflowY: "scroll" }}>
                        <div style={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "start"
                        }}>
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
                                marginBottom: 40,
                            }}
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                <TbArrowBackUp size={100} color="#FFF" style={{ marginRight: "10px" }} />
                            </div>

                            <div
                                onClick={() => router.push("/")}
                                style={{ color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <HomeOutlined />
                                <p style={{ marginLeft: 10 }}>
                                    <ItemText text="Dashboard" isSelected={router.asPath === "/"} />
                                </p>
                            </div>

                            <div
                                onClick={() => router.push("/ai-assistant")}
                                style={{ color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <BranchesOutlined />
                                <p style={{ marginLeft: 10 }}>
                                    <ItemText text="AI Assistant Blueprint" isSelected={router.asPath === "/ai-assistant"} />
                                </p>
                            </div>

                            <div
                                onClick={() => router.push("/data-management")}
                                style={{ color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <DatabaseOutlined />
                                <p style={{ marginLeft: 10 }}>
                                    <ItemText text="Data Management" isSelected={router.asPath === "/data-management"} />
                                </p>
                            </div>

                            <div
                                style={{ color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <MessageOutlined />
                                <p style={{ marginLeft: 10 }}>
                                    <ItemText text="Interaction Logs" isSelected={router.asPath === "5"} />
                                </p>
                            </div>

                            <div
                                onClick={() => router.push("/profile")}
                                style={{ color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <SettingOutlined />
                                <p style={{ marginLeft: 10 }}>
                                    <ItemText text="Settings" isSelected={router.asPath === "/profile"} />
                                </p>
                            </div>


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
                                <h2

                                    style={{
                                        fontSize: "18px",
                                        color: "#909090",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>Logout</h2>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavModal;
