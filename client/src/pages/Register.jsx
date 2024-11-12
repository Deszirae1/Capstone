import React, { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';
import PropTypes from 'prop-types';

const Register = ({ authAction }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleAuthSuccess = () => {
    navigate("/");  // Redirect to the home page after successful registration
  };

  const handleAuthError = (errorMessage) => {
    setError(errorMessage);  // Show error message on registration failure
  };

  return (
    <div>
      <h1>Be our friend!</h1>
      <AuthForm 
        authAction={authAction}  // Pass the authAction function as prop
        mode="register" 
        onSuccess={handleAuthSuccess} 
        onError={handleAuthError} 
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




