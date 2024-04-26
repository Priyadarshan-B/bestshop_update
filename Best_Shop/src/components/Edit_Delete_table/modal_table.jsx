import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import requestApi from "../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button } from '@mui/material';
import Select from 'react-select';

export default function ModalTable() {
    const [modal, setModal] = useState([]);
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
    const [selectedBrand, setSelectedBrand] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedItem && selectedSubCategory && selectedBrand) {
            fetchData();
        }
    }, [selectedItem, selectedSubCategory, selectedBrand]);

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

    const handleSubCategoryChange = async (selectedOption) => {
        setSelectedSubCategory(selectedOption);
        try {
            const response = await requestApi("GET", `/api/structure/brand?sub_category=${selectedOption.value}`);
            setBrands(response.data || []);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const handleBrandChange = async (selectedOption) => {
        setSelectedBrand(selectedOption);
        // No need to fetch data here as it's already handled by the second useEffect
    };

    const handleEdit = (id, name) => {
        setSelectedModal({ id, name });
        setEditedName(name);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedModal(null);
        setEditedName('');
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleUpdateModalCategory = async () => {
        try {
            const response = await requestApi("PUT", `/api/structure/model`, { id: selectedModal.id, name: editedName });
            console.log(response.data.message);
            const updatedModal = { ...selectedModal, name: editedName };
            setModal(modal.map(mod => (mod.id === selectedModal.id ? updatedModal : mod)));
            toast.success(`Modal updated successfully`);
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating Modal:", error);
            toast.error("Error updating Modal");
        }
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await requestApi("DELETE", `/api/structure/model?id=${id}`);
            console.log(response.data.message);
            setModal(modal.filter(mod => mod.id !== id));
            toast.success(`Modal "${name}" deleted successfully`);
        } catch (error) {
            console.error("Error deleting Modal:", error);
            toast.error("Error deleting Modal");
        }
    };

    const fetchData = async () => {
        try {
            const response = await requestApi("GET", `/api/structure/model?brand=${selectedBrand.value}`);
            setModal(response.data || []);
        } catch (error) {
            console.error("Error fetching modals:", error);
        }
    };

    const columns = [
        { field: "id", headerName: <b>S.No</b>, width: 100 },
        { field: "name", headerName: <b>Modal Name</b>, width: 200 },
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

    const rows = modal.map((mod, index) => ({ id: mod.id || index + 1, name: mod.name }));

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
            <Select
                value={selectedBrand}
                onChange={handleBrandChange}
                options={brands.map(brand => ({ value: brand.id, label: brand.name }))}
                placeholder="Select Brand"
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
                        <Button variant="contained" onClick={handleUpdateModalCategory}>Submit</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
