import React, { useState, useEffect } from 'react';
import { FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import {  useLocation, useNavigate } from 'react-router-dom';
import './vertical_navbar.css';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddchartIcon from '@mui/icons-material/Addchart';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';

const VerticalNavbar = () => {
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

  // const handleItemClick = (field) => {
  //   setSelectedField((prevSelected) => (prevSelected === field ? null : field));
  // };

  const handleMasterClick = () => {
    toggleMasterSubMenu();
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSelectedField(null);
  };

  useEffect(() => {
   
    const currentPath = location.pathname.substring(1); 
    setSelectedField(currentPath || 'dashboard');
  }, [location.pathname]);

  return (
    <div className="vertical-navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
      <ul className={showMenu ? 'nav-links show' : 'nav-links'}>
{/* dashboard_nav */}

        <li className={selectedField === 'dashboard' ? 'selected' : ''} 
        onClick={() => handleNavigate('/dashboard')}>
          <SpaceDashboardIcon style={{ marginRight: '10px' }} />
          <b>Dashboard </b>
        </li>

        {/* inventory_nav */}
{/* 
        <li className={selectedField === 'inventory' ? 'selected' : ''}
        onClick={() => handleNavigate('/inventory')}>
          <InventoryIcon style={{ marginRight: '10px' }} />
          <b>Inventory</b>
        </li> */}

        {/* enquiries_nav */}

        {/* <li className={selectedField === 'enquiries' ? 'selected' : ''} onClick={() => handleNavigate('/enquiries')}>
          <QueryStatsIcon style={{ marginRight: '10px' }} />
          <b>Enquiries</b>
        </li> */}

        {/* addStock_nav */}

        <li className={selectedField === 'addStock' ? 'selected' : ''} onClick={() => handleNavigate('/addStock')}>
          <AddchartIcon style={{ marginRight: '10px' }} />
          <b>Add Stock</b>
        </li>

        {/* product_nav */}

        <li className={selectedField === 'productdashboard' ? 'selected' : ''} onClick={() => handleNavigate('/productdashboard')}>
          <ShoppingCartIcon style={{ marginRight: '10px' }} />
          <b>Products</b>
        </li>

        {/* master */}


        <div className="sub-navbar">
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
              </ul>
            )}
          </li>
        </div>

        {/* export_nav */}

        <li className={selectedField === 'export' ? 'selected' : ''} onClick={() => handleNavigate('/export')}>
        <DatasetOutlinedIcon style={{ marginRight: '10px' }} />
          <b>Export</b>
        </li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;