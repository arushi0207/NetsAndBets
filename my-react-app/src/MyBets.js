import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft, CircleDollarSign } from 'lucide-react';
import './MyBets.css';

const MyBets = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [bet, setBet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all the user bets
    const fetchBets = async () => {
      try {
        const response = await fetch(`http://localhost:8080/demo/user-bets?userId=${user.id}`);
        console.log('Response:', response);
        
        if (!response.ok) {
          throw new Error('Failed to fetch bets');
        }

        const data = await response.json();
        setBet(data);
      } catch (error) {
        console.error('Error fetching bets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBets();
  }, [isLoggedIn, navigate, user]);

  if (!isLoggedIn) {
    return null; // This will prevent flash of content before redirect
  }

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'win':
        return 'status-win';
      case 'loss':
        return 'status-loss';
      case 'in progress':
      default:
        return 'status-in-progress';
    }
  };

  return (
    <div className="betpage-container">
      <nav className="navbar">
        <div className="betpage-nav-content">
          <div className="betpage-logo">
            <CircleDollarSign style={{ height: "2rem", width: "2rem", color: "#ED7014" }} />
            <span>Nets and Bets</span>
          </div>
           <Link to="/" className="nav-link">
                <button className="button-orange">
                    <ArrowLeft style={{ height: "1rem", width: "1rem" }} />
                    Back to Home
                </button>
            </Link> 
        </div>
      </nav>

      <div className="betpage-content">
        <h1 className="title">My Bets</h1>
        
        {isLoading ? (
          <div className="loading">Loading your bets, be patient!</div>
        ) : bet.length === 0 ? (
          <div className="empty">
            <p>You haven't placed any bets yet.</p>
          </div>
        ) : (
          <div className="card-grid">
            {bet.map((bet) => (
              <div key={bet.id} className="card">
                <div className="bet-info-header">
                  <h3>{bet.teamsPlaying}</h3>
                  <span className={`status ${getStatusClass(bet.status)}`}>
                    {bet.status}
                  </span>
                </div>
                
                <div className="bet-info-details">
                  <div className="bet-info">
                    <span className="labels">Odds:</span>
                    <span className="text">{bet.bettingOdds > 0 ? `+${bet.bettingOdds}` : bet.bettingOdds}</span>
                  </div>
                  
                  <div className="bet-info">
                    <span className="labels">Amount Bet:</span>
                    <span className="text">${bet.amountBet.toFixed(2)}</span>
                  </div>
                  
                  <div className="bet-info">
                    <span className="labels">Potential Win:</span>
                    <span className="text">${bet.amountToWin.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBets;
