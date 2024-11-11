import React, { useState } from "react";
import BusinessCard from "./BusinessCard";

const BusinessesContainer = ({ businesses, auth })=> {
    return (
      <h1>Placeholder for Businesses { businesses.length }</h1>
    );
  }
  
export default BusinessesContainer;

//will need to change to functional component and add props to the function