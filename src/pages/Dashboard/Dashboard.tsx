import React from 'react';
import { HeroSection } from '../../components/Dashboard/HeroSection';
import { MetricsSection } from '../../components/Dashboard/MetricsSection';
import { AnalyticsSection } from '../../components/Dashboard/AnalyticsSection';
import { useDashboardData } from '../../hooks/useDashboardData';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { metrics, hotelAnalytics, roomActivity, firstName } = useDashboardData();

  return (
    <div className="dashboard mt-6">
      <HeroSection firstName={firstName} />
      <MetricsSection metrics={metrics} />
      <AnalyticsSection 
        hotelAnalytics={hotelAnalytics} 
        roomActivity={roomActivity} 
      />
    </div>
  );
};