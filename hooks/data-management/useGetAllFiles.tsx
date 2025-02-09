import { useState, useEffect } from "react";
import axios from "axios";
import { useGetToken } from "@/services/AuthServices";

export type FileData = {
  _id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  size: number;
  keywords: string[];
  topic: string;
  uploaded_at: string;
};

export const useGetAllFiles = (): { files: FileData[] | undefined, isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileData[] | undefined>(undefined);
  const token = useGetToken();

  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/files`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFiles(response.data);
      } catch (error) {
        console.log("errored man:")
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflow();

  }, [token]);

  return { files, isLoading };
};