import { useState, useEffect } from "react";
import MainLayout from "@/components/general/MainLayout";
import { responsiveValue, useScreenSize } from "@/context/ViewportContext";
import UsageChart from "@/components/dashboard/UsageChart";
import CallsChart from "@/components/dashboard/CallsChart";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { useGetToken } from "@/services/AuthServices";
import {
  getUsageStats,
  getCallStats,
  getFrequentCallers,
  getAnalyticsData,
  getLanguageDistribution
} from "@/services/DashboardService";

export default function Dashboard() {
  const size = useScreenSize();
  const token = useGetToken();

  // State for storing API responses
  const [usageData, setUsageData] = useState(null);
  const [callsData, setCallsData] = useState(null);
  const [frequentCallersData, setFrequentCallersData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [languageData, setLanguageData] = useState(null);

  // Fetch initial data
  const fetchDashboardData = async () => {
    if (!token) {
      console.log("No token available");
      return;
    }

    // Fetch usage stats
    const usage = await getUsageStats(token, 'this_month');
    setUsageData(usage);
    console.log("Usage Stats:", usage);

    // Fetch call stats
    const calls = await getCallStats(token, 'this_month');
    setCallsData(calls);

    // Fetch frequent callers
    const callers = await getFrequentCallers(token, 10);
    setFrequentCallersData(callers);

    // Fetch analytics data
    const analytics = await getAnalyticsData(token, 'this_year');
    setAnalyticsData(analytics);

    // Fetch language distribution data
    const language = await getLanguageDistribution(token, 'this_year');
    setLanguageData(language);
    console.log("Language Data:", language);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Handle period change for usage chart
  const handleUsagePeriodChange = async (period: string) => {
    if (!token) return;

    console.log("Fetching usage data for period:", period);
    const usage = await getUsageStats(token, period);
    setUsageData(usage);
    console.log("Updated Usage Stats:", usage);
  };

  // Handle period change for calls chart
  const handleCallsPeriodChange = async (period: string) => {
    if (!token) return;

    console.log("Fetching calls data for period:", period);
    const calls = await getCallStats(token, period);
    setCallsData(calls);
    console.log("Updated Call Stats:", calls);
  };

  // Handle period change for recent calls table
  const handleRecentCallsPeriodChange = async (period: string) => {
    if (!token) return;

    console.log("Fetching frequent callers for period:", period);
    // Note: The API doesn't have period parameter for frequent callers, 
    // but we can still update the limit if needed
    const callers = await getFrequentCallers(token, 10);
    setFrequentCallersData(callers);
    console.log("Updated Frequent Callers:", callers);
  };

  // Handle period change for analytics chart
  const handleAnalyticsPeriodChange = async (period: string) => {
    if (!token) return;

    console.log("Fetching analytics data for period:", period);
    const analytics = await getAnalyticsData(token, period);
    setAnalyticsData(analytics);
    console.log("Updated Analytics Data:", analytics);
  };

  // Handle period change for language distribution
  const handleLanguagePeriodChange = async (period: string) => {
    if (!token) return;

    console.log("Fetching language distribution for period:", period);
    const language = await getLanguageDistribution(token, period);
    setLanguageData(language);
    console.log("Updated Language Data:", language);
  };

  const dummyUsageData1 = {
    percentage_arabic: 65,
    percentage_change: 15,
    percentage_change_arabic: 8,
    percentage_change_eng: 22,
    percentage_eng: 35,
    period: "this_month",
    total_characters: 2847592
  };

  const dummyCallsData1 = {
    inbound_calls: 1247,
    inbound_percentage: 73,
    outbound_calls: 462,
    outbound_percentage: 27,
    period: "this_month",
    total_calls: 1709
  };

  const dummyLanguageData1 = [
    {
      color: "#F73587",
      language: "English",
      percentage: 60
    },
    {
      color: "#7B68EE",
      language: "Arabic",
      percentage: 30
    },
    {
      color: "#FF8A65",
      language: "French",
      percentage: 10
    }
  ];

  const dummyRecentCallsData3 = [
    {
      user: "Quick Caller 1",
      user_id: "user_009",
      minutes: 5,
      calls: 1,
      date: "2025-01-08",
      time: "17:30"
    },
    {
      user: "Brief Contact",
      user_id: "user_010",
      minutes: 12,
      calls: 2,
      date: "2025-01-08",
      time: "16:45"
    },
    {
      user: "Short Session",
      user_id: "user_011",
      minutes: 8,
      calls: 1,
      date: "2025-01-08",
      time: "15:20"
    }
  ];

  return (
    <MainLayout>
      <div style={{ marginBottom: 65 }}></div>
      <h1 style={{ color: "white", marginBottom: "20px" }}>Dashboard</h1>

      {/* Top Section - Usage and Calls Charts */}
      <div style={{
        display: "grid",
        gridTemplateColumns: responsiveValue(size, "1fr", "1fr 1fr", "1fr 1fr 2fr") as string,
        gap: "20px",
        marginBottom: "20px"
      }}>
        <UsageChart
          // data={dummyUsageData1}
          data={usageData}
          onPeriodChange={handleUsagePeriodChange}
        />
        <CallsChart
          // data={dummyCallsData1}
          data={callsData}
          onPeriodChange={handleCallsPeriodChange}
        />
        {/* On desktop (large screens), add the table here */}
        <div style={{
          display: responsiveValue(size, "none", "none", "block") as any
        }}>
          <RecentCallsTable
            data={frequentCallersData}
            // data={dummyRecentCallsData3}
            onPeriodChange={handleRecentCallsPeriodChange}
          />
        </div>
      </div>

      {/* Second row for mobile/tablet: Recent Calls Table */}
      <div style={{
        display: responsiveValue(size, "block", "block", "none") as any,
        marginBottom: "20px"
      }}>
        <RecentCallsTable
          data={frequentCallersData}
          // data={dummyRecentCallsData3}
          onPeriodChange={handleRecentCallsPeriodChange}
        />
      </div>

      {/* Bottom Row - Analytics and Performance */}
      <div style={{
        display: "grid",
        gridTemplateColumns: responsiveValue(size, "1fr", "2fr 1fr", "2fr 1fr") as string,
        gap: "20px"
      }}>
        <AnalyticsChart
          data={analyticsData}
          onPeriodChange={handleAnalyticsPeriodChange}
        />
        <PerformanceChart
          data={languageData}
          // data={dummyLanguageData1}
          onPeriodChange={handleLanguagePeriodChange}
        />
      </div>
    </MainLayout>
  );
}