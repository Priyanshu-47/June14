
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import ViewMembers from './Components/ViewMembers/ViewMembers';
import AddMemberForm from './Components/AddMember/AddMemberForm';
import UserProfile from './Components/UserProfile/UserProfile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Assume isAdmin is determined after login
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Implement logout logic here, e.g., clear localStorage, reset state
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAuthenticated ? (
          <>
            {!isAdmin && <Route path="/UserProfile" element={<UserProfile userId={user?.userId} />} />}
            {isAdmin && (
              <>
                <Route path="/ViewMembers" element={<ViewMembers />} />
                <Route path="/AddMemberForm" element={<AddMemberForm />} />
                <Route path="/UserProfile" element={<UserProfile userId={user?.userId} />} />
              </>
            )}
            <Route path="/logout" element={<Navigate to="/" />} /> {/* Redirect to home after logout */}
          </>
        ) : (
          <>
            <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} setUser={setUser} />} />
            <Route path="/Register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;