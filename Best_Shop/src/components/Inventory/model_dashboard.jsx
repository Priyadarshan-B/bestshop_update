import React, { useState } from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "./inventory.css";
import InventoryDashboard from "../Dashboards/inventory_dashboard";
import AvailableDashboard from "../Dashboards/available_dashboard";

const ModelDashboard = () => {
  // State to manage which dashboard to display
  const [selectedDashboard, setSelectedDashboard] = useState("inventory");

  // Function to handle button click and update selectedDashboard state
  const handleButtonClick = (dashboard) => {
    setSelectedDashboard(dashboard);
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="inventory-and-available-dashb-page">
            {/* Buttons to switch between dashboards */}
            <div>
              <button
                className={selectedDashboard === "inventory" ? "active" : ""}
                onClick={() => handleButtonClick("inventory")}
              >
                EXPLORE INVENTORY
              </button>
              <button
                className={selectedDashboard === "available" ? "active" : ""}
                onClick={() => handleButtonClick("available")}
              >
                EXPLORE MODELS
              </button>
            </div>
            <div className={selectedDashboard === "inventory" ? "container-for-inventory" : "hidden"}>
              
                <InventoryDashboard />
              
            </div>
            <div className={selectedDashboard === "available" ? "container-for-models" : "hidden"}>
              
                <AvailableDashboard />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDashboard;
