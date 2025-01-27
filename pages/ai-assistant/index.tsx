import MainLayout from "@/components/general/MainLayout"


import { useEffect, useState } from "react"
import { Modal } from "antd"
import Canvas, { initialEdges, initialNodes } from "@/components/ai-assistant/editor/Canvas"
import NodeBar from "@/components/ai-assistant/editor/NodeBar"
import TabNavigation from "@/components/ai-assistant/editor/TabNavigation"
import { useEdgesState, useNodesState } from "reactflow"
import { useWorkflow } from "@/hooks/workflow/useWorkflow"
import { ErrorResponse, getPipelineStatus, SuccessResponse } from "@/services/PipelineServices"
import { resetWorkflow, saveWorkflow } from "@/services/WorkflowServices"



const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { workflow, workflowId, isLoading, agent } = useWorkflow();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [pipelineStatus, setPipelineStatus] = useState("");
    const [errorPipeline, setErrorPipeline] = useState("");


    useEffect(() => {
        const getStatus = async () => {
            const res = await getPipelineStatus(workflowId || "")

            if ((res as ErrorResponse).error) {
                const errResponse = res as ErrorResponse;
                setErrorPipeline(errResponse.error)
            } else {
                const response = res as SuccessResponse
                setPipelineStatus(response.status);
            }
        }

        getStatus();
    }, [])

    const handleSaveWorkflow = async () => {
        console.log(nodes, workflow)
        const results = await saveWorkflow(nodes, edges, workflow, agent?._id || "");

        if (results.success) {
            window.location.reload();
            return;
        }
    }

    const handleResetWorkflow = async () => {
        const results = await resetWorkflow(initialNodes, initialEdges, workflowId || "", agent?._id || "");

        if (results.success) {
            window.location.reload();
            return;
        }

        window.alert(`Error: ${results.error}`)
    }

    return (
        <MainLayout>
            <>
                <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
                        <p>Caller flow has been saved successfully</p>
                    </div>
                </Modal>
                <div id="modal-root"></div>
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
                            workflowId={workflowId || ""}
                            saveWorkflow={handleSaveWorkflow}
                            resetWorkFlow={handleResetWorkflow}
                            pipelineStatus={pipelineStatus}
                            setPipelineStatus={setPipelineStatus}
                            setErrorPipeline={setErrorPipeline}
                        />
                        {
                            errorPipeline
                                ?
                                <div style={{ width: "100%", display: "flex", paddingRight: 12 }}>
                                    <p style={{ color: "red", marginLeft: "auto", fontSize: "12px" }}>
                                        {errorPipeline}
                                    </p>
                                </div>
                                :
                                <></>
                        }
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