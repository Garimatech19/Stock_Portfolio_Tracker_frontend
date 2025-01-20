import React from 'react';
import StockList from '../components/stocks/StockList'; 
import Navbar from '../components/Navbar/Navbar';


const MainPage = () => {
  return (
    <div >
      <Navbar />
      <div className="p-4">
        <StockList />
      </div>
    </div>
  );
};

export default MainPage;
