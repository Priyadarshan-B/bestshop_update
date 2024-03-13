import React, { useState } from 'react';
import requestApi from '../../utils/axios';
import apiHost from '../../utils/api';

const ImageUploadForm = () => {
 const [name, setName] = useState('');
 const [image, setImage] = useState(null);

 const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/structure/category', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
 };

 const handleImageChange = (event) => {
    setImage(event.target.files[0]);
 };

 return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <label htmlFor="image">Choose an image:</label>
      <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      <button type="submit">Upload</button>
    </form>
 );
};

export default ImageUploadForm;
