import React, { useState, useEffect } from "react";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import requestApi from "../../utils/axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import Cookies from "js-cookie";
import apiHost from "../../utils/api";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Tables/table.css";

const CategoryTable = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleDateChange = async (newValue) => {
    setSelectedDate(newValue);
    console.log("Fetching data for date:", newValue.format("YYYY-MM-DD"));
    await fetchData(newValue);
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, []);

  const fetchData = async (date) => {
    try {
      const queryParams = new URLSearchParams({
        date: date.format("YYYY-MM-DD"),
      });
      const response = await requestApi(
        "GET",
        `/api/stock/stock?${queryParams}`
      );
      console.log(response);
      setStocks(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id) => async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Find the row with the given ID
      const editedRow = rows.find((row) => row.id === id);

      if (!editedRow) {
        console.error("Row not found for ID:", id);
        return;
      }

      // Prepare the data object with updated values
      const data = {
        id: editedRow.id,
        quantity: editedRow.quantity,
        selling_price: editedRow.mrp,
      };
      console.log(data);
      // Send PUT request to update the row
      const response = await axios.put(`${apiHost}/api/stock/stock`, data, {
        headers,
      });

      if (response.status === 200) {
        console.log("Row updated successfully");

        // Update the rows state with the updated row
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === editedRow.id ? editedRow : row))
        );

        await fetchData(selectedDate);
      }
    } catch (error) {
      console.error("Error updating row:", error);
      console.log("Failed to update row");
    }
  };
  const handleDeleteClick = (id) => async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = { id: id };
      const response = await axios.delete(`${apiHost}/api/stock/stock`, {
        headers,
        data,
      });

      if (response.status === 200) {
        setRows(rows.filter((row) => row.id !== id));
        console.log("Row deleted successfully");
        await fetchData(selectedDate);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      console.log("Failed to delete row");
    }
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 70, editable: false },
    { field: "shop", headerName: "Shop", width: 100, editable: false },
    { field: "date", headerName: "Date", width: 200, editable: false },
    { field: "time", headerName: "Time", width: 100, editable: false },
    { field: "name", headerName: "Name", width: 400, editable: false },
    { field: "model_name", headerName: "Modal", width: 100, editable: false },
    { field: "color_name", headerName: "Color", width: 100, editable: false },
    { field: "size_name", headerName: "Size", width: 100, editable: false },
    { field: "quantity", headerName: "Quantity", width: 100, editable: true },
    // { field: "selling_price", headerName: "Selling Price", width: 100, editable: true },
    { field: "mrp", headerName: "MRP", width: 100, editable: true },
    { field: "total_price", headerName: "Total", width: 100, editable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return (
            <>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={() => handleSaveClick(id)()}
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </>
          );
        }
        return (
          <>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(id)}
              color="inherit"
            />
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          </>
        );
      },
    },
  ];

  const row = stocks.map((stock, index) => ({
    id: stock.id || index + 1,
    shop: stock.shop,
    date: stock.date,
    time: stock.time,
    name: stock.name,
    model_name: stock.model_name,
    color_name: stock.color_name,
    size_name: stock.size_name,
    quantity: stock.quantity,
    mrp: stock.mrp,
    total_price: stock.total_price,
  }));

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div className="box-for-table">
            <>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      // sx={{ width: "100%" }}
                      label="Select Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      size="small"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div
                className="category-header-container"
                style={{ height: 400, width: "100%" }}
              >
                <DataGrid
                  rows={row}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  slotProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}
                  pageSizeOptions={[5, 10, 20, 50, 100]}
                  style={{
                    backgroundColor: "white",
                    marginTop: "20px",
                    padding: "20px",
                    height: "550px",
                    width: "1200px",
                    borderRadius: "5px",
                    boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)",
                    fontSize: "15px",
                  }}
                  editMode="rows"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
