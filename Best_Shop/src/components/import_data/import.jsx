import React, { useState } from "react";
import * as XLSX from "xlsx";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportData = () => {
  const [jsonData, setJsonData] = useState([]);

  
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const parsedData = jsonData.slice(9, -2);

      // Filter out empty rows
      const filteredData = parsedData.filter(row => row.filter(cell => cell !== "").length > 0);

      // Convert the JSON data to the desired format
      const formattedData = filteredData.map((row) => {
        return {
          category: row[0] || "",
          sub_category: row[1] || "",
          brand: row[2] || "",
          size: row[3] || "",
          model: row[4] || "",
          color: row[5] || "",
          item_name: row[7] || "",
          sell_quantity: parseFloat(row[10]) || 0, 
          mrp: parseFloat(row[22]) || 0, 
        };
      });

      console.log("Data to be sent to backend:", formattedData);

      setJsonData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendDataToBackend = async () => {
    // Send data to backend
    const response = await requestApi("POST", "/api/sales/sales", jsonData);
    console.log("Response from backend:", response);
    if(response.success){
      notifySuccess("Sales Data Imported Successfully")
    }
    else{
      notifyError("Failed to Import Sales Data")
    }
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="export-container-card">
            <h5>Choose Excel file</h5>
            <input type="file" onChange={handleFileUpload} />
            <button className="dist_button" onClick={sendDataToBackend}>Import Sales Stocks</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportData;
