import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import apiHost from "../../utils/api";
import "../Login/login.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // const notifySuccess = (message) => {
  //   toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };

  // const notifyError = (message) => {
  //   toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };

  const handleSignup = async () => {
    // try {
    //   const response = await axios.post(`${apiHost}/add_users`, {
    //     username: username,
    //     password: password,
    //     is_admin: isAdmin ? 1 : 0,
    //   });
    //   if (!username.trim() || !password.trim()) {
    //     notifyError('Username and password cannot be empty.');
    //     return;
    //   }

    //   console.log('Signup successful:', response.data.message);
    //   navigate('/login', { state: { successMessage: 'Signup successfully' } });
    //   notifySuccess('Signup successfully');

    // } catch (error) {
    //     notifyError('Failed to Signup');
    //   console.error('Signup failed:', error.response.data.error);
    // }

    try {
      const response = await axios.post(`${apiHost}/add_users`, {
        username: username,
        password: password,
        is_admin: isAdmin ? 1 : 0,
      });

      if (response.data) {
        console.log("Signup successful:", response.data.message);
        // notifySuccess('Signup successfully');
        navigate("/login", {
          state: { successMessage: "Signup successfully" },
        });
      } else {
        console.error("Signup failed: Unexpected response format", response);
        // notifyError('Failed to Signup');
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // notifyError('Failed to Signup');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      {/* <ToastContainer/> */}
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
        <label className="login_lable">
          Admin:
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
