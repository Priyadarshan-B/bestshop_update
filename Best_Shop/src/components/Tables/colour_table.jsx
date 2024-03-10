// import React, { useState, useEffect } from "react";
// import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
// import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import requestApi from "../../utils/axios";
// import apiHost from "../../utils/api";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./table.css";

// const API_BASE_URL = `${apiHost}`;

// const ColourTable = () => {
//   const [categories, setCategories] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [itemOptions, setItemOptions] = useState([]);
//   const [subcategoryOptions, setSubCategoryOptions] = useState([]);
//   const [brandOptions, setBrandOptions] = useState([]);
//   const [modelOptions, setModelOptions] = useState([]);

//   const [selectedImage, setSelectedImage] = useState(null);

//   const addFieldDetails = () => {
//     const formData = new FormData();

//     formData.append(
//       "category_name",
//       document.getElementById("category_name").value
//     );
//     formData.append(
//       "field_id",
//       document.getElementById("field_name").value.split(",")[0]
//     );
//     formData.append(
//       "field_name",
//       document.getElementById("field_name").value.split(",")[1]
//     );
//     formData.append(
//       "details_name",
//       document.getElementById("details_name").value
//     );

//     const imageInput = document.getElementById("image");
//     const cameraInput = document.getElementById("camera");
//     formData.append("image", imageInput.files[0] || cameraInput.files[0]);

//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }

//     fetch(`${API_BASE_URL}/field-details`, {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         notifySuccess("Field added successfully");
//       })
//       .catch((error) => {
//         notifyError("Failed to add field");
//       });
//   };

//   const getCategoryOptions = () => {
//     fetch(`${API_BASE_URL}/dropdown/category`)
//       .then((response) => response.json())
//       .then((data) => {
//         setCategoryOptions(["", ...data]);
//       })
//       .catch((error) => {});
//   };

//   const getFields = () => {
//     const selectedCategory = document.getElementById("category_name").value;

//     fetch(`${API_BASE_URL}/dropdown/category_fields/${selectedCategory}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const modifiedFieldOptions = data.map((field) => ({
//           value: `${field.field_id},${field.field_name}`,
//           label: field.field_name,
//         }));

//         setFieldOptions(["", ...modifiedFieldOptions]);
//       })
//       .catch((error) => {});
//   };

//   React.useEffect(() => {
//     getCategoryOptions();
//     fetchData();
//   }, []);

//   const notifySuccess = (message) => {
//     toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
//   };

//   const notifyError = (message) => {
//     toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
//   };

//   const updateImage = (inputId) => {
//     const input = document.getElementById(inputId);
//     const label = document.querySelector(`label[for=${inputId}]`);

//     if (input && label) {
//       const fileName = input.files[0]?.name || "No file chosen";
//       label.innerHTML = `<b>${
//         inputId === "image" ? "Image" : "Camera"
//       }:</b> ${fileName}`;
//     }
//   };
//   const handleOpenDialog = () => {
//     setOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await requestApi("GET", "/categories/0/0", {});
//       setCategories(response.data || []);
//     } catch (error) {}
//   };

//   const columns = [
//     { field: "id", headerName: <b>S.No</b>, width: 100 },
//     {
//       field: "category_name",
//       headerName: <b>Category Name</b>,
//       width: 190,
//     },
//     { field: "field_name", headerName: <b>Item Name</b>, width: 190 },
//     { field: "details_name", headerName: <b>SubCategory Name</b>, width: 190 },
//     { field: "details_name", headerName: <b>SubCategory Name</b>, width: 190 },
//     { field: "details_name", headerName: <b>SubCategory Name</b>, width: 190 },

//     {
//       field: "actions",
//       headerName: <b>Actions</b>,
//       width: 140,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "10px",
//           }}
//         >
//           <EditIcon
//             style={{
//               color: "#5676f5",
//               cursor: "pointer",
//             }}
//             onClick={() => handleEdit(params.row.id)}
//           />
//           <DeleteIcon
//             style={{
//               color: "#ed4545",
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               handleDelete(params.row.detail_id, params.row.details_name)
//             }
//           />
//         </div>
//       ),
//     },
//   ];

//   const rows = categories.map((category, i) => ({
//     id: i + 1,
//     category_name: category.category_name,
//     field_name: category.field_name,
//     detail_id: category.detail_id,
//     details_name: category.details_name,
//   }));

//   const handleEdit = (id) => {};

//   // delete detail_fields
//   const deleteCategory = (detail_id) => {
//     const deleteUrl = `${apiHost}/field-details/${detail_id}`;
//     fetch(`${apiHost}/field-details/${detail_id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         fetchData(); // Update the category list after deletion
//         notifySuccess("Detail Field deleted successfully");
//       })
//       .catch((error) => {
//         notifyError("Failed to delete Detail Field");
//       });
//   };

