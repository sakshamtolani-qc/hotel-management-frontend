import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { MetricsSection } from './MetricsSection';
import { AnalyticsSection } from './AnalyticsSection';
import { Footer } from './Footer';
import { useDashboardData } from '../../hooks/useDashboardData';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { metrics, hotelAnalytics, roomActivity, firstName } = useDashboardData();

  return (
    <div className="dashboard">
      <Header />
      <HeroSection firstName={firstName} />
      <MetricsSection metrics={metrics} />
      <AnalyticsSection 
        hotelAnalytics={hotelAnalytics} 
        roomActivity={roomActivity} 
      />
      <Footer />
    </div>
  );
};