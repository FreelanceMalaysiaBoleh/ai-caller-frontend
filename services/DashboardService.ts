import axios from 'axios';

export const getTicketList = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/tickets`, {
            method: 'GET',
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;  // Re-throw the error to handle it outside
    }
}

export const getCallRecords = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/call-records`, {
            method: 'GET',
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;  // Re-throw the error to handle it outside
    }
}

/**
 * Get usage statistics for dashboard
 */
const getUsageStats = async (token: string, period: string = 'this_month') => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/usage-stats`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch usage stats:', error);
    return null;
  }
};

/**
 * Get call statistics for dashboard
 */
const getCallStats = async (token: string, period: string = 'this_month') => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/call-stats`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch call stats:', error);
    return null;
  }
};

/**
 * Get frequent callers list
 */
const getFrequentCallers = async (token: string, limit: number = 10) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/frequent-callers`, {
      params: { limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch frequent callers:', error);
    return null;
  }
};

/**
 * Get analytics data for dashboard
 */
const getAnalyticsData = async (token: string, period: string = 'this_year') => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/analytics`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
    return null;
  }
};

/**
 * Get language distribution
 */
const getLanguageDistribution = async (token: string, period: string = 'this_year') => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/language-distribution`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
    return null;
  }
};

export {
  getUsageStats,
  getCallStats,
  getFrequentCallers,
  getAnalyticsData,
  getLanguageDistribution
};