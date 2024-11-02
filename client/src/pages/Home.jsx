import React from "react";

const Home = ({ auth, businesses, users, reviews }) => {
  return (
    <div>
      <h1>The Beauty Shop</h1>
      <p>
        Display some interesting information about our {businesses.length}{" "}
        Businesses
        <br />
        Display some interesting information about our {users.length} Users
        <br />
        Display some interesting information about our {reviews.length} Reviews
      </p>
    </div>
  );
};

export default Home;

