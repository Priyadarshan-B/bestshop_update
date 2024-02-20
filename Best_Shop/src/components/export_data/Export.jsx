import React, { useState, useEffect } from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Dashboard/dashboard.css";
import "../add_product/add_product.css";
import "./export.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import apiHost from "../../utils/api";
import DownloadIcon from "@mui/icons-material/Download";
// import hintImage from "../../assets/img/hint.jpg";

const ExportData = () => {
  const [exportValue, setExportValue] = useState("");
  // const [itemValue, setItemValue] = useState("2");
  // const [mcategoryValue, setMcategoryValue] = useState("1");
  // const [scategoryValue, setscategoryValue] = useState("3");
  // const [brandValue, setBrandValue] = useState("4");
  // const [colourValue, setColourValue] = useState("5");
  const [sampleFormat, setSampleFormat] = useState("");

  // curreny-format

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost}/sample`);
        if (response.ok) {
          const data = await response.json();
          setSampleFormat(data[0][0]);
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, []);

  // toast-message
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const downloadExcel = () => {
    const inputData = {
      dist_id: parseInt(exportValue),
      // item_name: parseInt(itemValue),
      // main_category: parseInt(mcategoryValue),
      // sub_category: parseInt(scategoryValue),
      // brand: parseInt(brandValue),
      // colour: parseInt(colourValue),
    };

    fetch(`${apiHost}/generate-excel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("Data posted successfully:", jsonData);

        const excelData = jsonData.stocks.map((stock) => ({
          ItemName: stock.ItemName,
          QTY: stock.QTY,
          PurchasePrice: stock.PurchasePrice,
          SellingPrice: stock.SellingPrice,
          MRP: stock.MRP,
          "MAIN CATEGORY": stock["MAIN CATEGORY"],
          "SUB CATEGORY": stock["SUB CATEGORY"],
          BRAND: stock.BRAND,
          SIZES: stock.SIZES,
          "STYLE MODE": stock["STYLE MODE"],
          COLOUR: stock.COLOUR || "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
        notifySuccess("Downloaded Successfully");
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        notifyError("Failed to Post Data");
      });
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />

        <div className="dashboard-body">
          <div className="export-container-card">
            <label>Distributor ID:</label>
            <input
              className="dist_input_id"
              type="number"
              min={0}
              value={exportValue}
              onChange={(e) => setExportValue(e.target.value)}
              placeholder="Distributor ID"
            />
            {/* <div className="container-except-di">
              <div className="item-info-box">
                <label>Item Name:</label>
                <input
                  className="dist_input"
                  type="number"
                  value={itemValue}
                  onChange={(e) => setItemValue(e.target.value)}
                  placeholder="Enter Item Name ID"
                />
                <label>Main Category:</label>
                <input
                  className="dist_input"
                  type="number"
                  value={mcategoryValue}
                  onChange={(e) => setMcategoryValue(e.target.value)}
                  placeholder="Enter Main Category ID"
                />
                <label>Sub Category:</label>
                <input
                  className="dist_input"
                  type="number"
                  value={scategoryValue}
                  onChange={(e) => setscategoryValue(e.target.value)}
                  placeholder="Enter Sub Category ID"
                />
                <label>Brand:</label>
                <input
                  className="dist_input"
                  type="number"
                  value={brandValue}
                  onChange={(e) => setBrandValue(e.target.value)}
                  placeholder="Enter Brand ID"
                />
                <label>Colour:</label>
                <input
                  className="dist_input"
                  type="number"
                  value={colourValue}
                  onChange={(e) => setColourValue(e.target.value)}
                  placeholder="Enter Colour ID"
                />
              </div>

              <div className="current-format-box">
                <br />
                <div className="current-format-box">
                  <h4>Hint:</h4>

                  <img
                    src={hintImage}
                    alt="Description of the image"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <label>Current Format</label>
                
                <p>{sampleFormat}</p>
              </div>
            </div> */}
            <button onClick={downloadExcel} className="dist_button">
              <DownloadIcon style={{ marginRight: "10px" }} />
              Download As Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
