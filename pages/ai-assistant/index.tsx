import MainLayout from "@/components/general/MainLayout"
import OpenAiIcon from "@/public/images/open-ai-icon.png"
import MetaAiIcon from "@/public/images/meta-icon.png"
import MySQLIcon from "@/public/images/Mysql_logo.png"
import WeaviateIcon from "@/public/images/weaviate-logo.png"

import Board from "@/components/ai-assistant/Board"
import Node from "@/components/ai-assistant/Node"
import { useDrag } from "react-dnd"
import { useState } from "react"
import { Modal } from "antd"



const index = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <MainLayout>
            <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <div style={{height: "70px", display: "flex", alignItems: "center"}}>
                    <p>Caller flow has been saved successfully</p>
                </div>
            </Modal>
            <h1>AI Assistant</h1>
            <div style={{ marginBottom: "10px" }}></div>
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <p style={{
                    marginRight: "auto"
                }}>Build your custom caller flow</p>
                <button
                    style={{
                        backgroundColor: isHovered ? "#6f7f38" : "#849249",
                        border: "none",
                        borderRadius: 5,
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 5,
                        paddingBottom: 5,
                        fontSize: "25px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setIsModalOpen(true)
                    }}
                >
                    <b>Save</b>
                </button>
            </div>


            <div style={{ marginTop: "20px" }}></div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "700px",
                maxHeight: "700px",
            }}>
                <div style={{
                    borderRadius: 20,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "80%",
                    marginRight: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                }}>
                    <Board />
                </div>

                <div style={{
                    borderRadius: 20,
                    backgroundColor: "white",
                    flex: 1,
                    paddingLeft: 10,
                    paddingRight: 10,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    overflowY: "scroll"
                }}>
                    <Node
                        id="openai"
                        desc="Accept prompt using AI"
                        color="green"
                        imgsrc={OpenAiIcon.src}
                    />
                    <Node
                        id="metaai"
                        desc="Accept prompt using AI"
                        color="blue"
                        imgsrc={MetaAiIcon.src}
                        imgWidth={100}
                    />
                    <Node
                        id="getcustomer"
                        desc="Get customer data from database"
                        color="#c23beb"
                    />

                    <Node
                        id="updateticket"
                        desc="Update ticket"
                        color="brown"
                    />

                    <Node
                        id="storedbsql"
                        desc="Store into database"
                        color="#5184d6"
                        imgWidth={100}
                        imgsrc={MySQLIcon.src}
                    />

                    <Node
                        id="storedbweave"
                        desc="Store into database"
                        color="#1d994f"
                        imgsrc={WeaviateIcon.src}
                    />

                    {/* <Node
                            id="addprompt"
                            desc="Add prompt"
                            color="#bd1756"
                        /> */}

                </div>
            </div>
        </MainLayout>
    )
}

export default index;