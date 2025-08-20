import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: 'admin@example.com', password: 'password123' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const res = await api.post('/auth/login', { email, password });
      
      // Store the received token in local storage
      localStorage.setItem('token', res.data.token);
      
      // Redirect to the dashboard on successful login
      navigate('/dashboard');
    } catch (err) {
      // Display an error message if login fails
      setError(err.response?.data?.msg || 'Login failed! Please check your credentials.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;