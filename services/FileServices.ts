import { AddFileTypes } from "@/hooks/data-management/useAddFileModal";
import axios, { AxiosError } from "axios";

interface FileFields extends AddFileTypes {
  file_desc: string,
  topic: string,
  tags: string,
  file: File
}

export const createFile = async (values: FileFields, token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {

    // Create form data
    const formData = new FormData();
    formData.append("file", values.file); // File field
    formData.append("file_description", values.file_desc); // Example metadata
    formData.append("topic", values.topic);
    formData.append("tags", values.tags); // Comma-separated string for tags

    // Make the API call
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/documents`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
    return {
      success: true,
      data: response.data
    };
  } catch (err: unknown) {
    const error = err as AxiosError;

    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }

}

export const deleteFiles = async (ids: string[], token: string | null): Promise<{ success: boolean; data?: any; error?: string }> => {

  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/files`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        file_ids: ids,
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