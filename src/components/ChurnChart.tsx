import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Customer } from '../types';

interface ChurnChartProps {
  data: Customer[];
}

const ChurnChart: React.FC<ChurnChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const plans = ['Basic', 'Pro', 'Enterprise'];
    return plans.map(plan => {
      const planCustomers = data.filter(c => c.plan === plan);
      const avgChurn = planCustomers.length 
        ? planCustomers.reduce((acc, curr) => acc + curr.churnProbability, 0) / planCustomers.length 
        : 0;
      return {
        name: plan,
        'Ймовірність відтоку (%)': Math.round(avgChurn)
      };
    });
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Середня ймовірність відтоку за тарифом</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: '#f3f4f6'}} />
          <Bar dataKey="Ймовірність відтоку (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChurnChart;