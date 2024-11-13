import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ businesses = [], auth }) => {
  return (
    <h1>Placeholder for Businesses { businesses.length }</h1>
  );
};

export default UserCard;  

//will need to change to functional component and add props to the function