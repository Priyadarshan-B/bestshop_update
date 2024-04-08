import React from "react";
import ReactApexChart from "react-apexcharts";
import '../Dashboard/dashboard.css';
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 7,
            dataLabels: {
              position: 'top',
            },
            columnWidth: '40%', 
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"],
          },
        },
        xaxis: {
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
        title: {
          text: 'Total Impression',
          style: {
            color: '#444',
          },
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 250,
              },
            },
          },
          {
            breakpoint: 1000,
            options: {
              chart: {
                height: 400,
              },
            },
          },
        ],
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await requestApi("GET", "/api/stock/sales-dashboard?category=1");

      if (!response || !response.success) {
        throw new Error("Failed to fetch data");
      }

      const apiData = response.data;
      const { model_name, total_quantity } = apiData;

      this.setState({
        series: [
          {
            name: model_name,
            data: [parseFloat(total_quantity)] // Convert total_quantity to float
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
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
                options={this.state.options}
                series={this.state.series}
                type="bar"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
