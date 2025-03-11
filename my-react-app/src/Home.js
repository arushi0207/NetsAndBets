import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header>
        <h1>March Madness Bets</h1>
        <div className="button-container">
          <Link to="/login" className="button">Log In</Link>
          <Link to="/signup" className="button">Sign Up</Link>
        </div>
      </header>
    </div>
  );
};

export default Home;