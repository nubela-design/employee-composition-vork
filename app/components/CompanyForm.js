"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PieChart from "./Pie";
import BarChart from "./Bar";
import DoughnutChart from "./Doughnut";
import ColumnChart from "./Column";

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
          datasets: [{ data: Object.values(countryCount) }],
        });

        setOccupationData({
          labels: Object.keys(occupationCount),
          datasets: [{ data: Object.values(occupationCount) }],
        });
      });
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 mb-12 w-full">
        <div className="flex gap-4 mx-auto">
          <Input
          className="w-96"
          placeholder="LinkedIn Company URL"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {countryData.labels.length > 0 && (
          <>
            <PieChart data={countryData} />
            <BarChart data={countryData} />
            <DoughnutChart data={countryData} />
            <ColumnChart data={countryData} />
          </>
        )}
        {occupationData.labels.length > 0 && (
          <>
            <PieChart data={occupationData} />
            <BarChart data={occupationData} />
            <DoughnutChart data={occupationData} />
            <ColumnChart data={occupationData} />
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyForm;