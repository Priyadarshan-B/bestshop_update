import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import Inventory from "./components/Inventory/inventory";
import Enquiries from "./components/Enquiries/enquiries";
import ProductDashboard from "./components/Products/ProductDashboard";
import AddStocks from "./components/add_product";
import CategoryTable from "./components/Tables/category_table";
import FieldTable from "./components/Tables/field_table";
import DetailTable from "./components/Tables/detail_table";
import ExportData from "./components/export_data/Export";
import Add from "./components/extra_codes/plus";
import ColorfulDivs from "./components/extra_codes/addcolors";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading, you can replace this with actual data fetching logic
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []); // Empty dependency array to run once on mount



//   useEffect(() => {
//     if (localStorage.getItem("isLogin") !== "true") {
//       setAuth(false);
//       navigate("/login");
//     } else {
//       setAuth(true);
//     }
//   }, [navigate]);

//   if (isAuth) {
//     return children;
//   }
// }

  return (
    <div className="App-Layout">
      {loading ? (
        <div className="load">
          <div className="loader">
          </div>
        </div> 
      ) : 
      (
    
        <Router>
          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/signup" exact Component={Signup} />
            <Route path="/login" exact Component={Login} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/inventory" Component={Inventory} />
            <Route path="/enquiries" Component={Enquiries} />
            <Route path="/addStock" Component={AddStocks} />
            <Route path="/productdashboard" Component={ProductDashboard} />
            <Route path="/categorytable" Component={CategoryTable} />
            <Route path="/fieldtable" Component={FieldTable} />
            <Route path="/detailtable" Component={DetailTable} />
            <Route path="/export" Component={ExportData} />
            <Route path="/add" Component={Add} />
            <Route path="/colour" Component={ColorfulDivs} />


          </Routes>
        </Router>
      )
      }
    </div>
  );
};

export default App;
