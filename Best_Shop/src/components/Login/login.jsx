import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import apiHost from "../../utils/api";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import LoginImg from "../../assets/img/login2.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const notifySuccess = (message) => {
  //   toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };

  // const notifyError = (message) => {
  //   toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiHost}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // notifySuccess('Login successfully');
        const { token } = await response.json();

        localStorage.setItem("token", token);
        localStorage.setItem("isLogin", "true");

        setError(null);
        navigate("/dashboard", {
          state: { successMessage: "Login Successfully" },
        });
      } else {
        const { message } = await response.json();
        setError(message);
        // notifyError('Failed to login');
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      // notifyError('Failed to login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div style={{ backgroundImage: { LoginImg } }} className="login-container">
      <div className="login-box">
        <center>
          <h1>Login</h1>
        </center>
        <br />
        {error && <p className="error-message">{error}</p>}
        <label className="login_lable">
          Username
          <input
            className="login_input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="login_lable">
          Password
          <input
            className="login_input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="password-visibility">
          <input
            id="show-pass"
            onChange={togglePasswordVisibility}
            style={{ padding: 0, height: 20, width: 20 }}
            type="checkbox"
          />
          <label htmlFor="show-pass">
            {showPassword ? "Hide" : "Show"} Password
          </label>
        </div>
        <br />
        <button className="login-button" onClick={handleLogin}>
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
