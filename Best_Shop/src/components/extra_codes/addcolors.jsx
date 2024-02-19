import React, { useState } from 'react';

function ColorfulDivs({ onColorSelect }) {
  const [divs, setDivs] = useState([]);
  const [color, setColor] = useState('');
  const [colorName, setColorName] = useState('');

  const handleAddDiv = () => {
    setDivs([...divs, { color, name: colorName }]);
    setColorName(''); // Reset color name input after adding a div
    onColorSelect(colorName); // Call onColorSelect with the colorName
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleColorNameChange = (event) => {
    setColorName(event.target.value);
  };

  return (
    <div>
      <div>
        <input type="color" value={color} onChange={handleColorChange} />
        <input
          type="text"
          placeholder="Color Name"
          value={colorName}
          onChange={handleColorNameChange}
        />
        <button onClick={handleAddDiv}>Add Div</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {divs.map((divColor, index) => (
          <div
            key={index}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: divColor.color,
              margin: '10px',
              cursor: 'pointer',
            }}
          >
            {divColor.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorPickerPopup({ onClose }) {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid black', padding: '20px' }}>
      <h2>Select Color</h2>
      <ColorfulDivs />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleColorSelect = (colorName) => {
    setSelectedColors([...selectedColors, colorName]);
  };

  return (
    <div>
      <button onClick={handleTogglePopup}>+</button>
      {showPopup && <ColorPickerPopup onClose={handleTogglePopup} onColorSelect={handleColorSelect} />}
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        {selectedColors.map((color, index) => (
          <span key={index} style={{ marginRight: '5px', backgroundColor: color, padding: '5px' }}>{color}</span>
        ))}
      </div>
    </div>
  );
}

export default App;
