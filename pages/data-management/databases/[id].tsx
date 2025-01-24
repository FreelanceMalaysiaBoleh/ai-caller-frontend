import MainLayout from "@/components/general/MainLayout";
import { useRouter } from "next/router";
import { FaFolderOpen } from "react-icons/fa";
import AddFileModal from "@/components/data-management/AddFileModal";
import { useState } from "react";
import DatabaseNavSideBar from "@/components/data-management/DatabaseNavSideBar";
import DatabaseDataListing from "@/components/data-management/DatabaseDataListing";

const connections_sample = [
  {
    name: "128.233.60.109:27017",
    database: [
      {
        dbname: "example",
        tables: ["example tables"],
      },
    ],
  },
  {
    name: "128.200.60.104:42161",
    database: [],
  },
  {
    name: "GedeekDB:Hashim Company",
    database: [],
  },
  {
    name: "GedeekDB: McDonald's Tokyo",
    database: [
      {
        dbname: "food_list_2024",
        tables: ["burgers", "twisters", "beverages"],
      },
      {
        dbname: "customer_list_2024",
        tables: ["nationality"],
      },
    ],
  },
];

export default function DataManagementDetail() {

  const route = useRouter();
  const { id } = route.query;
  const [open, setOpen] = useState(false);

  //TODO: query for database records with id
  console.log(id);

  const databaseName = "GedeekDB"

  return (
    <MainLayout>
      <div style={{ height: "100%", paddingTop: "20px", display: "flex", flexDirection: "row" }}>
        <AddFileModal open={open} setOpen={setOpen} />
        <div style={{ width: "85%" }}>
          <div style={{
            height: "55px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
            <FaFolderOpen size={50} color="#9d9d9d" />
            <div style={{ marginLeft: "10px" }}>
              <h1 style={{ color: "#B5B5B5", fontWeight: "normal" }} >AI DATA CENTER - <span style={{ color: "white" }}>{databaseName}</span></h1>
              <p style={{ color: "#B5B5B5", }}>Here you can view and add new data</p>
            </div>
            <div style={{ height: "50px", marginLeft: 10, marginRight: 10, borderLeft: "2px solid #909090" }}></div>
            <div style={{ marginLeft: "10px" }}>
              <h1 style={{ color: "#B5B5B5", fontWeight: "normal" }} >21.6k Data</h1>
              <p style={{ color: "#B5B5B5", fontSize: "12px" }}>Syncing with gedeek cloud...</p>
            </div>
          </div>


          <div style={{ marginBottom: "10px" }}></div>
          <div style={{
            height: "90%",
            backgroundColor: "#3E3E3E",
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>

            <div style={{ borderRight: "1px solid #909090", height: "100%", width: "30%", paddingTop: "10px" }}>
              <DatabaseNavSideBar data={connections_sample} />
            </div>

            <div style={{ height: "100%", width: "70%" }}>
              <DatabaseDataListing />
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            height: "64px",
            paddingTop: "10px"
          }}>
            <h2 style={{ fontSize: "24px", textAlign: "center" }}>Console Log</h2>
          </div>

          <div style={{
            height: "90%",
            backgroundColor: "#3E3E3E",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          </div>
        </div>



      </div>

    </MainLayout >
  );
}

