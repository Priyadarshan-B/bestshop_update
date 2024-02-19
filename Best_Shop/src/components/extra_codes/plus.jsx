import React, { useState } from 'react';

function Add() {
  const [inputs, setInputs] = useState([]);

  const handleAddField = () => {
    setInputs([...inputs, { size: '', quantity: '' }]);
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

  return (
    <div>
      <button onClick={handleAddField}>+</button>
      {inputs.map((input, index) => (
        <div key={index}>
          <label htmlFor={`size-${index}`}>Size:</label>
          <input
            type="number"
            id={`size-${index}`}
            value={input.size}
            onChange={(e) =>
              handleInputValueChange(index, "size", e.target.value)
            }
          />
          <label htmlFor={`quantity-${index}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${index}`}
            value={input.quantity}
            onChange={(e) =>
              handleInputValueChange(index, "quantity", e.target.value)
            }
          />
          <button onClick={() => handleRemoveField(index)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default Add;
