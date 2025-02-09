import { useState, useEffect } from "react";
import { getAllDatabaseConnections } from "@/services/DatabaseServices";
import { useGetToken } from "@/services/AuthServices";

export interface DatabaseConnection {
  _id: string;
  user_id: string;
  connection_name: string;
  host: string;
  port: number;
  database_name: string;
  database_type: string;
  is_cloud_db: boolean;
  created_at: string;
  collections: string[]
}

export interface Connection {
  name: string,
  databases: DatabaseConnection[]
}

function groupAndSortConnections(connections: DatabaseConnection[]) {
  connections.sort((a, b) => a.connection_name.localeCompare(b.connection_name));

  const grouped: Record<string, Connection> = {}
    ;
  connections.forEach(conn => {
    if (!grouped[conn.connection_name]) {
      grouped[conn.connection_name] = {
        name: conn.connection_name,
        databases: []
      };
    }
    grouped[conn.connection_name].databases.push(conn);
  });

  return Object.values(grouped);
}


export const useDatabaseConnections = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dbconnections, setDbconnections] = useState<DatabaseConnection[] | undefined>(undefined);
  let connections: Connection[] = []
  const token = useGetToken();

  useEffect(() => {
    const fetchDatabases = async () => {
      setIsLoading(true);
      try {
        const response = await getAllDatabaseConnections(token);
        setDbconnections(response.data);
      } catch (error) {
        console.log("errored man:")
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabases();

  }, [token]);

  if (dbconnections) {
    connections = groupAndSortConnections(dbconnections)
  }

  return { dbconnections, isLoading, connections };
};