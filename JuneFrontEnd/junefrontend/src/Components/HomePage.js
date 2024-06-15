import React from 'react';
import { Link } from 'react-router-dom';

import gymImage from '../assets/gymimage.jfif'; // Import the gym image
import './HomePage.css'; // Import CSS file for homepage styling

const HomePage = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Welcome to Gym Management System</h1>
        <p>This system allows you to manage members and users of the gym efficiently.</p>
        <img src={gymImage} alt="Gym" className="gym-image" />
      </div>
    </div>
  );
};

export default HomePage;