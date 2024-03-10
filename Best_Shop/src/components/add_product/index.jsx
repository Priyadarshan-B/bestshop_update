import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
import apiHost from "../../utils/api";
import Select from "react-select";
import "./add_product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function AddStocks({ text }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [itemNames, setItemNames] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [purchaseprice, setPurchasePrice] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // navigate
  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await requestApi("GET", "/api/structure/category", {});
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setIsLoading(false);
  };

  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    setSelectedItemName(null);
    setSelectedSubCategory(null);
    setSelectedBrand(null);
    fetchItemNames(category.id);
  };

  const handleSelectItemName = async (itemName) => {
    setSelectedItemName(itemName);
    setSelectedSubCategory(null);
    setSelectedBrand(null);
    fetchSubCategories(itemName.id);
  };

  const handleSelectSubCategory = async (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedBrand(null);
    fetchBrands(subCategory.id);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null); // Reset selected model when brand changes
    fetchModels(brand.id);
  };

  const handleSelectedModel = (model) => {
    setSelectedModel(model);
    setSelectedColor(null); // Reset selected color when model changes
    fetchColors(model.value); // Fetch colors for the selected model
  };

  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    fetchSizes(color.value);
  };

  // model data
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  // color data
  const colorOptions = colors.map((color) => ({
    value: color.id,
    label: color.name,
  }));

  // size and quantity
  const handleSizeQuantity = (sizeId, value) => {
    setSizeQuantities((prevQuantity) => ({
      ...prevQuantity,
      [sizeId]: value,
    }));
  };

  const filterData = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const handleNumberChange = (e, setValue) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  // selling and purchasing price
  const handleSellingPriceChange = (e) => {
    const value = e.target.value;
    setSellingPrice(value);
    // Automatically update Purchasing Price based on Selling Price
    setMrp(value);
  };

  const handleMrpPriceChange = (e) => {
    const value = e.target.value;
    setMrp(value);
  };

  // size and quantity
  const [inputs, setInputs] = useState([]);

  const handleAddField = () => {
    setInputs([...inputs, { size: "", quantity: "" }]);
  };

  const handleRemoveField = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputValueChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };
  // refresh data.
  const handleRefresh = () => {
    setSellingPrice("");
    setMrp("");
    setInputs([]);
    setModels([]);
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchItemNames = async (categoryId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/item-name?category=${categoryId}`
      );
      if (response.success) {
        setItemNames(response.data);
      }
    } catch (error) {
      console.error("Error fetching item names:", error);
    }
  };

  const fetchSubCategories = async (itemNameId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/sub-category?item_name=${itemNameId}`
      );
      if (response.success) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    }
  };

  const fetchBrands = async (subCategoryId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/brand?sub_category=${subCategoryId}`
      );
      if (response.success) {
        setBrands(response.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchModels = async (brandId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/model?brand=${brandId}`
      );
      if (response.success) {
        setModels(response.data);
      }
    } catch (error) {
      console.error("Error fetching model:", error);
    }
  };

  const fetchColors = async (modelId) => {
    // Changed to modelId
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/color?model=${modelId}` // Updated to use modelId
      );
      if (response.success) {
        setColors(response.data);
      }
    } catch (error) {
      console.error("Error fetching Colors");
    }
  };

  const fetchSizes = async (colorId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/size?color=${colorId}`
      );
      if (response.success) {
        setSizes(response.data);
        const initialQuantity = {};
        response.data.forEach((size) => {
          initialQuantity[size.id] = "";
        });
        setSizeQuantities(initialQuantity);
      }
    } catch (error) {
      console.error("Error fetching size:", error);
    }
  };

  const sizeInputs = () => {
    return sizes.map((size) => (
      <div className="sizeandquantity" key={size.id}>
        <label>{size.name}</label>
        <input
          className="input_box-1"
          type="text"
          value={sizeQuantities[size.id]}
          onChange={(e) => handleSizeQuantity(size.id, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div className="category-page">
            <div className="select-category-card">
              <h2>Select a Category</h2>
              <div className="selected-info">
                {selectedBrand && (
                  <>
                    <img
                      src={apiHost + selectedBrand.image_path}
                      alt={selectedBrand.name}
                    />
                    <p>{selectedBrand.name}</p>
                  </>
                )}
                {selectedSubCategory && (
                  <>
                    <img
                      src={apiHost + selectedSubCategory.image_path}
                      alt={selectedSubCategory.name}
                    />
                    <p>{selectedSubCategory.name}</p>
                  </>
                )}
                {selectedItemName && (
                  <>
                    <img
                      src={apiHost + selectedItemName.image_path}
                      alt={selectedItemName.name}
                    />
                    <p>{selectedItemName.name}</p>
                  </>
                )}
                {selectedCategory && (
                  <>
                    <img
                      src={apiHost + selectedCategory.image_path}
                      alt={selectedCategory.name}
                    />
                    <p>{selectedCategory.name}</p>
                  </>
                )}
              </div>
            </div>

            <div className="search-and-product-type-grid">
              <div className="search-container">
                <input
                  className="input_box"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              {isLoading && <p>Loading categories...</p>}
              {!isLoading && (
                <div className="card-container">
                  {/* Categories */}
                  {selectedCategory === null && (
                    <div className="card">
                      <h2>Select a Category</h2>
                      {filterData(categories).map((category) => (
                        <div
                          key={category.id}
                          className="item-card"
                          onClick={() => handleSelectCategory(category)}
                        >
                          {category.name}
                          {category.image_path && (
                            <img
                              src={category.image_path}
                              alt={category.name}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Item Names */}
                  {selectedCategory && selectedItemName === null && (
                    <div className="card">
                      <h2>Select an Item Name</h2>
                      {filterData(itemNames).map((itemName) => (
                        <div
                          key={itemName.id}
                          onClick={() => handleSelectItemName(itemName)}
                          className="item-card"
                        >
                          {itemName.name}
                          {itemName.image_path && (
                            <img
                              src={itemName.image_path}
                              alt={itemName.name}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sub Categories */}
                  {selectedItemName && selectedSubCategory === null && (
                    <div className="card">
                      <h2>Select a Sub-Category</h2>
                      {filterData(subCategories).map((subCategory) => (
                        <div
                          key={subCategory.id}
                          onClick={() => handleSelectSubCategory(subCategory)}
                          className="sub-category-card"
                        >
                          {subCategory.name}
                          <img src={subCategory.image_path} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Brands */}
                  {selectedSubCategory && selectedBrand === null && (
                    <div className="card">
                      <h2>Select a Brand</h2>
                      {filterData(brands).map((brand) => (
                        <div
                          key={brand.id}
                          onClick={() => handleSelectBrand(brand)}
                          className="brand-card"
                        >
                          {brand.name}
                          {brand.image_path && (
                            <img src={brand.image_path} alt={brand.name} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedBrand && (
                    // Last page for size and price
                    <div className="last">
                      <div className="part_for_size">
                        <div className="count-size-quantity-box">
                          <div className="count-div">
                            <div className="count_lable">
                              <b>Select a Model</b>
                              <Select
                                options={modelOptions}
                                onChange={
                                  (selectedOption) => {
                                    setSelectedModel(selectedOption);
                                    handleSelectedModel(selectedOption);
                                  } // Corrected here
                                }
                                value={selectedModel}
                              />
                            </div>

                            <div className="count_lable">
                              <b>Select a Color</b>
                              <Select
                                options={colorOptions}
                                onChange={(selectedColorOp) => {
                                  setSelectedColor(selectedColorOp);
                                  handleSelectedColor(selectedColorOp);
                                }}
                                value={selectedColor}
                              />
                            </div>
                          </div>

                          <div className="size-and-quantity">
                            <div>
                              <b>Size and Quantity</b>
                            </div>

                            {sizeInputs()}
                          </div>
                        </div>
                      </div>

                      <div className="part_for_price">
                        <div className="price-boxes">
                          <div className="centering">
                            <div className="input-container">
                              <label htmlFor="selling_price">
                                Selling Price:
                              </label>
                              <input
                                placeholder="Enter Selling Price"
                                className="input_box"
                                type="text"
                                id="sellingprice"
                                value={sellingprice}
                                onChange={handleSellingPriceChange}
                                required
                              />
                            </div>
                            <div className="input-container">
                              <label htmlFor="mrp">MRP:</label>
                              <input
                                placeholder="Enter MRP"
                                className="input_box"
                                type="text"
                                id="mrp"
                                value={mrp}
                                required
                                onChange={handleMrpPriceChange}
                              />
                            </div>
                            <div className="input-container">
                              <label htmlFor="price">Purchasing Price:</label>
                              <input
                                placeholder="Enter Purchasing Price"
                                className="input_box"
                                type="text"
                                id="purchaseprice"
                                value={purchaseprice}
                                required
                                onChange={(e) =>
                                  handleNumberChange(e, setPurchasePrice)
                                }
                              />
                            </div>
                            <div className="buttons-in-line">
                              <button
                                className="generate_button"
                                onClick={() => {
                                  // handleGenerate();
                                  handleNavigate("/productdashboard");
                                }}
                              >
                                Generate +
                              </button>
                              <button
                                className="generate_button"
                                onClick={() => {
                                  // handleGenerate();
                                  handleRefresh();
                                }}
                              >
                                Add other
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStocks;
