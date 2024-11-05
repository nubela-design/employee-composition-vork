'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function PieChart({ data }) {
  if (!data || !data.labels || !data.datasets) return null;

  const options = {
    chart: {
      type: 'pie',
      foreColor: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)'
    },
    labels: data.labels,
    colors: [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ],
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontFamily: 'var(--font-geist-sans)',
      height: 'auto',
      offsetY: 10,
      labels: {
        colors: 'hsl(var(--foreground))'
      },
      markers: {
        width: 8,
        height: 8,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 3
      },
      containerMargin: {
        top: 12
      },
      formatter: function(seriesName, opts) {
        return seriesName.length > 30 ? seriesName.substring(0, 30) + '...' : seriesName;
      }
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'var(--font-geist-sans)'
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
    <div className="w-[500px]">
      <Chart
        options={options}
        series={data.datasets[0].data}
        type="pie"
        width="500"
        height="500"
      />
    </div>
  );
}

export default PieChart;