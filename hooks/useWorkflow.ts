import { useState, useEffect } from "react";
import axios from "axios";
import { Edge, Node } from "reactflow";

export type WorkFlowType = {
    workflow_id: string,
    workflow_name: string,
    workflow_description: string,
    nodes: Node[],
    edges: Edge[]

}

export const useWorkflow = (id: string): { workflow: WorkFlowType | undefined, isLoading: boolean } => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [workflow, setWorkflow] = useState<WorkFlowType | undefined>(undefined);

    useEffect(() => {
        const fetchWorkflow = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${id}`
                );
                setWorkflow(response.data);
            } catch (error) {
                console.log("errored man:")
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchWorkflow();
        }
    }, [id]);

    return { workflow, isLoading };
};