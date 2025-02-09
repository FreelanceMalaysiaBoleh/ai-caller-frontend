import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaFilter } from "react-icons/fa6";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaDatabase } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import AddConnectionModal from "./AddConnectionModal";
import AddCollectionModal from "./AddCollectionModal";
import { deleteConnection } from "@/services/DatabaseServices";
import { Connection } from "@/hooks/data-management/useDatabaseConnections";
import { useRouter } from "next/router";
import { useGetToken } from "@/services/AuthServices";


const DatabaseNavSideBar = ({ data }: { data: Connection[] }) => {

  const router = useRouter();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [openConnection, setOpenConnection] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [databaseId, setDatabaseId] = useState<string | null>(null);
  const token = useGetToken();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const handleDropdownClick = (dbId: string) => {
    setOpenDropdown((prev) => (prev === dbId ? null : dbId)); // Toggle per database
  };

  const handleViewCollection = (dbId: string, collectionName: string) => {
    const queryParams = new URLSearchParams({
      dbId,
      collection_name: collectionName,
    }).toString();

    router.push(`?${queryParams}`, undefined, { shallow: true });
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (dbId: string) => {
    const results = await deleteConnection(dbId, token)

    if (results.success) {
      window.alert("Database deleted succesfully");
      window.location.reload();
      return
    }

    window.alert(results.error || "Error deleting database");
  }

  return (
    <>
      <AddConnectionModal open={openConnection} setOpen={setOpenConnection} />
      <AddCollectionModal open={openCollection} setOpen={setOpenCollection} databaseId={databaseId} />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", padding: "0px 20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Connections ({data.length})</h2>
        <FaPlus
          size={15}
          color="white"
          style={{ marginLeft: "auto", marginRight: 15, cursor: "pointer" }}
          onClick={() => {
            setOpenConnection(true);
          }}
        />
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
          <li key={connectionIndex} style={{ marginBottom: "10px", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div onClick={() => toggleExpand(connection.name)} style={{ cursor: "pointer" }}>
                <div style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {expanded[connection.name] ? <BiSolidDownArrow size={18} color="white" /> : <BiSolidRightArrow size={18} color="white" />} <p style={{ marginLeft: 10 }}>{connection.name}</p>
                </div>
              </div>
            </div>
            {expanded[connection.name] && connection.databases.length > 0 && (
              <ul style={{ listStyleType: "none", paddingLeft: "20px", marginTop: "10px" }}>
                {connection.databases.map((db, dbIndex) => (
                  <li key={dbIndex} style={{ marginBottom: "10px" }}>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <div onClick={() => toggleExpand(db.database_name)} style={{ cursor: "pointer" }}>
                        <div style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center" }}>
                          {expanded[db.database_name] ? <BiSolidDownArrow size={18} color="white" /> : <BiSolidRightArrow size={18} color="white" />}
                          <FaDatabase size={18} style={{ marginLeft: 10 }} color="#8ce214" />
                          <p style={{ marginLeft: 10 }}>{db.database_name}</p>
                        </div>
                      </div>
                      <BsThreeDots
                        size={15}
                        color="white"
                        style={{ marginLeft: "auto", cursor: "pointer" }}
                        onClick={() => handleDropdownClick(db._id)}
                      />
                      {openDropdown === db._id && (
                        <div
                          ref={dropdownRef}
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            backgroundColor: "#ffffff",
                            borderRadius: "5px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px 15px",
                              cursor: "pointer",
                              fontSize: "14px",
                              color: "red",
                              borderBottom: "1px solid #ddd",
                            }}
                            onClick={() => handleDelete(db._id)}
                          >
                            Delete
                          </div>
                          <div
                            style={{
                              padding: "10px 15px",
                              cursor: "pointer",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                            onClick={() => {
                              console.log("clicked", db._id);
                              console.log("clicked", db);
                              setOpenDropdown(null);
                              setDatabaseId(db._id);
                              setOpenCollection(true);
                            }}
                          >
                            Add Collection {db.database_name}
                          </div>
                        </div>
                      )}
                    </div>

                    {expanded[db.database_name] && (
                      <ul style={{ listStyleType: "none", paddingLeft: "20px", marginTop: "10px" }}>
                        {db.collections.map((table, tableIndex) => (
                          <li key={tableIndex} style={{ marginBottom: "10px", paddingLeft: "25px" }}>
                            <div
                              onClick={() => {
                                handleViewCollection(db._id, table);
                              }}
                              style={{ color: "white", display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}
                            >
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