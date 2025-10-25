import React from 'react';
import { MetricCard } from '../../utils/MetricCard';
import { MiniChart } from '../../utils/MiniChart';
import { DashboardMetrics } from '../../hooks/useDashboardData';

interface MetricsSectionProps {
  metrics?: DashboardMetrics; // optional now
  loading?: boolean;           // optional loading flag
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics, loading = false }) => {
  // Default metrics for safe rendering
  const defaultMetrics: DashboardMetrics = {
    totalRevenue: { value: '20k', trend: '12.5%' },
    avgTransactionValue: { value: '3.4k', trend: '1.5%' },
    avgFootfall: { value: '27', trend: '0.5%' }
  };

  const safeMetrics = metrics ?? defaultMetrics;

  if (loading) {
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">Hotel Analytics</h2>
        <div className="w-24 h-1 bg-gray-900 mx-auto mt-2 mb-6"></div>
        <p>Loading metrics...</p>
      </section>
    );
  }

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
            value={safeMetrics.totalRevenue?.value ?? "0"}
            trend={{ value: safeMetrics.totalRevenue?.trend ?? "0%", direction: 'up' }}
            chart={<MiniChart />}
          />
          <MetricCard
            title="Avg. Transaction Value"
            value={safeMetrics.avgTransactionValue?.value ?? "0"}
            trend={{ value: safeMetrics.avgTransactionValue?.trend ?? "0%", direction: 'up' }}
            chart={<MiniChart />}
          />
          <MetricCard
            title="Avg. Footfall"
            value={safeMetrics.avgFootfall?.value ?? "0"}
            trend={{ value: safeMetrics.avgFootfall?.trend ?? "0%", direction: 'up' }}
            chart={<MiniChart />}
          />
        </div>
      </div>
    </section>
  );
};
