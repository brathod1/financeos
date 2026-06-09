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
    <div className="h-80 w-full min-w-0">
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}