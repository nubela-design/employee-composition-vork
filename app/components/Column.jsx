'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ColumnChart({ data }) {
  if (!data || !data.labels || !data.datasets) return null;

  const options = {
    chart: {
      type: 'bar',
      foreColor: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)',
      toolbar: {
        show: false  // Disable the toolbar/hamburger menu
      }
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
      'hsl(var(--chart-6))',
      'hsl(var(--chart-7))',
      'hsl(var(--chart-8))',
      'hsl(var(--chart-9))',
      'hsl(var(--chart-10))',
      'hsl(var(--chart-11))',
      'hsl(var(--chart-12))',
      'hsl(var(--chart-13))',
      'hsl(var(--chart-14))',
      'hsl(var(--chart-15))',
      'hsl(var(--chart-16))',
      'hsl(var(--chart-17))',
      'hsl(var(--chart-18))',
      'hsl(var(--chart-19))',
      'hsl(var(--chart-20))',
      'hsl(var(--chart-21))',
      'hsl(var(--chart-22))',
      'hsl(var(--chart-23))',
      'hsl(var(--chart-24))',
      'hsl(var(--chart-25))',
      'hsl(var(--chart-26))',
      'hsl(var(--chart-27))',
      'hsl(var(--chart-28))',
      'hsl(var(--chart-29))',
      'hsl(var(--chart-30))',
      'hsl(var(--chart-31))',
      'hsl(var(--chart-32))',
      'hsl(var(--chart-33))',
      'hsl(var(--chart-34))',
      'hsl(var(--chart-35))',
      'hsl(var(--chart-36))',
      'hsl(var(--chart-37))',
      'hsl(var(--chart-38))',
      'hsl(var(--chart-39))',
      'hsl(var(--chart-40))',
      'hsl(var(--chart-41))',
      'hsl(var(--chart-42))',
      'hsl(var(--chart-43))',
      'hsl(var(--chart-44))',
      'hsl(var(--chart-45))',
      'hsl(var(--chart-46))',
      'hsl(var(--chart-47))',
      'hsl(var(--chart-48))',
      'hsl(var(--chart-49))',
      'hsl(var(--chart-50))',
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
    dataLabels: {
      enabled: false
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
        height="400"
        width="600"
      />
    </div>
  );
}

export default ColumnChart;