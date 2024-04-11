import React, { useState } from "react";
import { FaBell, FaUser, FaEnvelope, FaBars } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./horizontal_navbar.css";
import { useNavigate } from "react-router-dom";
import apiHost from "../../utils/api";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddchartIcon from "@mui/icons-material/Addchart";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import Cookies from "js-cookie";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FaUserCircle } from "react-icons/fa";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomizedSwitches from "./toggleTheme";
import { BiSolidShoppingBags } from "react-icons/bi";
import EqualizerIcon from '@mui/icons-material/Equalizer';

const HorizontalNavbar = () => {
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
    } catch (error) {
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
              <li
                className={selectedField === "stocks" ? "selected" : ""}
                onClick={() => handleNavigate("/stocks")}
              >
                <EqualizerIcon style={{ marginRight: "10px" }} />
                <b>Stocks</b>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="logo">
        <h1 className="website_name"><BiSolidShoppingBags style={{ color: "#178a84", fontSize: 35 }} />&nbsp; Best Shop</h1>
      </div>
      
      <div className="icons">
        <FaUserCircle style={{
          color: "#178a84",
          fontSize:35
        }}/>
      <h3 className="profile-text">{Cookies.get("username").toUpperCase()}</h3>
        <CustomizedSwitches />
        <Popup
          className="popup-container"
          trigger={
          
              <SettingsIcon style={{ color: "#178a84", fontSize: 35 , margin:7, cursor:"pointer"}} />
          }
          position="bottom right"
        >
          <div className="popup-content1">
            <div className="popup-text">
              <p>Welcome {Cookies.get("username").toUpperCase()}!</p>
              <PersonAddIcon style={{
                cursor: "pointer"
              }} onClick={() => handleNavigate("/signup")} />
            </div>

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