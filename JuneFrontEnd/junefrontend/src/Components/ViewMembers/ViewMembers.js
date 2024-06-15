import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewMembers.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('https://localhost:7188/api/Member');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`https://localhost:7188/api/Member/${memberId}`);
      setMembers(prevMembers => prevMembers.filter(member => member.memberId !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleUpdateMember = (memberId) => {
    const memberToUpdate = members.find(member => member.memberId === memberId);
    setSelectedMember(memberToUpdate);
  };

  const handleFormClose = () => {
    setSelectedMember(null);
  };

  const handleFormSubmit = async (updatedMemberData) => {
    try {
      await axios.put(`https://localhost:7188/api/Member/${updatedMemberData.memberId}`, updatedMemberData);
      setMembers(prevMembers => prevMembers.map(member =>
        member.memberId === updatedMemberData.memberId ? updatedMemberData : member
      ));
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };


  return (
    <div className="member-container">
      <h2>All Members</h2>
      <div className="member-grid">
        {members.map(member => (
          <div key={member.memberId} className="member-card">
            <h3>{member.name}</h3>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>
            <p>Membership Expiry: {new Date(member.membershipExpiry).toLocaleDateString()}</p>
            <p>Date of Joining: {new Date(member.doj).toLocaleDateString()}</p>
            <div className="button-group">
              <button onClick={() => handleUpdateMember(member.memberId)}>Update</button>
              <button onClick={() => handleDeleteMember(member.memberId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {selectedMember && (
        <div className="update-form">
          <h2>Update Member</h2>
          <button className="close-button" onClick={handleFormClose}>Close</button>
          <UpdateMemberForm
            member={selectedMember}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

const UpdateMemberForm = ({ member, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(member);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
      <button type="submit">Update</button>
    </form>
  );
};


export default ViewMembers;
