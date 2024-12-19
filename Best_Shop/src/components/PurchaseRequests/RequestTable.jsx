import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import requestApi from '../../utils/axios';
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import { toast, ToastContainer } from "react-toastify";
import './Purchase_req.css';

function RequestTable() {
    const [requests, setRequests] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await requestApi("GET", "/api/requests/requests", {});
                if (response.success) {
                    setRequests(response.data);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        fetchRequests();
    }, []);

    const handleOpenDialog = (request) => {
        setSelectedRequest(request);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRequest(null);
    };

    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <ToastContainer />
                <div className="dashboard-body">

                    <div>
                        <h2>Purchase Requests</h2>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Name</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow key={request.id} onClick={() => handleOpenDialog(request)} style={{ cursor: 'pointer' }}>
                                            <TableCell>{request.item_name}</TableCell>
                                            <TableCell>{request.category}</TableCell>
                                            <TableCell>{request.quantity} pcs</TableCell>
                                            <TableCell><Button variant="outlined">View Details</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Dialog for displaying selected request data */}
                        {selectedRequest && (
                            <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleCloseDialog}
                                        aria-label="close"
                                        sx={{ position: 'absolute', right: 8, top: 8 }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    Request Details
                                </DialogTitle>
                                <DialogContent className="dialogContent">
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Item Name:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.item_name}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Brand:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.brand}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Category:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.category}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Model:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.model}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Color:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.color}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Emergency:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.emergency}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Size:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.size}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Quantity:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.quantity}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Supplier:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.supplier}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Shop Location:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.shop_location}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Status:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.status}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Sub Category:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.sub_category}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">Master User:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.master_user}</Typography>
                                    </div>
                                    <div className="dialogItem">
                                        <Typography className="dialogLabel">ID:</Typography>
                                        <Typography className="dialogValue">{selectedRequest.id}</Typography>
                                    </div>
                                    <img src={selectedRequest.product_image} alt={selectedRequest.item_name} className="dialogImage" />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RequestTable;
