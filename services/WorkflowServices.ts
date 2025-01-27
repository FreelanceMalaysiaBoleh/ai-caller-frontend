import { WorkFlowType } from "@/hooks/workflow/useWorkflow";
import axios, { AxiosError } from "axios";
import { Edge, Node } from "reactflow";
import { getToken } from "./AuthServices";

export const getWorkflows = async () => {
  const token = getToken();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return {
      success: true,
      data: response.data,
    };
  } catch (err: unknown) {
    const error = err as AxiosError;

    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export const saveWorkflow = async (nodes: Node<any, string | undefined>[], edges: Edge<any>[], workflow: WorkFlowType | undefined, agentId: string) => {
  const payload = {
    name: workflow?.workflow_name || "",
    description: workflow?.workflow_description || "",
    agent_id: agentId,
    nodes, edges
  };

  console.log(workflow)
  if (!workflow) return {
    success: true,
    data: "no workflow",
  };

  const token = getToken();

  if (workflow) {
    console.log("saving workflow")
    console.log(payload);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${workflow.workflow_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (err: unknown) {
      const error = err as AxiosError;

      return {
        success: false,
        error: error.message || "An unknown error occurred.",
      };
    }
  } else {
    console.log("saving workflow")
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows`, payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      return {
        success: true,
        data: response.data,
      };
    } catch (err: unknown) {
      const error = err as AxiosError;

      return {
        success: false,
        error: error.message || "An unknown error occurred.",
      };
    }
  }
}

export const resetWorkflow = async (initialNodes: Node[], initialEdges: Edge[], workflowId: string, agentId: string) => {
  const payload = {
    nodes: initialNodes,
    edges: initialEdges
  }

  const token = getToken();

  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workflows/${workflowId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return {
      success: true,
      data: response.data,
    };
  } catch (err: unknown) {
    const error = err as AxiosError;

    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}