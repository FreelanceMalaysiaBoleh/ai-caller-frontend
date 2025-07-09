import { responsiveValue, useScreenSize } from "@/context/ViewportContext";

interface RecentCallsTableProps {
  data?: Array<{
    user: string;
    user_id: string;
    minutes: number;
    calls: number;
    date: string;
    time: string;
  }> | null;
  onPeriodChange?: (period: string) => void;
}

const RecentCallsTable: React.FC<RecentCallsTableProps> = ({ data }) => {
  const size = useScreenSize();

  const cardStyle = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: responsiveValue(size, "15px", "20px", "25px") as string,
    color: "white",
    height: "100%"
  };

  const titleStyle = {
    fontSize: responsiveValue(size, 12, 12, 12) as number,
    fontWeight: "regular",
    marginBottom: "10px",
    color: "white"
  };

  // Transform API data to display format
  const formatTableData = () => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map(call => ({
      user: call.user,
      mins: `${call.minutes} mins`,
      calls: call.calls.toString(),
      date: call.date,
      time: call.time
    }));
  };

  const tableData = formatTableData();
  const hasData = tableData.length > 0;

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={titleStyle}>Frequent callers</div>
        </div>
        {/* <Dropdown
          selectedValue={selectedPeriod}
          onChange={handlePeriodChange}
          options={periodOptions}
          placeholder="Select period"
          minWidth="130px"
        /> */}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #555" }}>
            <th style={{ textAlign: "left", padding: "8px", fontSize: "12px", color: "#CCCCCC" }}>User</th>
            <th style={{ textAlign: "left", padding: "8px", fontSize: "12px", color: "#CCCCCC" }}>mins</th>
            <th style={{ textAlign: "left", padding: "8px", fontSize: "12px", color: "#CCCCCC" }}>Calls</th>
            <th style={{ textAlign: "left", padding: "8px", fontSize: "12px", color: "#CCCCCC" }}>Date</th>
            <th style={{ textAlign: "left", padding: "8px", fontSize: "12px", color: "#CCCCCC" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {!hasData ? (
            <tr>
              <td colSpan={5} style={{
                padding: "20px",
                textAlign: "center",
                color: "#CCCCCC",
                fontSize: "14px"
              }}>
                No recent calls available
              </td>
            </tr>
          ) : (
            tableData.map((call, index) => (
              <tr key={index} style={{ borderBottom: index < tableData.length - 1 ? "1px solid #555" : "none" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px" }}>{call.user}</td>
                <td style={{ padding: "12px 8px", fontSize: "14px" }}>{call.mins}</td>
                <td style={{ padding: "12px 8px", fontSize: "14px" }}>{call.calls}</td>
                <td style={{ padding: "12px 8px", fontSize: "14px" }}>{call.date}</td>
                <td style={{ padding: "12px 8px", fontSize: "14px" }}>{call.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCallsTable;