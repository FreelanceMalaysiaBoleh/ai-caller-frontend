import { CallRecords } from '@/types/CallRecordType';
import { XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area, ResponsiveContainer, ReferenceLine } from 'recharts';


const AverageCallTimeChart = ({ callRecords }: { callRecords: CallRecords[] }) => {

    // const callRecordsArray: CallRecords[] = [
    //     { _id: "1", call_id: 1, phone_number: "1234567890", call_duration: 300, call_time: new Date("2023-10-01T10:00:00Z"), caller_name: "Alice" }, // Short call (5 minutes)
    //     { _id: "2", call_id: 2, phone_number: "0987654321", call_duration: 600, call_time: new Date("2023-10-01T10:05:00Z"), caller_name: "Bob" }, // Short call (10 minutes)
    //     { _id: "3", call_id: 3, phone_number: "1112223333", call_duration: 720, call_time: new Date("2023-10-01T10:10:00Z"), caller_name: "Charlie" }, // Short call (12 minutes)
    //     { _id: "4", call_id: 4, phone_number: "4445556666", call_duration: 1200, call_time: new Date("2023-10-01T10:15:00Z"), caller_name: "Dave" }, // Long call (20 minutes)
    //     { _id: "5", call_id: 5, phone_number: "5556667777", call_duration: 900, call_time: new Date("2023-10-01T10:20:00Z"), caller_name: "Eve" }, // Long call (15 minutes)
    //     { _id: "6", call_id: 6, phone_number: "8889990000", call_duration: 480, call_time: new Date("2023-10-01T10:25:00Z"), caller_name: "Frank" }, // Short call (8 minutes)
    //     { _id: "7", call_id: 7, phone_number: "3332221111", call_duration: 1500, call_time: new Date("2023-10-01T10:30:00Z"), caller_name: "Grace" }, // Long call (25 minutes)
    //     { _id: "8", call_id: 8, phone_number: "6667778888", call_duration: 1000, call_time: new Date("2023-10-01T10:35:00Z"), caller_name: "Hank" }  // Long call (16 minutes)
    // ];

    
    const separateCallRecordsByDuration = (callRecords: CallRecords[]): { value: number; duration: number }[] => {
        const durationMap: { [key: number]: number } = {};

        callRecords.forEach(record => {
            const durationInMinutes = Math.ceil(record.call_duration / 60);

            if (!durationMap[durationInMinutes]) {
                durationMap[durationInMinutes] = 0;
            }
            durationMap[durationInMinutes]++;
        });

        const result: { value: number; duration: number }[] = Object.entries(durationMap).map(([duration, value]) => ({
            value,
            duration: Number(duration)
        }));

        return result;
    };

    const data = separateCallRecordsByDuration(callRecords)

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
                <Area name="total calls" type="monotone" dataKey="value" stroke="#a2b800" fillOpacity={1} fill="url(#colorPv)" />
                <XAxis dataKey="duration" />
                <YAxis />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AverageCallTimeChart;