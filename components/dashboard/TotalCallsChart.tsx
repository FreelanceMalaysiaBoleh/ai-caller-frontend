import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from 'recharts';

const TotalCallsChart = () => {

  const data01 = [
    {
      "name": "Long",
      "value": 400
    },
    {
      "name": "Short",
      "value": 300
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" maxHeight={300}>
      <PieChart width={900} height={250}>
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
        />
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          fill="#a2b800"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TotalCallsChart;