import React from 'react';
import { Bar } from 'react-chartjs-2';
import './BarGraph.css'

const BarGraph = () => {
  const data = {
    labels: ['Active','Delayed','Re-assigned','Scope Change','Critical','Cancelled', 'Completed'],
    datasets: [
      {
        label: 'Projects Status',
        data: [12, 3, 5, 1, 3, 7, 6],
        backgroundColor: ['rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  return (
    <div className='card'>
      <Bar data={data} />
    </div>
  );
};

export default BarGraph;