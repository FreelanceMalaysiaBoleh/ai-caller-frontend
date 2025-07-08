import { useState } from "react";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import Dropdown from "./Dropdown";

const periodOptions = [
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "this_year", label: "This year" },
];

interface CallsChartProps {
  data?: {
    inbound_calls: number;
    inbound_percentage: number;
    outbound_calls: number;
    outbound_percentage: number;
    period: string;
    total_calls: number;
  } | null;
  onPeriodChange?: (period: string) => void;
}

const CallsChart: React.FC<CallsChartProps> = ({ data, onPeriodChange }) => {
  const size = useScreenSize();
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");

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

  const subtitleStyle = {
    fontSize: responsiveValue(size, 12, 12, 12) as number,
    color: "#CCCCCC",
    marginBottom: "15px"
  };

  const numberStyle = {
    fontSize: responsiveValue(size, 24, 24, 24) as number,
    fontWeight: "bold",
    color: "white",
    marginBottom: "5px"
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    if (onPeriodChange) {
      onPeriodChange(value);
    }
    console.log("Selected period:", value);
  };

  // Extract data with fallbacks
  const totalCalls = data?.total_calls || 0;
  const inboundPercentage = data?.inbound_percentage || 0;
  const outboundPercentage = data?.outbound_percentage || 0;
  const inboundCalls = data?.inbound_calls || 0;
  const outboundCalls = data?.outbound_calls || 0;

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Handle zero data case
  const hasData = totalCalls > 0;

  // Calculate bar widths based on the maximum percentage for proportional display
  const maxPercentage = Math.max(inboundPercentage, outboundPercentage);
  const getBarWidth = (percentage: number) => {
    if (!hasData || maxPercentage === 0) return 50; // Default width for empty state
    // Scale the bar width so the largest bar takes up 100% of available space
    const scaledWidth = (percentage / maxPercentage) * 100;
    return Math.max(scaledWidth, 5); // Minimum 5% width for visibility
  };

  const chartData = [
    {
      name: "Inbound",
      percentage: inboundPercentage,
      color: "#F73587",
      count: inboundCalls,
      barWidth: getBarWidth(inboundPercentage)
    },
    {
      name: "Outbound",
      percentage: outboundPercentage,
      color: "#7B68EE",
      count: outboundCalls,
      barWidth: getBarWidth(outboundPercentage)
    }
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={titleStyle}>Number of Calls</div>
          <div style={numberStyle}>{formatNumber(totalCalls)}</div>
          <div style={subtitleStyle}>Inbound/Outbound</div>
        </div>
        <Dropdown
          selectedValue={selectedPeriod}
          onChange={handlePeriodChange}
          options={periodOptions}
          placeholder="Select period"
          minWidth="130px"
        />
      </div>

      {hasData ? (
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px", gap: "20px" }}>
          {/* Chart bars on the left */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center the bar containers horizontally
            justifyContent: "center"
          }}>
            {chartData.map((item, index) => (
              <div key={index} style={{
                marginBottom: index === 0 ? "15px" : "0",
                height: "32px", // Same height as legend item
                display: "flex",
                alignItems: "center",
                width: "100%" // Ensure full width container
              }}>
                <div style={{
                  backgroundColor: item.color,
                  height: "20px",
                  borderRadius: "10px",
                  width: `${item.barWidth}%`, // Use calculated proportional width
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px"
                }}>
                  <span style={{
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "bold"
                  }}>{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Legend on the right */}
          <div style={{ flexShrink: 0 }}>
            {/* Legend items */}
            {chartData.map((item, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                marginBottom: index === 0 ? "15px" : "0",
                height: "32px" // Fixed height to match bar container
              }}>
                <div>
                  {/* Color dot + percentage on top row */}
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>
                    <div style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: item.color,
                      borderRadius: "2px",
                      marginRight: "8px"
                    }}></div>
                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "white" }}>
                      {item.percentage}%
                    </span>
                  </div>
                  {/* Call type + count on bottom row */}
                  <div style={{ fontSize: "12px", color: "#CCCCCC", marginLeft: "20px" }}>
                    {item.name} {hasData && `(${formatNumber(item.count)})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
          color: "#666",
          fontSize: "14px",
          marginTop: "20px"
        }}>
          No call data available for this period
        </div>
      )}
    </div>
  );
};

export default CallsChart;