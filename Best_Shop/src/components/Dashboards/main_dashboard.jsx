import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../Stock_Dashboard/stock_dashboard.css";
import requestApi from "../../utils/axios";


const StockDashboard = () => {
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
        categories: ["Less Than 30 Days", "30 to 180 days", "180 to 365 days"],

        labels: {
          style: {
            colors: 'var(--text)'
          },
          formatter: function (val) {
            return val;
          },
        },
        style: {
          colors: 'var(--text)'
        },

      },
      yaxis: [
        { show: false },
        { show: false },
        { show: false, labels: { style: { color: "var(--text)" } } },
      ],
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
          color: "var(--text)",
        },
      },
      legend: {
        labels: {
          colors: 'var(--text)'
        }
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestApi("GET", "/api/stock/dashboard-data");

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

        // const updatedSeries = [
        //   { name: "Total Quantity", data: seriesData.total_quantity },
        //   { name: "Total Price", data: seriesData.total_price },
        //   { name: "Rate of Product", data: seriesData.rate_of_product },
        // ];

        const updatedSeries = [
          { data: seriesData.total_quantity },
          { data: seriesData.total_price },
          { data: seriesData.rate_of_product },
        ];
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: updatedSeries,
        }));
      } catch (error) { }
    };

    fetchData();
  }, []);

  return (
    <div style={{
      height: "100%",
      width: "95%",
      padding: "10px"

    }}>
      <ReactApexChart
        height={"95%"}
        width={"100%"}
        options={chartData.options}
        series={chartData.series}
        type="bar"
      />
    </div>
  );
};

export default StockDashboard;