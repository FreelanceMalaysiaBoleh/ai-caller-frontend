import { useState, useEffect } from "react";
import axios from "axios";
import { Edge, Node } from "reactflow";
import { getAgents } from "@/services/AgentServices";
import { useGetToken } from "@/services/AuthServices";
import { AgentTypes } from "../agent/useGetAgent";

export type WorkFlowType = {
    workflow_id: string,
    workflow_name: string,
    workflow_description: string,
    nodes: Node[],
    edges: Edge[]

}

export const useWorkflow = (): { workflow: WorkFlowType | undefined, workflowId: string | undefined, agent: AgentTypes | undefined, isLoading: boolean } => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [workflow, setWorkflow] = useState<WorkFlowType | undefined>(undefined);
    const [agent, setAgent] = useState<AgentTypes | undefined>(undefined);
    const token = useGetToken();

    useEffect(() => {
        const fetchWorkflow = async () => {
            setIsLoading(true);
            try {
                const getAgentRes = await getAgents(token);

                if (!getAgentRes.success) throw new Error("Error getting agent")

                const agents: AgentTypes[] = getAgentRes.data;

                if (agents.length < 0) throw new Error("No agent found");

                const agent = agents[0];
                setAgent(agent);

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${agent.workflow_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setWorkflow(response.data);
            } catch (error) {
                console.log("errored man:")
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkflow();

    }, [token]);

    const workflowId = workflow?.workflow_id;

    // console.log(workflow)
    // console.log(workflowId)

    return { workflow, workflowId, isLoading, agent };
};