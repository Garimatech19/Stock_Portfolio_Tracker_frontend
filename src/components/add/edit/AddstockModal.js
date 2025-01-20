import React, { useState } from 'react';
import api from '../../../utils/api';

const AddStockModal = ({ onClose, onAdd, stock }) => {
  const [formData, setFormData] = useState({
    name: stock.name || '',
    ticker: stock.ticker || '',
    quantity: 1,  // Default quantity is 1
    buyPrice: stock.currentPrice || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validate inputs
      if (!formData.name || !formData.ticker || !formData.quantity || !formData.buyPrice) {
        alert('Please fill in all fields');
        return;
      }

      // Call API to add stock
      await api.post('/', formData);
      onAdd(formData); // Notify parent about the new stock
      onClose(); // Close the modal
    } catch (error) {
      // console.error('Failed to add stock', error);
      // alert('An error occurred while adding the stock.');
      console.error('Full Error:', error); // Log everything for analysis
  console.error('Response Data:', error.response?.data); // Log response data specifically
  alert(`Error: ${error.response?.data?.error || 'Something went wrong!'}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4">Add New Stock</h3>
        <label className="block mb-2">
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            disabled
          />
        </label>
        <label className="block mb-2">
          Ticker:
          <input
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            disabled
          />
        </label>
        <label className="block mb-2">
          Quantity:
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            disabled
            className="border p-2 w-full rounded"
          />
        </label>
        <label className="block mb-4">
          Buy Price:
          <input
            name="buyPrice"
            type="number"
            value={formData.buyPrice}
            onChange={handleChange}
            disabled
            className="border p-2 w-full rounded"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;

