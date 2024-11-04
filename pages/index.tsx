import AverageCallTimeChart from "@/components/dashboard/AverageCallTimeChart";
import RecentInteractionsTable from "@/components/dashboard/RecentInteractionsTable";
import SatisfactionScoreChart from "@/components/dashboard/SatisfactionScorceChart";
import SystemLogStatusTable from "@/components/dashboard/SystemLogStatusTable";
import TotalCallsChart from "@/components/dashboard/TotalCallsChart";
import MainLayout from "@/components/general/MainLayout";
import Row from "@/components/general/Row";

import { useCallRecords } from "@/hooks/useCallRecords";
import { useTicketList } from "@/hooks/useTicketList";

import { Layout } from 'antd';

// const samplecallrecords = [
//   {
//       _id: "1",
//       call_id: 1001,
//       phone_number: "123-456-7890",
//       call_duration: 300,
//       call_time: new Date("2023-10-01T10:00:00"),
//       caller_name: "John Doe"
//   },
//   {
//       _id: "2",
//       call_id: 1002,
//       phone_number: "987-654-3210",
//       call_duration: 120,
//       call_time: new Date("2023-10-02T12:15:00"),
//       caller_name: "Jane Smith"
//   },
//   {
//       _id: "3",
//       call_id: 1003,
//       phone_number: "555-123-4567",
//       call_duration: 800,
//       call_time: new Date("2023-10-03T14:30:00"),
//       caller_name: "Bob Brown"
//   },
//   {
//       _id: "4",
//       call_id: 1004,
//       phone_number: "444-567-8901",
//       call_duration: 50,
//       call_time: new Date("2023-10-04T16:45:00"),
//       caller_name: "Alice Green"
//   },
//   {
//       _id: "5",
//       call_id: 1005,
//       phone_number: "222-345-6789",
//       call_duration: 600,
//       call_time: new Date("2023-10-05T18:00:00"),
//       caller_name: "Tom White"
//   }
// ]

// const ticketssample: Ticket[] = [
//   {
//       _id: "1",
//       user_id: "101",
//       description: "Issue with login functionality.",
//       status: "open",
//       created_at: new Date().toISOString(),
//       assigned_to: "Agent A"
//   },
//   {
//       _id: "2",
//       user_id: "102",
//       description: "Page load time is slow on the dashboard.",
//       status: "in progress",
//       created_at: new Date().toISOString(),
//       assigned_to: "Agent B"
//   },
//   {
//       _id: "3",
//       user_id: "103",
//       description: "Unable to reset password via email.",
//       status: "resolved",
//       created_at: new Date().toISOString(),
//       assigned_to: "Agent C"
//   },
//   {
//       _id: "4",
//       user_id: "104",
//       description: "Error 500 displayed on the settings page.",
//       status: "open",
//       created_at: new Date().toISOString(),
//       assigned_to: "Agent D"
//   },
//   {
//       _id: "5",
//       user_id: "105",
//       description: "Notifications are not being received.",
//       status: "closed",
//       created_at: new Date().toISOString(),
//       assigned_to: "Agent E"
//   }
// ];

export default function Home() {

  const { ticketList } = useTicketList();
  // const ticketList = ticketssample;

  const { callRecords } = useCallRecords();
  // const callRecords = samplecallrecords;


  return (
    <MainLayout>
        <h1>Welcome back, Peter Lim!</h1>
        <div style={{ marginBottom: "10px" }}></div>
        <p>Have a look at what&apos;s going on</p>


        <div style={{ marginBottom: "30px" }}></div>
        <Layout>
          <Row>
              <div style={{
                width: "60%",
                backgroundColor: "white",
                padding: 20,
                marginRight: "30px"
              }}>
                <p>Average Call Time</p>
                <div style={{
                  marginTop: 20,
                }}>
                  <AverageCallTimeChart callRecords={callRecords} />
                </div>
              </div>
              <div style={{
                flex: 1,
                backgroundColor: "white",
                padding: 20
              }}>
                <p>Total Calls</p>
                <TotalCallsChart callRecords={callRecords} />
              </div>
          </Row>
          <div style={{ marginTop: "30px" }}></div>
          <Row>
              <div style={{
                width: "40%",
                marginRight: "30px"
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: 20
                }}>
                  <p>Ticket Count By Status</p>
                  <SatisfactionScoreChart ticketList={ticketList} />
                </div>

                <div style={{
                  marginTop: "30px",
                  backgroundColor: "white",
                  padding: 20
                }}>
                  <p>Latest tickets</p>
                  <SystemLogStatusTable tickets={ticketList} />
                </div>
              </div>
              <div style={{
                flex: 1,
                backgroundColor: "white",
                padding: 20
              }}>

                <p>Recent Interactions</p>
                <RecentInteractionsTable callRecords={callRecords} />
              </div>
          </Row>
        </Layout>
        <div style={{
          marginBottom: "40px"
        }}></div>
    </MainLayout >
  );
}
