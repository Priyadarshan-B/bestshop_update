
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    TablePagination,
    Typography,
    Divider,
    Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import requestApi from '../../utils/axios';
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import { toast, ToastContainer } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import './Purchase_req.css';
import InputBox from '../InputBox/inputbox';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Import the grid view icon
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function PendingTable() {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [viewMode, setViewMode] = useState('table');
    const [selectedMenuOption, setSelectedMenuOption] = useState("Purchase Requests");


    const fetchRequests = async () => {
        try {
            const response = await requestApi("GET", "/api/requests/pending", {});
            if (response.success) {
                const formattedData = response.data.map(request => ({
                    ...request,
                    requested_date: formatDate(request.requested_date),
                    ordered_date: formatDate(request.ordered_date)
                }));
                setRequests(formattedData);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yyyy = dateObj.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const handleOpenDialog = (request) => {
        setSelectedRequest(request);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRequest(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOrderReceived = async (id) => {
        console.log(id);
        try {
            const response = await requestApi("PUT", `/api/requests/orders`, { id });
            if (response.success) {
                toast.success("Order received successfully!");
                fetchRequests()
            } else {
                toast.error("Failed to place the order.");
            }
        } catch (error) {
            console.error("Error receiving order:", error);
            toast.error("An error occurred while receiving the order.");
        } finally {
            setOpenConfirmDialog(false); // Close the dialog after the operation
        }
    };

    const handleOpenConfirmDialog = (id) => {
        setSelectedId(id);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setSelectedId(null);
    };

    const filteredRequests = requests.filter((request) =>
        request.shop_location.toLowerCase().includes(searchText.toLowerCase()) ||
        request.master_user?.toLowerCase().includes(searchText.toLowerCase()) ||
        request.category.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleToggleView = () => {
        setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
    };
    return (

        <div>
            <div className='requestsearch-flex'>
                <h2>Products yet to receive</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: "flex" }}>
                        <InputBox
                            label={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <SearchSharpIcon sx={{ marginRight: 1 }} />
                                    Search
                                </div>
                            }
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            size="small"
                            sx={{width:"290px"}}
                        />
                        <IconButton onClick={handleToggleView} sx={{ marginLeft: 2 }}>
                            <ViewModuleIcon sx={{ color: "var(--button)" }} />
                        </IconButton>
                    </div>
                </div>
            </div>
            {viewMode === 'table' ? (
                <div style={{ backgroundColor: "var(--background-1)", borderRadius: "5px", border: "1px solid var(--button)" }}>
                    <TableContainer sx={{ height: "fit-content", maxHeight: "400px" }}>
                        <Table sx={{ backgroundColor: "var(--background-1)" }}>
                            <TableHead sx={{ zIndex: "1" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Location</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Staff</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Category</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Item</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Quantity</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Emergency</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Req Date</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Ordered</TableCell>
                                    <TableCell sx={{ color: "var(--text)", fontWeight: "600" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} sx={{ textAlign: "center", color: "var(--text)" }}>
                                            No Purchase Requests
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredRequests
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.shop_location}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.master_user}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.category}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.item_name}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.quantity}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>
                                                    <div
                                                        style={{
                                                            display: 'inline-block',
                                                            padding: '0px 15px 3px 15px',
                                                            backgroundColor: request.emergency === "1" ? 'rgba(235, 36, 36, 0.69)' : 'rgba(36, 235, 162, 0.84)', // Red for emergency, Green for no emergency
                                                            color: 'white', // Text color
                                                            fontWeight: 'bold',
                                                            borderRadius: '4px', // Rounded corners for the label
                                                        }}
                                                    >
                                                        {request.emergency === "1" ? 'Emergency' : 'Required'}
                                                    </div>
                                                </TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.requested_date}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>{request.ordered_date}</TableCell>
                                                <TableCell sx={{ color: "var(--text)" }}>
                                                    <IconButton
                                                        onClick={() => handleOpenDialog(request)}
                                                        aria-label="view details"
                                                    >
                                                        <VisibilityIcon sx={{ color: "var(--button)" }} />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleOpenConfirmDialog(request.id)}
                                                        color="secondary"
                                                        aria-label="place order"
                                                        sx={{ marginLeft: "10px" }}
                                                    >
                                                        <LocalShippingIcon sx={{ color: "rgba(11, 184, 103, 0.71)" }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRequests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ color: "var(--text)" }}
                    />
                </div>

            ) : (
                <div style={{ height: "60vh", overflowY: "scroll", padding: "10px" }} className='grid-scroll'>
                    <Grid container spacing={3}>
                        {filteredRequests.length === 0 ? (
                            <Grid item xs={12}>
                                <Typography>No Products yet to receive</Typography>
                            </Grid>
                        ) : (
                            filteredRequests.map((request) => (
                                <Grid item xs={12} sm={6} key={request.id}>
                                    <div className="box-view">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography variant="h6">{request.shop_location} ({request.master_user})</Typography>
                                            <div
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '0px 15px 3px 15px',
                                                    backgroundColor: request.emergency === "1" ? 'rgba(235, 36, 36, 0.57)' : 'rgba(36, 235, 162, 0.701)',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {request.emergency === "1" ? 'Emergency' : 'Required'}
                                            </div>

                                        </div>
                                        <Divider />
                                        <br />
                                        <Typography variant="body2">{request.category}</Typography>
                                        <Typography variant="body2">{request.item_name}</Typography>
                                        <Typography variant="body2">Quantity: {request.quantity}</Typography>

                                        <Typography variant="body2" sx={{ display: "flex", justifyContent: "flex-end", color: "gray" }}>{request.requested_date}</Typography>
                                        <Divider />
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                            <IconButton onClick={() => handleOpenDialog(request)} color="primary" aria-label="view details">
                                                <VisibilityIcon sx={{ color: "var(--button)" }} />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenConfirmDialog(request.id)} color="secondary" aria-label="place order" sx={{ marginLeft: "10px" }}>
                                                <LocalShippingIcon sx={{ color: "rgba(11, 184, 103, 0.71)" }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </div>
            )}
            <Dialog fullWidth open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                <div className='popup-color'>
                    <DialogTitle>Confirm Delivery</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Typography>
                            Order received?
                        </Typography>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={handleCloseConfirmDialog}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleOrderReceived(selectedId)}
                            color="primary"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

            {selectedRequest && (
                <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                    <div className='popup-color'>
                        <DialogTitle>
                            Order Details
                        </DialogTitle>
                        <Divider />
                        <DialogContent className="dialogContent">
                            {selectedRequest.emergency === "1" && (
                                <div
                                    style={{
                                        backgroundColor: '#ffd4d4',
                                        padding: '10px',
                                        marginBottom: '15px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                        Emergency Request
                                    </Typography>
                                </div>
                            )}
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Shop Location</Typography>
                                <Typography className="dialogValue">{selectedRequest.shop_location}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Staff name</Typography>
                                <Typography className="dialogValue">{selectedRequest.master_user}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Requested date</Typography>
                                <Typography className="dialogValue">{selectedRequest.requested_date}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Ordered date</Typography>
                                <Typography className="dialogValue">{selectedRequest.ordered_date}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Category</Typography>
                                <Typography className="dialogValue">{selectedRequest.category}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Item Name</Typography>
                                <Typography className="dialogValue">{selectedRequest.item_name}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Sub Category</Typography>
                                <Typography className="dialogValue">{selectedRequest.sub_category}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Brand</Typography>
                                <Typography className="dialogValue">{selectedRequest.brand}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Model</Typography>
                                <Typography className="dialogValue">{selectedRequest.model}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Color</Typography>
                                <Typography className="dialogValue">{selectedRequest.color}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Size</Typography>
                                <Typography className="dialogValue">{selectedRequest.size}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Quantity</Typography>
                                <Typography className="dialogValue">{selectedRequest.quantity}</Typography>
                            </div>
                            <div className="dialogItem">
                                <Typography className="dialogLabel">Supplier</Typography>
                                <Typography className="dialogValue">{selectedRequest.supplier}</Typography>
                            </div>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            )}
        </div>
    );
}

export default PendingTable;
