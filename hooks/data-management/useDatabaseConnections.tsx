import { useState, useEffect } from "react";
import { getAllDatabaseConnections } from "@/services/DatabaseServices";

interface DatabaseConnection {
  _id: string;
  user_id: string;
  connection_name: string;
  host: string;
  port: number;
  database_name: string;
  database_type: string;
  is_cloud_db: boolean;
  created_at: string;
}

export const useDatabaseConnections = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dbconnections, setDbconnections] = useState<DatabaseConnection[] | undefined>(undefined);

  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        const response = await getAllDatabaseConnections();
        setDbconnections(response.data);
      } catch (error) {
        console.log("errored man:")
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflow();

  }, []);

  return { dbconnections, isLoading };
};