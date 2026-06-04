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
    <div className="h-80">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}