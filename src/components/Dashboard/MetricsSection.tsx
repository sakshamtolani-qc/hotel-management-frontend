import React from 'react';
import { MetricCard } from '../../utils/MetricCard';
import { MiniChart } from '../../utils/MiniChart';
import { DashboardMetrics } from '../../hooks/useDashboardData';

interface MetricsSectionProps {
  metrics: DashboardMetrics;
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Hotel Analytics</h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCard
            title="Total Revenue"
            value={metrics.totalRevenue.value}
            trend={{ value: metrics.totalRevenue.trend, direction: 'up' }}
            chart={<MiniChart />}
          />
          <MetricCard
            title="Avg. Transaction Value"
            value={metrics.avgTransactionValue.value}
            trend={{ value: metrics.avgTransactionValue.trend, direction: 'up' }}
            chart={<MiniChart />}
          />
          <MetricCard
            title="Avg. Footfall"
            value={metrics.avgFootfall.value}
            trend={{ value: metrics.avgFootfall.trend, direction: 'up' }}
            chart={<MiniChart />}
          />
        </div>
      </div>
    </section>
  );
};