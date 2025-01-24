import MainLayout from "@/components/general/MainLayout";

import MongoIcon from "@/public/images/mongo_logo.png"
import MYSQLIcon from "@/public/images/mysql_logo_small.png"
import PostgressIcon from "@/public/images/postgress_logo.png"
import Image from "next/image";

export default function Databases() {

  return (
    <MainLayout>
      <div style={{ marginBottom: 65 }}></div>
      <h1>Type of Database</h1>
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
              <Image src={MongoIcon.src} alt="mongo icon" height={50} width={50}/>
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>MongoDB</h2>
          </div>

          <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>
          <div
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
              <Image src={MYSQLIcon.src} alt="mysql icon" height={50} width={50}/>
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>MySQL</h2>
          </div>

          <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>


          <div
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
              <Image src={PostgressIcon.src} alt="postgress icon" height={50} width={50}/>
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>PostgresDB</h2>
          </div>

          <div style={{ width: "100%", borderBottom: "1px solid #909090", marginTop: "15px" }}></div>
        </div>
      </div>
    </MainLayout >
  );
}