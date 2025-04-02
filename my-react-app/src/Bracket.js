import React, { useState, useEffect } from 'react';
import './Bracket.css';

const MarchMadnessBracket = () => {
  // Tournament Data with all four regions- OLD implementation
  /*
  const tournamentData = {
    regions: [
      {
        name: 'West',
        teams: [
          { seed: 1, name: 'UW Madison', spread: -19.5, moneyline: -5000, overUnder: 140.5, odds: -112 },
          { seed: 16, name: 'Purdue', spread: 19.5, moneyline: 1600, overUnder: 140.5, odds: -108 },
          { seed: 8, name: 'Placeholder team', spread: -2.5, moneyline: -145, overUnder: 133.5, odds: -112 },
          { seed: 9, name: 'Placeholder team', spread: 2.5, moneyline: 125, overUnder: 133.5, odds: -108 },
          { seed: 5, name: 'Placeholder team', spread: -4.5, moneyline: -200, overUnder: 126.5, odds: -112 },
          { seed: 12, name: 'Placeholder team', spread: 4.5, moneyline: 170, overUnder: 126.5, odds: -108 },
          { seed: 4, name: 'Placeholder team', spread: -10.5, moneyline: -600, overUnder: 172.5, odds: -112 },
          { seed: 13, name: 'Placeholder team', spread: 10.5, moneyline: 450, overUnder: 172.5, odds: -108 },
          { seed: 6, name: 'Placeholder team', spread: -5.5, moneyline: -245, overUnder: 139.5, odds: -112 },
          { seed: 11, name: 'Placeholder team', spread: 5.5, moneyline: 205, overUnder: 139.5, odds: -108 },
          { seed: 3, name: 'Placeholder team', spread: -12.5, moneyline: -900, overUnder: 145.5, odds: -112 },
          { seed: 14, name: 'Placeholder team', spread: 12.5, moneyline: 600, overUnder: 145.5, odds: -108 },
          { seed: 7, name: 'Placeholder team', spread: -1.5, moneyline: -125, overUnder: 143.5, odds: -112 },
          { seed: 10, name: 'Placeholder team', spread: 1.5, moneyline: 105, overUnder: 143.5, odds: -108 },
          { seed: 2, name: 'Placeholder team', spread: -14.5, moneyline: -1600, overUnder: 163.5, odds: -112 },
          { seed: 15, name: 'Placeholder team', spread: 14.5, moneyline: 900, overUnder: 163.5, odds: -108 },
        ]
      },
      {
        name: 'East',
        teams: [
          { seed: 1, name: 'Placeholder team', spread: -8.5, moneyline: -400, overUnder: 145.5, odds: -112 },
          { seed: 16, name: 'Placeholder team', spread: 8.5, moneyline: 320, overUnder: 145.5, odds: -108 },
          { seed: 8, name: 'Placeholder team', spread: -1.5, moneyline: -125, overUnder: 142.5, odds: -112 },
          { seed: 9, name: 'Placeholder team', spread: 1.5, moneyline: 105, overUnder: 142.5, odds: -108 },
          { seed: 5, name: 'Placeholder team', spread: -6.5, moneyline: -275, overUnder: 137.5, odds: -112 },
          { seed: 12, name: 'Placeholder team', spread: 6.5, moneyline: 235, overUnder: 137.5, odds: -108 },
          { seed: 4, name: 'Placeholder team', spread: -13.5, moneyline: -1100, overUnder: 147.5, odds: -112 },
          { seed: 13, name: 'Placeholder team', spread: 13.5, moneyline: 700, overUnder: 147.5, odds: -108 },
          { seed: 6, name: 'Placeholder team', spread: -2.5, moneyline: -145, overUnder: 147.5, odds: -112 },
          { seed: 11, name: 'Placeholder team', spread: 2.5, moneyline: 125, overUnder: 147.5, odds: -108 },
          { seed: 3, name: 'Placeholder team', spread: -7.5, moneyline: -350, overUnder: 152.5, odds: -112 },
          { seed: 14, name: 'Placeholder teamPlaceholder team', spread: 7.5, moneyline: 290, overUnder: 152.5, odds: -108 },
          { seed: 7, name: 'Placeholder team', spread: -1.5, moneyline: -120, overUnder: 133.5, odds: -112 },
          { seed: 10, name: 'Placeholder team', spread: 1.5, moneyline: 100, overUnder: 133.5, odds: -108 },
          { seed: 2, name: 'Placeholder team', spread: -15.5, moneyline: -2000, overUnder: 127.5, odds: -112 },
          { seed: 15, name: 'Placeholder team', spread: 15.5, moneyline: 1000, overUnder: 127.5, odds: -108 },
        ]
      },
      {
        name: 'South',
        teams: [
          { seed: 1, name: 'Placeholder team', spread: -23.5, moneyline: -8000, overUnder: 134.5, odds: -112 },
          { seed: 16, name: 'Placeholder team', spread: 23.5, moneyline: 2000, overUnder: 134.5, odds: -108 },
          { seed: 8, name: 'Placeholder team', spread: -2.5, moneyline: -140, overUnder: 142.5, odds: -112 },
          { seed: 9, name: 'Placeholder team', spread: 2.5, moneyline: 120, overUnder: 142.5, odds: -108 },
          { seed: 5, name: 'Placeholder team', spread: -5.5, moneyline: -240, overUnder: 131.5, odds: -112 },
          { seed: 12, name: 'Placeholder team', spread: 5.5, moneyline: 200, overUnder: 131.5, odds: -108 },
          { seed: 4, name: 'Placeholder team', spread: -11.5, moneyline: -750, overUnder: 135.5, odds: -112 },
          { seed: 13, name: 'Placeholder team', spread: 11.5, moneyline: 525, overUnder: 135.5, odds: -108 },
          { seed: 6, name: 'Placeholder team', spread: -5.5, moneyline: -240, overUnder: 132.5, odds: -112 },
          { seed: 11, name: 'Placeholder team', spread: 5.5, moneyline: 200, overUnder: 132.5, odds: -108 },
          { seed: 3, name: 'Placeholder team', spread: -13.5, moneyline: -1100, overUnder: 149.5, odds: -112 },
          { seed: 14, name: 'Placeholder team', spread: 13.5, moneyline: 700, overUnder: 149.5, odds: -108 },
          { seed: 7, name: 'Placeholder team', spread: -1.5, moneyline: -120, overUnder: 151.5, odds: -112 },
          { seed: 10, name: 'Placeholder team', spread: 1.5, moneyline: 100, overUnder: 151.5, odds: -108 },
          { seed: 2, name: 'Placeholder team', spread: -13.5, moneyline: -1200, overUnder: 158.5, odds: -112 },
          { seed: 15, name: 'Placeholder team', spread: 13.5, moneyline: 750, overUnder: 158.5, odds: -108 },
        ]
      },
      {
        name: 'Midwest',
        teams: [
          { seed: 1, name: 'Placeholder team', spread: -19.5, moneyline: -4500, overUnder: 133.5, odds: -112 },
          { seed: 16, name: 'Placeholder team', spread: 19.5, moneyline: 1500, overUnder: 133.5, odds: -108 },
          { seed: 8, name: 'Placeholder team', spread: -1.5, moneyline: -125, overUnder: 147.5, odds: -112 },
          { seed: 9, name: 'Placeholder team', spread: 1.5, moneyline: 105, overUnder: 147.5, odds: -108 },
          { seed: 5, name: 'Placeholder team', spread: -6.5, moneyline: -275, overUnder: 152.5, odds: -112 },
          { seed: 12, name: 'Placeholder team', spread: 6.5, moneyline: 235, overUnder: 152.5, odds: -108 },
          { seed: 4, name: 'Placeholder team', spread: -7.5, moneyline: -350, overUnder: 141.5, odds: -112 },
          { seed: 13, name: 'Placeholder team', spread: 7.5, moneyline: 290, overUnder: 141.5, odds: -108 },
          { seed: 6, name: 'Placeholder team', spread: -2.5, moneyline: -145, overUnder: 137.5, odds: -112 },
          { seed: 11, name: 'Placeholder team', spread: 2.5, moneyline: 125, overUnder: 137.5, odds: -108 },
          { seed: 3, name: 'Placeholder team', spread: -7.5, moneyline: -350, overUnder: 144.5, odds: -112 },
          { seed: 14, name: 'Placeholder team', spread: 7.5, moneyline: 290, overUnder: 144.5, odds: -108 },
          { seed: 7, name: 'Placeholder team', spread: -3.5, moneyline: -165, overUnder: 145.5, odds: -112 },
          { seed: 10, name: 'Placeholder team', spread: 3.5, moneyline: 145, overUnder: 145.5, odds: -108 },
          { seed: 2, name: 'Placeholder team', spread: -21.5, moneyline: -5000, overUnder: 131.5, odds: -112 },
          { seed: 15, name: 'Placeholder team', spread: 21.5, moneyline: 1600, overUnder: 131.5, odds: -108 },
        ]
      }
    ]
  };
  */



  // State for tournament data
    const [tournamentData, setTournamentData] = useState({
      regions: [
        { name: 'West', teams: [] },
        { name: 'East', teams: [] },
        { name: 'South', teams: [] },
        { name: 'Midwest', teams: [] }
      ]
    });


    // Fetch teams from the backend API
    useEffect(() => {
      async function fetchTeams() {
        try {
          const response = await fetch("http://localhost:8080/demo/teams");
          if (!response.ok) {
            throw new Error("Failed to fetch teams");
          }
          const data = await response.json();
          console.log("Fetched Teams:", data);
          
          // Process the data and update tournament data state
          const processedData = processTeamData(data);
          setTournamentData(processedData);
          
        } catch (error) {
          console.error("Error fetching teams:", error);
          // Keep using default data if fetch fails
        }
      }
      fetchTeams();
    }, []);


    // Function to process team data from the backend
    const processTeamData = (data) => {
      // Group teams by region
      const regionGroups = {
        'West': [],
        'East': [],
        'South': [],
        'Midwest': []
      };
  
      // Sort teams into regions
      data.forEach(team => {
        if (regionGroups[team.region]) {
          // Add betting info to each team - same for everyone
          const teamWithOdds = {
            ...team,
            spread: -5.5,
            moneyline: -240,
            overUnder: 140.5,
            odds: -112
          };
          regionGroups[team.region].push(teamWithOdds);
        }
    });
    
    return {
      regions: [
        { name: 'West', teams: regionGroups['West'] },
        { name: 'East', teams: regionGroups['East'] },
        { name: 'South', teams: regionGroups['South'] },
        { name: 'Midwest', teams: regionGroups['Midwest'] }
      ]
    };
  };

// Reset selected bet when opening a new matchup or closing the popup
const handleMatchupClick = (matchup) => {
  setSelectedMatchup(matchup);
  setSelectedBet(null);
};

// And in the close button handler:
<div className="close-button" onClick={() => {
  setSelectedMatchup(null);
  setSelectedBet(null);
}}>
</div>

 
  
// Add this state to your component
const [selectedBet, setSelectedBet] = useState(null);

// Add this handler function
const handleBetClick = (betType, team, value) => {
  // If clicking the same bet button, toggle it off
  if (selectedBet && 
      selectedBet.betType === betType && 
      selectedBet.team === team && 
      selectedBet.value === value) {
    setSelectedBet(null);
  } else {
    // Otherwise, set the new bet selection
    setSelectedBet({
      betType,
      team,
      value
    });
  }
};

// Create a helper function to determine if a button is selected
const isBetSelected = (betType, team, value) => {
  return selectedBet && 
         selectedBet.betType === betType && 
         selectedBet.team === team && 
         selectedBet.value === value;
};

// Create a helper function to determine if buttons should be disabled
const shouldDisableBet = (betType, team, value) => {
  return selectedBet && 
         !isBetSelected(betType, team, value);
};


  // State for tracking which matchup is selected
  const [selectedMatchup, setSelectedMatchup] = useState(null);

  // Function to create matchup groups (first round: 1-16, 8-9, etc.)
  const createFirstRoundMatchups = (teams) => {
    const matchups = [];

    // For each pair of teams, it creates a matchup object with and takes 2 teams at a time
    for (let i = 0; i < teams.length; i += 2) {
      matchups.push({
        teamA: teams[i],
        teamB: teams[i+1]
      });
    }
    return matchups;
  };


  // Create first round matchups for each region
  const regions = tournamentData.regions.map(region => ({ 
    ...region,
    firstRound: createFirstRoundMatchups(region.teams)
  }));

  // Simplified component for displaying a single matchup
  const MatchupBox = ({ teamA, teamB, onClick }) => (
    <div className="matchup-box" onClick={onClick}>
      <div className="team-row team-a">
        <span className="team-seed">{teamA.seed}</span>
        <span className="team-name">{teamA.name}</span>
      </div>
      <div className="team-row team-b">
        <span className="team-seed">{teamB.seed}</span>
        <span className="team-name">{teamB.name}</span>
      </div>
    </div>
  );

  // Component is responsible for creating the visual layout of a single region's tournament bracket
  const BracketRegion = ({ region, onMatchupClick, reversed = false }) => {
     
    // Groups of matchups
    const round1MatchupsTop = region.firstRound.slice(0, 4);
    const round1MatchupsBottom = region.firstRound.slice(4, 8);
    
    return (
      <div className={`bracket-region ${reversed ? 'reversed' : ''}`}>
        {/* Round titles names in the top section of the bracket*/}
        <div className="round-titles">
          <div className="spacer"></div>
          <div className="round-title">Round 2</div>
          <div className="round-title">Sweet 16</div>
          <div className="round-title">Elite 8</div>
        </div>

        {/* Top Half of Region */}
        <div className="region-half top-half">
          {/* First Round */}
          <div className="round round-1">
            {round1MatchupsTop.map((matchup, idx) => (
              <MatchupBox 
                key={`${region.name}-top-${idx}`}
                teamA={matchup.teamA}
                teamB={matchup.teamB}
                onClick={() => onMatchupClick(matchup)} 
              />
            ))}
          </div>
          
          {/* Second Round - Tournament flow */}
          <div className="round round-2">
            <div className="bracket-box top"></div>
            <div className="bracket-box bottom"></div>
          </div>
          
          {/* Sweet 16 */}
          <div className="round sweet-16">
            <div className="bracket-box"></div>
          </div>
          
          {/* Elite 8 */}
          <div className="round elite-8">
            <div className="bracket-box elite"></div>
          </div>
        </div>
        
        {/* Bottom Half of Region */}
        <div className="region-half bottom-half">
          {/* First Round */}
          <div className="round round-1">
            {round1MatchupsBottom.map((matchup, idx) => (
              <MatchupBox 
                key={`${region.name}-bottom-${idx}`}
                teamA={matchup.teamA}
                teamB={matchup.teamB}
                onClick={() => onMatchupClick(matchup)}
              />
            ))}
          </div>
          
          {/* Second Round - Tournament flow */}
          <div className="round round-2">
            <div className="bracket-box top"></div>
            <div className="bracket-box bottom"></div>
          </div>
          
          {/* Sweet 16 */}
          <div className="round sweet-16">
            <div className="bracket-box"></div>
          </div>
          
          {/* Elite 8 placeholder - maintains layout consistency but no actual box */}
          <div className="round elite-8">
            {/* No box */}
          </div>
        </div>
      </div>
    );
  };


  // Main component for the entire bracket view
  const BracketView = () => {
    return (
      <div className="bracket-container">
        {/* Betting odds popup when a matchup is selected */}
        {selectedMatchup && (
          <div className="matchup-popup">
            {/* Close Button */}
            <div className="close-button" onClick={() => setSelectedMatchup(null)}>×</div>
            
            <div className="popup-content">
              {/* Header row */}
              <div className="popup-header">
                <div className="header-teams">TEAMS</div>
                <div className="header-spread">SPREAD</div>
                <div className="header-total">TOTAL</div>
                <div className="header-ml">ML</div>
              </div>
              
              {/* Team A Row */}
              <div className="team-stats-row">
                <div className="team-name-cell">
                  <div className="team-name-display">{selectedMatchup.teamA.name}</div>
                </div>
                <div className="spread-cell">
                  <button 
                    className={`bet-button ${isBetSelected('spread', 'A', selectedMatchup.teamA.spread) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('spread', 'A', selectedMatchup.teamA.spread)}
                    onClick={() => handleBetClick('spread', 'A', selectedMatchup.teamA.spread)}
                  >
                    <div className="stat-value">{selectedMatchup.teamA.spread}</div>
                    <div className="stat-odds">{selectedMatchup.teamA.odds}</div>
                  </button>
                </div>
                <div className="total-cell">
                  <button 
                    className={`bet-button ${isBetSelected('total', 'A', 'O') ? 'selected' : ''}`}
                    disabled={shouldDisableBet('total', 'A', 'O')}
                    onClick={() => handleBetClick('total', 'A', 'O')}
                  >
                    <div className="stat-value">O {selectedMatchup.teamA.overUnder}</div>
                    <div className="stat-odds">-108</div>
                  </button>
                </div>
                <div className="moneyline-cell">
                  <button 
                    className={`bet-button ${isBetSelected('moneyline', 'A', selectedMatchup.teamA.moneyline) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('moneyline', 'A', selectedMatchup.teamA.moneyline)}
                    onClick={() => handleBetClick('moneyline', 'A', selectedMatchup.teamA.moneyline)}
                  >
                    <div className="moneyline-value">
                      {selectedMatchup.teamA.moneyline > 0 ? '+' : ''}{selectedMatchup.teamA.moneyline}
                    </div>
                  </button>
                </div>
              </div>

              {/* Team B */}
              <div className="team-stats-row">
                <div className="team-name-cell">
                  <div className="team-name-display">{selectedMatchup.teamB.name}</div>
                </div>
                <div className="spread-cell">
                  <button 
                    className={`bet-button ${isBetSelected('spread', 'B', selectedMatchup.teamB.spread) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('spread', 'B', selectedMatchup.teamB.spread)}
                    onClick={() => handleBetClick('spread', 'B', selectedMatchup.teamB.spread)}
                  >
                    <div className="stat-value">{Math.abs(selectedMatchup.teamB.spread)}</div>
                    <div className="stat-odds">{selectedMatchup.teamB.odds}</div>
                  </button>
                </div>
                <div className="total-cell">
                  <button 
                    className={`bet-button ${isBetSelected('total', 'B', 'U') ? 'selected' : ''}`}
                    disabled={shouldDisableBet('total', 'B', 'U')}
                    onClick={() => handleBetClick('total', 'B', 'U')}
                  >
                    <div className="stat-value">U {selectedMatchup.teamB.overUnder}</div>
                    <div className="stat-odds">-112</div>
                  </button>
                </div>
                <div className="moneyline-cell">
                  <button 
                    className={`bet-button ${isBetSelected('moneyline', 'B', selectedMatchup.teamB.moneyline) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('moneyline', 'B', selectedMatchup.teamB.moneyline)}
                    onClick={() => handleBetClick('moneyline', 'B', selectedMatchup.teamB.moneyline)}
                  >
                    <div className="moneyline-value">
                      {selectedMatchup.teamB.moneyline > 0 ? '+' : ''}{selectedMatchup.teamB.moneyline}
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Checkout button */}
              <div className="checkout-section">
                <button className="checkout-button" 
                disabled={!selectedBet}>
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Bracket Layout */}
        <div className="bracket-layout">
          {/* Top Section - West & East */}
          <div className="bracket-row">
            {/* West Region */}
            <div className="region-container">
              <h3 className="region-title">{regions[0].name} Region</h3>
              <BracketRegion
                region={regions[0]}
                onMatchupClick={handleMatchupClick}
              />
            </div>
            
            {/* East Region */}
            <div className="region-container">
              <h3 className="region-title">{regions[1].name} Region</h3>
              <BracketRegion 
                region={regions[1]}
                onMatchupClick={handleMatchupClick}
                reversed={true}
              />
            </div>
          </div>
          
          {/* Center Section - Final Four & Championship */}
          <div className="final-four-section">
            <h2 className="finals-title">FINAL FOUR</h2>
            
            <div className="semifinals-container">
              <div className="semifinal-box">
                <p>{regions[0].name} Winner</p>
                <p>vs</p>
                <p>{regions[3].name} Winner</p>
              </div>
              <div className="semifinal-box">
                <p>{regions[1].name} Winner</p>
                <p>vs</p>
                <p>{regions[2].name} Winner</p>
              </div>
            </div>
            
            <div className="championship-container">
              <h2 className="finals-title">NATIONAL CHAMPIONSHIP</h2>
              
              <div className="championship-box">
                <p>Semifinal #1 Winner</p>
                <p>vs</p>
                <p>Semifinal #2 Winner</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - South & Midwest */}
          <div className="bracket-row">
            {/* South Region */}
            <div className="region-container">
              <h3 className="region-title">{regions[2].name} Region</h3>
              <BracketRegion
                region={regions[2]}
                onMatchupClick={handleMatchupClick}
              />
            </div>
            
            {/* Midwest Region */}
            <div className="region-container">
              <h3 className="region-title">{regions[3].name} Region</h3>
              <BracketRegion 
                region={regions[3]}
                onMatchupClick={handleMatchupClick}
                reversed={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <BracketView />;
};

export default MarchMadnessBracket;