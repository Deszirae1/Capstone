import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';


const Register = ({ auth, authAction }) => {
  return (
    <div>
      <h1>Be our friend!</h1>
      <AuthForm authAction={authAction} mode="register" buttonClassName="smaller-btn" />
      <div className="link-container">
        <Link to="/Login">Click here to login</Link>
      </div>
    </div>
  );
};

export default Register;


