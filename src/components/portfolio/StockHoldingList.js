import React, { useEffect, useState } from 'react';
import api from 'utils/api';
import AddEditStockModal from '../add/edit/AddEditStockModal';


const StockHoldingList = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get('/');
        console.log('API Response:', response.data); // Log the response to debug
        setStocks(response.data);
      } catch (error) {
        console.error('Failed to fetch portfolio stocks', error);
        alert('Error fetching portfolio stocks!');
      }
    };
    fetchPortfolio();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setStocks(stocks.filter((stock) => stock.id !== id));
    } catch (error) {
      console.error('Failed to delete stock', error);
      alert('Error deleting the stock!');
    }
  };

  const handleEdit = (stock) => setSelectedStock(stock);

  const handleSave = async (updatedStock) => {
    try{
    if (updatedStock.id) {
      await api.put('/', updatedStock);
    } else {
      await api.post('/', updatedStock);
    }
    setSelectedStock(null);
    // Refresh portfolio list
    const response = await api.get('/');
    setStocks(response.data);
  } catch (error) {
    console.error('Failed to save stock', error);
    alert('Error saving the stock!');
  }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Stock Holdings</h2>
        <ul className="divide-y divide-gray-200">
          {stocks?.map((stock) => (
            <li
              key={stock.id}
              className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {stock.name} ({stock.ticker})
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {stock.quantity}, Buy Price: ${stock.buyPrice}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(stock)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stock.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {stocks.length === 0 && (
          <p className="text-gray-500 text-center mt-6">No stocks in your portfolio.</p>
        )}
        {selectedStock && (
          <AddEditStockModal
            stock={selectedStock}
            onSave={handleSave}
            onClose={() => setSelectedStock(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StockHoldingList;
