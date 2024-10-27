import { XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area, ResponsiveContainer, ReferenceLine } from 'recharts';


const AverageCallTimeChart = () => {
    const data = [
        { value: 2, duration: 1 },
        { value: 4, duration: 2 },
        { value: 6, duration: 3 },
        { value: 10, duration: 4 },
        { value: 5, duration: 5 },
        { value: 4, duration: 6 },
        { value: 1, duration: 7 },
        { value: 1, duration: 8 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart width={760} height={300} data={data}>
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a2b800" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a2b800" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Area name="total users" type="monotone" dataKey="value" stroke="#a2b800" fillOpacity={1} fill="url(#colorPv)" />
                <XAxis dataKey="duration" />
                <YAxis />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AverageCallTimeChart;