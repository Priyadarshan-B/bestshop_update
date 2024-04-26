import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import requestApi from "../../utils/axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Modal, TextField, Button } from '@mui/material';

export default function CategoryTable() {
    const [category, setCategory] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editedName, setEditedName] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id, name) => {
        setSelectedCategory({ id, name });
        setEditedName(name);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        setSelectedCategory(null);
        setEditedName('');
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await requestApi("PUT", `/api/structure/category`, { id: selectedCategory.id, name: editedName });
            console.log(response.data.message);
            // Update the UI to reflect the update
            const updatedCategory = { ...selectedCategory, name: editedName };
            setCategory(category.map(cat => (cat.id === selectedCategory.id ? updatedCategory : cat)));
            toast.success(`Category updated successfully`);
            handleEditModalClose();
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Error updating category");
        }
    };
    const handleDelete = async (id, name) => {
        try {
            const response = await requestApi("DELETE", `/api/structure/category?id=${id}`);
            console.log(response.data.message);
            // Update the UI to reflect the deletion
            setCategory(category.filter(cat => cat.id !== id));
            console.log(id)
            toast.success(`Category "${name}" deleted successfully`);
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Error deleting category");
        }
    };

    const fetchData = async () => {
        try {
            const response = await requestApi("GET", "/api/structure/category", {});
            setCategory(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        { field: "id", headerName: <b>S.No</b>, width: 100 },
        { field: "name", headerName: <b>Category Name</b>, width: 200 },
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
                        onClick={() =>
                            handleDelete(params.row.id, params.row.name)
                        }
                    />
                </div>
            ),
        },
    ];

    const rows = category.map((category, index) => ({
        id: category.id || index + 1,
        name: category.name,
    }));

    return (
        <div style={{ height:'100%', width: '100%' }}>
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
                    <h2>Edit Category</h2>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        value={editedName}
                        onChange={handleNameChange}
                    />
                    <Button variant="contained" onClick={handleUpdateCategory}>Submit</Button>
                </div>
            </Modal>
        </div>
    );
}
