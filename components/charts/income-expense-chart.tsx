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
  income: number;
  expenses: number;
}

export function IncomeExpenseChart({
  income,
  expenses,
}: Props) {
  const data = [
    {
      name: "Income",
      amount: income,
    },
    {
      name: "Expenses",
      amount: expenses,
    },
  ];

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
    bottom: 20,
  }}
>
          <XAxis
  dataKey="name"
  tick={{
    fontSize: 12,
  }}
/>

          <YAxis />

          <Tooltip
  formatter={(value) => [
    `₹${Number(value).toLocaleString()}`,
    "Amount",
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