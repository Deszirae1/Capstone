import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    attemptLoginWithToken();
    fetchData();
  }, [refreshReviews]);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    console.log("Attempting login with token:", token); // Added log
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const json = await response.json();
          setAuth(json);
          console.log("Authentication successful:", json); // Added log
        } else {
          console.error("Authentication failed: ", response.statusText);
          window.localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        window.localStorage.removeItem("token");
      }
    }
  };

  const fetchData = async () => {
    try {
      const [usersRes, businessesRes, reviewsRes] = await Promise.all([
        fetch("http://localhost:3000/api/users"),
        fetch("http://localhost:3000/api/businesses"),
        fetch("http://localhost:3000/api/reviews"),
      ]);

      if (usersRes.ok) {
        setUsers(await usersRes.json());
        console.log("Fetched users:", users); // Added log
      }
      if (businessesRes.ok) {
        setBusinesses(await businessesRes.json());
        console.log("Fetched businesses:", businesses); // Added log
      }
      if (reviewsRes.ok) {
        setReviews(await reviewsRes.json());
        console.log("Fetched reviews:", reviews); // Added log
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const authAction = async (credentials, mode) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Authentication response:", json); // Added log
      if (response.ok) {
        window.localStorage.setItem("token", json.token);
        console.log("Token stored in local storage"); // Added log
        attemptLoginWithToken();
        navigate("/");
      } else {
        throw new Error(json.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const reviewFormAction = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setRefreshReviews((prev) => !prev);
        console.log("Review submitted successfully"); // Added log
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };

  const businessFormAction = async (formData) => {
    const token = window.localStorage.getItem("token");
    console.log("Token retrieved for request:", token);
    console.log("Form data to be submitted:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newBusiness = await response.json();
        setBusinesses((prev) => [...prev, newBusiness]);
        console.log("Business submitted successfully:", newBusiness); 
      } else {
        const errorText = await response.text();
        console.error("Failed to submit business:",
        throw new Error("Failed to submit business");
      }
    } catch (error) {
      console.error("Business submission failed:", error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    console.log("User logged out"); // Added log
    navigate("/login");
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
        <Route path="/" element={<Home auth={auth} authAction={authAction} businesses={businesses} users={users} reviews={reviews} />} />
        <Route path="/businesses" element={<Businesses businesses={businesses} businessFormAction={businessFormAction} />} />
        <Route path="/createReview/:businessId" element={<CreateReview auth={auth} authAction={authAction} reviewFormAction={reviewFormAction} setRefreshReviews={setRefreshReviews} businesses={businesses} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserDetails auth={auth} users={users} />} />
        <Route path="/account" element={<Account auth={auth} />} />
        <Route path="/admin" element={<Admin auth={auth} users={users} businesses={businesses} />} />
        <Route path="/login" element={<Login authAction={authAction} />} />
        <Route path="/register" element={<Register authAction={authAction} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;