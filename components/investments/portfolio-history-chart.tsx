"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: any[];
}

export function
PortfolioHistoryChart({
  data,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-6">
        Portfolio History
      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <XAxis
              dataKey="snapshot_date"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="portfolio_value"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}