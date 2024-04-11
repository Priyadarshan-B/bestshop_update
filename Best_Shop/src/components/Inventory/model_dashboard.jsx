import React from "react";
import AvailableDashboard from "../Dashboards/available_dashboard";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "./inventory.css";


const ModelDashboard = ()=>{
    return (
      <div className="dashboard-container">
        <HorizontalNavbar />
        <div className="vandc-container">
          <VerticalNavbar />
          <div className="dashboard-body">
            <div className="chart-container">
              <AvailableDashboard/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default ModelDashboard


