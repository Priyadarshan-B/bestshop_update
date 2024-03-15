import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import apiHost from "../../utils/api";
import Cookies from "js-cookie";
import inventoryImage from "../../assets/img/inventoryImage.png";
import TextField from "@mui/material/TextField";
import Passwordbox from "../InputBox/passwordbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiHost}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Store token in cookie
        Cookies.set("token", token);

        setError(null);
        navigate("/addStock", {
          state: { successMessage: "Login Successfully" },
        });
        notifySuccess("Login Successfull")
      } else {
        setError("Incorrect Username or Password");
        notifyError("Login Failed")
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      notifyError("Login Failed")
    }
  };

  return (
    
    <div className="total-login-page">
        <ToastContainer/>

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
            <form onSubmit={handleLogin}>
              <div className="login-title">Login</div>
              {error && <p className="error-message">{error}</p>}
              <div className="user-pass">
                <div className="username-container">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="password-container">
                  {/* <Passwordbox sx={{ m: 1, width: '100%' }} /> */}
                  <Passwordbox
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-button-container">
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
