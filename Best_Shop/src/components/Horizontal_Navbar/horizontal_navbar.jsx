import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./horizontal_navbar.css";
import { useNavigate } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddchartIcon from "@mui/icons-material/Addchart";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import Cookies from "js-cookie";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomizedSwitches from "./toggleTheme";
import { BiSolidShoppingBags } from "react-icons/bi";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import NextWeekSharpIcon from '@mui/icons-material/NextWeekSharp';

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
        <FaBars style={{ fontSize: "20", color: "#178a84" }} />
        {showMenu && (
          <div className="navbar-dropdown">
            <ul className={showMenu ? "nav-links show" : "nav-links"}>
              {/* dashboard_nav */}
              <li
                className={selectedField === "home" ? "selected" : ""}
                onClick={() => handleNavigate("/home")}
              >
                <SpaceDashboardIcon style={{ marginRight: "10px", color: "#178a84" }} />
                <b>Dashboard </b>
              </li>
              <li
                className={selectedField === "addStock" ? "selected" : ""}
                onClick={() => handleNavigate("/addStock")}
              >
                <AddchartIcon style={{ marginRight: "10px", color: "#178a84" }} />
                <b>Add Stock</b>
              </li>
              {/* product_nav */}
              <li
                className={
                  selectedField === "productdashboard" ? "selected" : ""
                }
                onClick={() => handleNavigate("/productdashboard")}
              >
                <ShoppingCartIcon style={{ marginRight: "10px", color: "#178a84" }} />
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
                <DatasetOutlinedIcon style={{ marginRight: "10px", color: "#178a84" }} />
                <b>Export</b>
              </li>
              <li
                className={selectedField === "stocks" ? "selected" : ""}
                onClick={() => handleNavigate("/stocks")}
              >
                <EqualizerIcon style={{ marginRight: "10px", color: "#178a84" }} />
                <b>Stocks</b>
              </li>
              <li
                className={selectedField === "requests" ? "selected" : ""}
                onClick={() => handleNavigate("/requests")}
              >
                <LowPriorityIcon className="navbar-icon" style={{ marginRight: "10px" }} />
                <b>Create Requests</b>
              </li>
              <li
                className={selectedField === "requests/all" ? "selected" : ""}
                onClick={() => handleNavigate("/requests/all")}
              >
                <NextWeekSharpIcon className="navbar-icon" style={{ marginRight: "10px" }} />
                <b>Purchase Requests</b>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="logo">
        <h1 className="website_name"><BiSolidShoppingBags style={{ color: "#178a84", fontSize: 35 }} />&nbsp; Best Shop</h1>
      </div>

      <div className="icons">

        <CustomizedSwitches />
        <Popup
          className="popup-container"
          trigger={

            <SettingsIcon style={{ color: "#178a84", fontSize: 35, margin: 7, cursor: "pointer" }} />
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