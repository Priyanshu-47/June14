
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Assume non-admin by default

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const newUser = { username, password, email, isAdmin };

    try {
      const response = await axios.post('https://localhost:7188/api/User/register', newUser);
      console.log('User registered successfully:', response.data);
      // Optionally, redirect to login page or handle success message
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error: display error message or retry logic
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>
          Admin:
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

