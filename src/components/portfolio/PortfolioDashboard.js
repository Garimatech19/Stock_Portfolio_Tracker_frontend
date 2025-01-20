import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PortfolioChart from './PortfolioChart'; 

const STOCK_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.API_KEY; 

const PortfolioDashboard = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchStockPrice = async (ticker) => {
      try {
        const response = await fetch(
          `${STOCK_API_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`
        );
        const data = await response.json();
        const latestDate = Object.keys(data['Time Series (Daily)'])[0];
        return parseFloat(data['Time Series (Daily)'][latestDate]['4. close']);
      } catch (error) {
        console.error(`Error fetching price for ${ticker}:`, error);
        return 0;
      }
    };

    const fetchPortfolioData = async () => {
      try {
        const response = await api.get('/');
        const stocks = response.data;

        let total = 0;
        let top = null;
        const chartDataArray = [];
        for (const stock of stocks) {
          const currentPrice = await fetchStockPrice(stock.ticker);
          const currentValue = stock.quantity * currentPrice;
          total += currentValue;
          chartDataArray.push({ name: stock.name, value: currentValue });

          if (!top || currentValue > top.value) {
            top = { name: stock.name, value: currentValue };
          }
        }

        setTotalValue(total);
        setTopStock(top);
        setChartData({
          labels: chartDataArray.map((d) => d.name),
          datasets: [
            {
              label: 'Stock Performance',
              data: chartDataArray.map((d) => d.value),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Portfolio Dashboard</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left section for total value and top performing stock */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Total Portfolio Value</h3>
              <p className="text-2xl font-bold text-gray-800">${totalValue.toFixed(2)}</p>
            </div>
            {topStock && (
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Top Performing Stock</h3>
                <p className="text-xl font-bold text-gray-800">{topStock.name}</p>
                <p className="text-md text-gray-600">Value: ${topStock.value.toFixed(2)}</p>
              </div>
            )}
          </div>

          {/* Right section for pie chart */}
          <div className="w-full md:w-2/3">
            <PortfolioChart data={chartData} />
          </div>
        </div>
 
      </div>
    </div>
  );
};

export default PortfolioDashboard;
