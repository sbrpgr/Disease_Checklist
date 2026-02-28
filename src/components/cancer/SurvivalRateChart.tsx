"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SurvivalRateChart({
  data,
}: {
  data: Array<{ stage: string; value: number }>;
}) {
  return (
    <div className="h-64 w-full rounded-xl border bg-white p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
