import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
 
Chart.register(ArcElement, Tooltip, Legend, PieController);

const PortfolioChart = ({ data }) => {
  if (!data || !data.labels || data.labels.length === 0) {
    return <p className="text-gray-500 text-center">No data available to display the chart.</p>;
  }

  // Chart options to enable hover animation
  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#000000',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 10,
        cornerRadius: 4,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      animationDuration: 400,  
    },
    elements: {
      arc: { 
        hoverOffset: 50,  
      },
    },
    interaction: { 
      mode: 'nearest',
      intersect: false,
    }, 
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-700 text-center mb-4">Stock Performance</h3>
      <div className="w-full h-auto">
        <Pie data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default PortfolioChart;
