import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Stock_Dashboard/stock_dashboard";
import ProductDashboard from "./components/Products/ProductDashboard";
import AddStocks from "./components/add_product";
import ExportData from "./components/export_data/Export";
import Inventory from "./components/Inventory/inventory";
import ImportData from "./components/import_data/import";
import Stocks from "./components/stocks/stocks";
import ModelDashboard from "./components/Inventory/model_dashboard";
import Home from "./components/Home/home";

function Protected({ children }) {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (Cookies.get("token")) {
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
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/addStock"
        element={
          <Protected>
            <AddStocks />
          </Protected>
        }
      />
      <Route
        path="/productdashboard"
        element={
          <Protected>
            <ProductDashboard />
          </Protected>
        }
      />
      <Route
        path="/export"
        element={
          <Protected>
            <ExportData />
          </Protected>
        }
      />
      <Route
        path="/import"
        element={
          <Protected>
            <ImportData />
          </Protected>
        }
      />
      <Route
        path="/inventory"
        element={
          <Protected>
            <Inventory />
          </Protected>
        }
      />
      <Route
        path="/stocks"
        element={
          <Protected>
            <Stocks />
          </Protected>
        }
      />
      <Route
        path="/model"
        element={
          <Protected>
            <ModelDashboard />
          </Protected>
        }
      />
        <Route
        path="/home"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </Router>
);

export default routes;
