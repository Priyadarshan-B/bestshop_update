import React from "react";
import ReactApexChart from "react-apexcharts";
import '../Dashboard/dashboard.css';
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Stocks',
          data: [2.3, 3.1, 4.0, 3.5,5.1,2.0]
        }
      ],
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
          categories: ["10%", "20%", "30%","40%", "50%", "60%"],
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
          // floating: true,
          // offsetY: 450,
          // align: 'center',
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