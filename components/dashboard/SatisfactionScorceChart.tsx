import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, AreaChart, Area } from 'recharts';

const SatisfactionScoreChart = () => {

    const data = [
        {
            "score": "1",
            "value": 20
        },
        {
            "score": "2",
            "value": 40
        },
        {
            "score": "3",
            "value": 60
        },
        {
            "score": "4",
            "value": 50
        },
        {
            "score": "5",
            "value": 80
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#a2b800" />
            </BarChart>
        </ResponsiveContainer>

    )
}

export default SatisfactionScoreChart;