import React, { useState, useEffect } from 'react';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import InputBox from '../InputBox/inputbox';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import requestApi from '../../utils/axios';
import apiHost from '../../utils/api';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./stocks.css";

function Stocks() {
    const [items, setItems] = useState([]);
    const [subItems, setSubItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSubItems, setFilteredSubItems] = useState([]);

    useEffect(() => {
        console.log("Fetching items...");
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await requestApi("GET", "/api/stock/products");
            console.log("Fetched items:", response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchSubItems = async (itemId) => {
        try {
            const response = await requestApi("GET", `/api/stock/products/item?item_name=${itemId}`);
            console.log("Fetched sub-items:", response.data);
            setSubItems(response.data);
            setSelectedItem(itemId); // Set the selected item
            setFilteredSubItems(response.data); // Initialize filtered sub-items with all sub-items
        } catch (error) {
            console.error('Error fetching sub-items:', error);
        }
    };

    const handleItemClick = (itemId) => {
        fetchSubItems(itemId);
    };

    const filterData = (data) => {
        return data.filter((item) =>
            item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filterSubItems = () => {
        return subItems.filter((subItem) =>
            subItem.itemname_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.model_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.color_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.size_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subItem.price.toString().includes(searchQuery) ||
            subItem.total_quantity.toString().includes(searchQuery) ||
            subItem.availability.toString().includes(searchQuery)
        );
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        if (selectedItem !== null) {
            setFilteredSubItems(filterSubItems());
        }
    };

    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <div className="dashboard-body">
                    {selectedItem == null && (
                        <div className='items-display-card'>
                            <div className="search-box">
                                <InputBox
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text)' }}>
                                            <SearchSharpIcon sx={{ marginRight: 1, color: 'var(--text)' }} />
                                            Search
                                        </div>
                                    }
                                    sx={{ width: '100%' }}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    size="small"
                                    type="text"
                                />
                            </div>
                            <div className='twobytwo'>
                                {
                                    filterData(items).map((item) => (
                                        <div className='each-item-card' key={item.id} onClick={() => handleItemClick(item.id)}>
                                            <div className='id-with-image'>
                                                <div className='item-id-div'>{item.id}</div>
                                                <div className='images-in-stocks'>
                                                    <img className='image-in-stocks' src={`${apiHost}/` + item.category_image} alt={item.item_name} />
                                                </div>
                                            </div>
                                            <div>
                                                <h3>{item.category_name}</h3>
                                                <p className='stockitem-name'>{item.item_name}</p>
                                            </div>
                                            <div className=''>
                                                <p className='stockitem-quantity'>Available Quantity:{item.count}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                    {selectedItem && (
                        <div className='sub-items-container'>
                            <ArrowBackIcon onClick={() => setSelectedItem(null)} style={{ margin: 10, marginBottom: 0 }} />
                            <div className="search-box">
                                <InputBox
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-text)' }}>
                                            <SearchSharpIcon sx={{ marginRight: 1, color: 'var(--gray-text)' }} />
                                            Search
                                        </div>
                                    }
                                    sx={{ width: '100%' }}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    size="small"
                                    type="text"
                                />
                            </div>
                            <div className='grid-for-subitems'>
                                {filteredSubItems.map((subItem, index) => (
                                    <div className='sub-item-card' key={index}>
                                        <div className='image-and-category-name'>
                                            <div className='image-in-subitem'>
                                                <img className='image-in-stocks' src={`${apiHost}/` + subItem.item_image} alt={subItem.itemname_name} />
                                            </div>
                                            <div></div>
                                            <div className='product-identity'>
                                                <p className='category-bold'>{subItem.category_name}</p>
                                                <p className='item-bold'>{subItem.itemname_name}</p>
                                                <div></div>
                                                <div className='gents-bottom'>
                                                    <p className='sub-cat-bold'>{subItem.subcategory_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 style={{letterSpacing: 1.5}}>Product Details:</h3>
                                        <div className='product-details'>   
                                            <div>
                                                <p className='details-para'><span className='bold'>Brand:</span> {subItem.brand_name}</p>
                                                <p className='details-para'><span className='bold'>Model:</span> {subItem.model_name}</p>
                                                <p className='details-para'><span className='bold'>Color:</span> {subItem.color_name}</p>
                                                <p className='details-para'><span className='bold'>Size:</span> {subItem.size_name}</p>
                                            </div>
                                            <div className='separator'></div>
                                            <div>
                                                <p className='details-para'><span className='bold'>Price:</span>&#8377;{subItem.price}</p>
                                                <p className='details-para'><span className='bold'>Quantity: </span>{subItem.total_quantity}</p>
                                                <p className='details-para'><span className='bold'>Available: </span>{subItem.availability}%</p>
                                            </div>

                                        </div>
                                       
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Stocks;













