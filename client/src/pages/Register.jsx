import React, { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';
import PropTypes from 'prop-types';

const Register = ({ authAction }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleAuthAction = async (data) => {
    try {
      await authAction(data, "register"); // Ensure the mode is correctly set to "register"
      navigate("/"); // Redirect user to the home page after successful registration
    } catch (error) {
      setError("Registration failed: " + error.message); // Show error message on registration failure
    }
  };

  return (
    <div>
      <h1>Be our friend!</h1>
      <AuthForm 
        authAction={handleAuthAction} // Pass the handleAuthAction function as prop
        mode="register" 
        buttonClassName="smaller-btn" 
      />
      {error && <div className="error-message">{error}</div>} {/* Show error message if any */}
      <div className="link-container">
        <Link to="/login">Click here to login</Link>
      </div>
      <Footer />    
    </div>
  );
};

Register.propTypes = {
  authAction: PropTypes.func.isRequired, // Ensure authAction is passed and is a function
};

export default Register;




