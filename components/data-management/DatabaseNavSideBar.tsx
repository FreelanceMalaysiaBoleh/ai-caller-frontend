import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaFilter } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaDatabase } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";

interface Connection {
  name: string;
  database: Database[];
}

interface Database {
  dbname: string;
  tables: string[];
}

const DatabaseNavSideBar = ({ data }: { data: Connection[] }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", padding: "0px 20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Connections ({data.length})</h2>
        <FaPlus size={15} color="white" style={{ marginLeft: "auto", marginRight: 15 }} />
        <BsThreeDots size={18} color="white" />
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", marginTop: "15px", padding: "0px 20px" }}>
        <input
          type="text"
          placeholder="Search connections"
          style={{
            height: "36px",
            padding: "8px",
            border: "1px solid #646464",
            borderRadius: "5px",
            backgroundColor: "#262626",
            width: "75%",
            color: "white",
          }}
        />
        <FaFilter size={15} color="white" style={{ marginLeft: "auto" }} />
      </div>

      <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>

      <ul style={{ listStyleType: "none", padding: "0px 20px", marginTop: "20px" }}>
        {data.map((connection, connectionIndex) => (
          <li key={connectionIndex} style={{ marginBottom: "10px" }}>
            <div onClick={() => toggleExpand(connection.name)} style={{ cursor: "pointer" }}>
              <div style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center" }}>
                {expanded[connection.name] ? <BiSolidDownArrow size={18} color="white" /> : <BiSolidRightArrow size={18} color="white" />} <p style={{ marginLeft: 10 }}>{connection.name}</p>
              </div>
            </div>
            {expanded[connection.name] && connection.database.length > 0 && (
              <ul style={{ listStyleType: "none", paddingLeft: "20px", marginTop: "10px" }}>
                {connection.database.map((db, dbIndex) => (
                  <li key={dbIndex} style={{ marginBottom: "10px" }}>
                    <div onClick={() => toggleExpand(db.dbname)} style={{ cursor: "pointer" }}>
                      <div style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {expanded[db.dbname] ? <BiSolidDownArrow size={18} color="white" /> : <BiSolidRightArrow size={18} color="white" />}
                        <FaDatabase size={18} style={{ marginLeft: 10 }} color="#8ce214" />
                        <p style={{ marginLeft: 10 }}>{db.dbname}</p>
                      </div>
                    </div>
                    {expanded[db.dbname] && (
                      <ul style={{ listStyleType: "none", paddingLeft: "20px", marginTop: "10px" }}>
                        {db.tables.map((table, tableIndex) => (
                          <li key={tableIndex} style={{ marginBottom: "10px", paddingLeft: "25px" }}>
                            <div style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}>
                              <FaFolder size={18} style={{ marginRight: 10 }} color="#9d9d9d" />
                              <p>{table}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DatabaseNavSideBar;