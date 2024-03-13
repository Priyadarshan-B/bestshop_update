import React, { useState } from "react";

const CategoryDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/structure/category",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setIsDialogOpen(false); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>Open Image Upload Form</button>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <button onClick={closeDialog}>Close</button>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <br />
              <label htmlFor="image">Choose an image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <br />
              <br />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDialog;
