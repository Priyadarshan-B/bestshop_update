import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import RequestTable from './RequestTable';
import PendingTable from './PendingTable';
import ReceivedTable from './ReceivedTable';
import './Purchase_req.css';

function AllTables() {
    const [activeTable, setActiveTable] = useState("request"); // Default to showing RequestTable

    const handleTableChange = (tableName) => {
        setActiveTable(tableName);
    };

    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <ToastContainer />
                <div className="dashboard-body">
                    <div style={{ width: "95%", padding:"20px", boxSizing:"border-box" }}>
                        {/* Buttons to switch between tables */}
                        <div style={{ marginBottom: "20px", display:"flex" }}>
                            <button
                                onClick={() => handleTableChange("request")}
                                className={`btn ${activeTable === "request" ? "active" : ""}`}>
                                Purchase requests
                            </button>
                            <button
                                onClick={() => handleTableChange("pending")}
                                className={`btn ${activeTable === "pending" ? "active" : ""}`}>
                                Products yet to receive
                            </button>
                            <button
                                onClick={() => handleTableChange("received")}
                                className={`btn ${activeTable === "received" ? "active" : ""}`}>
                                Delivered products
                            </button>
                        </div>

                        {/* Render the appropriate table based on the activeTable state */}
                        {activeTable === "request" && <RequestTable />}
                        {activeTable === "pending" && <PendingTable />}
                        {activeTable === "received" && <ReceivedTable />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllTables;
