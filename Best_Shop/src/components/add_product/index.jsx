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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Cookies from "js-cookie";
import InputBox from "../InputBox/inputbox";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

function AddStocks({ text }) {
  const username = Cookies.get("username").toUpperCase();

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

  const [showCategories, setShowCategories] = useState(true);
  const [showItemNames, setShowItemNames] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showModels, setShowModels] = useState(false);

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sellingprice, setSellingPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [purchaseprice, setPurchasePrice] = useState(1);
  const [errors, setErrors] = useState([]);
  const [bill, setBill] = useState("");
  const navigate = useNavigate();
  // value
  const [categoryvalue, setCategoryValue] = useState("");
  const [categoryimage, setCategoryImage] = useState(null);
  const [itemvalue, setItemValue] = useState("");
  const [itemimage, setItemImage] = useState(null);
  const [subvalue, setSubValue] = useState("");
  const [subimage, setSubImage] = useState(null);
  const [brandvalue, setBrandValue] = useState("");
  const [brandimage, setBrandImage] = useState(null);
  const [modelvalue, setModelValue] = useState("");
  const [colorvalue, setColorValue] = useState("");
  const [sizevalue, setSizeValue] = useState("");

  // dialogs
  const [categoryopen, setCategoryOpen] = useState(false);
  const [itemopen, setItemOpen] = useState(false);
  const [subopen, setSubOpen] = useState(false);
  const [brandopen, setBrandOpen] = useState(false);
  const [modelopen, setModelOpen] = useState(false);
  const [coloropen, setColorOpen] = useState(false);
  const [sizeopen, setSizeOpen] = useState(false);
  // category dialog
  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  const handleCategoryImage = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryvalue);
    formData.append("image", categoryimage);

    try {
      const response = await fetch(`${apiHost}/api/structure/category`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        notifySuccess("Category Added Successfull");
        fetchCategories();
        setCategoryOpen(false);
      } else {
        // notifyError("Category Failed Added");
        setCategoryOpen(false);
      }
    } catch (error) {
      notifyError("Category Failed Added");
      setCategoryOpen(false);
    }
  };

  // item dialog
  const handleItemOpen = () => {
    setItemOpen(true);
  };
  const handleItemClose = () => {
    setItemOpen(false);
  };

  const handleItemImage = (event) => {
    setItemImage(event.target.files[0]);
  };
  const handleItemSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category", selectedCategory.id);
    formData.append("name", itemvalue);
    formData.append("image", itemimage);

    try {
      const response = await fetch(`${apiHost}/api/structure/item-name`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        fetchItemNames(selectedCategory.id);
        notifySuccess("Item-Name Added Successfull");
        setItemOpen(false);
      } else {
        setItemOpen(false);
      }
    } catch (error) {
      notifyError("Item-Name Failed to Add");
    }
    setItemOpen(false);
  };

  // sub dialog
  const handleSubOpen = () => {
    setSubOpen(true);
  };
  const handleSubClose = () => {
    setSubOpen(false);
  };

  const handleSubImage = (event) => {
    setSubImage(event.target.files[0]);
  };
  const handleSubSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("item_name", selectedItemName.id);
    formData.append("name", subvalue);
    formData.append("image", subimage);

    try {
      const response = await fetch(`${apiHost}/api/structure/sub-category`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        fetchSubCategories(selectedItemName.id);
        notifySuccess("Sub-Category Addded Successfull");
        setSubOpen(false);
      }
    } catch (error) {
      notifyError("Sub-Category Failed to Add");
    }
  };

  // brand dialog
  const handleBrandOpen = () => {
    setBrandOpen(true);
  };
  const handleBrandClose = () => {
    setBrandOpen(false);
  };

  const handleBrandImage = (event) => {
    setBrandImage(event.target.files[0]);
  };
  const handleBrandSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("sub_category", selectedSubCategory.id);
    formData.append("name", brandvalue);
    formData.append("image", brandimage);

    try {
      const response = await fetch(`${apiHost}/api/structure/brand`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        fetchBrands(selectedSubCategory.id);
        notifySuccess("Brand Added Successfull");
        setBrandOpen(false);
      }
    } catch (error) {
      notifyError("Brand Failed to Add");
    }
    setBrandOpen(false);
  };

  const handleModelOpen = () => {
    setModelOpen(true);
  };
  const handleModelClose = () => {
    setModelOpen(false);
  };

  const handleModelSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("brand", selectedBrand.id);
      formData.append("name", modelvalue);
      for (let [key, value] of formData.entries()) {
      }

      const response = await requestApi(
        "POST",
        "/api/structure/model",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.success) {
        fetchModels(selectedBrand.id);
        notifySuccess("Model Added Successfull");
      } else {
        setModelOpen(false);
        // notifyError("Model Failed to Add");
      }
    } catch (error) {
      notifyError("Model Failed to Add");
    }
    setModelOpen(false);
  };

  const handleColorOpen = () => {
    setColorOpen(true);
  };
  const handleColorClose = () => {
    setColorOpen(false);
  };

  const handleColorSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("model", selectedModel.value);
      formData.append("name", colorvalue);
      for (let [key, value] of formData.entries()) {
      }

      const response = await requestApi(
        "POST",
        "/api/structure/color",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.success) {
        fetchColors(selectedModel.value);
        notifySuccess("Color Added Successfull");
      } else {
        // notifyError("Color Failed to Add");
        setColorOpen(false);
      }
    } catch (error) {
      notifyError("Color Failed to Add");
    }
    setColorOpen(false); // Close the dialog after submission
  };

  const handleSizeOpen = () => {
    setSizeOpen(true);
  };
  const handleSizeClose = () => {
    setSizeOpen(false);
  };

  const handleSizeSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("color", selectedColor.value);
      formData.append("name", sizevalue);
      for (let [key, value] of formData.entries()) {
      }

      const response = await requestApi(
        "POST",
        "/api/structure/size",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.success) {
        fetchSizes(selectedColor.value);
        notifySuccess("Size Added Successfull");
        setSizeOpen(false);
      } else {
        // notifyError("Size Failed to Add");
      }
    } catch (error) {
      notifyError("Size Failed to Add");
    }
    setSizeOpen(false); // Close the dialog after submission
  };
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
    } catch (error) { }
    setIsLoading(false);
  };

  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setShowItemNames(true);
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
    setShowItemNames(false);
    setShowSubCategories(true);
  };

  const handleSelectSubCategory = async (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedBrand(null);
    fetchBrands(subCategory.id);
    setShowSubCategories(false);
    setShowBrands(true);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    fetchModels(brand.id);
    setShowBrands(false);
    setShowModels(true);
  };

  const handleSelectedModel = (model) => {
    setSelectedModel(model);
    setSelectedColor(null);
    fetchColors(model.value);
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
  // reset size
  const resetSizeQuantities = () => {
    const initialQuantity = {};
    sizes.forEach((size) => {
      initialQuantity[size.id] = "";
    });
    setSizeQuantities(initialQuantity);
  };
  // refresh data.
  const handleRefresh = () => {
    setSellingPrice("");
    setMrp("");
    setBill("");
    resetSizeQuantities();
    setSelectedModel(null);
    setSelectedColor(null);
  };

  const handleGenerate = async () => {
    const sizeIds = Object.keys(sizeQuantities).map((sizeId) =>
      parseInt(sizeId)
    );
    const quantities = Object.values(sizeQuantities).map((quantity) =>
      parseInt(quantity)
    );

    const data = {
      // user: username,
      bill_number: parseInt(bill),
      category: selectedCategory.id,
      item_name: selectedItemName.id,
      sub_category: selectedSubCategory.id,
      brand: selectedBrand.id,
      model: selectedModel.value,
      color: selectedColor.value,
      selling_price: parseInt(sellingprice),
      purchasing_price: parseInt(purchaseprice),
      mrp: parseInt(mrp),
      size: sizeIds,
      quantity: quantities,

      name: [
        selectedCategory.name,
        selectedItemName.name,
        selectedSubCategory.name,
        selectedBrand.name,
      ].join("-"),
    };

    try {
      const response = await requestApi("POST", "/api/stock/stock", data, {});
      if (response.success) {
        notifySuccess("Stock Added Successfull");
      } else {
        notifyError("Stock Failed to Add");
      }
    } catch (error) {
      notifyError("Stock Failed to Add");
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchItemNames = async (categoryId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/item-name?category=${categoryId}`,
        {}
      );
      if (response.success) {
        setItemNames(response.data);
      }
    } catch (error) { }
  };

  const fetchSubCategories = async (itemNameId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/sub-category?item_name=${itemNameId}`,
        {}
      );
      if (response.success) {
        setSubCategories(response.data);
      }
    } catch (error) { }
  };

  const fetchBrands = async (subCategoryId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/brand?sub_category=${subCategoryId}`,
        {}
      );
      if (response.success) {
        setBrands(response.data);
      }
    } catch (error) { }
  };

  const fetchModels = async (brandId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/model?brand=${brandId}`,
        {}
      );
      if (response.success) {
        setModels(response.data);
      }
    } catch (error) { }
  };

  const fetchColors = async (modelId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/color?model=${modelId}`,
        {}
      );
      if (response.success) {
        setColors(response.data);
      }
    } catch (error) { }
  };

  const fetchSizes = async (colorId) => {
    try {
      const response = await requestApi(
        "GET",
        `/api/structure/size?color=${colorId}`,
        {}
      );
      if (response.success) {
        setSizes(response.data);
        const initialQuantity = {};
        response.data.forEach((size) => {
          initialQuantity[size.id] = "";
        });
        setSizeQuantities(initialQuantity);
      }
    } catch (error) { }
  };

  const sizeInputs = () => {
    return sizes.map((size) => (
      <div className="sizeandquantity" key={size.id}>
        <label>{size.name} :</label>
        <input
          className="input_box-1"
          type="number"
          value={sizeQuantities[size.id]}
          onChange={(e) => handleSizeQuantity(size.id, e.target.value)}
          size="small"
        />
      </div>
    ));
  };

  const handleBack = () => {
    if (showBrands) {
      setShowBrands(false);
      setShowSubCategories(true);
    } else if (showSubCategories) {
      setShowSubCategories(false);
      setShowItemNames(true);
    } else if (showItemNames) {
      setShowItemNames(false);
      setShowCategories(true);
    }
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
              {selectedCategory ? null : <h2 className="item-list-head">No Items Selected</h2>}
              <div className="selected-info">
                {selectedCategory &&
                  (selectedCategory.image_path !== "" ? (
                    <img
                    
                      src={`${apiHost}/` + selectedCategory.image_path}
                      alt={selectedCategory.name}
                    />
                  ) : (
                    <p className="image-alt-text">{selectedCategory.name}</p>
                  ))}
                {selectedItemName &&
                  (selectedItemName.image_path !== "" ? (
                    <img
                      src={`${apiHost}/` + selectedItemName.image_path}
                      alt={selectedItemName.name}
                    />
                  ) : (
                    <p className="image-alt-text">{selectedItemName.name}</p>
                  ))}
                {selectedSubCategory &&
                  (selectedSubCategory.image_path !== "" ? (
                    <img
                      src={`${apiHost}/` + selectedSubCategory.image_path}
                      alt={selectedSubCategory.name}
                    />
                  ) : (
                    <p className="image-alt-text">{selectedSubCategory.name}</p>
                  ))}
                {selectedBrand &&
                  (selectedBrand.image_path !== "" ? (
                    <img
                      src={`${apiHost}/` + selectedBrand.image_path}
                      alt={selectedBrand.name}
                    />
                  ) : (
                    <p className="image-alt-text">{selectedBrand.name}</p>
                  ))}
              </div>
            </div>

            <div className="search-and-product-type-grid">
              <div className="search-container">
                <InputBox
                  // className="input_box"
                  label={
                    <div style={{ display: "flex", alignItems: "center", color:"var(--text)" }}>
                      <SearchSharpIcon sx={{ marginRight: 1, color: "var(--text)" }} />
                      Search
                    </div>
                  }
                  size="small"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  sx={{ width: "100%" }}
                // helperText="(Categories,Item name,Sub-Categories and Brand)"
                />
              </div>

              {isLoading && <div className="loader"></div>}
              {!isLoading && (
                <div className="card-container">
                  {/* Categories */}
                  {selectedCategory === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <h2>Select a Category</h2>
                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleCategoryOpen}
                        />
                      </div>
                      <div className="card">
                        <div className="flex-container">
                          {filterData(categories).map((category) => (
                            <div
                              key={category.id}
                              className="item-card"
                              onClick={() => handleSelectCategory(category)}
                            >
                              <div className="category-info">
                                {category.name}
                                {category.image_path && (
                                  <img
                                    src={`${apiHost}/` + category.image_path}
                                    alt={category.name}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Item Names */}
                  {selectedCategory && selectedItemName === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedCategory(null); // Reset to categories
                            setSelectedItemName(null); // Reset item name selection
                          }}
                        />
                        <h2>
                          <center>Item Name</center>
                        </h2>
                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleItemOpen}
                        />
                      </div>
                      <div className="card">
                        {filterData(itemNames).map((itemName) => (
                          <div
                            key={itemName.id}
                            onClick={() => handleSelectItemName(itemName)}
                            className="item-card"
                          >
                            {itemName.name}
                            {itemName.image_path && (
                              <img
                                src={`${apiHost}/` + itemName.image_path}
                                alt={itemName.name}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub Categories */}
                  {selectedItemName && selectedSubCategory === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedItemName(null); // Reset to item names
                            setSelectedSubCategory(null); // Reset sub-category selection
                          }}
                        />

                        <h2>
                          <center>Select a Sub-Category</center>
                        </h2>
                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleSubOpen}
                        />
                      </div>
                      <div className="card">
                        {filterData(subCategories).map((subCategory) => (
                          <div
                            key={subCategory.id}
                            onClick={() => handleSelectSubCategory(subCategory)}
                            className="item-card"
                          >
                            {subCategory.name}
                            {subCategory.image_path && (
                              <img
                                src={`${apiHost}/` + subCategory.image_path}
                                alt={subCategory.name}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  {selectedSubCategory && selectedBrand === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedSubCategory(null); // Reset to sub-categories
                            setSelectedBrand(null); // Reset brand selection
                          }}
                        />

                        <h2>
                          <center>Select a Brand</center>
                        </h2>
                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleBrandOpen}
                        />
                      </div>
                      <div className="card">
                        {filterData(brands).map((brand) => (
                          <div
                            key={brand.id}
                            onClick={() => handleSelectBrand(brand)}
                            className="brand-card"
                          >
                            {brand.name}
                            {brand.image_path && (
                              <img
                                src={`${apiHost}/` + brand.image_path}
                                alt={brand.name}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedBrand && (
                    // Last page for size and price
                    <div className="last">
                      <ArrowBackIcon
                        sx={{ cursor: "pointer", margin: 1 }}
                        onClick={() => {
                          setSelectedBrand(null);
                          setSelectedModel(null);
                          setSelectedColor(null);
                          setSellingPrice("");
                          setMrp("");
                          setBill("");
                          resetSizeQuantities();
                        }}
                      />
                      <div className="part_for_size">
                        <div className="count-size-quantity-box">
                          <div className="count-div">
                            <div className="count_lable">
                              <div className="name-and-icons">
                                <b>Select a Model</b>
                                <AddBoxRoundedIcon
                                  sx={{ fontSize: 30, color: "var(--button)" }}
                                  onClick={handleModelOpen}
                                />
                              </div>
                              <Select
                                options={modelOptions}
                                onChange={(selectedOption) => {
                                  setSelectedModel(selectedOption);
                                  handleSelectedModel(selectedOption);
                                }}
                                value={selectedModel}
                                placeholder="Select Model"
                                theme={(theme) => ({
                                  ...theme,
                                  borderRadius: 2,
                                  colors: {
                                    ...theme.colors,
                                    //after select dropdown option
                                    primary50: "var(--text)",
                                    //Border and Background dropdown color
                                    primary: "var(--button)",
                                    //Background hover dropdown color
                                    primary25: "var(--button-hover)",
                                    //Background color
                                    neutral0: "var(--background)",
                                    //Border before select
                                    neutral20: "#178a84",
                                    //Hover border
                                    neutral30: "#82FFE7",
                                    //No options color
                                    neutral40: "#CAFFCA",
                                    //Select color
                                    neutral50: "#F4FFFD",
                                    //arrow icon when click select
                                    neutral60: "#fff",
                                    //Text color
                                    neutral80: "var(--text)",
                                  },
                                })}
                              />
                            </div>

                            <div className="count_lable">
                              <div className="name-and-icons">
                                <b>Select a Color</b>
                                <AddBoxRoundedIcon
                                  sx={{ fontSize: 30, color: "var(--button)" }}
                                  onClick={handleColorOpen}
                                />
                              </div>
                              <Select
                                options={colorOptions}
                                onChange={(selectedColorOp) => {
                                  setSelectedColor(selectedColorOp);
                                  handleSelectedColor(selectedColorOp);
                                }}
                                value={selectedColor}
                                placeholder="Select Color"
                                theme={(theme) => ({
                                  ...theme,
                                  borderRadius: 2,
                                  colors: {
                                    ...theme.colors,
                                    //after select dropdown option
                                    primary50: "var(--text)",
                                    //Border and Background dropdown color
                                    primary: "var(--button)",
                                    //Background hover dropdown color
                                    primary25: "var(--button-hover)",
                                    //Background color
                                    neutral0: "var(--background)",
                                    //Border before select
                                    neutral20: "#178a84",
                                    //Hover border
                                    neutral30: "#82FFE7",
                                    //No options color
                                    neutral40: "#CAFFCA",
                                    //Select color
                                    neutral50: "#F4FFFD",
                                    //arrow icon when click select
                                    neutral60: "#fff",
                                    //Text color
                                    neutral80: "var(--text)",
                                  },
                                })}
                              />
                            </div>
                          </div>

                          <div className="size-and-quantity">
                            <div className="name-and-icons">
                              <b>Size and Quantity</b>
                              <AddBoxRoundedIcon
                                sx={{ fontSize: 30, color: "var(--button)" }}
                                onClick={handleSizeOpen}
                              />{" "}
                            </div>

                            {sizeInputs()}
                          </div>
                        </div>
                      </div>

                      <div className="part_for_price">
                        <div className="price-boxes">
                          <div className="centering">
                            <div className="input-container">
                              {/* <label htmlFor="selling_price">Bill:</label> */}
                              <InputBox
                                label="S.No"
                                className="input_box"
                                type="number"
                                id="bill"
                                value={bill}
                                size="small"
                                sx={{ width: "100%" }}
                                onChange={(e) => setBill(e.target.value)}
                              />
                            </div>
                            <div className="input-container">
                              <InputBox
                                label="Selling Price"
                                className="input_box"
                                type="number"
                                id="sellingprice"
                                size="small"
                                value={sellingprice}
                                sx={{ width: "100%" }}
                                onChange={handleSellingPriceChange}
                                required
                              />
                            </div>
                            <div className="input-container">
                              {/* <label htmlFor="mrp">MRP:</label> */}
                              <InputBox
                                // placeholder="Enter MRP"
                                label="MRP"
                                className="input_box"
                                type="number"
                                id="mrp"
                                value={mrp}
                                required
                                sx={{ width: "100%" }}
                                onChange={handleMrpPriceChange}
                                size="small"
                              />
                            </div>
                            <div className="input-container">
                              {/* <label htmlFor="price">Purchasing Price:</label> */}
                              <InputBox
                                // placeholder="Enter Purchasing Price"
                                label="Purchase Price "
                                className="input_box"
                                type="number"
                                id="purchaseprice"
                                size="small"
                                value={purchaseprice}
                                sx={{ width: "100%" }}
                                onChange={(e) =>
                                  handleNumberChange(e, setPurchasePrice)
                                }
                              />
                            </div>
                            <div className="buttons-in-line">
                              <button
                                className="generate_button"
                                onClick={() => {
                                  handleGenerate();
                                  handleNavigate("/productdashboard");
                                }}
                              >
                                Generate +
                              </button>
                              <button
                                className="generate_button"
                                onClick={() => {
                                  handleGenerate();
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
      {/* category dialog */}
      <div>
        <Dialog
          fullWidth
          open={categoryopen}
          onClose={handleCategoryClose}
          PaperProps={{
            style: {
              padding: "20px",
            },
          }}
        >
          <form className="form-dialog" onSubmit={handleCategorySubmit}>
            <div className="dialog-content">
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Category</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 10,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Category"
                  id="categoryvalue"
                  name="category_name"
                  value={categoryvalue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleCategoryImage}
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCategoryImage}
                />
                <br />

                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleCategoryClose}
                  >
                    CANCEL
                  </button>
                  <button className="add-button-dialog" type="submit">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      {/* item-name dialog */}
      <div>
        <Dialog
          fullWidth
          open={itemopen}
          onClose={handleItemClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleItemSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Item</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Item"
                  id="itemvalue"
                  name="item_name"
                  value={itemvalue}
                  onChange={(e) => setItemValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleItemImage}
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  capture="environment"
                  onChange={handleItemImage}
                />
                <br />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleItemClose}
                  >
                    CANCEL
                  </button>
                  <button className="add-button-dialog" type="submit">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      {/* sub-category dialog */}
      <div>
        <Dialog
          fullWidth
          open={subopen}
          onClose={handleSubClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleSubSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Sub-Category</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Sub-Category"
                  id="subvalue"
                  name="item_name"
                  value={subvalue}
                  onChange={(e) => setSubValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleSubImage}
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  capture="environment"
                  onChange={handleSubImage}
                />
                <br />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleSubClose}
                  >
                    CANCEL
                  </button>
                  <button className="add-button-dialog" type="submit">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      {/* brand dialog */}
      <div>
        <Dialog
          fullWidth
          open={brandopen}
          onClose={handleBrandClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleBrandSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Brand</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Brand"
                  id="brandvalue"
                  name="item_name"
                  value={brandvalue}
                  onChange={(e) => setBrandValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleBrandImage}
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  capture="environment"
                  onChange={handleBrandImage}
                />
                <br />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleBrandClose}
                  >
                    CANCEL
                  </button>
                  <button className="add-button-dialog" type="submit">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      <div>
        {/* model dialog */}
        <Dialog
          fullWidth
          open={modelopen}
          onClose={handleModelClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleModelSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Model</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Model"
                  id="modelvalue"
                  name="model_name"
                  value={modelvalue}
                  onChange={(e) => setModelValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleModelClose}
                  >
                    CANCEL
                  </button>
                  <button className="add-button-dialog" type="submit">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      <div>
        {/* color dialog */}
        <Dialog
          fullWidth
          open={coloropen}
          onClose={handleColorClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleColorSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Color</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Color"
                  id="colorvalue"
                  name="color_name"
                  value={colorvalue}
                  onChange={(e) => setColorValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleColorClose}
                  >
                    CANCEL
                  </button>
                  <button type="submit" className="add-button-dialog">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
      {/* size dialog */}
      <div>
        <Dialog
          fullWidth
          open={sizeopen}
          onClose={handleColorClose}
          PaperProps={{
            style: {
              padding: "10px",
            },
          }}
        >
          <form onSubmit={handleSizeSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Size</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <br />
                <InputBox
                  type="text"
                  label="Add Size"
                  id="sizevalue"
                  name="size_name"
                  value={sizevalue}
                  onChange={(e) => setSizeValue(e.target.value)}
                  required
                  sx={{ width: "100%" }}
                  size="small"
                />
                <div className="float-right">
                  <button
                    className="add-button-dialog"
                    onClick={handleSizeClose}
                  >
                    CANCEL
                  </button>
                  <button type="submit" className="add-button-dialog">
                    ADD
                  </button>
                </div>
              </DialogContent>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default AddStocks;