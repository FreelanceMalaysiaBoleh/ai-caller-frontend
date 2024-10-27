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