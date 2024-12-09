import MainLayout from "@/components/general/MainLayout"


import { useState } from "react"
import { Modal } from "antd"
import Canvas from "@/components/ai-assistant/editor/Canvas"
import NodeBar from "@/components/ai-assistant/editor/NodeBar"
import TabNavigation from "@/components/ai-assistant/editor/TabNavigation"



const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <MainLayout>
            <>
                <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                        <p>Caller flow has been saved successfully</p>
                    </div>
                </Modal>
                <h1 style={{ fontSize: "18px" }}>Construct your own logic</h1>
                <div style={{ marginTop: "20px" }}></div>
                <div style={{
                    display: 'flex',
                    height: '100vh',
                    marginBottom: "100px",
                    borderLeft: '1px solid white',
                    borderTop: '1   px solid white',
                }}>
                    <div style={{ flex: 1, marginLeft: 20 }}>
                        <TabNavigation />
                        <div style={{
                            boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                            marginTop: 10
                        }}>
                            <Canvas />
                        </div>
                    </div>

                    <NodeBar />
                </div>
            </>
        </MainLayout>
    )
}

export default Index;