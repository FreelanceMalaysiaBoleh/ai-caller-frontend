import { CallRecords } from '@/types/CallRecordType';
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from 'recharts';

const TotalCallsChart = ({ callRecords }: { callRecords: CallRecords[] }) => {

//   const callRecordsArray: CallRecords[] = [
//     { _id: "1", call_id: 1, phone_number: "1234567890", call_duration: 300, call_time: new Date("2023-10-01T10:00:00Z"), caller_name: "Alice" }, // Short call (5 minutes)
//     { _id: "2", call_id: 2, phone_number: "0987654321", call_duration: 600, call_time: new Date("2023-10-01T10:05:00Z"), caller_name: "Bob" }, // Short call (10 minutes)
//     { _id: "3", call_id: 3, phone_number: "1112223333", call_duration: 720, call_time: new Date("2023-10-01T10:10:00Z"), caller_name: "Charlie" }, // Short call (12 minutes)
//     { _id: "4", call_id: 4, phone_number: "4445556666", call_duration: 1200, call_time: new Date("2023-10-01T10:15:00Z"), caller_name: "Dave" }, // Long call (20 minutes)
//     { _id: "5", call_id: 5, phone_number: "5556667777", call_duration: 900, call_time: new Date("2023-10-01T10:20:00Z"), caller_name: "Eve" }, // Long call (15 minutes)
//     { _id: "6", call_id: 6, phone_number: "8889990000", call_duration: 480, call_time: new Date("2023-10-01T10:25:00Z"), caller_name: "Frank" }, // Short call (8 minutes)
//     { _id: "7", call_id: 7, phone_number: "3332221111", call_duration: 1500, call_time: new Date("2023-10-01T10:30:00Z"), caller_name: "Grace" }, // Long call (25 minutes)
//     { _id: "8", call_id: 8, phone_number: "6667778888", call_duration: 1000, call_time: new Date("2023-10-01T10:35:00Z"), caller_name: "Hank" }  // Long call (16 minutes)
// ];

  const separateCalls = (callRecords: CallRecords[]) => {
    const shortCallsCount = callRecords.filter(record => record.call_duration <= 10 * 60).length;
    const longCallsCount = callRecords.filter(record => record.call_duration > 10 * 60).length;

    return [
        {
            name: "Short",
            value: shortCallsCount
        },
        {
            name: "Long",
            value: longCallsCount
        }
    ];
};

  // const data01 = separateCalls(callRecordsArray)
  const data01 = separateCalls(callRecords)

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