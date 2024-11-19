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
      foreColor: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-geist-sans)',
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
    dataLabels: {
      enabled: true
    },
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
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
        }
      }
    }]
  };

  // Create custom legend items
  const legendItems = data.labels.map((label, index) => {
    const value = data.datasets[0].data[index];
    const percentage = ((value / total) * 100).toFixed(1);
    const countryData = data.datasets[0].flags?.[index];

    return {
      label,
      value,
      percentage,
      color: options.colors[index],
      flagUrl: countryData?.flagUrl
    };
  });

  return (
    <div className="flex flex-col gap-8 items-center w-full">
      <div className="w-full max-w-[500px]">
        <Chart
          options={options}
          series={data.datasets[0].data}
          type="donut"
          width="100%"
          height="500"
        />
      </div>
      <div className="w-full max-w-[1200px]">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {legendItems.map((item, index) => (
            <div key={index} className="flex gap-3 items-center p-2 rounded hover:bg-muted">
              <div 
                className="flex-shrink-0 w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-grow min-w-0">
                <div className="flex gap-2 items-center">
                  {item.flagUrl && (
                    <img 
                      src={item.flagUrl} 
                      alt="" 
                      className="object-cover w-4 h-3"
                    />
                  )}
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.value.toLocaleString()} ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart; 