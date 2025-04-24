import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CircleDollarSign, Calendar, Trophy, LogOut, User } from "lucide-react";
import MarchMadnessBracket from './Bracket'; 
import { AuthContext } from './Context/AuthContext';
import './Home.css';

// This global style can be removed since it's defined in your CSS now
// const globalStyles = `
//   html, body {
//     margin: 0;
//     width: 100%;
//     overflow-x: hidden;
//   }
// `;

export default function Home() {
  const { isLoggedIn, user, logout, login } = useContext(AuthContext);
  
  // Refreshing user data to ensure balance is updated
  useEffect(() => {
    const refreshUserInfo = async () => {
      if (!isLoggedIn || !user || !user.id) return; // Check if user is logged in
      
      // Fetch all users data
      try {
        const response = await fetch('http://localhost:8080/demo/all');
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch users info');
        }

        const allUsers = await response.json(); // Parse the response
        const currUser = allUsers.find(u => u.id === user.id); // Find the current user
        
        if (currUser) {
          // Update the user info
          localStorage.setItem('currentUser', JSON.stringify(currUser));
          login(currUser);
        }
      } catch (error) {
        console.error('Error refreshing:', error);
      }
    };

    refreshUserInfo();
  }, [isLoggedIn, user, login]);
  
  const handleLogout = () => {
    alert("You have been logged out successfully!");
    logout();
  };

  return (
    <>      
      <div className="home-container">
        {/* NavBar */}
        <nav className="navbar">
          <div className="nav-content">
            {/* Logo */}
            <div className="nav-logo">
              <CircleDollarSign style={{ height: "1.8rem", width: "1.8rem", color: "#ED7014" }} />
              <span className="logo-text">Nets and Bets</span>
            </div>

            {/* Conditional Nav Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {isLoggedIn ? (
                <>
                  <div className="nav-user-info">
                    <User style={{ height: "1.2rem", width: "1.2rem", color: "white" }} />
                    <span>
                      {user?.name || user?.username} - ${user?.amount ? user.amount.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  {/* My Bets Page*/}
                  <Link to="/mybets" className="nav-link">
                    <button className="button-orange">
                      My Bets
                    </button>
                  </Link>
                  
                  {/* Logout button */}
                  <button 
                    onClick={handleLogout}
                    className="button-orange"
                  >
                    <LogOut style={{ height: "1rem", width: "1rem" }} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="nav-link">
                    <button className="button-orange">
                      Sign Up
                    </button>
                  </Link>
                  <Link to="/login" className="nav-link">
                    <button className="button-orange">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */} 
        <section className="hero">
          {/* Background dark Overlay */}
          <div className="hero-overlay"/>

          {/* Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              Experience the <span className="hero-highlight">Madness</span>
            </h1>
            <p className="hero-description">
              Join the ultimate college basketball tournament experience. Sign up or Log in to compete
              with fans nationwide.
            </p>
          </div>
        </section>

        {/* Tournament Information*/}
        <section className="tournament-section">
          {/* Content */}
          <div>
            <h2 className="tournament-header">Tournament Highlights</h2>

            <div className="tournament-grid">
              {/* Cards */}

              {/* Key Dates */}
              <div className="card">
                {/* Icon */}
                <div className="card-icon">
                  <Calendar style={{ height: "2rem", width: "2rem", color: "white" }} />
                </div>
                <h3 className="card-title">Key Dates</h3>
                <ul className="card-list">
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>Selection Sunday:</span> March 12, 2025
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>First Four:</span> March 14-15, 2025
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>First Round:</span> March 16-17, 2025
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>Final Four:</span> April 1, 2025
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>Championship:</span> April 3, 2025
                  </li>
                </ul>
              </div>

              {/* Prizes */}
              <div className="card">
                {/* Icon */}
                <div className="card-icon">
                  <Trophy style={{ height: "2rem", width: "2rem", color: "white" }} />
                </div>
                <h3 className="card-title">Prizes</h3>
                <ul className="card-list">
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>1st Place:</span> $1,000 Gift Card
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>2nd Place:</span> $500 Gift Card
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>3rd Place:</span> $250 Gift Card
                  </li>
                  <li className="card-list-item">
                    <span style={{ fontWeight: "600" }}>Perfect Bracket:</span> $10,000 Grand Prize
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bracket */}
        <section className="bracket-section">
          <div className="bracket-wrapper">
            <h2 className="bracket-title">Teams</h2>
            <p className="bracket-subtitle"> 
              Click on any match block and place your bets!
            </p>
            <MarchMadnessBracket />
          </div>
        </section>

        {/* Website Footer */}
        <footer className="footer">
          <div>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              alignItems: "center" 
            }}>
              <div className="footer-logo">
                <CircleDollarSign style={{ height: "1.5rem", width: "1.5rem", color: "#ED7014" }} />
                <span style={{ fontWeight: "bold" }}>Nets and Bets</span>
              </div>
              <div className="footer-text">
                2025 March Madness. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}