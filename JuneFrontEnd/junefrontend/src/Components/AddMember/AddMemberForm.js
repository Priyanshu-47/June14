import React, { useState } from 'react';
import axios from 'axios';
import './AddMemberForm.css'; // Import CSS file for form styling

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: '',
    isAdmin: false,
    name: '',
    phone: '',
    membershipExpiry: '',
    doj: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7188/api/Member/AddMember', formData);
      // Reset form fields after successful submission
      setFormData({
        userName: '',
        password: '',
        email: '',
        isAdmin: false,
        name: '',
        phone: '',
        membershipExpiry: '',
        doj: ''
      });
      alert('Member added successfully!');
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="add-member-form">
      <h2>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Membership Expiry:</label>
          <input type="date" name="membershipExpiry" value={formData.membershipExpiry} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input type="date" name="doj" value={formData.doj} onChange={handleChange} required />
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMemberForm;
