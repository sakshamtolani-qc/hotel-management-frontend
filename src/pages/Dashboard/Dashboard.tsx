import React from 'react';
import { Header } from '../../components/Dashboard/Header';
import { HeroSection } from '../../components/Dashboard/HeroSection';
import { MetricsSection } from '../../components/Dashboard/MetricsSection';
import { AnalyticsSection } from '../../components/Dashboard/AnalyticsSection';
import { Footer } from '../../components/Dashboard/Footer';
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