import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account"; 
import Admin from "./pages/Admin";
import UserDetails from "./pages/UserDetails";
import Header from "./pages/Header";
import Footer from "./pages/Footer1";
import "./app.css";

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false);

  
  useEffect(() => {
    attemptLoginWithToken();
    fetchData();
  }, []);

  
  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

 
  const fetchData = async () => {
    try {
      const [usersRes, businessesRes, reviewsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/businesses"),
        fetch("/api/reviews")
      ]);

     
      if (usersRes.ok) {
        setUsers(await usersRes.json());
      }
      if (businessesRes.ok) {
        setBusinesses(await businessesRes.json());
      }
      if (reviewsRes.ok) {
        setReviews(await reviewsRes.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const authAction = async (credentials, mode) => {
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", json.token);
        attemptLoginWithToken();
      } else {
        throw new Error(json.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error; 
    }
  };

 
  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <Header />

      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <>
            <Link to="/createReview">Create Review</Link>
            <button onClick={logout}>Logout {auth.username || "User"}</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home authAction={authAction} auth={auth} businesses={businesses} users={users} reviews={reviews} />} />
        <Route path="/businesses" element={<Businesses businesses={businesses} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetails auth={auth} users={users} />} />
        <Route path="/account" element={<Account auth={auth} />} />
        <Route path="/admin" element={<Admin auth={auth} users={users} businesses={businesses} />} />
        <Route path="/login" element={<Login authAction={authAction} />} />
        <Route path="/register" element={<Register authAction={authAction} />} />
        {auth.id && <Route path="/createReview" element={<CreateReview />} />}
      </Routes>

      <Footer />
    </>
  );
}

export default App;

