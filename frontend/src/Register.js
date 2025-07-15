import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/register/", { username, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Username may already exist.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create an Account</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Choose a Username"
        required
      /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a Password"
        required
      /><br />
      <button type="submit">Register</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}

export default Register;