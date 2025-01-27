import MainLayout from "@/components/general/MainLayout";
import { useRouter } from "next/router";

import { FaFolderOpen } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";

export default function DataManagement() {
  const router = useRouter();

  return (
    <MainLayout>
      <div style={{ marginBottom: 65 }}></div>
      <h1>Type of Data Center</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>Select the source of your data</p>

      <div style={{ marginBottom: "10px" }}></div>
      <div style={{
        width: "75%",
        height: "65%",
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
          <div
            onClick={() => {
              router.push("/data-management/documents");
            }}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "start",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaFolderOpen size={50} color="#9d9d9d" />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Documents</h2>
          </div>

          <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>
          <div
            onClick={() => {
              router.push("/data-management/databases/1");
            }}
            style={{
              marginTop: "15px",
              display: "flex",
              width: "100%",
              justifyContent: "start",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaDatabase size={50} color="#9d9d9d" />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Gedeek Database</h2>
          </div>

          <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>
        </div>
      </div>
    </MainLayout >
  );
}