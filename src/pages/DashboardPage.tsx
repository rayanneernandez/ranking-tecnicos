import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import MetricsOverview from '../components/Dashboard/MetricsOverview';
import TechnicianRankTable from '../components/Dashboard/TechnicianRankTable';

const DashboardPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div key={refreshKey}>
      <DashboardHeader onRefresh={handleRefresh} />
      <MetricsOverview />
      <TechnicianRankTable />
    </div>
  );
};

export default DashboardPage;