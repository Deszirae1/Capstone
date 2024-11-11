import React from 'react';
import './Users.css';
import Footer from './Footer1';
import UsersContainer from "./UsersContainer"; 
import { Container } from '@mui/material'; 


const Users = ({ users }) => {
  return (
    <Container className="users-container">
      <h1 className="users-title">Users ({users.length})</h1>
      <UsersContainer users={users} /> 
    </Container> 
  );
};

export default Users;

//possibly done. 