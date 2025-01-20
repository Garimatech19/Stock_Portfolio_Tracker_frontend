import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-purple-300 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-blue-600 italic">
        Portfolio Tracker
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition font-medium underline"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition font-medium underline"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

