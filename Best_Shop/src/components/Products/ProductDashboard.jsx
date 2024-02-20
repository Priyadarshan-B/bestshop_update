import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import apiHost from "../../utils/api";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Products/ProductDashboard.css";

// Function to create rows based on nested JSON data
const createRowFromApiData = (jsonData) => {
  let rows = [];

  jsonData.forEach((categoryObject) => {
    for (const category in categoryObject) {
      if (categoryObject.hasOwnProperty(category)) {
        const categoryRow = {
          category_name: category,
          products: categoryObject[category].map((item) => ({
            stock_name: item.stock_name,
            date_added: item.date_added,
            time_added: item.time_added,
            price: item.selling_price,
            quantity: item.quantity,
            size: item.size,
            model_name: item.model_name,
          })),
        };
        rows.push(categoryRow);
      }
    }
  });

  return rows;
};

function Row(props) {
  const { category } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {category.category_name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Details</b>
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h3>Date</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Time</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Product Category</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Price</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Model</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Size</h3>
                    </TableCell>
                    <TableCell>
                      <h3>Quantity</h3>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.date_added}</TableCell>
                      <TableCell>{product.time_added}</TableCell>
                      <TableCell>{product.stock_name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.model_name}</TableCell>
                      <TableCell>{product.size}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  category: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        stock_name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost}/stocks`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        
        const formattedRows = createRowFromApiData(jsonData);
        setRows(formattedRows);
      } catch (error) {
      } finally {
        setLoading(false); // After fetching data, set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />

        <div className="table-body">
          {loading ? ( // Show loader if loading is true
          <div className="loader"></div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <h2>Product Name</h2>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((category, index) => (
                    <Row key={index} category={category} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}
