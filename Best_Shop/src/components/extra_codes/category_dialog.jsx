

import React, { useState , useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import apiHost from "../../utils/api";

const CategoryDialog = ({ open, handleCloseDialog, submitForm, handleCategoryNameChange, updateImage, categoryName }) => {
  const [image, setImage] = useState(null);
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const updateImage = (event) => {
    const input = document.getElementById('image');
    const label = document.querySelector('.custom-file-label');
    const fileName = input.files[0].name;
    label.innerHTML = '<b>Image File:</b> ' + fileName;
    setImage(event.target.files[0]);
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("image", image);
    fetch(`${apiHost}/categories`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        fetchData();
        notifySuccess('Field added successfully');
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError('Failed to add field');
      });
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        style: {
          width: "500px",
          height: "390px",
          padding: "10px",
        },
      }}
    >
      <div>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          <h2>Add Category</h2>
        </DialogTitle>
        <DialogContent
          style={{
            fontSize: 20,
          }}
        >
          <label htmlFor="categoryName">
            <b>Category Name:</b>
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            id="categoryName"
            name="category_name"
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
          />
          <br />

          <label htmlFor="image">
            <b>Image:</b>
            <br />
            <div className="custom-file-label">
              <b>Choose File:</b>{" "}
            </div>
          </label>
          <input
            className="custom-file-input"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            onChange={updateImage}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              submitForm();
              handleCloseDialog();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CategoryDialog;
