import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const Register = ({ authAction }) => {
  return (
    <div>
      <h1>Register</h1>
      <AuthForm authAction={authAction} mode="register" />
    </div>
  );
};

export default Register;
