import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiHost from "../../utils/api";
import "../Login/login.css";
import inventoryImage from "../../assets/img/inventoryImage.png";
import TextField from "@mui/material/TextField";
import Passwordbox from "../InputBox/passwordbox";
import InputBox from "../InputBox/inputbox";
import requestApi from "../../utils/axios";
import Select from "react-select";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(""); 
  const [role, setRole] = useState(""); 
  const [number, setNumber] = useState("");
  const [shopLocations, setShopLocations] = useState([]);
  const [masterRoles, setMasterRoles] = useState([]);

  const navigate = useNavigate();

  const fetchShopLocations = async () => {
    try {
      const response = await requestApi("GET", `/api/master/shop-location`);
      return response.data.map((location) => ({
        value: location.id,
        label: location.name,
      }));
    } catch (error) {
      return [];
    }
  };

  const fetchMasterRoles = async () => {
    try {
      const response = await requestApi("GET", `/api/master/role`);
      return response.data.map((role) => ({
        value: role.id,
        label: role.name,
      }));
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      const locations = await fetchShopLocations();
      const roles = await fetchMasterRoles();
      setShopLocations(locations);
      setMasterRoles(roles);
    };

    fetchDropdownData();
  }, []);

  const handleSignup = async () => {
    try {
      const response = await requestApi("POST",`/api/auth/signup`, {
        name: name,
        password: password,
        location: location, // Use the selected location ID
        number: number,
        role: role, // Use the selected role ID
      });

      if (response.data) {
        navigate("/home", {
          state: { successMessage: "Signup successfully" },
        });
      } else {
        // Handle unsuccessful signup
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="total-login-page">
      <div className="total-login-card">
        <div className="image-flex">
          <img
            className="image"
            src={inventoryImage}
            alt="Description of the image"
          />
        </div>
        <div className="login-form-flex">
          <div className="card-to-arrange">
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
              <div className="login-title">SIGNUP</div>
              <div className="user-pass">
                <div className="username-container">
                  <InputBox
                    sx={{width: "100%"}}
                    label="Username"
                    size="small"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="username-container">
                  <InputBox
                  sx={{width: "100%"}}
                    label="Enter Phone No."
                    type="text"
                    onChange={(e) => setNumber(e.target.value)}
                    size="small"
                  />
                </div>
                <div className="password-container">
                  <Passwordbox
                    label="Password"
                    type="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="select-in-signup">
                  <Select
                    className="select-input"
                    options={shopLocations}
                    onChange={(selectedOption) =>
                      setLocation(selectedOption.value)
                    } // Update the selected location
                    placeholder="Location"
                    
                  />
                  <Select
                    className="select-input"
                    options={masterRoles}
                    onChange={(selectedOption) =>
                      setRole(selectedOption.value)
                    } // Update the selected role
                    placeholder="Role"
                  />
                </div>
              </div>

              <div className="login-button-container">
                <button className="login-button" type="submit">
                  Signup
                </button>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;