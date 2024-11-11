import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from './Footer1';

const Login = ({ auth, authAction }) => {
  return (
    <div>
      <h1>Welcome back, friend.</h1>
      <AuthForm authAction={authAction} mode="login" buttonClassName="smaller-btn"/>
      <div className="link-container">
        <Link to="/register">Click here to register</Link>
      </div>
    </div>
  );
};

export default Login;

// login css under authform.cc 
