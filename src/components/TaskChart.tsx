import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface TaskChartProps {
  completed: number;
  pending: number;
}

const COLORS = ["#22c55e", "#f97316"];

export function TaskChart({ completed, pending }: TaskChartProps) {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Tasks Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
         
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
