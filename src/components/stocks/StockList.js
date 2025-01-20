import React, { useState, useEffect } from 'react';
import AddStockModal from '../add/edit/AddstockModal';
import backgroundImage from '../stocks/stocks_img.jpg';
import image from './img2.png';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const symbols = ['TSCO.LON', 'SHOP.TRT', 'GPV.TRV', 'MBG.DEX', '600104.SHH', '000002.SHZ'];

  const API_KEY = 'demo';
  const STOCK_API_URL =
    'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&outputsize=full&apikey=' +
    API_KEY;

  const fetchStockData = async () => {
    const fetchedStocks = [];
    for (const symbol of symbols) {
      try {
        const response = await fetch(STOCK_API_URL.replace('{symbol}', symbol));
        const data = await response.json();

        if (data['Meta Data'] && data['Time Series (Daily)']) {
          const lastDate = Object.keys(data['Time Series (Daily)'])[0];
          const closePrice = parseFloat(
            data['Time Series (Daily)'][lastDate]['4. close']
          );

          fetchedStocks.push({
            ticker: symbol,
            name: data['Meta Data']['2. Symbol'],
            currentPrice: closePrice,
          });
        } else {
          console.warn(`No data available for symbol: ${symbol}`);
        }
      } catch (error) {
        console.error(`Failed to fetch data for symbol: ${symbol}`, error);
      }
    }

    localStorage.setItem(
      'stocks',
      JSON.stringify({
        data: fetchedStocks,
        timestamp: Date.now(),
      })
    );

    setStocks(fetchedStocks);
  };

  useEffect(() => {
    const cachedData = localStorage.getItem('stocks');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const cacheDuration = 60 * 60 * 1000;
      if (Date.now() - parsedData.timestamp < cacheDuration) {
        setStocks(parsedData.data);
      } else {
        fetchStockData();
      }
    } else {
      fetchStockData();
    }
  }, []);

  const handleAddStock = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddStockSubmit = (stockData) => {
    console.log('Stock added:', stockData);
    setShowModal(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensure full height
        padding: '1rem',
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
  style={{
    backgroundImage: `url(${image})`, // Use your desired image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Available Stocks
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stocks?.map((stock) => (
            <li
              key={stock.ticker}
              className="flex flex-col items-center bg-gray-50 p-4 shadow-sm rounded-md  border border-gray-800 hover:shadow-md transition"
            >
              <p className="text-lg font-medium text-gray-700">
                {stock.name} ({stock.ticker})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Current Price:{' '}
                <span className="font-semibold">
                  ${stock.currentPrice.toFixed(2)}
                </span>
              </p>
              <button
                onClick={() => handleAddStock(stock)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Add to Portfolio
              </button>
            </li>
          ))}
        </ul>
        {stocks.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            API is fetching data. Demo prices will appear soon. Please be
            patient as free API requests are limited!
          </p>
        )}
      </div>

      {showModal && selectedStock && (
        <AddStockModal
          stock={selectedStock}
          onClose={handleCloseModal}
          onAdd={handleAddStockSubmit}
        />
      )}
    </div>
  );
};

export default StockList;


