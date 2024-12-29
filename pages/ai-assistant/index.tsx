import MainLayout from "@/components/general/MainLayout"


import { useState } from "react"
import { Modal } from "antd"
import Canvas, { initialEdges, initialNodes } from "@/components/ai-assistant/editor/Canvas"
import NodeBar from "@/components/ai-assistant/editor/NodeBar"
import TabNavigation from "@/components/ai-assistant/editor/TabNavigation"
import { useEdgesState, useNodesState } from "reactflow"
import { useWorkflow } from "@/hooks/useWorkflow"
import axios from "axios"



const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const workflowId = "67710f9ff48d7283d5471c70";

    const { workflow, isLoading } = useWorkflow(workflowId);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const handleSaveWorkflow = async () => {
        console.log(nodes, edges)
        const payload = { nodes, edges };

        if (workflow) {
            console.log("saving workflow")
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${workflow.workflow_id}`, payload);
                console.log("Success:", response.data);
            } catch (error) {
                console.log("Error:", error)
            }
        } else {
            console.log("saving workflow")
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows`, payload);
                console.log("Success:", response.data);
            } catch (error) {
                console.log("Error:", error)
            }
        }

    }

    const handleResetWorkflow = async () => {
        const payload = {
            nodes: initialNodes,
            edges: initialEdges
        }
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${workflowId}`, payload);

        window.location.reload();
    }

    console.log(workflow);

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
                        <TabNavigation
                            saveWorkflow={handleSaveWorkflow}
                            resetWorkFlow={handleResetWorkflow}
                        />
                        <div style={{
                            boxShadow: '0px 8px 16px 4px rgba(0, 0, 0, 0.3)',
                            marginTop: 10
                        }}>
                            <Canvas
                                workflow={workflow}
                                isLoading={isLoading}
                                handleSaveWorkflow={(handleSaveWorkflow)}
                                nodes={nodes}
                                edges={edges}
                                setNodes={setNodes}
                                setEdges={setEdges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                            />
                        </div>
                    </div>

                    <NodeBar />
                </div>
            </>
        </MainLayout>
    )
}

export default Index;