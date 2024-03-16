import React, { useState, useEffect } from "react";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import requestApi from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiHost from "../../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./table.css";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);








 

  

  useEffect(() => {
    fetchData();
  }, []);
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const fetchData = async () => {
    try {
      const response = await requestApi("GET", "/api/stock/stock?date=2024-03-15", {});
      setCategories(response.data || []);
    } catch (error) {
    }
  };


  const columns = [
    { field: "id", headerName: <b>S.No</b>, width: 100 },

    { field: "category_name", headerName: <b>Category Name</b>, width: 200 },
    {
      field: "actions",
      headerName: <b>Actions</b>,
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <EditIcon
            style={{
              color: "#5676f5",
              cursor: "pointer",
            }}
            // onClick={() => handleEdit(params.row.id)}
          />
          <DeleteIcon
            style={{
              color: "#ed4545",
              cursor: "pointer",
            }}
            // onClick={() =>
            //   // handleDelete(params.row.category_id, params.row.category_name)
            // }
          />
        </div>
      ),
    },
  ];

  const rows = categories.map((category, index) => ({
    id: category.id || index + 1,
    category_id: category.category_id,
    category_name: category.category_name,
  }));

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          
           
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  style={{
                    backgroundColor: "white",
                    marginTop: "20px",
                    padding: "35px",
                    height: "500px",
                    width: "500px",
                    borderRadius: "10px",
                    boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)",
                    fontSize: "15px",
                  }}
                />
                </div>
                </div>
                </div>

  );
};

export default CategoryTable;
