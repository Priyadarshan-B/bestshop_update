import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import requestApi from "../../utils/axios"; // Ensure this path is correct
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button, Select, MenuItem } from '@mui/material';

export default function SubTable() {
    const [sub, setSub] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedItem) {
            fetchData();
        }
    }, [selectedItem]);

    const fetchCategories = async () => {
        try {
            const response = await requestApi("GET", "/api/structure/category");
            setCategories(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = async (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        try {
            const response = await requestApi("GET", `/api/structure/item-name?category=${categoryId}`);
            setItems(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleItemChange = (event) => {
        const itemId = event.target.value;
        setSelectedItem(itemId);
    };

    const handleEdit = (id, name) => {
        setSelectedSub({ id, name });
        setEditedName(name);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedSub(null);
        setEditedName('');
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleUpdateSubCategory = async () => {
        try {
            const response = await requestApi("PUT", `/api/structure/sub-category`, { id: selectedSub.id, name: editedName });
            console.log(response.data.message);
            const updatedSub = { ...selectedSub, name: editedName };
            setSub(sub.map(cat => (cat.id === selectedSub.id ? updatedSub : cat)));
            toast.success(`Sub Category updated successfully`);
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating Sub category:", error);
            toast.error("Error updating Sub category");
        }
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await requestApi("DELETE", `/api/structure/sub-category?id=${id}`);
            console.log(response.data.message);
            setSub(sub.filter(cat => cat.id !== id));
            toast.success(`Sub Category "${name}" deleted successfully`);
        } catch (error) {
            console.error("Error deleting Subcategory:", error);
            toast.error("Error deleting Sub category");
        }
    };

    const fetchData = async () => {
        try {
            const response = await requestApi("GET", `/api/structure/sub-category?item_name=${selectedItem}`, {});
            setSub(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        { field: "id", headerName: <b>S.No</b>, width: 100 },
        { field: "name", headerName: <b>Sub-Category Name</b>, width: 200 },
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
                        onClick={() => handleEdit(params.row.id, params.row.name)}
                    />
                    <DeleteIcon
                        style={{
                            color: "#ed4545",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDelete(params.row.id, params.row.name)}
                    />
                </div>
            ),
        },
    ];

    const rows = sub.map((sub, index) => ({
        id: sub.id || index + 1,
        name: sub.name,
    }));

    return (
        <div>
            <div>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={selectedItem}
                    onChange={handleItemChange}
                    displayEmpty
                    disabled={!selectedCategory}
                >
                    <MenuItem value="">
                        <em>Select Item</em>
                    </MenuItem>
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                />
                <Modal
                    open={editModalOpen}
                    onClose={handleEditModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 4 }}>
                        <h2>Edit Sub Category</h2>
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            value={editedName}
                            onChange={handleNameChange}
                        />
                        <Button variant="contained" onClick={handleUpdateSubCategory}>Submit</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
