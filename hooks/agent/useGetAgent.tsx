import { useState, useEffect } from "react";
import axios from "axios";
import { useGetToken } from "@/services/AuthServices";

export type AgentTypes = {
  _id: string;
  user_id: string;
  name: string;
  language: string;
  voice: string;
  phone_number: string;
  agent_type: string;
  goal: string;
  tone: string;
  blueprint_flow: string;
  workflow_id: string;
}

export const useGetAgent = (): { agent: AgentTypes | undefined, isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agents, setAgents] = useState<AgentTypes[] | undefined>(undefined);
  const token = useGetToken();


  useEffect(() => {
    const fetchAgent = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setAgents(response.data);
      } catch (error) {
        console.log("errored man:")
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgent();

  }, [token]);

  if (agents) {
    const agent = agents[0];

    return { agent, isLoading };
  }
  return { agent: undefined, isLoading };
};