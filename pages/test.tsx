import { getAllDatabaseConnections } from "@/services/DatabaseServices";
import { useEffect, useState } from "react";

export default function Test() {

  const [data, setData] = useState({
    name: "Jew Head",
    race: "nigger skin"
  });

  useEffect(() => {
    const testFunction = async () => {
      const data = getAllDatabaseConnections()
      
      console.log(data);
    }

    testFunction();
  }, [])


  return (
    <div style={{ padding: "50px" }}>
      <h2 className="text-xl font-bold mb-2" style={{ color: "black" }}>Test Data</h2>
      <ul className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="flex justify-between border-b py-1">
            <span className="font-medium">{key}: </span>
            <span>{String(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}