import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import apiHost from "../../utils/api";
import Cookies from "js-cookie";
import inventoryImage from "../../assets/img/inventoryImage.png";
import TextField from '@mui/material/TextField';
import Passwordbox from "../InputBox/passwordbox";



// import LoginImg from "../../assets/img/login2.jpg";

const Login = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  return (
    <div className="total-login-page">
      <div className="total-login-card">
        <div className="image-flex">
          <img className="image" src={inventoryImage} alt="Description of the image" />
        </div>
        <div className="login-form-flex">
          <div className="card-to-arrange">
            <form onSubmit={handleLogin}>
              <div className="login-title">Login</div>
              {error && <p className="error-message">{error}</p>}
              <div className="user-pass">
                <div className="username-container">
                  <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" size="small" onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="password-container">
                  {/* <Passwordbox sx={{ m: 1, width: '100%' }} /> */}
                  <Passwordbox
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="login-button-container">
                <button className="login-button" type="submit">
                  Login
                </button>
                <div style={{ marginTop: "10px" }}>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      fontSize: "17px",
                    }}
                  >
                    Add New User
                  </Link>
                </div>
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