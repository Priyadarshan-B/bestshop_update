import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
import apiHost from "../../utils/api";
import "./add_product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBox from "../InputBox/inputbox";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AddStocks({ text }) {

  const [editedName, setEditedName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectEditCategory, setSelectEditCategory] = useState(null);

  const [editedItemName, setEditedItemName] = useState("");
  const [editModalItemOpen, setEditModalItemOpen] = useState(false);
  const [itemNames, setItemNames] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedEditItem, setSelectedEditItem] = useState(null);

  const [editSubName, setEditedSubName] = useState("");
  const [editModalSubOpen, setEditModalSubOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedEditSub, setSelectedEditSub] = useState(null);

  const [editBrandName, setEditedBrandName] = useState("");
  const [editModalBrandOpen, setEditModalBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedEditBrand, setSelectedEditBrand] = useState(null);

  const [editModelName, setEditedModelName] = useState("");
  const [editModalModelOpen, setEditModalModelOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedEditModel, setSelectedEditModel] = useState(null);

  const [editColorName, setEditedColorName] = useState("");
  const [editModalColorOpen, setEditModalColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [selectedEditColor, setSelectedEditColor] = useState(null);

  const [editSizeName, setEditedSizeName] = useState("");
  const [sizes, setSizes] = useState([]);
  const [editModalSizeOpen, setEditModalSizeOpen] = useState(false);
  const [selectedEditSize, setSelectedEditSize] = useState(null);

  const [sizeQuantities, setSizeQuantities] = useState({});

  const [showCategories, setShowCategories] = useState(true);
  const [showItemNames, setShowItemNames] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showColors, setShowColors] = useState(false);

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
  // const [errors, setErrors] = useState([]);
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
        notifySuccess("Category Added Successfull");
        fetchCategories();
        setCategoryOpen(false);
      } else {
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
      formData.append("model", selectedModel.id);
      formData.append("name", colorvalue);
  

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
        fetchColors(selectedModel.id);
        notifySuccess("Color Added Successfull");
      } else {
        setColorOpen(false);
      }
    } catch (error) {
      notifyError("Color Failed to Add");
    }
    setColorOpen(false); 
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
      formData.append("color", selectedColor.id);
      formData.append("name", sizevalue);
    

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
        fetchSizes(selectedColor.id);
        notifySuccess("Size Added Successfull");
        setSizeOpen(false);
      } else {
      }
    } catch (error) {
      notifyError("Size Failed to Add");
    }
    setSizeOpen(false); 
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
    } catch (error) {}
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

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setSelectedColor(null);
    fetchColors(model.id);
    setShowModels(false);
    setShowColors(true);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    fetchSizes(color.id);
  };


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
    // setSelectedModel(null);
    // setSelectedColor(null);
  };

  const handleGenerate = async () => {
    const sizeIds = Object.keys(sizeQuantities).map((sizeId) =>
      parseInt(sizeId)
    );
    const quantities = Object.values(sizeQuantities).map((quantity) =>
      parseInt(quantity)
    );

    const data = {
      bill_number: parseInt(bill),
      category: selectedCategory.id,
      item_name: selectedItemName.id,
      sub_category: selectedSubCategory.id,
      brand: selectedBrand.id,
      model: selectedModel.id,
      color: selectedColor.id,
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
    console.log(data);

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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
          // size="small"
        />
        <div className="">
          <EditIcon
            style={{
              color: "var(--button)",
              cursor: "pointer",
            }}
            onClick={() => handleSizeEdit(size.id, size.name)}
          />
        </div>
        <div className="">
          <DeleteIcon
            style={{
              color: "var(--button)",
              cursor: "pointer",
            }}
            onClick={() => handleSizeDelete(size.id, size.name)}
          />
        </div>
        <Modal
          open={editModalSizeOpen}
          onClose={handleEditModalSizeClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              position: "absolute",
              width: "60%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--background-1)",
              boxShadow: 24,
              padding: "30px 60px",
              display: "flex",
              flexDirection: "column",
              color: "var(--text)",
              gap: "10px",
            }}
          >
            <h2>Edit Size</h2>
            <InputBox
              label="Category Name"
              value={editSizeName}
              size="small"
              sx={{ width: "100%" }}
              onChange={handleNameSizeChange}
            />
            <button
              className="button-in-dialog"
              variant="contained"
              onClick={handleUpdateSizeCategory}
            >
              SUBMIT
            </button>
          </div>
        </Modal>
      </div>
    ));
  };


  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectEditCategory(null);
    setEditedName("");
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  // edit and delete category
  const handleEdit = (id, name) => {
    setSelectEditCategory({ id, name });
    setEditedName(name);
    setEditModalOpen(true);
    console.log(id);
  };
  const handleUpdateCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/category`, {
        id: selectEditCategory.id,
        name: editedName,
      });
      console.log(response.data.message);
      const updatedCategory = { ...selectEditCategory, name: editedName };
      console.log(editedName);
      setCategories(
        categories.map((cat) =>
          cat.id === selectEditCategory.id ? updatedCategory : cat
        )
      );
      notifySuccess(`Category updated successfully`);
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating category:", error);
      notifyError("Error updating category");
    }
  };
  const handleDelete = async (id, name) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete category "${name}"?`
      );

      if (confirmDelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/category?id=${id}`
        );
        console.log(response.data.message);
        setCategories(categories.filter((cat) => cat.id !== id));

        console.log(id);
        notifySuccess(`Category "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notifyError("Error deleting category");
    }
  };

  // item edit and delete

  const handleItemNameChange = (event) => {
    setEditedItemName(event.target.value);
  };
  const handleItemEdit = (id, name) => {
    setSelectedEditItem({ id, name });
    setEditedItemName(name);
    setEditModalItemOpen(true);
  };

  const handleEditItemModalClose = () => {
    setEditModalItemOpen(false);
    setSelectedEditItem(null);
    setEditedItemName("");
  };

  const handleUpdateItem = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/item-name`, {
        id: selectedEditItem.id,
        name: editedItemName,
      });
      console.log(response.data.message);
      const updatedItem = { ...selectedEditItem, name: editedItemName };
      setItemNames(
        itemNames.map((cat) =>
          cat.id === selectedEditItem.id ? updatedItem : cat
        )
      );
      notifySuccess(`Item updated successfully`);
      handleEditItemModalClose();
    } catch (error) {
      console.error("Error updating Item:", error);
      notifyError("Error updating Item");
    }
  };

  const handleDeleteItem = async (id, name) => {
    try {
      const confrimdelete = window.confirm(
        `Are you sure you want to delete ItemName "${name}"?`
      );
      if (confrimdelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/item-name?id=${id}`
        );
        console.log(response.data.message);
        setItemNames(itemNames.filter((cat) => cat.id !== id));
        notifySuccess(`Item "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      notifyError("Error deleting category");
    }
  };

  // edit and delete sub
  const handleSubNameChange = (event) => {
    setEditedSubName(event.target.value);
  };

  const handleSubEdit = (id, name) => {
    setSelectedEditSub({ id, name });
    setEditedSubName(name);
    setEditModalSubOpen(true);
  };

  const handleEditModalSubClose = () => {
    setEditModalSubOpen(false);
    setSelectedEditSub(null);
    setEditedSubName("");
  };

  const handleUpdateSubCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/sub-category`, {
        id: selectedEditSub.id,
        name: editSubName,
      });
      console.log(response.data.message);
      const updatedSub = { ...selectedEditSub, name: editSubName };
      setSubCategories(
        subCategories.map((cat) =>
          cat.id === selectedEditSub.id ? updatedSub : cat
        )
      );
      notifySuccess(`Sub Category updated successfully`);
      handleEditModalSubClose();
    } catch (error) {
      console.error("Error updating Sub category:", error);
      notifyError("Error updating Sub category");
    }
  };

  const handleSubDelete = async (id, name) => {
    try {
      const confrimdelete = window.confirm(
        `Are you sure you want to delete sub-category "${name}"?`
      );
      if (confrimdelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/sub-category?id=${id}`
        );
        console.log(response.data.message);
        setSubCategories(subCategories.filter((cat) => cat.id !== id));
        notifySuccess(`Sub Category "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting Subcategory:", error);
      notifyError("Error deleting Sub category");
    }
  };

  // edit and delete brand
  const handleBrandEdit = (id, name) => {
    setSelectedEditBrand({ id, name });
    setEditedBrandName(name);
    setEditModalBrandOpen(true);
  };

  const handleEditModalBrandClose = () => {
    setEditModalBrandOpen(false);
    setSelectedEditBrand(null);
    setEditedBrandName("");
  };

  const handleBrandNameChange = (event) => {
    setEditedBrandName(event.target.value);
  };

  const handleUpdateBrandCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/brand`, {
        id: selectedEditBrand.id,
        name: editBrandName,
      });
      console.log(response.data.message);
      const updateBrand = { ...selectedEditBrand, name: editBrandName };
      setBrands(
        brands.map((mod) =>
          mod.id === selectedEditBrand.id ? updateBrand : mod
        )
      );
      notifySuccess(`Brand updated successfully`);
      handleEditModalBrandClose();
    } catch (error) {
      console.error("Error updating Brand:", error);
      notifyError("Error updating Brand");
    }
  };

  const handleBrandDelete = async (id, name) => {
    try {
      const confrimdelete = window.confirm(
        `Are you sure you wnat to delete brand "${name}"?`
      );
      if (confrimdelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/brand?id=${id}`
        );
        console.log(response.data.message);
        setBrands(brands.filter((mod) => mod.id !== id));
        notifySuccess(`Brand "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting Brand:", error);
      notifyError("Error deleting Brand");
    }
  };

  // edit and delete model
  const handleModelEdit = (id, name) => {
    setSelectedEditModel({ id, name });
    setEditedModelName(name);
    setEditModalModelOpen(true);
  };

  const handleEditModalModelClose = () => {
    setEditModalModelOpen(false);
    setSelectedEditModel(null);
    setEditedModelName("");
  };

  const handleNameModelChange = (event) => {
    setEditedModelName(event.target.value);
  };

  const handleUpdateModelCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/model`, {
        id: selectedEditModel.id,
        name: editModelName,
      });
      console.log(response.data.message);
      const updatedModal = { ...selectedEditModel, name: editModelName };
      setModels(
        models.map((mod) =>
          mod.id === selectedEditModel.id ? updatedModal : mod
        )
      );
      notifySuccess(`Model updated successfully`);
      handleEditModalModelClose();
    } catch (error) {
      console.error("Error updating Model:", error);
      notifyError("Error updating Model");
    }
  };

  const handleModelDelete = async (id, name) => {
    try {
      const confrimdelete = window.confirm(
        `Are you sure you want to delete "${name}?"`
      );
      if (confrimdelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/model?id=${id}`
        );
        console.log(response.data.message);
        setModels(models.filter((mod) => mod.id !== id));
        notifySuccess(`Model "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting Model:", error);
      notifyError("Error deleting Model");
    }
  };

  // edit and delete color
  const handleColorEdit = (id, name) => {
    setSelectedEditColor({ id, name });
    setEditedColorName(name);
    setEditModalColorOpen(true);
  };

  const handleEditModalColorClose = () => {
    setEditModalColorOpen(false);
    setSelectedEditColor(null);
    setEditedColorName("");
  };

  const handleNameColorChange = (event) => {
    setEditedColorName(event.target.value);
  };
  const handleUpdateColorCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/color`, {
        id: selectedEditColor.id,
        name: editColorName,
      });
      console.log(response.data.message);
      const updatedColor = { ...selectedEditColor, name: editColorName };
      setColors(
        colors.map((col) =>
          col.id === selectedEditColor.id ? updatedColor : col
        )
      );
      notifySuccess(`Color updated successfully`);
      handleEditModalColorClose();
    } catch (error) {
      console.error("Error updating Color:", error);
      notifyError("Error updating Color");
    }
  };

  const handleColorDelete = async (id, name) => {
    try {
      const confrimdelete = window.confirm(
        `Are you sure you wnat to delete color "${name}"?`
      );
      if (confrimdelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/color?id=${id}`
        );
        console.log(response.data.message);
        setColors(colors.filter((col) => col.id !== id));
        notifySuccess(`Color "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting Color:", error);
      notifyError(`Color "${name}" deleted failed`);
    }
  };

  // edit and delete size
  const handleSizeEdit = (id, name) => {
    setSelectedEditSize({ id, name });
    setEditedSizeName(name);
    setEditModalSizeOpen(true);
  };

  const handleEditModalSizeClose = () => {
    setEditModalSizeOpen(false);
    setSelectedEditSize(null);
    setEditedSizeName("");
  };

  const handleNameSizeChange = (event) => {
    setEditedSizeName(event.target.value);
  };
  const handleUpdateSizeCategory = async () => {
    try {
      const response = await requestApi("PUT", `/api/structure/size`, {
        id: selectedEditSize.id,
        name: editSizeName,
      });
      console.log(response.data.message);
      const updatedColor = { ...selectedEditSize, name: editSizeName };
      setSizes(
        sizes.map((col) =>
          col.id === selectedEditSize.id ? updatedColor : col
        )
      );
      notifySuccess(`Size updated successfully`);
      handleEditModalSizeClose();
    } catch (error) {
      console.error("Error updating Size:", error);
      notifyError("Error updating Size");
    }
  };

  const handleSizeDelete = async (id, name) => {
    try {
      const confrimDelete = window.confirm(
        `Are you sure you wnat to delete size "${name}"?`
      );
      if (confrimDelete) {
        const response = await requestApi(
          "DELETE",
          `/api/structure/size?id=${id}`
        );
        console.log(response.data.message);
        setSizes(sizes.filter((col) => col.id !== id));
        notifySuccess(`Color "${name}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting Size:", error);
      notifyError(`Size "${name}" deleted failed`);
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
              {selectedCategory ? null : (
                <h2 className="item-list-head">No Items Selected</h2>
              )}
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
                {selectedModel &&
                  (selectedModel.image_path !== "" ? (
                    <p className="image-alt-text">{selectedModel.name}</p>
                  ) : (
                    <p className="image-alt-text">{selectedModel.name}</p>
                  ))}
                {selectedColor &&
                  (selectedColor.image_path !== "" ? (
                    <p className="image-alt-text">{selectedColor.name}</p>
                  ) : (
                    <p className="image-alt-text">{selectedColor.name}</p>
                  ))}
              </div>
            </div>

            <div className="search-and-product-type-grid">
              <div className="search-container">
                <InputBox
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "var(--text)",
                      }}
                    >
                      <SearchSharpIcon
                        sx={{ marginRight: 1, color: "var(--text)" }}
                      />
                      Search
                    </div>
                  }
                  size="small"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  sx={{ width: "100%" }}
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
                            <div key={category.id} className="c-cards">
                              <div className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() => handleSelectCategory(category)}
                                >
                                  <div className="names">{category.name}</div>
                                  {category.image_path && (
                                    <img
                                      src={`${apiHost}/` + category.image_path}
                                      alt={category.name}
                                    />
                                  )}
                                </div>
                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleEdit(category.id, category.name)
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDelete(
                                            category.id,
                                            category.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalOpen}
                          onClose={handleEditModalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "60%",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Category</h2>
                            <InputBox
                              label="Category Name"
                              value={editedName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleNameChange}
                            />
                            <button
                              className="button-in-dialog"
                              variant="contained"
                              onClick={handleUpdateCategory}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}
                  {/* Item Names */}
                  {selectedCategory && selectedItemName === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer", color: "#178a84" }}
                          onClick={() => {
                            setSelectedCategory(null); 
                            setSelectedItemName(null);
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
                        <div className="flex-container">
                          {filterData(itemNames).map((itemName) => (
                            <div className="c-cards">
                              <div key={itemName.id} className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() => handleSelectItemName(itemName)}
                                >
                                  {itemName.name}
                                  {itemName.image_path && (
                                    <img
                                      src={`${apiHost}/` + itemName.image_path}
                                      alt={itemName.name}
                                    />
                                  )}
                                </div>

                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleItemEdit(
                                            itemName.id,
                                            itemName.name
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDeleteItem(
                                            itemName.id,
                                            itemName.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalItemOpen}
                          onClose={handleEditItemModalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Item Name</h2>
                            <InputBox
                              label="Category Name"
                              value={editedItemName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleItemNameChange}
                            />
                            <button
                              variant="contained"
                              onClick={handleUpdateItem}
                              className="button-in-dialog"
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}

                  {/* Sub Categories */}
                  {selectedItemName && selectedSubCategory === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer", color: "#178a84" }}
                          onClick={() => {
                            setSelectedItemName(null);
                            setSelectedSubCategory(null); 
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
                        <div className="flex-container">
                          {filterData(subCategories).map((subCategory) => (
                            <div key={subCategory.id} className="c-cards">
                              <div key={subCategory.id} className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() =>
                                    handleSelectSubCategory(subCategory)
                                  }
                                >
                                  {subCategory.name}
                                  {subCategory.image_path && (
                                    <img
                                      src={
                                        `${apiHost}/` + subCategory.image_path
                                      }
                                      alt={subCategory.name}
                                    />
                                  )}
                                </div>
                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleSubEdit(
                                            subCategory.id,
                                            subCategory.name
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleSubDelete(
                                            subCategory.id,
                                            subCategory.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalSubOpen}
                          onClose={handleEditModalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "60%",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Sub Category</h2>
                            <InputBox
                              label="SubCategory"
                              value={editSubName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleSubNameChange}
                            />
                            <button
                              className="button-in-dialog"
                              onClick={handleUpdateSubCategory}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  {selectedSubCategory && selectedBrand === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer", color: "#178a84" }}
                          onClick={() => {
                            setSelectedSubCategory(null);
                            setSelectedBrand(null); 
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
                        <div className="flex-container">
                          {filterData(brands).map((brand) => (
                            <div key={brand.id} className="c-cards">
                              <div className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() => handleSelectBrand(brand)}
                                >
                                  {brand.name}
                                  {brand.image_path && (
                                    <img
                                      src={`${apiHost}/` + brand.image_path}
                                      alt={brand.name}
                                    />
                                  )}
                                </div>
                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleBrandEdit(brand.id, brand.name)
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleBrandDelete(
                                            brand.id,
                                            brand.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalBrandOpen}
                          onClose={handleEditModalBrandClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "60%",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Brand</h2>
                            <InputBox
                              label="Brand Name"
                              value={editBrandName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleBrandNameChange}
                            />
                            <button
                              className="button-in-dialog"
                              onClick={handleUpdateBrandCategory}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}

                  {selectedBrand && selectedModel === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer", color: "#178a84" }}
                          onClick={() => {
                            setSelectedModel(null); 
                            setSelectedBrand(null); 
                          }}
                        />

                        <h2>
                          <center>Select a Model</center>
                        </h2>

                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleModelOpen}
                        />
                      </div>
                      <div className="card">
                        <div className="flex-container">
                          {filterData(models).map((model) => (
                            <div key={model.id} className="c-cards">
                              <div className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() => handleSelectModel(model)}
                                >
                                  {model.name}
                                  {model.image_path && (
                                    <img
                                      src={`${apiHost}/` + model.image_path}
                                      alt={model.name}
                                    />
                                  )}
                                </div>
                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleModelEdit(model.id, model.name)
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleModelDelete(
                                            model.id,
                                            model.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalModelOpen}
                          onClose={handleEditModalModelClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "60%",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Model</h2>
                            <InputBox
                              label="Brand Name"
                              value={editModelName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleNameModelChange}
                            />
                            <button
                              className="button-in-dialog"
                              onClick={handleUpdateModelCategory}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}
                  {selectedModel && selectedColor === null && (
                    <div className="card1">
                      <div className="name-and-icon">
                        <ArrowBackIcon
                          sx={{ cursor: "pointer", color: "#178a84" }}
                          onClick={() => {
                            setSelectedModel(null); 
                            setSelectedColor(null);
                          }}
                        />

                        <h2>
                          <center>Select a Color</center>
                        </h2>

                        <AddBoxRoundedIcon
                          sx={{ fontSize: 35, color: "var(--button)" }}
                          className="add-icon"
                          onClick={handleColorOpen}
                        />
                      </div>
                      <div className="card">
                        <div className="flex-container">
                          {filterData(colors).map((color) => (
                            <div key={color.id} className="c-cards">
                              <div className="item-card">
                                <div
                                  className="category-info"
                                  onClick={() => handleSelectColor(color)}
                                >
                                  {color.name}
                                  {color.image_path && (
                                    <img
                                      src={`${apiHost}/` + color.image_path}
                                      alt={color.name}
                                    />
                                  )}
                                </div>
                                <div className="edit-delete">
                                  <div className="ed-icon">
                                    <div className="edit-delete-icon">
                                      <EditIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleColorEdit(color.id, color.name)
                                        }
                                      />
                                    </div>
                                    <div className="edit-delete-icon">
                                      <DeleteIcon
                                        style={{
                                          color: "#ffff",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleColorDelete(
                                            color.id,
                                            color.name
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Modal
                          open={editModalColorOpen}
                          onClose={handleEditModalColorClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "60%",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "var(--background-1)",
                              boxShadow: 24,
                              padding: "30px 60px",
                              display: "flex",
                              flexDirection: "column",
                              color: "var(--text)",
                              gap: "10px",
                            }}
                          >
                            <h2>Edit Color</h2>
                            <InputBox
                              label="Brand Name"
                              value={editColorName}
                              size="small"
                              sx={{ width: "100%" }}
                              onChange={handleNameColorChange}
                            />
                            <button
                              className="button-in-dialog"
                              onClick={handleUpdateColorCategory}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )}

                  {selectedColor && (
                    // Last page for size and price
                    <div className="last">
                      <ArrowBackIcon
                        sx={{ cursor: "pointer", margin: 1, color: "#178a84" }}
                        onClick={() => {
                          setSelectedColor(null);
                          setSellingPrice("");
                          setMrp("");
                          setBill("");
                          resetSizeQuantities();
                        }}
                      />
                      <div className="part_for_size">
                        <div className="count-size-quantity-box">
                        <div className="name-and-icons">
                            <b>Size and Quantity</b>
                              <AddBoxRoundedIcon
                                sx={{ fontSize: 30, color: "var(--button)" }}
                                onClick={handleSizeOpen}
                              />{" "}
                            </div>
                          <div className="size-and-quantity">
                            

                            {sizeInputs()}
                          </div>
                        </div>
                      </div>

                      <div className="part_for_price">
                        <div className="price-boxes">
                          <div className="centering">
                            <div className="input-container">
                              <InputBox
                                label="S.No"
                                className="input_box"
                                type="number"
                                id="bill"
                                value={bill}
                                size="small"
                                sx={{ width: "100%" }}
                                onChange={(e) => setBill(e.target.value)}
                                required
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
                              <InputBox
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
                              <InputBox
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form className="form-dialog" onSubmit={handleCategorySubmit}>
            <div className="dialog-content">
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
                <label className="drop-container">
                  <span class="drop-title">Drop files here</span>

                  <div
                    style={{
                      border: "1px solid var(--button)",
                      borderRadius: "5px",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleCategoryImage}
                    />
                  </div>
                </label>
                <br />
                <h1 className="or-color">(or)</h1>
                <br />

                <label htmlFor="image" className="custom-file-upload">
                  &nbsp;Take Picture:
                </label>
                <br />
                <div
                  style={{
                    border: "1px solid var(--button)",
                    borderRadius: "5px",
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCategoryImage}
                  />
                  <br />
                </div>

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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleItemSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
                <label className="drop-container">
                  <span class="drop-title">Drop files here</span>

                  <div
                    style={{
                      border: "1px solid var(--button)",
                      borderRadius: "5px",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleItemImage}
                    />
                  </div>
                </label>
                <br />
                <h5 className="or-color">(or)</h5>
                <br />
                <label htmlFor="image" className="custom-file-upload">
                  &nbsp;Take Picture:
                </label>
                <br />
                <div
                  style={{
                    border: "1px solid var(--button)",
                    borderRadius: "5px",
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    onChange={handleItemImage}
                  />
                  <br />
                </div>
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleSubSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
                <label className="drop-container">
                  <span class="drop-title">Drop files here</span>

                  <div
                    style={{
                      border: "1px solid var(--button)",
                      borderRadius: "5px",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleSubImage}
                    />
                  </div>
                </label>
                <br />
                <h5 className="or-color">(or)</h5>
                <br />
                <label htmlFor="image" className="custom-file-upload">
                  &nbsp;Take Picture:
                </label>
                <br />
                <div
                  style={{
                    border: "1px solid var(--button)",
                    borderRadius: "5px",
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    onChange={handleSubImage}
                  />
                  <br />
                </div>
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleBrandSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
                <label className="drop-container">
                  <span class="drop-title">Drop files here</span>

                  <div
                    style={{
                      border: "1px solid var(--button)",
                      borderRadius: "5px",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleBrandImage}
                    />
                  </div>
                </label>
                <br />
                <h5 className="or-color">(or)</h5>
                <br />
                <label htmlFor="image" className="custom-file-upload">
                  &nbsp;Take Picture:
                </label>
                <br />
                <div
                  style={{
                    border: "1px solid var(--button)",
                    borderRadius: "5px",
                  }}
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    onChange={handleBrandImage}
                  />
                  <br />
                </div>
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleModelSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleColorSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
              backgroundColor: "var(--background-1)",
            },
          }}
        >
          <form onSubmit={handleSizeSubmit}>
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                  color: "var(--text)",
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
