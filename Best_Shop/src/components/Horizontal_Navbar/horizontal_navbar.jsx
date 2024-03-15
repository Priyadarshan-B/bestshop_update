import React, { useState } from "react";
import { FaBell, FaUser, FaEnvelope, FaBars } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./horizontal_navbar.css";
import { useNavigate } from "react-router-dom";
import apiHost from "../../utils/api";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CategoryIcon from "@mui/icons-material/Category";
import TableChartIcon from "@mui/icons-material/TableChart";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddchartIcon from "@mui/icons-material/Addchart";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import Cookies from "js-cookie";

const HorizontalNavbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showMasterSubMenu, setShowMasterSubMenu] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMasterSubMenu = () => {
    setShowMasterSubMenu(!showMasterSubMenu);
  };

  const handleMasterClick = () => {
    toggleMasterSubMenu();
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSelectedField(null);
  };

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       return;
  //     }

  //     const response = await fetch(`${apiHost}/logout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       localStorage.removeItem("token");
  //       navigate("/login", {
  //         state: { successMessage: "Logout successfully" },
  //       });
  //     } else {
  //     }
  //   } catch (error) {
  //   }
  // };
  const handleLogout = async () => {
    try {
      Cookies.remove("token");

      navigate("/login", {
        state: { successMessage: "Logout successfully" },
      });
      console.log("Logout Successfull");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars style={{ fontSize: "20" }} />
        {showMenu && (
          <div className="navbar-dropdown">
            <ul className={showMenu ? "nav-links show" : "nav-links"}>
              {/* dashboard_nav */}
              <li
                className={selectedField === "dashboard" ? "selected" : ""}
                onClick={() => handleNavigate("/dashboard")}
              >
                <SpaceDashboardIcon style={{ marginRight: "10px" }} />
                <b>Dashboard </b>
              </li>
              <li
                className={selectedField === "addStock" ? "selected" : ""}
                onClick={() => handleNavigate("/addStock")}
              >
                <AddchartIcon style={{ marginRight: "10px" }} />
                <b>Add Stock</b>
              </li>
              {/* product_nav */}
              <li
                className={
                  selectedField === "productdashboard" ? "selected" : ""
                }
                onClick={() => handleNavigate("/productdashboard")}
              >
                <ShoppingCartIcon style={{ marginRight: "10px" }} />
                <b>Products</b>
              </li>
              {/* master */}

              {/* <div className="sub-navbar">
                <li
                  className={
                    selectedField === "categorytable" ? "selected" : ""
                  }
                  onClick={() => handleNavigate("/categorytable")}
                >
                  <CategoryIcon
                    style={{ marginRight: "10px", fontSize: "18px" }}
                  />
                  <b>Category table</b>
                </li>
                <li
                  className={selectedField === "fieldtable" ? "selected" : ""}
                  onClick={() => handleNavigate("/fieldtable")}
                >
                  <TableChartIcon
                    style={{ marginRight: "10px", fontSize: "18px" }}
                  />
                  <b>Fields table</b>
                </li>
                <li
                  className={selectedField === "detailtable" ? "selected" : ""}
                  onClick={() => handleNavigate("/detailtable")}
                >
                  <InfoIcon style={{ marginRight: "10px", fontSize: "18px" }} />
                  <b>Field Details table</b>
                </li>
              </div> */}
              {/* export_nav */}
              <li
                className={selectedField === "export" ? "selected" : ""}
                onClick={() => handleNavigate("/export")}
              >
                <DatasetOutlinedIcon style={{ marginRight: "10px" }} />
                <b>Export</b>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="logo">
        <h1 className="website_name">Best Shop</h1>
      </div>
      <div className="icons">
        <Popup
          className="popup-container"
          trigger={
            <button
              style={{
                border: "none",
                background: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              <FaUser />
            </button>
          }
          position="bottom right"
        >
          <div className="popup-content">
            <div className="popup-text"></div>
            <button className="popup-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Popup>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;
