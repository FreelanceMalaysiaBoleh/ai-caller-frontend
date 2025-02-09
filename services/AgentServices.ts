import { AgentFormTypes } from "@/components/create-agent/AgentForm";
import axios, { AxiosError } from "axios";
import { convertToFormData } from "@/helpers/GeneralHelper";

export const createNewAgent = async (values: AgentFormTypes, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {
  const valuesFormData = convertToFormData(values);

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: valuesFormData
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
};

export const getAgents = async (token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/agents`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
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
};