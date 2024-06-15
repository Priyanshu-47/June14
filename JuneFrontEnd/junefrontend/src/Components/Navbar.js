import './Navbar.css'; // Import CSS file for navbar styling

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Gym Management System</h1>
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          {isAuthenticated && !isAdmin && <li><Link to="/UserProfile" className="navbar-link">User Profile</Link></li>}
          {isAuthenticated && isAdmin && (
            <>
              <li><Link to="/ViewMembers" className="navbar-link">View Members</Link></li>
              <li><Link to="/AddMemberForm" className="navbar-link">Add Member</Link></li>
              <li><Link to="/UserProfile" className="navbar-link">User Profile</Link></li>
            </>
          )}
          {isAuthenticated ? (
            <li><Link to="/" className="navbar-link" onClick={onLogout}>Logout</Link></li>
          ) : (
            <>
              <li><Link to="/Login" className="navbar-link">Login</Link></li>
              <li><Link to="/Register" className="navbar-link">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;