import React from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "./stock_dashboard.css";
import StockDashboard from "../Dashboards/main_dashboard";

const DashboardWrapper = () => {
  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">
            <StockDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
