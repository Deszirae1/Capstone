import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setToken, token }) {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password && userData.email) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, userData)
        .then((data) => {
          console.log(data);
          setToken(data.data.token);
          localStorage.setItem("token", data.data.token);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  
  if (token) {
    navigate("/account");
  }
  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInput} />
        </label>
        <button>Login</button>
        <p>
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;