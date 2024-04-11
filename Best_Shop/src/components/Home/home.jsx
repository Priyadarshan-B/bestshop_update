import React from "react";
import {  useNavigate } from "react-router-dom";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import StockDashboard from "../Dashboards/main_dashboard";
import InventoryDashboard from "../Dashboards/inventory_dashboard";
import requestApi from "../../utils/axios";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    // const fetchData = async()=>{
    //     try{
    //         const response = await requestApi("GET", `/api/stock/dashboard-data`)
    //         if(!response || !response.success){
    //             throw new Error("Failed to fetch data")
    //         }
    //         const apiData  = response.data;
    //     }
    // }

const handleNaviagte = (path)=>{
    navigate(path);
;}
  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">
            <div className="dashboard">
              <div className="stock-chart">
                  <div className="chart">
                    <StockDashboard />
                    </div>
                  
                  <div className=" total-content">
                      <div className="content">
                        <h3>Shops:4</h3>
                      </div>
                      <div className="content">
                      <h3>Total:4551225 </h3>

                      </div>
                      <div className="content">
                        <h3>Users:10</h3>
                      </div>
                  </div>
              </div>
              <div className="inventory_button">
                  <div className="chart-inventory">
                        <InventoryDashboard />
                  
                  
                  </div>
                  <div className="chart-button">
                            <button className="dist_button" 
                            onClick={()=> handleNaviagte('/model')}
                            > View More</button>
                        </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
