import React, { useState } from "react";
import * as XLSX from "xlsx";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
const ImportData = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Convert the JSON data to the desired format
      const formattedData = jsonData.slice(0).map((row) => ({
        category: row[0],
        sub_category: row[1],
        brand: row[2],
        size: row[3],
        model: row[4],
        color: row[5],
        item_name: row[7],
        quantity: parseFloat(row[10]),
        mrp: parseFloat(row[21]),
      }));

      console.log("Data to be sent to backend:", formattedData);

      setJsonData(formattedData);

      // Send data to backend
      const response = await requestApi("POST", "/api/sales/sales", formattedData);
      console.log("Response from backend:", response);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <input type="file" onChange={handleFileUpload} />
          {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default ImportData;
