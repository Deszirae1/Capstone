import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserReviews.css';

const UserReviews= ({ businesses, auth })=> {
    return (
      <h1>Placeholder for Businesses { businesses.length }</h1>
    );
  }
  
export default UserReviews;

//will need to change to functional component and add props to the function