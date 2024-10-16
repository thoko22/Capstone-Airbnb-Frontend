import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./HostLogin.css";
import { useAuth } from "./AuthContext";

const HostLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginHost } = useAuth();

  const handleHostLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      loginHost(response.data.token);
      setEmail(''); 
      setPassword('');
      alert('Host login successful!');
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Host login failed:', error);
      alert('Host login failed. Please check your credentials.');
    }
  };

  return (
    <div className="host-login-container">
      <h2>Host Login</h2>
      <form className="host-login-form" onSubmit={handleHostLogin}>
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

export default HostLogin;