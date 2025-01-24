import MainLayout from "@/components/general/MainLayout";
import { FaFolderOpen } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { GrOnedrive } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { RiFileAddFill } from "react-icons/ri";
import DataTable from "@/components/data-management/DataTable";
import AddFileModal from "@/components/data-management/AddFileModal";
import { useState } from "react";

export default function DataManagementDetail() {

  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((val) => !val);
  }

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
              <h1 style={{ color: "#B5B5B5", fontWeight: "normal" }} >AI DATA CENTER - <span style={{ color: "white" }}>Documents</span></h1>
              <p style={{ color: "#B5B5B5", }}>Here you can view and add new data</p>
            </div>
            <div style={{ height: "50px", marginLeft: 10, marginRight: 10, borderLeft: "2px solid #909090" }}></div>
            <div style={{ marginLeft: "10px" }}>
              <h1 style={{ color: "#B5B5B5", fontWeight: "normal" }} >124 Records</h1>
              <p style={{ color: "#B5B5B5", fontSize: "12px" }}>Syncing with gedeek cloud...</p>
            </div>

            <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto", }}>
              <div style={{ marginRight: "20px" }}>
                <FaGoogleDrive style={{ marginRight: "10px" }} size={25} color="#9D9D9D" />
                <GrOnedrive size={25} color="#9D9D9D" />
              </div>
              <SearchBar />
              <FaTrash style={{ marginLeft: "10px", marginRight: "10px" }} size={25} color="#9D9D9D" />
              <div onClick={toggleModal} style={{cursor: "pointer"}}>
                <RiFileAddFill size={25} color="#9D9D9D" />
              </div>
            </div>

          </div>


          <div style={{ marginBottom: "10px" }}></div>
          <div style={{
            height: "90%",
            backgroundColor: "#3E3E3E",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>

            <div style={{
              width: "100%",
              padding: "10px 15px"
            }}>
              <DataTable />
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

const SearchBar = () => {
  return (
    <div style={styles.container}>
      <CiSearch style={styles.icon} />
      <input
        type="text"
        placeholder="Search..."
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#333', // dark background
  },
  icon: {
    fontSize: '20px',
    color: '#fff',
    marginRight: '8px',
  },
  input: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '16px',
    flex: 1,
  },
};

