import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import requestApi from "../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button } from "@mui/material";
import Select from "react-select";
import InputBox from "../InputBox/inputbox";

export default function SizeTable(){
    const [size, setSize] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [selectedSize, setSelectedSize] = useState(null)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedItem && selectedSubCategory && selectedBrand && selectedModel && selectedColor) {
      fetchData();
    }
  }, [selectedItem, selectedSubCategory, selectedBrand, selectedModel, selectedColor]);

  const fetchCategories = async () => {
    try {
      const response = await requestApi("GET", "/api/structure/category");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = async (selectedOption) => {
    setSelectedCategory(selectedOption);
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/item-name?category=${selectedOption.value}`
      );
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleItemChange = async (selectedOption) => {
    setSelectedItem(selectedOption);
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/sub-category?item_name=${selectedOption.value}`
      );
      setSubCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    }
  };

  const handleSubCategoryChange = async (selectedOption) => {
    setSelectedSubCategory(selectedOption);
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/brand?sub_category=${selectedOption.value}`
      );
      setBrands(response.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  const handleBrandChange = async (selectedOption) => {
    setSelectedBrand(selectedOption);
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/model?brand=${selectedOption.value}`,
        {}
      );
      setModel(response.data || []);
    } catch (error) {
      console.error("Error fetchinf Model:", error);
    }
  };
const handleModelChange = async (selectedOption)=>{
    setSelectedModel(selectedOption)
    try{
        const response= await requestApi("GET", `/api/structure/color?model=${selectedOption.value}`, {})
        setColor(response.data || [])

    }catch(error){
        console.log(error)
    }
}
const handleColorChange = async(selectedOption)=>{
    setSelectedColor(selectedOption)
}
const handleEdit = (id, name) => {
    setSelectedSize({ id, name });
    setEditedName(name);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedSize(null);
    setEditedName("");
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleUpdateSizeCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/size`, {
        id: selectedSize.id,
        name: editedName,
      });
      console.log(response.data.message);
      const updatedSize = { ...selectedSize, name: editedName };
      setSize(
        size.map((siz) => (siz.id === selectedSize.id ? updatedSize : siz))
      );
      toast.success(`Size updated successfully`);
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating Size:", error);
      toast.error("Error updating Size");
    }
  };

  const handleDelete = async (id, name) => {
    try {
      const response = await requestApi(
        "DELETE",
        `/api/structure/size?id=${id}`
      );
      console.log(response.data.message);
      setSize(size.filter((siz) => siz.id !== id));
      toast.success(`Size "${name}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting Size:", error);
      toast.error("Error deleting Size");
    }
  };
  const fetchData = async () => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/size?color=${selectedColor.value}`
      );
      setSize(response.data || []);
    } catch (error) {
      console.error("Error fetching Size:", error);
    }
  };
  const columns = [
    { field: "id", headerName: <b>S.No</b>, width: 100 },
    { field: "name", headerName: <b>Size Name</b>, width: 200 },
    {
      field: "actions",
      headerName: <b>Actions</b>,
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <EditIcon
            style={{ color: "#5676f5", cursor: "pointer" }}
            onClick={() => handleEdit(params.row.id, params.row.name)}
          />
          <DeleteIcon
            style={{ color: "#ed4545", cursor: "pointer" }}
            onClick={() => handleDelete(params.row.id, params.row.name)}
          />
        </div>
      ),
    },
  ];

  const rows = size.map((siz, index) => ({
    id: siz.id || index + 1,
    name: siz.name,
  }));

  return (
    <div>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        placeholder="Select Category"
      />
      <Select
        value={selectedItem}
        onChange={handleItemChange}
        options={items.map((item) => ({ value: item.id, label: item.name }))}
        placeholder="Select Item"
      />
      <Select
        value={selectedSubCategory}
        onChange={handleSubCategoryChange}
        options={subCategories.map((sub) => ({
          value: sub.id,
          label: sub.name,
        }))}
        placeholder="Select Sub Category"
      />
      <Select
        value={selectedBrand}
        onChange={handleBrandChange}
        options={brands.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))}
        placeholder="Select Brand"
      />
      <Select
        value={selectedModel}
        onChange={handleModelChange}
        options={model.map((model) => ({ value: model.id, label: model.name }))}
        placeholder="Select Model"
      />
      <Select
        value={selectedColor}
        onChange={handleColorChange}
        options={size.map((size) => ({ value: size.id, label: size.name }))}
        placeholder="Select Size"
      />
      <div style={{ height: "300px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
        <Modal
          open={editModalOpen}
          onClose={handleEditModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor:"var(--background-1)",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Edit Item</h2>
            <InputBox
              label="Color Name"
              type="text"
              size="small"
              value={editedName}
              onChange={handleNameChange}
              sx={{ width: "100%" }}

            />
            <Button variant="contained" onClick={handleUpdateSizeCategory}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );

}