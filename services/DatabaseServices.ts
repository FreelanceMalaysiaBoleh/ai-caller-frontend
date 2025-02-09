import axios, { AxiosError } from "axios";
import { DatabaseConnectionType } from "@/hooks/data-management/useAddConnectionModal";
import { addCollectionField, CollectionType } from "@/hooks/data-management/useAddCollectionmodal";

export const getAllDatabaseConnections = async (token: string | null) => {

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

export const getAllItemsInCollection = async (connectionId: string, collectionName: string, token: string | null) => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${connectionId}/collections/${collectionName}/items`,
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

type addConnectionfieldsStrings = "connection_name" | "database_type" | "host" | "database_name";

export const createNewConnection = async (values: DatabaseConnectionType, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  console.log(values);
  const formData = new FormData();

  for (const key in values) {
    formData.append(key, values[key as addConnectionfieldsStrings]);
  }

  formData.append("is_cloud_db", values.is_cloud_db ? "true" : "false")
  formData.append("port", `${values.port}`)

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (err: unknown) {
    const error = err as AxiosError;
    console.log(err);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export const createNewItem = async (values: unknown, dbId: string, collectionName: string, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${dbId}/collections/${collectionName}/items
`,
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
    console.log(err);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export const updateItem = async (values: unknown, dbId: string, collectionName: string, itemId: string, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  delete (values as { _id?: string })._id

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${dbId}/collections/${collectionName}/items/${itemId}`,
      method: "PUT",
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
    console.log(err);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export const deleteItem = async (dbId: string, collectionName: string, itemId: string, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${dbId}/collections/${collectionName}/items/${itemId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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



export const createNewCollection = async (connectionId: string, values: CollectionType, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  const formData = new FormData();

  for (const key in values) {
    formData.append(key, values[key as addCollectionField]);
  }

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${connectionId}/collections`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData
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


export const deleteConnection = async (connectionId: string, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/database-connections/${connectionId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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