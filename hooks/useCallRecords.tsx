import { useEffect, useState } from 'react';

export const useCallRecords = () => {
    const [callRecords, setCallRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchTicketList = async () => {
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
                setCallRecords(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketList();
    }, []); 

    return { callRecords, loading, error };
};
