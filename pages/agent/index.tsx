import MainLayout from "@/components/general/MainLayout";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import { useGetAgent } from "@/hooks/agent/useGetAgent";

// import { useCallRecords } from "@/hooks/useCallRecords";
// import { useTicketList } from "@/hooks/useTicketList";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { agent } = useGetAgent();
  const size = useScreenSize();

  // const { ticketList } = useTicketList();
  // const ticketList = ticketssample;

  // const { callRecords } = useCallRecords();
  // const callRecords = samplecallrecords;

  const router = useRouter();

  return (
    <MainLayout>
      <div style={{ marginBottom: 65 }}></div>
      <h1>{agent ? "New Agent created" : "Create New Agent"}</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>{agent ? "Head over to AI Assistant Blueprint to create a workflow" : "Each agent have its own customization and logic"}</p>

      <div style={{ marginBottom: "10px" }}></div>
      <div style={{
        width: responsiveValue(size, "100%", "75%", "75%"),
        height: agent ? "" : "65%",
        minHeight: "300px",
        backgroundColor: "#3E3E3E",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {
          agent
            ?
            <div style={{ height: "100%", padding: "20px 0px" }}>
              <table style={{ width: "100%", border: "none" }}>
                <tbody style={{ color: "white", border: "none" }}>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Name:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Language:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.language}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Voice:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.voice}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Phone Number:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.phone_number}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Agent Type:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.agent_type}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Goal:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.goal}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Tone:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.tone}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Blueprint Flow:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.blueprint_flow}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), fontWeight: "bold", padding: "8px" }}>Workflow ID:</td>
                    <td style={{ fontSize: responsiveValue(size, 14, 18, 20), padding: "8px" }}>{agent.workflow_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            :
            <div
              style={{
                width: "30%",
                height: "40%",
                minHeight: "100px",
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
        }

      </div>
    </MainLayout >
  );
}