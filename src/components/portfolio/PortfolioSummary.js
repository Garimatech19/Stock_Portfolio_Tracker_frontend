import React from 'react';

const PortfolioSummary = ({ totalValue, topStock }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
    <div className="w-full sm:w-1/2 bg-blue-100 p-6 rounded-lg shadow-md">
      <p className="text-lg font-medium text-gray-600 mb-2">Total Portfolio Value</p>
      <p className="text-2xl font-bold text-blue-600">${totalValue?totalValue.toFixed(2):'0.00'}</p>
    </div>
 
      <div className="w-full sm:w-1/2 bg-green-100 p-6 rounded-lg shadow-md">
        <p className="text-lg font-medium text-gray-600 mb-2">Top Performing Stock</p>
        {topStock && (
        <p className="text-2xl font-bold text-green-600">
          {topStock.name} (${topStock.value.toFixed(2)})
        </p>
    )}
    </div>
  </div>
);

export default PortfolioSummary;
