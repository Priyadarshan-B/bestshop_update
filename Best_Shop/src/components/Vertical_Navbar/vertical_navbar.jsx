import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./vertical_navbar.css";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddchartIcon from "@mui/icons-material/Addchart";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import EqualizerIcon from '@mui/icons-material/Equalizer';

const VerticalNavbar = () => {
  const username = Cookies.get("username");

  const [showMenu, setShowMenu] = useState(false);
  const [showMasterSubMenu, setShowMasterSubMenu] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const location = useLocation();
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

  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    setSelectedField(currentPath || "dashboard");
  }, [location.pathname]);

  

  return (
    <div className="vertical-navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={showMenu ? "nav-links show" : "nav-links"}>
        
        <div className="user">
          <div className="to-hide-user">
            <FaUserCircle style={{
              color: "var(--button)",
              fontSize: 25

            }}
            
            />
           {username && username.length > 15 ? (
          <marquee className="profile-text">{username.toUpperCase()}</marquee>
        ) : (
          <div className="profile-text">{username.toUpperCase()}</div>
        )}
            
          </div>
        </div>
        
        {/* dashboard_nav */}

        <li
          className={selectedField === "home" ? "selected" : ""}
          onClick={() => handleNavigate("/home")}
        >
          <SpaceDashboardIcon className="navbar-icon" style={{ marginRight: "10px" }} />
          <b>Dashboard </b>
        </li>

        <li
          className={selectedField === "addStock" ? "selected" : ""}
          onClick={() => handleNavigate("/addStock")}
        >
          <AddchartIcon className="navbar-icon" style={{ marginRight: "10px" }} />
          <b>Add Stock</b>
        </li>

        {/* product_nav */}

        <li
          className={selectedField === "productdashboard" ? "selected" : ""}
          onClick={() => handleNavigate("/productdashboard")}
        >
          <ShoppingCartIcon className="navbar-icon" style={{ marginRight: "10px" }} />
          <b>Products</b>
        </li>

        {/* master */}


        {/* <div className="sub-navbar">
          <li className={selectedField === 'master' ? 'selected' : ''} onClick={handleMasterClick}>
          

            <SupervisorAccountIcon style={{ marginRight: '10px' }} />
            <b>Master</b>
            {showMasterSubMenu ? <FaAngleUp className="fa-angle-up" /> : <FaAngleDown className="fa-angle-down" />}
            {showMasterSubMenu && (
              <ul className="sub-menu">
                <li className={selectedField === 'categorytable' ? 'selected' : ''} onClick={() => handleNavigate('/categorytable')}>
                  <CategoryIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                  <b>Category</b>
                </li>
                <li className={selectedField === 'fieldtable' ? 'selected' : ''} onClick={() => handleNavigate('/fieldtable')}>
                  <TableChartIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                  <b>Fields</b>
                </li>
                <li className={selectedField === 'detailtable' ? 'selected' : ''} onClick={() => handleNavigate('/detailtable')}>
                  <InfoIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                  <b>Field Details</b>
                </li>
                <li className={selectedField === 'colourtable' ? 'selected' : ''} onClick={() => handleNavigate('/colourtable')}>
                  <InfoIcon style={{ marginRight: '10px', fontSize: '18px' }} />
                  <b>Colour</b>
                </li>
              </ul>
            )}
          </li>
        </div> */}

        {/* export_nav */}

        <li
          className={selectedField === "export" ? "selected" : ""}
          onClick={() => handleNavigate("/export")}
        >
          <DatasetOutlinedIcon className="navbar-icon" style={{ marginRight: "10px" }} />
          <b>Export</b>
        </li>
        <li
          className={selectedField === "stocks" ? "selected" : ""}
          onClick={() => handleNavigate("/stocks")}
        >
          <EqualizerIcon className="navbar-icon" style={{ marginRight: "10px" }}/>
          <b>Stocks</b>
        </li>

        
      </ul>
    </div>
  );
};

export default VerticalNavbar;