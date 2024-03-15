import React, { useState, useEffect } from "react";
import apiHost from "../../utils/api";
import axios from "axios";
import Cookies from "js-cookie";


const DataTable = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${apiHost}/api/stock/stock?date=2024-03-15`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const data = { id: id };
      const response = await axios.delete(`${apiHost}/api/stock/stock`, {
        headers,
        data,
      });

      if (response.status === 200) {
        console.log("Row deleted successfully");
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting row:", error);
      console.log("Failed to delete row");
    }
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        id: editingItem.id,
        selling_price: editingItem.mrp,
        mrp: editingItem.mrp,
        quantity: parseInt(editingItem.quantity),
      };

      const response = await axios.put(
        `${apiHost}/api/stock/stock`,
        requestBody,
        {
          headers,
        }
      );

      if (response.status === 200) {
        console.log("Item updated successfully");
        setData(
          data.map((item) => (item.id === editingItem.id ? editingItem : item))
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      console.log("Failed to update item");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>MRP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.color_name}</td>
              <td>{item.size_name}</td>
              <td>{item.quantity}</td>
              <td>{item.mrp}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && editingItem && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "skyblue",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h2>Edit Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <label>
              MRP:
              <input
                type="text"
                value={editingItem.mrp}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, mrp: e.target.value })
                }
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={editingItem.quantity}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, quantity: e.target.value })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DataTable;
