'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
      'hsl(var(--chart-20))'
    ],
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontFamily: 'var(--font-geist-sans)',
      height: 'auto',
      offsetY: 10,
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
        const countryData = data.datasets[0].flags?.[opts.seriesIndex];
        const truncatedName = seriesName.length > 30 ? seriesName.substring(0, 30) + '...' : seriesName;
        
        if (countryData?.flagUrl) {
          return `<span style="display: inline-flex; align-items: center; gap: 4px;">
            <img 
              src="${countryData.flagUrl}" 
              alt="${seriesName} flag" 
              style="width: 16px; height: 12px; object-fit: cover; vertical-align: middle;"
            />
            <span style="display: inline-block; vertical-align: middle;">${truncatedName}</span>
          </span>`;
        }
        return truncatedName;
      },
      labels: {
        useSeriesColors: false,
        colors: 'hsl(var(--foreground))'
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
    <div className="w-full max-w-[500px]">
      <Chart
        options={options}
        series={data.datasets[0].data}
        type="pie"
        width="100%"
        height="500"
      />
    </div>
  );
}

export default PieChart;