import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import requestApi from "../../utils/axios";

export default function InventoryDashboard() {
  const [chartData, setChartData] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // Default category ID
  const [categoryOptions, setCategoryOptions] = useState([]); // Options for the dropdown

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await requestApi("GET", "/api/structure/category");
        if (response.success) {
          // Map category data to options for the dropdown
          const options = response.data.map((category) => ({
            value: category.id,
            label: category.name,
          }));
          setCategoryOptions(options);
        } else {
          console.error("Error fetching categories:", response.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestApi(
          "GET",
          `/api/stock/sales-dashboard?category=${selectedCategoryId}`
        );
        if (response.success) {
          setChartData(response.data);
        } else {
          console.error("Error fetching data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategoryId]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategoryId(selectedOption.value);
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const { item_names, total_quantities, available_quantity } = chartData;

  return (
    <div style={{
        height:"100%"
    }}>
        <Select
        options={categoryOptions}
        onChange={handleCategoryChange}
        defaultValue={categoryOptions.find(
          (option) => option.value === selectedCategoryId
        )}
          />
        
          <ReactApexChart
        height={"90%"}
        width={"100%"}
        options={{
          chart: {
            type: "bar",
            height: 430,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: "2",
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: "15px",
              colors: ["#fff"],
            },
          },
          fill: {
            colors: ["#4ECDC4", "#2B908F"],
          },
          stroke: {
            show: true,
            width: 1,
            colors: ["#fff"],
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          xaxis: {
            categories: item_names,
          },
        }}
        series={[
          { name: "Total Quantities", data: total_quantities },
          { name: "Available Quantity", data: available_quantity },
        ]}
        type="bar"
          />
    </div>
  );
}
