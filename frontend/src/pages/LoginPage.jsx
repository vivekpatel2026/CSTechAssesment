import React from 'react';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="page-container">
       <h1 style={{ textAlign: "center" }}>Agent Management System</h1>
      <Login />
    </div>
  );
};

export default LoginPage;