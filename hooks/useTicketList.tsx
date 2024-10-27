import { useEffect, useState } from 'react';

export const useTicketList = () => {
    const [ticketList, setTicketList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchTicketList = async () => {
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
                setTicketList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketList();
    }, []); // Empty dependency array to run once when the component mounts

    return { ticketList, loading, error };
};
