import React, { useState, useEffect } from 'react';
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import { toast, ToastContainer } from "react-toastify";
import './Purchase_req.css';
import requestApi from '../../utils/axios';
import apiHost from '../../utils/api';
// import Select from 'react-select';
import SelectInput from './SelectInput';
import { Divider } from '@mui/material';


function Requests() {
    const [shopLocations, setShopLocations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [masterUsers, setMasterUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [formData, setFormData] = useState({
        shop_location: '',
        master_user: '',
        category: '',
        item_name: '',
        sub_category: '',
        brand: '',
        model: '',
        color: '',
        size: '',
        quantity: '',
        product_image: '',
        supplier: '',
        emergency: '0',
        status: '1',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch shop locations
    useEffect(() => {
        const fetchShopLocations = async () => {
            try {
                const response = await requestApi("GET", "/api/master/shop-location");
                setShopLocations(response.data.map(location => ({
                    value: location.id,
                    label: location.name,
                })));
            } catch (error) {
                console.error("Error fetching shop locations:", error);
            }
        };
        fetchShopLocations();
    }, []);

    // Fetch master users with authentication token
    useEffect(() => {
        const fetchMasterUsers = async () => {
            try {
                const response = await fetch(`${apiHost}/api/auth/masterUsers`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer YOUR_AUTH_TOKEN_HERE`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch master users");
                }

                const data = await response.json();
                setMasterUsers(data.users);
            } catch (error) {
                console.error("Error fetching master users:", error);
            }
        };
        fetchMasterUsers();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await requestApi("GET", "/api/structure/category", {});
                if (response.success) {
                    setCategories(response.data);
                    console.log(categories)
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            setIsLoading(false);
        };
        fetchCategories();
    }, []);

    // Fetch item names based on selected category
    const fetchItemNames = async (categoryId) => {
        try {
            const response = await requestApi("GET", `/api/structure/item-name?category=${categoryId}`, {});
            if (response.success) {
                setItemNames(response.data);
            }
        } catch (error) {
            console.error("Error fetching item names:", error);
        }
    };

    // Fetch subcategories based on selected item name
    const fetchSubCategories = async (itemNameId) => {
        try {
            const response = await requestApi("GET", `/api/structure/sub-category?item_name=${itemNameId}`, {});
            if (response.success) {
                setSubCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    // Fetch brands based on selected subcategory
    const fetchBrands = async (subCategoryId) => {
        try {
            const response = await requestApi("GET", `/api/structure/brand?sub_category=${subCategoryId}`, {});

            if (response.success) {
                setBrands(response.data);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    // Fetch models based on selected brand
    const fetchModels = async (brandId) => {
        try {
            const response = await requestApi("GET", `/api/structure/model?brand=${brandId}`, {});
            if (response.success) {
                setModels(response.data);
            }
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    // Fetch colors based on selected model
    const fetchColors = async (modelId) => {
        try {
            const response = await requestApi("GET", `/api/structure/color?model=${modelId}`, {});
            if (response.success) {
                setColors(response.data);
            }
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };

    // Fetch sizes based on selected model
    const fetchSizes = async (colorId) => {
        try {
            const response = await requestApi("GET", `/api/structure/size?color=${colorId}`, {});
            if (response.success) {
                setSizes(response.data);
            }
        } catch (error) {
            console.error("Error fetching sizes:", error);
        }
    };

    // Handlers for dropdown changes
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value; // The ID from the select dropdown
        const selectedCategory = categories.find(category => category.id.toString() === selectedCategoryId); // Find the category object

        if (selectedCategory) {
            setFormData({
                ...formData,
                category: selectedCategory.name, // Store the name in formData
                item_name: '',
                sub_category: '',
                brand: '',
                model: '',
                color: '',
                size: '',
            });

            // Use the ID to fetch item names
            fetchItemNames(selectedCategoryId);
        }
    };



    const handleItemNameChange = (e) => {
        const selectedItemId = e.target.value; // Get the ID of the selected item
        const selectedItem = itemNames.find(item => item.id.toString() === selectedItemId); // Find the item object

        if (selectedItem) {
            setFormData({
                ...formData,
                item_name: selectedItem.name, // Store the item name in formData
                sub_category: '',
                brand: '',
                model: '',
                color: '',
                size: '',
            });

            // Use the selectedItemId to fetch subcategories
            fetchSubCategories(selectedItemId);
        }
    };


    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value; // Get the ID of the selected subcategory
        const selectedSubCategory = subCategories.find(subCat => subCat.id.toString() === selectedSubCategoryId); // Find the subcategory object

        if (selectedSubCategory) {
            setFormData({
                ...formData,
                sub_category: selectedSubCategory.name, // Store the subcategory name in formData
                brand: '',
                model: '',
                color: '',
                size: '',
            });

            // Use the selectedSubCategoryId to fetch brands
            fetchBrands(selectedSubCategoryId);
            console.log("Selected subcategory ID:", selectedSubCategoryId);
        }
    };


    const handleBrandChange = (e) => {
        const selectedBrandId = e.target.value; // Get the ID of the selected brand
        const selectedBrand = brands.find(brand => brand.id.toString() === selectedBrandId); // Find the brand object

        if (selectedBrand) {
            setFormData({
                ...formData,
                brand: selectedBrand.name, // Store the brand name in formData
                model: '',
                color: '',
                size: '',
            });

            // Use the selectedBrandId to fetch models
            fetchModels(selectedBrandId);
        }
    };


    const handleModelChange = (e) => {
        const selectedModelId = e.target.value; // Get the ID of the selected model
        const selectedModel = models.find(model => model.id.toString() === selectedModelId); // Find the model object

        if (selectedModel) {
            setFormData({
                ...formData,
                model: selectedModel.name, // Store the model name in formData
                color: '',
                size: '',
            });

            // Use the selectedModelId to fetch colors and sizes
            fetchColors(selectedModelId);
            fetchSizes(selectedModelId);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "color") {
            const selectedColor = colors.find(color => color.id.toString() === value); // Find the color object
            if (selectedColor) {
                setFormData({
                    ...formData,
                    color: selectedColor.name, // Store the color name in formData
                });
            }
        } else if (name === "size") {
            const selectedSize = sizes.find(size => size.id.toString() === value); // Find the size object
            if (selectedSize) {
                setFormData({
                    ...formData,
                    size: selectedSize.name, // Store the size name in formData
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert shop_location, master_user, and quantity to integers
        const updatedFormData = {
            ...formData,
            shop_location: parseInt(formData.shop_location, 10), // Convert to integer
            master_user: parseInt(formData.master_user, 10),     // Convert to integer
            quantity: parseInt(formData.quantity, 10),           // Convert to integer
        };

        console.log("Data being sent to the backend:", updatedFormData);

        try {
            const response = await fetch(`${apiHost}/api/requests/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData), // Send updated data
            });

            if (response.ok) {
                toast.success("Request submitted successfully!");
                setFormData({
                    shop_location: '',
                    master_user: '',
                    category: '',
                    item_name: '',
                    sub_category: '',
                    brand: '',
                    model: '',
                    color: '',
                    size: '',
                    quantity: '',
                    product_image: '',
                    supplier: '',
                    emergency: '0',
                    status: '1',
                });
            } else {
                toast.error("Failed to submit the request.");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the request.");
        }
    };


    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <ToastContainer />
                <div className="dashboard-body">
                    <div className="request_page">
                        <h2>Submit Purchase Request</h2>
                        <Divider/>
                        <br />
                        <form onSubmit={handleSubmit} className="request-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Shop Location:</label>
                                    <select name="shop_location" value={formData.shop_location} onChange={handleInputChange} required>
                                        <option value="" disabled>Select a shop location</option>
                                        {shopLocations.map(location => (
                                            <option key={location.value} value={location.value}>
                                                {location.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Request person name:</label>
                                    <select name="master_user" value={formData.master_user} onChange={handleInputChange} required>
                                        <option value="" disabled>Select a master user</option>
                                        {masterUsers.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <select
                                    name="category"
                                    value={categories.find(cat => cat.name === formData.category)?.id || ''}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Item Name:</label>
                                <select
                                    name="item_name"
                                    value={itemNames.find(item => item.name === formData.item_name)?.id || ''}
                                    onChange={handleItemNameChange}
                                    required
                                >
                                    <option value="" disabled>Select an item name</option>
                                    {itemNames.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Sub Category:</label>
                                <select
                                    name="sub_category"
                                    value={subCategories.find(subCat => subCat.name === formData.sub_category)?.id || ''}
                                    onChange={handleSubCategoryChange}
                                    required
                                >
                                    <option value="" disabled>Select a subcategory</option>
                                    {subCategories.map(subCategory => (
                                        <option key={subCategory.id} value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Brand:</label>
                                <select
                                    name="brand"
                                    value={brands.find(brand => brand.name === formData.brand)?.id || ''}
                                    onChange={handleBrandChange}
                                    required
                                >
                                    <option value="" disabled>Select a brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Model:</label>
                                <select
                                    name="model"
                                    value={models.find(model => model.name === formData.model)?.id || ''}
                                    onChange={handleModelChange}
                                    required
                                >
                                    <option value="" disabled>Select a model</option>
                                    {models.map(model => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Color:</label>
                                    <select name="color" value={formData.color} onChange={handleInputChange} required>
                                        <option value="" disabled>Select a color</option>
                                        {colors.map(color => (
                                            <option key={color.id} value={color.id}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Size:</label>
                                    <select name="size" value={formData.size} onChange={handleInputChange} required>
                                        <option value="" disabled>Select a size</option>
                                        {sizes.map(size => (
                                            <option key={size.id} value={size.id}>
                                                {size.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Supplier name:</label>
                                <input
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency:</label>
                                <select
                                    name="emergency"
                                    value={formData.emergency}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <Divider/>
                            <br />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button
                                    className="button-in-dialog"
                                    variant="contained"

                                >
                                    SUBMIT
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Requests;
