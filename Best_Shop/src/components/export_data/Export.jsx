import React, { useState, useEffect } from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Dashboard/dashboard.css";
import "../add_product/add_product.css";
import "./export.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHost from "../../utils/api";
import requestApi from "../../utils/axios";
import Select from "react-select";
import DownloadIcon from "@mui/icons-material/Download";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputBox from "../InputBox/inputbox";

const ExportData = () => {
  const [bill, setBill] = useState("");
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await requestApi(
        "GET",
        "/api/master/shop-location"
      );
      if (success) {
        const formattedOptions = data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setLocation(formattedOptions);
      } else {
        console.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleChange = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
  };

  const handleDownload = async () => {
    setIsLoading(true);
   
    try {
       const queryParams = new URLSearchParams({
         date: selectedDate.format("YYYY-MM-DD"),
         shop_location: selectedLocation.value,
       });
   
       if (bill) {
         queryParams.append("bill_number", bill);
       }
   
       const url = `${apiHost}/api/stock/export-csv?${queryParams}`;
       console.log("Request URL:", url);
   
       // Log the request details before making the call
       console.log("Making request with method: GET, URL:", url);
   
       // Fetch data using requestApi
       const { success, data, error } = await requestApi("GET", `/api/stock/export-csv?${queryParams}`, {});
       console.log("Response success:", success);
       console.log("Raw response data:", data);
       console.log("Error from requestApi:", error);
   
       if (success && data) {
         setCsvData(data);
   
         // Proceed with the download
         const headers = Object.keys(data[0]).join(',');
         const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
         const csvContent = `${headers}\n${rows}`;
   
         const blob = new Blob([csvContent], { type: 'text/csv' });
         const urlPath = window.URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = urlPath;
         let fileName = `${selectedDate.format("YYYY-MM-DD")}`;
      if (bill) {
        fileName += `_${bill}`;
      }
      fileName += ".csv";
         link.setAttribute('download', fileName);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       } else {
         console.error("Data fetching was not successful or data is undefined.");
         if (error) {
           console.error("Error from requestApi:", error);
         }
       }
    } catch (error) {
       console.error("Error occurred while exporting data:", error);
    }
   
    setIsLoading(false);
   };

  // Function to convert JSON to CSV
  const convertJSONToCSV = (jsonData) => {
    const header = Object.keys(jsonData[0]).join(",");
    const rows = jsonData.map((row) => Object.values(row).join(","));
    return `${header}\n${rows.join("\n")}`;
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />

        <div className="dashboard-body">
          <div className="export-container-card">
            <div className="dropdown-ex">
              <Select
                value={selectedLocation}
                onChange={handleChange}
                options={location}
              />
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    size="small"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <InputBox
              label="Bill No"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min={0}
              size="small"
              
            />

            <button
              className="dist_button"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <DownloadIcon style={{ marginRight: "10px" }} />
              Download As CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
