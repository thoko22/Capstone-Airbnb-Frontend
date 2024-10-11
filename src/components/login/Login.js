import React, { useState } from "react";
import "./Login.css";
import api from "../../api";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHostLogin, setIsHostLogin] = useState(false); // State to track user or host login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isHostLogin ? '/hosts/login' : '/users/login'; // Switch endpoint based on login type
      const response = await api.post(endpoint, { email, password });

      // Save the JWT token in local storage or cookie
      localStorage.setItem('token', response.data.token);
      alert(`Login successful as ${isHostLogin ? 'Host' : 'User'}!`);
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      onLoginSuccess(email); // Notify parent component of successful login
    } catch (error) {
      console.error(`Login failed as ${isHostLogin ? 'Host' : 'User'}:`, error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isHostLogin ? '/hosts/register' : '/users/register'; // Switch endpoint based on registration type
      const response = await api.post(endpoint, { email, password });

      // Save the JWT token in local storage or cookie
      localStorage.setItem('token', response.data.token);
      alert(`Registration successful as ${isHostLogin ? 'Host' : 'User'}!`);
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      onLoginSuccess(email); // Notify parent component of successful registration
    } catch (error) {
      console.error(`Registration failed as ${isHostLogin ? 'Host' : 'User'}:`, error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
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

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isHostLogin}
            onChange={(e) => setIsHostLogin(e.target.checked)}
          />
          Login as Host
        </label>
      </div>

      <div className="button-group">
        <button type="submit" className="submit-button">Login</button>
        <button type="button" className="submit-button" onClick={handleRegister}>Register</button>
      </div>
    </form>
  );
};

export default Login;


