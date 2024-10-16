import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuth } from "./AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      loginUser(response.data.token);
      setEmail('');
      setPassword('');
      alert('User login successful!');
      // Redirect to locations page
      navigate('/locations');
    } catch (error) {
      console.error('User login failed:', error);
      alert('User login failed. Please check your credentials.');
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Login</h2>
      <form className="user-login-form" onSubmit={handleUserLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;

