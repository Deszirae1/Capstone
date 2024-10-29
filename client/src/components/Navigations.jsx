import React from "react";
import { Link } from "react-router-dom";

function Navigations({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <nav>
      <Link to="/">See All Products</Link>
      {token && <Link to="/account">My Account</Link>}
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navigations;