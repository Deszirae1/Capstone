import React from "react";
import './home.css';
import Header from "./Header";  
import Footer from "./Footer1";
import AuthForm from "../components/AuthForm/AuthForm";
import cliniqueLogo from "../assets/images/Main Logos/Clinique Logo.png";
import diorLogo from "../assets/images/Main Logos/Dior Logo.png"; 
import macLogo from "../assets/images/Main Logos/MAC Logo.png"; 
import narsLogo from "../assets/images/Main Logos/NARS Logo.png"; 


const Home = ({ auth, authAction, businesses, users, reviews }) => {
  return (
    <div>
    
      <h2>Reviews</h2>

      
      <div className="images-container">
      <img
          src={narsLogo} 
          alt="NARS"
          style={{ width: '140px', height: 'auto', marginTop: 'auto'}}
        />
        <img
          src={cliniqueLogo}
          alt="Clinique"
          style={{ width: '135px', height: 'auto'}}
        />
        <img
          src={diorLogo} 
          alt="Dior"
          style={{ width: '135px', height: 'auto', marginTop: 'auto'}}
        />
        <img
          src={macLogo}
          alt="MAC"
          style={{ width: '135px', height: 'auto'}}
        />

      </div>

      <p>
        Display some interesting information about our {businesses.length}{" "}
        Businesses. 
        <br />
        Display {users.length} Users
        <br />
        Display some interesting information about our {reviews.length} Reviews
      </p>

    </div>
  );
};

export default Home;
