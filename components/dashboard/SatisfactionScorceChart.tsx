import { Ticket } from '@/types/TicketType';
import { ResponsiveContainer, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

const SatisfactionScoreChart = ({ ticketList }: { ticketList: Ticket[] }) => {


    const separateTicketsByStatus = (tickets: Ticket[]) => {
        const statusCounts = tickets.reduce((acc, ticket) => {
            acc[ticket.status] = (acc[ticket.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(statusCounts).map(([status, value]) => ({
            status,
            value
        }));
    };

    const data = separateTicketsByStatus(ticketList);

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#a2b800" />
            </BarChart>
        </ResponsiveContainer>

    )
}

export default SatisfactionScoreChart;