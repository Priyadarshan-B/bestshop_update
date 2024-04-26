import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import requestApi from "../../utils/axios";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import InventoryDashboard from "../Dashboards/inventory_dashboard";

export default function SimpleBarChart() {
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
    <div className="dashboard-container">
      <HorizontalNavbar />

      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">

            <div className="inventory-card">
              <InventoryDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
