import React, { useState } from 'react';
import api from '../../services/api';

const AddAgentForm = ({ onAgentAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [serverMessage, setServerMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { name, email, mobile, password } = formData;

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) newErrors.name = 'Name is required.';

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Mobile validation
    if (!/^\+?[1-9]\d{1,14}$/.test(mobile)) {
      newErrors.mobile = 'Enter a valid mobile number with country code.';
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      newErrors.password = 'Password needs one uppercase, one lowercase, one number, and one special character.';
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the specific error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Run validation before submitting
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const res = await api.post('/agents', formData);
      setServerMessage('Agent added successfully!');
      setIsError(false);
      onAgentAdded(res.data);
      setFormData({ name: '', email: '', mobile: '', password: '' }); // Clear form
      setErrors({}); // Clear all errors
    } catch (err) {
      // Handle server-side validation errors (like duplicate email)
      const errorMsg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.password || err.response?.data?.errors?.[0]?.email || 'Failed to add agent.';
      setServerMessage(errorMsg);
      setIsError(true);
    } finally {
      setTimeout(() => setServerMessage(''), 5000);
    }
  };

  return (
    <div className="card">
      <h3>Add New Agent</h3>
      {serverMessage && <p className={isError ? 'error-message' : 'success-message'}>{serverMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Full Name"
          className={errors.name ? 'input-error' : ''}
          required
        />
        {errors.name && <p className="validation-error">{errors.name}</p>}
        
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email Address"
          className={errors.email ? 'input-error' : ''}
          required
        />
        {errors.email && <p className="validation-error">{errors.email}</p>}
        
        <input
          type="text"
          name="mobile"
          value={mobile}
          onChange={onChange}
          placeholder="Mobile (e.g., +911234567890)"
          className={errors.mobile ? 'input-error' : ''}
          required
        />
        {errors.mobile && <p className="validation-error">{errors.mobile}</p>}
        
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className={errors.password ? 'input-error' : ''}
          required
        />
        {errors.password && <p className="validation-error">{errors.password}</p>}
        
        <button type="submit" className="btn">Add Agent</button>
      </form>
    </div>
  );
};

export default AddAgentForm;