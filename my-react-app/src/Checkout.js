import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate(); 
  const { user, login } = useContext(AuthContext); // Getting user data and login function from context
  const [selectedBet, setSelectedBet] = useState(null); // State to hold the selected bet
  const [betAmt, setBetAmt] = useState(0); // State to hold the bet amt

  useEffect(() => {
    try {
      const currBet = localStorage.getItem('selectedBet'); // Retrieve bet info from localStorage
    
      // Parse the bet info from localStorage
      if (currBet) {
        const parsedBetData = JSON.parse(currBet);
        // Check if the parsed info is valid
        if (parsedBetData && parsedBetData.matchup){
          setSelectedBet(parsedBetData); // Set the selected bet
          setBetAmt(parsedBetData.amount || 0); // Set the bet amount
        } else {
          console.error('Invalid bet info..');
          localStorage.removeItem('selectedBet');
        }
      }
    } catch (error) {
      console.error('Error parsing bet info:', error); 
      localStorage.removeItem('selectedBet');
    }
  }, []);

  const handleAmtChange = (e) => {
    const amt = parseInt(e.target.value); // Get the bet amount from input

    // Check if the amt is within user's balance
    if (amt > 0 && amt <= (user.amount)) {
      setBetAmt(amt);
    }
  };

  // Calculating payout based on bet amount and odds
  const payout = (betAmt, odds) => {
    if (!betAmt || !odds) return 0;
    
    // Get betAmount and odds
    const amt = betAmt;
    const odd = odds;
    
    if (odd < 0) {
      // Case 1: Negative Odds
      return amt + (100 / Math.abs(odd)) * amt;
    } else {
      // Case 2: Positive Odds
      return amt + (odd / 100) * amt;
    }
  };

  const handleConfirmBet = async () => {
    // Check if the bet amount is valid
    if (betAmt <= 0 || betAmt > user.amount) {
      alert('Invalid amount. Please enter a valid amount.');
      return;
    }

    // Check if user is logged in
    if (!user) {
      alert('You must be logged in to place a bet.');
      return;
    }

    try {
      // Prepare the bet info
      const amountToWin = payout(betAmt, selectedBet?.odds);

      const betInfo = {
        ...selectedBet,
        amount: betAmt,
        username: user.username,
        amountToWin: parseFloat(amountToWin.toFixed(2))
      };

      // Send the bet to the backend
      const response = await fetch('http://localhost:8080/demo/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(betInfo),
      });
 
      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place your bet');
      }

      const responseData = await response.json();

      // Update the user state with the new balance
      const updatedUserBalance = {
        ...user,
        amount: responseData.newBalance
      };

      // Update localStorage with the new user data
      localStorage.setItem('currentUser', JSON.stringify(updatedUserBalance));
      
      // Update the AuthContext state
      login(updatedUserBalance);
      
      // Clear the selected bet
      localStorage.removeItem('selectedBet');
      
      // Navigate back to bracket
      navigate('/');
      alert('Bet placed successfully. Taking you to homepage!');
    } catch (error) {
      console.error('Error placing bet:', error);
      alert(error.message || 'Failed to place bet. Please try again.');
    }
  };

  // Check if there is a selected bet
  // If not, show a message and a button to go back to the bracket
  if (!selectedBet) {
    return (
        <div className="checkout-background">
            <div className="checkout-card">
                <div className="no-bet">
                    <h2>No bet selected</h2>
                    <Link to="/">
                        <button className="home-button">Back to Homepage</button>
                    </Link>
                </div>
            </div>   
      </div>
    );
  }

  return (
    <div className="checkout-background">
        <div className="checkout-card">
            <div className="checkout-topbar">
                <h1>Checkout</h1>
                <div className="balance">
                    Balance: ${user?.amount || 0}
                </div>
            </div>

        <div className="bet-card">
            <h2>Bet Details</h2>
            <div className="info">
                <div>
                    <span className="title">Matchup:</span>
                    <span className="bet-info">{selectedBet.matchup}</span>
                </div>
                <div>
                    <span className="title">Bet Type:</span>
                    <span className="bet-info">{selectedBet.betType}</span>
                </div>
                <div>
                    <span className="title">Selected Bet:</span>
                    <span className="bet-info">
                    {selectedBet.betType === 'spread' ? 
                        `${selectedBet.team === 'A' ? selectedBet.teamA : selectedBet.teamB} ${selectedBet.value}` :
                    selectedBet.betType === 'moneyline' ?
                        `${selectedBet.team === 'A' ? selectedBet.teamA : selectedBet.teamB} (${selectedBet.value > 0 ? '+' : ''}${selectedBet.value})` :
                    selectedBet.betType === 'total' ?
                        `${selectedBet.value === 'O' ? 'Over' : 'Under'} ${selectedBet.overUnder}` :
                        ''}
                    </span>
                </div>
                <div>
                    <span className="title">Odds:</span>
                    <span className="bet-info">{selectedBet.odds > 0 ? '+' : ''}{selectedBet.odds}</span>
                </div>
            </div>

            <div className="bet-amt">
                <label htmlFor="betAmt">Bet Amount:</label>
                <input
                    type="number"
                    id="betAmt"
                    value={betAmt}
                    onChange={handleAmtChange}
                    min={0}
                    max={user.amount}
                />
            </div>

            <div className="potential-bet">
                <span className="potential-bet-title">Bet being placed:</span>
                <span className="bet-info">
                    ${betAmt} to win ${payout(betAmt, selectedBet?.odds).toFixed(2)}
                </span>
            </div>
        </div>

        <div className="actions">
            <Link to="/">
            <button className="home-button">Back to Home</button>
            </Link>
            <button 
            className="place-bet-button"
            onClick={handleConfirmBet}
            disabled={!selectedBet || betAmt > (user?.amount || 0)}
            >
            Place My Bet
            </button>
        </div>
    </div>
    </div>
    );
};

export default Checkout;