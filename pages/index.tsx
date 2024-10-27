import AverageCallTimeChart from "@/components/dashboard/AverageCallTimeChart";
import RecentInteractionsTable from "@/components/dashboard/RecentInteractionsTable";
import SatisfactionScoreChart from "@/components/dashboard/SatisfactionScorceChart";
import SystemLogStatusTable from "@/components/dashboard/SystemLogStatusTable";
import TotalCallsChart from "@/components/dashboard/TotalCallsChart";
import MainLayout from "@/components/general/MainLayout";
import Row from "@/components/general/Row";
import { secondsToString } from "@/helpers/GeneralHelper";
import { useCallRecords } from "@/hooks/useCallRecords";
import { useTicketList } from "@/hooks/useTicketList";
import { Layout } from 'antd';

export default function Home() {

  const { ticketList, loading: ticketLoading, error: ticketError } = useTicketList();
  // [
  //   {
  //     "_id": "ticketId1",
  //     "user_id": "userId1",
  //     "description": "Internet connection is slow.",
  //     "status": "open",
  //     "created_at": "2024-10-22",
  //     "assigned_to": "userId2"  // Optional, might be null if not assigned
  //   },
  //   ...
  // ]
  const { callRecords, loading: callLoading, error: callError } = useCallRecords();
  // [
  //   {
  //     "_id": "callRecordId1",
  //     "call_id": 1,
  //     "phone_number": "+60123456789",
  //     "call_duration": 320,  // Duration in seconds
  //     "call_time": "2024-10-25T10:00:00.000Z",
  //     "caller_name": "John Doe"
  //   },
  //   ...
  // ]


  return (
    <MainLayout>
      <h1>Welcome back, Peter Lim!</h1>
      <div style={{ marginBottom: "10px" }}></div>
      <p>Have a look at what's going on</p>


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
            <TotalCallsChart callRecords={callRecords}/>
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
              <p>Satisfaction Score</p>
              <SatisfactionScoreChart />
            </div>

            <div style={{
              marginTop: "30px",
              backgroundColor: "white",
              padding: 20
            }}>
              <p>System Log/Status</p>
              <SystemLogStatusTable />
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
