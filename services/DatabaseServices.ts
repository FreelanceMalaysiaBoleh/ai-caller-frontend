import axios, { AxiosError } from "axios";
import { getToken } from "./AuthServices";

export interface DatabaseConnectionType {
  connection_name: string;
  database_type: "mongodb";
  is_cloud_db: boolean;
  host?: string;
  port?: number;
  database_name?: string;
}

export const getAllDatabaseConnections = async () => {

  const token = getToken();

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections`,
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
}

export const createNewConnection = async (values: DatabaseConnectionType): Promise<{ success: boolean; data?: any; error?: string }> => {
  const token = getToken();

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values
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