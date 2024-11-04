'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function DoughnutChart({ data }) {
  if (!data || !data.labels || !data.datasets) return null;

  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    chart: {
      type: 'donut',
      foreColor: 'hsl(var(--foreground))'
    },
    labels: data.labels,
    colors: [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: 'hsl(var(--foreground))'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: 'hsl(var(--foreground))'
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={data.datasets[0].data}
        type="donut"
        width="450"
      />
    </div>
  );
}

export default DoughnutChart; 