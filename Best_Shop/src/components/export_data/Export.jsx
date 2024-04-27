import React, { useState, useEffect } from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Stock_Dashboard/stock_dashboard.css";
import "../add_product/add_product.css";
import "./export.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHost from "../../utils/api";
import requestApi from "../../utils/axios";
import Select from "react-select";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import InputBox from "../InputBox/inputbox";
import CustomDatePicker from "../InputBox/datepicker";
import ImportData from "../import_data/import";

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

      // Log the request details before making the call

      // Fetch data using requestApi
      const { success, data, error } = await requestApi(
        "GET",
        `/api/stock/export-csv?${queryParams}`,
        {}
      );

      if (success && data) {
        setCsvData(data);

        // Proceed with the download
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map((obj) => Object.values(obj).join(",")).join("\n");
        const csvContent = `${headers}\n${rows}`;

        const blob = new Blob([csvContent], { type: "text/csv" });
        const urlPath = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = urlPath;
        let fileName = `${selectedDate.format("YYYY-MM-DD")}`;
        if (bill) {
          fileName += `_${bill}`;
        }
        fileName += ".csv";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        if (error) {
        }
      }
    } catch (error) { }

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
          <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              width: "900px",
            }}>
              <div className="import-container-card">
                <ImportData />
              </div>
              <div className="export-container-card">
                <div className="dropdown-ex">
                  <Select
                    value={selectedLocation}
                    onChange={handleChange}
                    options={location}
                    placeholder="Select Shop"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 2,
                      colors: {
                        ...theme.colors,
                        // after select dropdown option
                        primary50: "var(--text)",
                        // Border and Background dropdown color
                        primary: "var(--button)",
                        // Background hover dropdown color
                        primary25: "var(--button-hover)",
                        // Background color
                        neutral0: "var(--background)",
                        // Border before select
                        neutral20: "#178a84",
                        // Hover border
                        neutral30: "#82FFE7",
                        // No options color
                        neutral40: "#CAFFCA",
                        // Select color
                        neutral50: "#F4FFFD",
                        // Arrow icon when click select
                        neutral60: "#fff",
                        // Text color
                        neutral80: "var(--text)",
                      },
                    })}
                    styles={{
                      option: (provided, state) => ({
                        ...provided,
                        color: state.isFocused ? 'var(--text)' : 'var(--text)',
                        backgroundColor: state.isFocused ? 'var(--background)' : 'var(--button-hover)',
                        '&:hover': {
                          backgroundColor: 'var(--button)',
                        },
                      }),
                    }}
                  />
                </div>
                <div>
                  <CustomDatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div>
                  <InputBox
                    label="S.No"
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                    min={0}
                    size="small"
                    sx={{ width: "100%" }}
                  />
                  <p
                    style={{
                      color: "var(--text)",
                    }}
                  >
                    (optional)
                  </p>
                </div>
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
      </div>
    </div>
  );
};

export default ExportData;