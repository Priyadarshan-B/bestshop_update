import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import requestApi from "../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button } from '@mui/material';
import Select from 'react-select';

export default function BrandTable(){
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null)

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedItem && selectedSubCategory ) {
            fetchData();
        }
    }, [selectedItem, selectedSubCategory]);

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
            const response = await requestApi("GET", `/api/structure/item-name?category=${selectedOption.value}`);
            setItems(response.data || []);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };
    const handleItemChange = async (selectedOption) => {
        setSelectedItem(selectedOption);
        try {
            const response = await requestApi("GET", `/api/structure/sub-category?item_name=${selectedOption.value}`);
            setSubCategories(response.data || []);
        } catch (error) {
            console.error("Error fetching sub-categories:", error);
        }
    };

    const handleSubCategoryChange = async(selectedOption)=>{
        setSelectedSubCategory(selectedOption)
    }

    const handleEdit = (id, name) => {
        setSelectedBrand({ id, name });
        setEditedName(name);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedBrand(null);
        setEditedName('');
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleUpdateBrandCategory = async () => {
        try {
            const response = await requestApi("PUT", `/api/structure/brand`, { id: selectedBrand.id, name: editedName });
            console.log(response.data.message);
            const updateBrand = { ...selectedBrand, name: editedName };
            setBrands(brands.map(mod => (mod.id === selectedBrand.id ? updateBrand : mod)));
            toast.success(`Brand updated successfully`);
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating Brand:", error);
            toast.error("Error updating Brand");

        }
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await requestApi("DELETE", `/api/structure/brand?id=${id}`);
            console.log(response.data.message);
            setBrands(brands.filter(mod => mod.id !== id));
            toast.success(`Brand "${name}" deleted successfully`);
        } catch (error) {
            console.error("Error deleting Brand:", error);
            toast.error("Error deleting Brand");
        }
    };
    const fetchData = async () => {
        try {
            const response = await requestApi("GET", `/api/structure/brand?sub_category=${selectedSubCategory.value}`);
            setBrands(response.data || []);
        } catch (error) {
            console.error("Error fetching Brands:", error);
        }
    };
    const columns = [
        { field: "id", headerName: <b>S.No</b>, width: 100 },
        { field: "name", headerName: <b>Brand Name</b>, width: 200 },
        {
            field: "actions",
            headerName: <b>Actions</b>,
            width: 100,
            renderCell: (params) => (
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <EditIcon style={{ color: "#5676f5", cursor: "pointer" }} onClick={() => handleEdit(params.row.id, params.row.name)} />
                    <DeleteIcon style={{ color: "#ed4545", cursor: "pointer" }} onClick={() => handleDelete(params.row.id, params.row.name)} />
                </div>
            ),
        },
    ];

    const rows = brands.map((brands, index) => ({ id: brands.id || index + 1, name: brands.name }));
    return (
        <div>
            <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categories.map(category => ({ value: category.id, label: category.name }))}
                placeholder="Select Category"
            />
            <Select
                value={selectedItem}
                onChange={handleItemChange}
                options={items.map(item => ({ value: item.id, label: item.name }))}
                placeholder="Select Item"
            />
            <Select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                options={subCategories.map(sub => ({ value: sub.id, label: sub.name }))}
                placeholder="Select Sub Category"
            />
           
            <div style={{ height: '300px', width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} />
                <Modal
                    open={editModalOpen}
                    onClose={handleEditModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 4 }}>
                        <h2>Edit Item</h2>
                        <TextField label="Item Name" variant="outlined" value={editedName} onChange={handleNameChange} />
                        <Button variant="contained" onClick={handleUpdateBrandCategory}>Submit</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

