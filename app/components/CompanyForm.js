"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PieChart from "./Pie";
import BarChart from "./Bar";
import DoughnutChart from "./Doughnut";
import ColumnChart from "./Column";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyForm = () => {
  const [companyUrl, setCompanyUrl] = useState("");
  const [countryData, setCountryData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [occupationData, setOccupationData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const handleSubmit = async () => {
    fetch(`/api/mockEmployeeListing?url=${companyUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const countryCount = {};
        const occupationCount = {};

        data.employees.forEach((employee) => {
          const country = employee.profile.country_full_name;
          const occupation = employee.profile.occupation;
          countryCount[country] = (countryCount[country] || 0) + 1;
          occupationCount[occupation] = (occupationCount[occupation] || 0) + 1;
        });

        setCountryData({
          labels: Object.keys(countryCount),
          datasets: [{
            data: Object.values(countryCount),
            flags: data.employees.map(employee => ({
              flagUrl: employee.profile.flagUrl
            }))
          }]
        });

        setOccupationData({
          labels: Object.keys(occupationCount),
          datasets: [{ data: Object.values(occupationCount) }],
        });
      });
  };

  const handleDownload = (type, format, data) => {
    const chart = document.querySelector(`#${type}Chart`);
    if (!chart) return;
    
    const chartInstance = chart.querySelector('.apexcharts-canvas');
    if (!chartInstance) return;
    
    const chartObject = window.ApexCharts.getChartByID(chartInstance.id);
    if (!chartObject) return;
    
    if (format === 'svg') {
      chartObject.exports.exportToSVG();
    } else if (format === 'png') {
      chartObject.exports.exportToPNG();
    } else if (format === 'csv') {
      const csvData = [
        data.labels,
        data.datasets[0].data
      ];
      const csvContent = "data:text/csv;charset=utf-8," + 
        csvData[0].join(",") + "\n" + 
        csvData[1].join(",");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${type}-chart.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl min-h-[100vh] flex flex-col p-4">
      <div className={`flex flex-col gap-8 w-full ${!countryData.labels.length ? 'flex-1 justify-center' : 'mb-12'}`}>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Employee Composition</h1>
          <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
            Analyze the distribution of employees across countries and occupations by entering a LinkedIn company URL.
          </p>
        </div>
        <div className="flex flex-col gap-4 mx-auto w-full sm:flex-row sm:w-auto">
          <Input
            className="w-full sm:w-96"
            placeholder="LinkedIn Company URL"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button className="w-full sm:w-auto" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      {(countryData.labels.length > 0 || occupationData.labels.length > 0) && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="country" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 w-full">
                <TabsTrigger value="country">Country Distribution</TabsTrigger>
                <TabsTrigger value="occupation">Occupation Distribution</TabsTrigger>
              </TabsList>
              <TabsContent value="country">
                <Tabs defaultValue="doughnut" className="mx-auto">
                  <TabsList className="grid grid-cols-2 mx-auto mb-8 w-full sm:grid-cols-4">
                    <TabsTrigger value="doughnut">Doughnut</TabsTrigger>
                    <TabsTrigger value="pie">Pie</TabsTrigger>
                    <TabsTrigger value="bar">Bar</TabsTrigger>
                    <TabsTrigger value="column">Column</TabsTrigger>
                  </TabsList>
                  <TabsContent value="doughnut" className="flex flex-col gap-4 items-center">
                    <div id="doughnutChart">
                      <DoughnutChart data={countryData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'png')}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'svg')}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'csv')}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="pie" className="flex flex-col gap-4 items-center">
                    <div id="pieChart" className="overflow-x-auto w-full">
                      <PieChart data={countryData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'png')}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'svg')}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'csv')}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="bar" className="flex flex-col gap-4 items-center">
                    <div id="barChart">
                      <BarChart data={countryData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'png')}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'svg')}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'csv')}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="column" className="flex flex-col gap-4 items-center">
                    <div id="columnChart">
                      <ColumnChart data={countryData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'png')}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'svg')}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'csv')}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="occupation">
                <Tabs defaultValue="doughnut" className="mx-auto">
                  <TabsList className="grid grid-cols-2 mx-auto mb-8 w-full sm:grid-cols-4">
                    <TabsTrigger value="doughnut">Doughnut</TabsTrigger>
                    <TabsTrigger value="pie">Pie</TabsTrigger>
                    <TabsTrigger value="bar">Bar</TabsTrigger>
                    <TabsTrigger value="column">Column</TabsTrigger>
                  </TabsList>
                  <TabsContent value="doughnut" className="flex flex-col gap-4 items-center">
                    <div id="doughnutChart">
                      <DoughnutChart data={occupationData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'png', occupationData)}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'svg', occupationData)}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('doughnut', 'csv', occupationData)}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="pie" className="flex flex-col gap-4 items-center">
                    <div id="pieChart">
                      <PieChart data={occupationData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'png', occupationData)}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'svg', occupationData)}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('pie', 'csv', occupationData)}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="bar" className="flex flex-col gap-4 items-center">
                    <div id="barChart">
                      <BarChart data={occupationData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'png', occupationData)}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'svg', occupationData)}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('bar', 'csv', occupationData)}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="column" className="flex flex-col gap-4 items-center">
                    <div id="columnChart">
                      <ColumnChart data={occupationData} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'png', occupationData)}>
                        Download PNG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'svg', occupationData)}>
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload('column', 'csv', occupationData)}>
                        Download CSV
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyForm;