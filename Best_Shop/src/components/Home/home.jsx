import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import StockDashboard from "../Dashboards/main_dashboard";
import requestApi from "../../utils/axios";
import CountUp from "react-countup";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [shopCount, setShopCount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, shopCountResponse, totalPriceResponse] =
          await Promise.all([
            requestApi("GET", "/api/stock/shop-user"),
            requestApi("GET", "/api/stock/shop-count"),
            requestApi("GET", "/api/stock/dashboard-data"),
          ]);

        setUserData(userDataResponse.data[0].shop_user);
        setShopCount(shopCountResponse.data[0].shop_count);
        setTotalPrice(totalPriceResponse.data[0].total_price);
        console.log(shopCount);
        console.log(userDataResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, maybe show a message to the user
      }
    };

    fetchData();
  }, []);

  const handleNaviagte = (path) => {
    navigate(path);
  };
  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="chart-container">
            <div className="stock-chart">
              <div className="graph-and-shopinfo">
                <div className="stock-dashboard-flex">
                  <StockDashboard />
                </div>
                <div className="shop-info">
                  <div className="content">
                    <h3>
                      Shops:
                      <CountUp duration={1} end={shopCount} />
                    </h3>
                  </div>
                  <div className="content">
                    <h4>
                      Total Price:
                      <CountUp duration={2} end={totalPrice} />{" "}
                    </h4>
                    <p>(Upto 30 Days)</p>
                  </div>
                  <div className="content con1">
                    <h3>
                      Users:
                      <CountUp duration={1} end={userData} />
                    </h3>
                  </div>
                  <div className="content con1">
                    <h3>BestShop Website</h3>
                  </div>
                  <div className="view-more-button-div">
                    <button
                      className="view-more-charts-button"
                      onClick={() => handleNaviagte("/model")}
                    >
                      {" "}
                      View More
                    </button>
                  </div>
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
