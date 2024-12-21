import MainLayout from "@/components/general/MainLayout";

// import { useCallRecords } from "@/hooks/useCallRecords";
// import { useTicketList } from "@/hooks/useTicketList";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  // const { ticketList } = useTicketList();
  // const ticketList = ticketssample;

  // const { callRecords } = useCallRecords();
  // const callRecords = samplecallrecords;

  const router = useRouter();



  return (
    <MainLayout>
      <div style={{ marginBottom: 65 }}></div>
      <h1>Create New Agent</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>Each agent have its own customization and logic</p>

      <div style={{ marginBottom: "10px" }}></div>
      <div style={{
        width: "75%",
        height: "65%",
        backgroundColor: "#3E3E3E",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div
          style={{
            width: "30%",
            height: "40%",
            backgroundColor: isHovered ? "#FF89B2" : "#F73587", 
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer", 
            transition: "background-color 0.3s",
          }}
          onClick={() => router.push("/agent/create")}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
        >
          <FaPlus color="white" size={40} />
        </div>
      </div>
    </MainLayout >
  );
}
