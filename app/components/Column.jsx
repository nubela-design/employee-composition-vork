'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ColumnChart({ data }) {
  if (!data || !data.labels || !data.datasets) return null;

  const options = {
    chart: {
      type: 'bar',
      foreColor: 'hsl(var(--foreground))'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
        distributed: true, // Enable different colors for each column
      }
    },
    colors: [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ],
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: 'hsl(var(--foreground))'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: 'hsl(var(--foreground))'
        }
      }
    },
    legend: {
      show: false // Hide legend since each column has unique color
    }
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={[{ data: data.datasets[0].data }]}
        type="bar"
        height="350"
      />
    </div>
  );
}

export default ColumnChart;