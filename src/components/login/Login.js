import React, { useState } from "react";
import "./Login.css";
import api from "../../api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      // Save the JWT token in local storage or cookie
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
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
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">Login</button>
      <button type="submit" className="submit-button">Register</button>
    </form>
  );
};

export default Login;


