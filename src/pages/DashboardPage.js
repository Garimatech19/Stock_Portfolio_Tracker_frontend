import React from 'react';
import PortfolioDashboard from '../components/portfolio/PortfolioDashboard';
import StockHoldingList from '../components/portfolio/StockHoldingList';
import Navbar from '../components/Navbar/Navbar';
 

const DashboardPage = () => (
  <div>
    <Navbar />
    <div className="p-4">
      <PortfolioDashboard />
      <StockHoldingList />
    </div>
  </div>
);

export default DashboardPage;
