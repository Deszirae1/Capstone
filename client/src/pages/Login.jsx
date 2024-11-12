import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';


const Login = ({ authAction }) => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Define the auth action handler to handle the response and navigation
  const handleAuthAction = async (data) => {
    try {
      await authAction(data); // Call the auth action (like login)
      navigate("/"); // Redirect user to the dashboard or home page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Welcome back, friend.</h1>

  
      <AuthForm authAction={handleAuthAction} mode="login" buttonClassName="smaller-btn" />

      <div className="link-container">
        <Link to="/register">Click here to register</Link>
      </div>
    </div>
  );
};
export default Login;

// login css under authform.cc 
