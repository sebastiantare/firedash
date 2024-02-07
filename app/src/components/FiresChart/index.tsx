import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FiresChartProps = {
    data: {
        name: string,
        uv: number,
        pv: number,
        amt: number
    }[]
}

export const FiresChart = ({data}: FiresChartProps) => {
    return (
        <ResponsiveContainer width="400px" height="400px">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="red" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="orange" />
            </LineChart>
        </ResponsiveContainer>
    );

}
