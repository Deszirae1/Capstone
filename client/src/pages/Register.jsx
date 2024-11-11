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
    navigate("/");
  };

  const handleAuthError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div>
      <h1>Be our friend!</h1>
      <AuthForm 
        authAction={authAction} 
        mode="register" 
        onSuccess={handleAuthSuccess} 
        onError={handleAuthError}
        buttonClassName="smaller-btn" 
      />
      {error && <div className="error-message">{error}</div>}
      <div className="link-container">
        <Link to="/login">Click here to login</Link>
      </div>
      <Footer />    
    </div>
  );
};

Register.propTypes = {
  authAction: PropTypes.func.isRequired, 
};

export default Register;



