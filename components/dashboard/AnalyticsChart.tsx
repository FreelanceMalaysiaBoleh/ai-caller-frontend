import { useState } from "react";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Dropdown from "./Dropdown";

const periodOptions = [
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "this_year", label: "This year" },
];

interface AnalyticsChartProps {
  data?: Array<{
    month: string;
    value: number;
  }> | null;
  onPeriodChange?: (period: string) => void;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, onPeriodChange }) => {
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
    console.log("Selected period:", value);
  };

  // Use API data if available, otherwise use fallback data
  const chartData = data || [
    { month: 'JAN', value: 2.8 },
    { month: 'FEB', value: 3.2 },
    { month: 'MAR', value: 2.9 },
    { month: 'APR', value: 3.0 },
    { month: 'MAY', value: 4.1 },
    { month: 'JUN', value: 3.8 },
    { month: 'JUL', value: 3.5 },
    { month: 'AUG', value: 4.2 },
    { month: 'SEP', value: 4.5 },
    { month: 'OCT', value: 4.8 },
    { month: 'NOV', value: 5.2 },
    { month: 'DEC', value: 5.0 }
  ];

  // Calculate dynamic Y-axis domain based on data
  const maxValue = Math.max(...chartData.map(item => item.value));
  const yAxisMax = Math.max(maxValue + 1, 6); // Minimum of 6, or max value + 1
  const hasData = chartData.some(item => item.value > 0);

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={titleStyle}>Analytics</div>
        </div>
        <Dropdown
          selectedValue={selectedPeriod}
          onChange={handlePeriodChange}
          options={periodOptions}
          placeholder="Select period"
          minWidth="130px"
        />
      </div>
      
      <div style={{ height: "250px", marginTop: "20px" }}>
        {!hasData ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#CCCCCC",
            fontSize: "14px"
          }}>
            No analytics data available for this period
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#CCCCCC', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#CCCCCC', fontSize: 12 }}
                domain={[0, yAxisMax]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#F73587" 
                strokeWidth={3}
                dot={{ fill: '#7B68EE', stroke: '#7B68EE', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#7B68EE', stroke: '#7B68EE' }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;