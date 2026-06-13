"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    category: string;
    amount: number;
  }[];
}

export function CategorySpendingChart({
  data,
}: Props) {
  return (
    <div className="w-full">
      <ResponsiveContainer
        width="100%"
        height={260}
      >
        <BarChart
  data={data}
  margin={{
    top: 10,
    right: 10,
    left: -20,
    bottom: 40,
  }}
>
          <XAxis
  dataKey="category"
  tick={{
    fontSize: 12,
  }}
  interval={0}
  angle={-20}
  textAnchor="end"
/>

          <YAxis />

          <Tooltip
  formatter={(value) => [
    `₹${Number(value).toLocaleString()}`,
    "Spent",
  ]}
/>

          <Bar
  dataKey="amount"
  radius={[8, 8, 0, 0]}
/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}