import React, { useRef } from 'react';

const ImageUpload = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger click on the file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle selected file
    const selectedFile = event.target.files[0];
    console.log('Selected File:', selectedFile);

    // You can perform further actions with the selected file here
  };

  const handleCameraButtonClick = async () => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
      if (isMobile) {
        const userMediaConstraints = { video: true };
  
        const mediaStream = await navigator.mediaDevices.getUserMedia(userMediaConstraints);
  
        // Access the video stream or capture an image from the camera
        // You can use the mediaStream for further processing
  
        // Stop the media stream when done
        mediaStream.getTracks().forEach(track => track.stop());
      } else {
        // Handle non-mobile devices or provide a message that the feature is not supported
        console.log('Capture image feature is not supported on non-mobile devices.');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Select Image</button>
      <button onClick={handleCameraButtonClick}>Capture Image</button>

      {/* Hidden file input for selecting images from file manager */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;
