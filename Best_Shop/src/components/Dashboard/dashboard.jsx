import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Dashboard/dashboard.css";
import requestApi from "../../utils/axios";

import apiHost from "../../utils/api";

const DashboardWrapper = () => {
  return <Dashboard />;
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    series: [
      { name: "Product Count", data: [0, 0, 0], yaxis: 0 },
      { name: "Price of the Product", data: [0, 0, 0], yaxis: 1 },
      { name: "Rate of the Product", data: [0, 0, 0], yaxis: 2 },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          borderRadius: "2",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Less Than 30 Days",
          "Between 30 to 180 days",
          "Between 180 to 365 days",
        ],
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: [{ show: false }, { show: false }, { show: false }],
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val;
          },
        },
      },
      title: {
        text: "Dashboard",
        style: {
          color: "#444",
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestApi("GET", `/api/stock/dashboard-data`);
        console.log("Response:", response);

        if (!response || !response.success) {
          throw new Error("Failed to fetch data");
        }

        const apiData = response.data;

        const seriesData = {
          total_quantity: [],
          total_price: [],
          rate_of_product: [],
        };

        apiData.forEach((item) => {
          seriesData.total_quantity.push(parseFloat(item.total_quantity));
          seriesData.total_price.push(parseFloat(item.total_price));
          seriesData.rate_of_product.push(parseFloat(item.rate_of_product));
        });

        const updatedSeries = [
          { name: "Total Quantity", data: seriesData.total_quantity },
          { name: "Total Price", data: seriesData.total_price },
          { name: "Rate of Product", data: seriesData.rate_of_product },
        ];

        setChartData((prevChartData) => ({
          ...prevChartData,
          series: updatedSeries,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">
            <ReactApexChart
              height={"95%"}
              width={"100%"}
              options={chartData.options}
              series={chartData.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
