import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';


const Register = ({ authAction }) => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Be our friend!</h1>
      <AuthForm authAction={authAction} mode="register" onSuccess={handleAuthSuccess} buttonClassName="smaller-btn" />
      <div className="link-container">
        <Link to="/Login">Click here to login</Link>
      </div>
    </div>
  );
};

export default Register;


