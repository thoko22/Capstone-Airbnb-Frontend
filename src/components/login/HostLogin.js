import React, { useState } from "react";
import "./HostLogin.css"; // Add CSS file for styling if needed
import api from "../../api"; // Adjust the path to your API file

const HostLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login form submission
  const handleHostLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      // Save the JWT token in local storage or cookie
      localStorage.setItem('hostToken', response.data.token);
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      alert('Host login successful!');
      console.log('Host login successful for:', email);
      
      if (onLoginSuccess) {
        onLoginSuccess(email); // Pass the email to the parent component on successful login
      }
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

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default HostLogin;
