import AverageCallTimeChart from "@/components/dashboard/AverageCallTimeChart";
import RecentInteractionsTable from "@/components/dashboard/RecentInteractionsTable";
import SatisfactionScoreChart from "@/components/dashboard/SatisfactionScorceChart";
import SystemLogStatusTable from "@/components/dashboard/SystemLogStatusTable";
import TotalCallsChart from "@/components/dashboard/TotalCallsChart";
import Box from "@/components/general/Box";
import MainLayout from "@/components/general/MainLayout";
import Row from "@/components/general/Row";
import { Flex, Layout } from 'antd';

const { Content } = Layout;


export default function Home() {



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
              <AverageCallTimeChart />
            </div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: "white",
            padding: 20
          }}>
            <p>Total Calls</p>
            <TotalCallsChart />
          </div>
        </Row>
        <div style={{ marginTop: "30px" }}></div>
        <Row>
          <div style={{
            width: "30%",
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
              <p>Recent Interactions</p>
              <RecentInteractionsTable />
            </div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: "white",
            padding: 20
          }}>
            <p>System Log/Status</p>
            <SystemLogStatusTable />
          </div>

        </Row>
      </Layout>
      <div style={{
        marginBottom: "40px"
      }}></div>
    </MainLayout >
  );
}
