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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBox from "../InputBox/inputbox";
import "../Tables/table.css";
import "./ProductDashboard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const CategoryTable = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editopen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {};
  const handleDateChange = async (newValue) => {
    setSelectedDate(newValue);
    console.log("Fetching data for date:", newValue.format("YYYY-MM-DD"));
  };

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]); // Added selectedDate to the dependency array

  const fetchData = async (date) => {
    try {
      const queryParams = new URLSearchParams({
        date: date.format("YYYY-MM-DD"),
      });
      const response = await requestApi(
        "GET",
        `/api/stock/stock?${queryParams}`
      );
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    handleEditOpen();
  };

  const handleDelete = async (id) => {
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

      if (response.status >= 200 && response.status < 300) {
        console.log("Row deleted successfully");
        notifySuccess("Stock Deleted Successfully");
    fetchData(selectedDate);

        setData(stocklist.filter((item) => item.id !== id));
      } else {
        throw new Error(`Error deleting row: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      console.log("Failed to delete row");
      notifyError("Failed to Delete Stock");
    }
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        id: editingItem.id,
        selling_price: editingItem.selling_price,
        mrp: editingItem.mrp,
        quantity: parseInt(editingItem.quantity),
      };

      const response = await axios.put(
        `${apiHost}/api/stock/stock`,
        requestBody,
        {
          headers,
        }
      );

      if (response.status === 200) {
        console.log("Item updated successfully");
        notifySuccess("Stock Edited Successfull");
    fetchData(selectedDate);

        setData(
          data.map((item) => (item.id === editingItem.id ? editingItem : item))
        );
        setEditOpen(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      console.log("Failed to update item");
      notifyError("Failed to Edit Stock");
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const stocklist = data.filter(
    (item) =>
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.color_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mrp.toString().includes(searchTerm) ||
      item.size_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.selling_price.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div className="total-table-container">
            <div className="date-picker-division">
              <div className="search-box-products">
                <InputBox
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SearchSharpIcon sx={{ marginRight: 1 }} />
                      Search
                    </div>
                  }
                  type="text"
                  placeholder="Faculty Name/ID/Sub.."
                  value={searchTerm}
                  onChange={handleSearch}
                  size="small"
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    size="small"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="container-for-table">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Shop</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>MRP</th>
                    <th>Selling Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stocklist.map((item, index) => (
                    <tr key={item.id} >
                      <td>{item.id}</td>
                      <td>{item.shop}</td>
                      <td>{item.user}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.name}</td>
                      <td>{item.model_name}</td>
                      <td>{item.color_name}</td>
                      <td>{item.size_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.mrp}</td>
                      <td>{item.selling_price}</td>
                      <td>{item.total_price}</td>
                      <td>
                        <EditIcon
                          onClick={() => handleEdit(item)}
                          sx={{
                            marginRight: 2,
                            color: "green",
                            cursor: "pointer",
                          }}
                        />
                        <DeleteIcon
                          onClick={() => handleDelete(item.id)}
                          sx={{ color: "red", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editopen && editingItem && (
              <Dialog
                fullWidth
                open={editopen}
                onClose={handleEditClose}
                PaperProps={{
                  style: {
                    padding: "20px",
                  },
                }}
              >
                <form
                  className="form-dialog"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div className="dialog-content">
                    <DialogTitle
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <h2>Edit</h2>
                    </DialogTitle>
                    <DialogContent
                      style={{
                        fontSize: 10,
                      }}
                    >
                      <br />
                      <InputBox
                        label="MRP"
                        type="number"
                        value={editingItem.mrp}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            mrp: e.target.value,
                          })
                        }
                        size="small"
                        sx={{ width: "100%" }}
                      />
                      <br />
                      <InputBox
                        label="Selling Price"
                        type="number"
                        value={editingItem.selling_price}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            selling_price: e.target.value,
                          })
                        }
                        size="small"
                        sx={{ width: "100%" }}
                      />
                      <br />
                      <InputBox
                        label="Quantity"
                        type="number"
                        value={editingItem.quantity}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            quantity: e.target.value,
                          })
                        }
                        size="small"
                        sx={{ width: "100%" }}
                      />
                      <br />

                      <div className="float-right">
                        <button
                          className="add-button-dialog"
                          onClick={() => setEditOpen(false)}
                        >
                          CANCEL
                        </button>
                        <button className="add-button-dialog" type="submit">
                          EDIT
                        </button>
                      </div>
                    </DialogContent>
                  </div>
                </form>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
