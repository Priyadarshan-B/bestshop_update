import React, { useState, useEffect } from 'react';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import InputBox from '../InputBox/inputbox';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import requestApi from '../../utils/axios';
import apiHost from '../../utils/api';

function Stocks() {
    const [items, setItems] = useState([]);
    const [subItems, setSubItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
        } catch (error) {
            console.error('Error fetching sub-items:', error);
        }
    };
    

    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
        fetchSubItems(itemId);
    };

    console.log("Rendering...");

    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <div className="dashboard-body">
                    <div className='items-display-card'>
                        <div className="search-container">
                            <InputBox
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                        <SearchSharpIcon sx={{ marginRight: 1, color: 'white' }} />
                                        Search
                                    </div>
                                }
                                size="small"
                                type="text"
                                // value={searchQuery}
                                // onChange={handleSearchInputChange}
                                sx={{ width: '100%' }}
                            />
                        </div>
                        {items.map((item) => (
                            <div className='each-item-card' key={item.id} onClick={() => handleItemClick(item.id)}>
                                <img src={`${apiHost}/`+item.category_image} alt={item.item_name} />
                                <p>{item.item_name}</p>
                            </div>
                        ))}
                    </div>
                    {selectedItem && (
                        <div className='sub-items-container'>
                            {subItems.map((subItem, index) => (
                                <div className='sub-item-card' key={index}>
                                    <img src={subItem.item_image} alt={subItem.itemname_name} />
                                    <p>{subItem.itemname_name}</p>
                                    <p>{subItem.brand_name}</p>
                                    <p>{subItem.model_name}</p>
                                    <p>{subItem.color_name}</p>
                                    <p>{subItem.size_name}</p>
                                    <p>{subItem.price}</p>
                                    <p>{subItem.total_quantity}</p>
                                    <p>{subItem.availability}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Stocks;