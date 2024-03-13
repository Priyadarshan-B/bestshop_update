import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { useNavigate } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import ProductDashboard from "./components/Products/ProductDashboard";
import AddStocks from "./components/add_product";
import CategoryTable from "./components/Tables/category_table";
import FieldTable from "./components/Tables/field_table";
import DetailTable from "./components/Tables/detail_table";
import ExportData from "./components/export_data/Export";
import DataConverter from "./components/export_data/export1";

function Protected({ children }) {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
  const checkAuth = async () => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    } else {
      navigate("/login");
    }
  };

  checkAuth();
}, [navigate]);

if (isAuth) {
  return children;
}
return null;

}
const routes = () => (
  <Router>
    <Routes>
      <Route path= "/" element={<Login />} />
      <Route path= "/login" element={<Login />} />
      <Route path= "/signup" element={<Signup />} />
      <Route path= "/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path= "/addStock" element={<Protected><AddStocks /></Protected>} />
      <Route path= "/productdashboard" element={<Protected><ProductDashboard /></Protected>} />
      <Route path= "/categorytable" element={<Protected><CategoryTable /></Protected>} />
      <Route path= "/detailtable" element={<Protected><DetailTable /></Protected>} />
      <Route path= "/fieldtable" element={<Protected><FieldTable /></Protected>} />
      <Route path= "/export" element={<Protected><ExportData /></Protected>} />
      <Route path= "/export1" element={<Protected><DataConverter /></Protected>} />

      <Route path= "*" element={<h1>404</h1>} />

    </Routes>
  </Router>
);

export default routes;
