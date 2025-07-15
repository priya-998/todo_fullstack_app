import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from './api';
import './styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/token/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/tasks', { state: { message: 'Successfully logged in' } });
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </form>
    </div>
  );
}

export default Login;