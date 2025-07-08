import { useState } from "react";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Dropdown from "./Dropdown";

const periodOptions = [
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "this_year", label: "This year" },
];

interface LanguageData {
  color: string;
  language: string;
  percentage: number;
}

interface PerformanceChartProps {
  data?: LanguageData[] | null;
  onPeriodChange?: (period: string) => void;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, onPeriodChange }) => {
  const size = useScreenSize();
  const [selectedPeriod, setSelectedPeriod] = useState("this_year");

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

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    if (onPeriodChange) {
      onPeriodChange(value);
    }
    console.log("Language distribution period:", value);
  };

  // Default colors for languages when data doesn't include colors
  const defaultColors = ["#F73587", "#7B68EE", "#FF8A65", "#4CAF50", "#FF9800", "#9C27B0"];

  // Process the data for the chart
  const getChartData = () => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map((item, index) => ({
      name: item.language,
      value: item.percentage,
      color: item.color || defaultColors[index % defaultColors.length]
    })).filter(item => item.value > 0); // Only show items with data
  };

  const chartData = getChartData();
  const hasData = data && data.length > 0;

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={titleStyle}>Language Distribution</div>
          <div style={subtitleStyle}>Overview</div>
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
            {/* Legend items */}
            {chartData.map((entry, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: index === chartData.length - 1 ? "0" : "15px"
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
          No language data available
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;