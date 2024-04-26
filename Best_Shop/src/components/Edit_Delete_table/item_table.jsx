import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import requestApi from "../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button } from '@mui/material';
import Select from 'react-select';

export default function ItemTable() {
    const [item, setItem] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [categories, setCategories] = useState([]); // State for categories
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchData();
        }
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const response = await requestApi("GET", "/api/structure/category");
            const categories = response.data.map(category => ({
                value: category.id,
                label: category.name
            }));
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const handleEdit = (id, name) => {
        setSelectedItem({ id, name });
        setEditedName(name);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedItem(null);
        setEditedName('');
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleUpdateItem = async () => {
        try {
            const response = await requestApi("PUT", `/api/structure/item-name`, { id: selectedItem.id, name: editedName });
            console.log(response.data.message);
            const updatedItem = { ...selectedItem, name: editedName };
            setItem(item.map(cat => (cat.id === selectedItem.id ? updatedItem : cat)));
            toast.success(`Item updated successfully`);
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating Item:", error);
            toast.error("Error updating Item");
        }
    };

    const handleDelete = async (id, name) => {
        try {
            const response = await requestApi("DELETE", `/api/structure/item-name?id=${id}`);
            console.log(response.data.message);
            setItem(item.filter(cat => cat.id !== id));
            toast.success(`Item "${name}" deleted successfully`);
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Error deleting category");
        }
    };

    const fetchData = async () => {
        try {
            const response = await requestApi("GET", `/api/structure/item-name?category=${selectedCategory.value}`, {});
            setItem(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        { field: "id", headerName: <b>S.No</b>, width: 100 },
        { field: "name", headerName: <b>Item Name</b>, width: 200 },
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

    const rows = item.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
    }));

    return (
        <div>
            <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categories}
                placeholder="Select Category"
            />
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
                        <h2>Edit Item</h2>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={editedName}
                            onChange={handleNameChange}
                        />
                        <Button variant="contained" onClick={handleUpdateItem}>Submit</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
