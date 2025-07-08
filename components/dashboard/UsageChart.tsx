import { useState } from "react";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Dropdown from "./Dropdown";

const periodOptions = [
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "this_year", label: "This year" },
];

interface UsageData {
  percentage_arabic: number;
  percentage_change: number;
  percentage_change_arabic: number;
  percentage_change_eng: number;
  percentage_eng: number;
  period: string;
  total_characters: number;
}

interface UsageChartProps {
  data?: UsageData | null;
  onPeriodChange?: (period: string) => void;
}

const UsageChart: React.FC<UsageChartProps> = ({ data, onPeriodChange }) => {
  const size = useScreenSize();
  const [selectedPeriod, setSelectedPeriod] = useState("this_month");

  const cardStyle = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.30)",
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

  const changeStyle = {
    fontSize: responsiveValue(size, 10, 10, 10) as number,
    color: data?.percentage_change && data.percentage_change > 0 ? "#4CAF50" : 
           data?.percentage_change && data.percentage_change < 0 ? "#F44336" : "#CCCCCC",
    marginLeft: "8px"
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    if (onPeriodChange) {
      onPeriodChange(value);
    }
  };

  // Prepare chart data from API response
  const getChartData = () => {
    if (!data || data.total_characters === 0) {
      return [];
    }

    return [
      { 
        name: 'Arabic', 
        value: data.percentage_arabic, 
        color: '#F73587',
        change: data.percentage_change_arabic
      },
      { 
        name: 'English', 
        value: data.percentage_eng, 
        color: '#7B68EE',
        change: data.percentage_change_eng
      }
    ].filter(item => item.value > 0); // Only show segments with data
  };

  const chartData = getChartData();
  const hasData = data && data.total_characters > 0;

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Format percentage change
  const formatPercentageChange = (change: number) => {
    if (change === 0) return "0%";
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={titleStyle}>Usage by Transcribes</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={numberStyle}>
              {data ? formatNumber(data.total_characters) : "0"}
            </div>
            {data?.percentage_change !== undefined && (
              <span style={changeStyle}>
                {formatPercentageChange(data.percentage_change)}
              </span>
            )}
          </div>
          <div style={subtitleStyle}>Characters</div>
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
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px", gap: "20px" }}>
          {/* Chart on the left */}
          <div style={{ height: "150px", width: "150px", flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend on the right */}
          <div style={{ flex: 1 }}>
            {/* "vs last month" header */}
            <div style={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              marginBottom: "15px",
              fontSize: "12px",
              color: "#CCCCCC"
            }}>
              vs last month
            </div>

            {/* Legend items */}
            {chartData.map((entry, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginBottom: "15px" 
              }}>
                <div>
                  {/* Color dot + percentage on top row */}
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: entry.color, 
                      borderRadius: "2px",
                      marginRight: "8px" 
                    }}></div>
                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "white" }}>
                      {entry.value}%
                    </span>
                  </div>
                  {/* Language on bottom row */}
                  <div style={{ fontSize: "12px", color: "#CCCCCC", marginLeft: "20px" }}>
                    {entry.name}
                  </div>
                </div>

                {/* Change percentage on the right */}
                {entry.change !== 0 && (
                  <div style={{ 
                    color: entry.change > 0 ? "#4CAF50" : "#F44336",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    {entry.change > 0 ? "↑" : "↓"}{Math.abs(entry.change)}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          color: "#666",
          fontSize: "14px",
          marginTop: "20px"
        }}>
          No data available for this period
        </div>
      )}
    </div>
  );
};

export default UsageChart;