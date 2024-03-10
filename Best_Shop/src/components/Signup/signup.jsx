import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiHost from "../../utils/api";
import "../Login/login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${apiHost}/auth/signup`, {
        name: username,
        password: password,
        role: isAdmin ? 1 : 0,
      });

      if (response.data) {
        navigate("/login", {
          state: { successMessage: "Signup successfully" },
        });
      } else {
      }
    } catch (error) {}
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <center>
          <h1>Signup</h1>
        </center>
        <br />
        <label className="login_lable">
          Username
          <input
            className="login_input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <label className="login_lable_1">
          Admin
          <input
            type="checkbox"
            style={{ padding: 0, height: 20, width: 20 }}
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
        </label>
        <br />
        <button className="login-button" onClick={handleSignup}>
          Signup
        </button>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "blue",
              fontSize: "17px",
            }}
          >
            {" "}
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
