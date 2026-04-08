import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import "../style/login.css";
import { AuthContext } from "../services/AuthProvider";

export default function Login() {
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", {
        email: userdata.email,
        password: userdata.password,
      });

      await fetchUser();

      navigate("/Addtask");
    } catch (error) {
      setError("Login Failed");
      alert("Please Check Your Email and Password");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter task email"
        onChange={(event) =>
          setUserdata({ ...userdata, email: event.target.value })
        }
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter task password"
        onChange={(event) =>
          setUserdata({ ...userdata, password: event.target.value })
        }
      />

      <button type="submit" className="submit" onClick={handleLogin}>
        Login
      </button>

      <div className="bottom-text">
        Already have an account?
        <span onClick={() => navigate("/")}>Signup</span>
      </div>
    </div>
  );
}