//   const handleDelete = (detail_id, details_name) => {
//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the category "${details_name}"?`
//     );
//     if (isConfirmed) {
//       deleteCategory(detail_id);
//     }
//   };

  
//   return (
//     <div className="dashboard-container">
//       <HorizontalNavbar />
//       <div className="vandc-container">
//         <VerticalNavbar />
//         <ToastContainer />
//         <div className="dashboard-body">
//           <div className="box-for-tables">
//             {categories && categories.length > 0 ? (
//               <>
//                 <div className="category-header-container">
//                   <h2>Category with Detail Table</h2>
//                   <button
//                     className="add-button"
//                     type="button"
//                     onClick={handleOpenDialog}
//                   >
//                     <b>ADD </b>
//                     <div>
//                       <LibraryAddIcon />
//                     </div>
//                   </button>
//                 </div>

//                 <div className="detail-table-grid">
//                   <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={5}
//                     style={{
//                       backgroundColor: "white",
//                       marginTop: "20px",
//                       height: "500px",
//                       width: "100%",
//                       borderRadius: "10px",
//                       padding: "35px",
//                       boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)",
//                       fontSize: "15px",
//                     }}
//                   />
//                 </div>
//               </>
//             ) : (
//               <div className="loader"></div>
//             )}
//           </div>

//           <Dialog
//             open={open}
//             onClose={handleCloseDialog}
//             PaperProps={{
//               style: {
//                 // width: "500px",
//                 // height: "500px",
//                 padding: "20px",
//               },
//             }}
//           >
//             <div>
//               <DialogTitle
//                 style={{
//                   textAlign: "center",
//                 }}
//               >
//                 <h2>Add Field Details</h2>
//               </DialogTitle>
//               <DialogContent
//                 style={{
//                   fontSize: 20,
//                 }}
//               >
//                 <form id="addFieldDetailsForm" encType="multipart/form-data">
//                   <div className="flex-container">
//                     <div className="field-inside-flex">
//                       <div>
//                         <label className="form-label" htmlFor="category_name">
//                           <b>Category Name:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <select
//                           className="form-select"
//                           id="category_name"
//                           name="category_name"
//                           onChange={getFields}
//                         >
//                           {categoryOptions.map((category, index) => (
//                             <option key={index} value={category}>
//                               {category}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="field-inside-flex">
//                       <div>
//                         <label htmlFor="field_name">
//                           <b>Item Name:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <select
//                           className="form-select-1"
//                           id="field_name"
//                           name="field_name"
//                         >
//                           {itemOptions.map((item, index) => (
//                             <option key={index} value={item.value}>
//                               {item.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="field-inside-flex">
//                       <div>
//                         <label htmlFor="field_name">
//                           <b>SubCategory Name:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <select
//                           className="form-select-1"
//                           id="field_name"
//                           name="field_name"
//                         >
//                           {subcategoryOptions.map((subcategory, index) => (
//                             <option key={index} value={subcategory.value}>
//                               {subcategory.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="field-inside-flex">
//                       <div>
//                         <label htmlFor="field_name">
//                           <b>Brand Name:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <select
//                           className="form-select-1"
//                           id="field_name"
//                           name="field_name"
//                         >
//                           {brandOptions.map((brand, index) => (
//                             <option key={index} value={brand.value}>
//                               {brand.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="field-inside-flex">
//                       <div>
//                         <label htmlFor="field_name">
//                           <b>Model Name:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <select
//                           className="form-select-1"
//                           id="field_name"
//                           name="field_name"
//                         >
//                           {modelOptions.map((model, index) => (
//                             <option key={index} value={model.value}>
//                               {model.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="field-inside-flex">
//                       <div>
//                         <label
//                           style={{
//                             marginTop: 20,
//                           }}
//                           htmlFor="details_name"
//                         >
//                           <b>Colour:</b>
//                         </label>
//                       </div>
//                       <div>
//                         <input
//                           className="form-input"
//                           type="text"
//                           id="colour"
//                           name="colour"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </form>

//                 <br />
//               </DialogContent>
//               <DialogActions>
//                 <Button style={{ fontWeight: 700 }} onClick={handleCloseDialog}>
//                   Cancel
//                 </Button>
//                 <Button
//                   style={{ fontWeight: 700 }}
//                   onClick={() => {
//                     addFieldDetails();
//                     handleCloseDialog();
//                   }}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Add Field Details
//                 </Button>
//               </DialogActions>
//             </div>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColourTable;
