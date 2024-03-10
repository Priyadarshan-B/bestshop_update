import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import apiHost from "../../utils/api";
import Cookies from "js-cookie";

// import LoginImg from "../../assets/img/login2.jpg";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        navigate("/addStocks", {
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div
      //   style={{ backgroundImage: `url(${LoginImg})` }}
      className="login-container"
    >
      <form onSubmit={handleLogin}>
        <div className="login-box">
          <center>
            <h1>Login</h1>
          </center>
          <br />
          {error && <p className="error-message">{error}</p>}
          <div
            className="user-pass"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label className="login_lable">
              Username
              <input
                className="login_input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                required
              />
            </label>
          </div>
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
      </form>
    </div>
  );
};

export default Login;
