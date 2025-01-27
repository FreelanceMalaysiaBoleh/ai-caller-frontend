import { useState, useEffect } from "react";
import axios from "axios";
import { Edge, Node } from "reactflow";
import { getToken } from "@/services/AuthServices";

export type WorkFlowType = {
  workflow_id: string,
  workflow_name: string,
  workflow_description: string,
  nodes: Node[],
  edges: Edge[]

}

export const useWorkflows = (): { workflows: WorkFlowType[] | undefined, isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workflows, setWorkflow] = useState<WorkFlowType[] | undefined>(undefined);

  useEffect(() => {
    const fetchWorkflow = async () => {
      const token = getToken();
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows`,
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

  }, []);

  console.log(workflows);   

  return { workflows, isLoading };
};