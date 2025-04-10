import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Bracket.css';

const MarchMadnessBracket = () => {
  const [active, setActive] = useState('WestEast');
  const [selectedBet, setSelectedBet] = useState(null);
  const [selectedMatchup, setSelectedMatchup] = useState(null);

  const [tournamentData, setTournamentData] = useState({
    regions: [
      { name: 'West', teams: [] },
      { name: 'East', teams: [] },
      { name: 'South', teams: [] },
      { name: 'Midwest', teams: [] }
    ]
  });

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("http://localhost:8080/demo/teams");
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        console.log("Fetched Teams:", data);
        const processedData = processTeamData(data);
        setTournamentData(processedData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchTeams();
  }, []);

  const processTeamData = (data) => {
    const regionGroups = { 'West': [], 'East': [], 'South': [], 'Midwest': [] };
    data.forEach(team => {
      if (regionGroups[team.region]) {
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

  const getWinner = (teamA, teamB) => {
    const teamAWins = teamA?.winsPerRound?.split(',').map(Number) || [];
    const teamBWins = teamB?.winsPerRound?.split(',').map(Number) || [];
  
    const teamAWinsTotal = teamAWins.reduce((sum, val) => sum + val, 0);
    const teamBWinsTotal = teamBWins.reduce((sum, val) => sum + val, 0);
  
    if (teamAWinsTotal > teamBWinsTotal) return teamA;
    if (teamBWinsTotal > teamAWinsTotal) return teamB;
  
    return null; // if tied
  };


  const handleMatchupClick = (matchup) => {
    setSelectedMatchup(matchup);
    setSelectedBet(null);
  };

  const handleBetClick = (betType, team, value) => {
    if (selectedBet && selectedBet.betType === betType && selectedBet.team === team && selectedBet.value === value) {
      setSelectedBet(null);
      localStorage.removeItem('selectedBet');
    } else {
      const newSelectedBet = {
        betType,
        team,
        value,
        matchup: `${selectedMatchup.teamA?.name} vs ${selectedMatchup.teamB?.name}`,
        teamA: selectedMatchup.teamA?.name,
        teamB: selectedMatchup.teamB?.name,
        odds: team === 'A' ? selectedMatchup.teamA?.odds : selectedMatchup.teamB?.odds,
        overUnder: betType === 'total' ? selectedMatchup.teamA?.overUnder : undefined
      };
      setSelectedBet(newSelectedBet);
      localStorage.setItem('selectedBet', JSON.stringify(newSelectedBet));
    }
  };

  const isBetSelected = (betType, team, value) => {
    return selectedBet &&
      selectedBet.betType === betType &&
      selectedBet.team === team &&
      selectedBet.value === value;
  };

  const shouldDisableBet = (betType, team, value) => {
    return selectedBet && !isBetSelected(betType, team, value);
  };

  const createFirstRoundMatchups = (teams) => {
    const matchups = [];
    for (let i = 0; i < teams.length; i += 2) {
      matchups.push({ teamA: teams[i], teamB: teams[i+1] });
    }
    return matchups;
  };

  const regions = tournamentData.regions.map(region => ({
    ...region,
    firstRound: createFirstRoundMatchups(region.teams)
  }));

 

  const MatchupBox = ({ teamA, teamB, onClick }) => (
    <div className="matchup-box" onClick={onClick}>
      <div className="team-row team-a">
        <span className="team-seed">{teamA?.seed}</span>
        <span className="team-name">{teamA?.name}</span>
      </div>
      <div className="team-row team-b">
        <span className="team-seed">{teamB?.seed}</span>
        <span className="team-name">{teamB?.name}</span>
      </div>
    </div>
  );

  const BracketRegion = ({ region, onMatchupClick, reversed = false }) => {
    const round1MatchupsTop = region.firstRound.slice(0, 4);
    const round1MatchupsBottom = region.firstRound.slice(4, 8);

    

    // Second Round Winners
    const secondRoundTop = [{ teamA: getWinner(round1MatchupsTop?.[0]?.teamA, round1MatchupsTop?.[0]?.teamB), teamB: getWinner(round1MatchupsTop?.[1]?.teamA, round1MatchupsTop?.[1]?.teamB) }];
    const secondRoundBottom = [{ teamA: getWinner(round1MatchupsTop?.[2]?.teamA, round1MatchupsTop?.[2]?.teamB), teamB: getWinner(round1MatchupsTop?.[3]?.teamA, round1MatchupsTop?.[3]?.teamB) }];
    const secondRoundTopBottom = [{ teamA: getWinner(round1MatchupsBottom?.[0]?.teamA, round1MatchupsBottom?.[0]?.teamB), teamB: getWinner(round1MatchupsBottom?.[1]?.teamA, round1MatchupsBottom?.[1]?.teamB) }];
    const secondRoundBottomBottom = [{ teamA: getWinner(round1MatchupsBottom?.[2]?.teamA, round1MatchupsBottom?.[2]?.teamB), teamB: getWinner(round1MatchupsBottom?.[3]?.teamA, round1MatchupsBottom?.[3]?.teamB) }];

    // Sweet 16 Winners
    const sweet16Top = getWinner(secondRoundTop[0].teamA, secondRoundTop[0].teamB);

    const sweet16Bottom = getWinner(secondRoundBottom?.[0]?.teamA, secondRoundBottom?.[0]?.teamB);
    const sweet16TopBottom = getWinner(secondRoundTopBottom?.[0]?.teamA, secondRoundTopBottom?.[0]?.teamB);
    const sweet16BottomBottom = getWinner(secondRoundBottomBottom?.[0]?.teamA, secondRoundBottomBottom?.[0]?.teamB);

    const elite8Top = getWinner(sweet16Top, sweet16Bottom);
    const elite8Bottom = getWinner(sweet16TopBottom, sweet16BottomBottom);

    const elite8Matchup = {
      teamA: elite8Top,
      teamB: elite8Bottom
    };

    const regionElement = (
      <div className={`bracket-region ${reversed ? 'reversed' : ''}`}>
        <div className="round-titles">
          <div className="spacer"></div>
          <div className="round-title">Round 2</div>
          <div className="round-title">Sweet 16</div>
          <div className="round-title">Elite 8</div>
        </div>

        {/* Top Half */}
        <div className="region-half top-half">
          <div className="round round-1">
            {round1MatchupsTop.map((matchup, idx) => (
              <MatchupBox key={`${region.name}-top-${idx}`} teamA={matchup.teamA} teamB={matchup.teamB} onClick={() => onMatchupClick(matchup)} />
            ))}
          </div>

          <div className="round round-2">
          <div className="bracket-box top" onClick={() => onMatchupClick(secondRoundTop[0])}>
            {secondRoundTop?.[0]?.teamA?.name} <br /> {secondRoundTop?.[0]?.teamB?.name}
          </div>
          <div className="bracket-box bottom" onClick={() => onMatchupClick(secondRoundBottom[0])}>
            {secondRoundBottom?.[0]?.teamA?.name} <br /> {secondRoundBottom?.[0]?.teamB?.name}
          </div>
        </div>

        <div className="round sweet-16">
          <div className="bracket-box" onClick={() => onMatchupClick({
            teamA: sweet16Top,
            teamB: sweet16Bottom
          })}>
            {sweet16Top?.name} <br /> {sweet16Bottom?.name}
          </div>
        </div>


        <div className="round elite-8">
          <div className="bracket-box elite" onClick={() => onMatchupClick(elite8Matchup)}>
            {elite8Matchup?.teamA?.name} <br /> {elite8Matchup?.teamB?.name}
          </div>
        </div>
        </div>

        {/* Bottom Half */}
        <div className="region-half bottom-half">
          <div className="round round-1">
            {round1MatchupsBottom.map((matchup, idx) => (
              <MatchupBox key={`${region.name}-bottom-${idx}`} teamA={matchup.teamA} teamB={matchup.teamB} onClick={() => onMatchupClick(matchup)} />
            ))}
          </div>

         
          <div className="round round-2">
            <div className="bracket-box top" onClick={() => onMatchupClick(secondRoundTopBottom[0])}>
              {secondRoundTopBottom?.[0]?.teamA?.name} <br /> {secondRoundTopBottom?.[0]?.teamB?.name}
            </div>
            <div className="bracket-box bottom" onClick={() => onMatchupClick(secondRoundBottomBottom[0])}>
              {secondRoundBottomBottom?.[0]?.teamA?.name} <br /> {secondRoundBottomBottom?.[0]?.teamB?.name}
            </div>
          </div>

          <div className="round sweet-16">
          <div className="bracket-box" onClick={() => onMatchupClick({
            teamA: sweet16TopBottom,
            teamB: sweet16BottomBottom
          })}>
            {sweet16TopBottom?.name} <br /> {sweet16BottomBottom?.name}
          </div>
        </div>

          <div className="round elite-8">
            <div className="bracket-box elite" style={{ visibility: 'hidden' }}>
              spacer
            </div>
          </div>
        </div>
        
      </div>
      
    );

    const regionWinner = getWinner(elite8Matchup?.teamA, elite8Matchup?.teamB);

    return { element: regionElement, winner: regionWinner };
  };

  

  const BracketView = () => {
    const westRegion = BracketRegion({ region: regions[0], onMatchupClick: handleMatchupClick });
      const eastRegion = BracketRegion({ region: regions[1], onMatchupClick: handleMatchupClick, reversed: true });
      const southRegion = BracketRegion({ region: regions[2], onMatchupClick: handleMatchupClick });
      const midwestRegion = BracketRegion({ region: regions[3], onMatchupClick: handleMatchupClick, reversed: true });
    
    const renderActive = () => {
      
      switch (active) {
        case 'WestEast':
          return (
            <div className="bracket-row">
              <div className="region-container">
                <h3 className="region-title">West Region</h3>
                {westRegion.element}
              </div>
              <div className="region-container">
                <h3 className="region-title">East Region</h3>
                {eastRegion.element}
              </div>
            </div>
          );
        case 'SouthMidwest':
          return (
            <div className="bracket-row">
              <div className="region-container">
                <h3 className="region-title">{regions[2].name} Region</h3>
                {southRegion.element}
              </div>
              <div className="region-container">
                <h3 className="region-title">{regions[3].name} Region</h3>
                {midwestRegion.element}
              </div>
            </div>
          );
          case 'FinalFour':
          const semifinal1Matchup = {
            teamA: southRegion.winner,
            teamB: westRegion.winner
          };

          const semifinal2Matchup = {
            teamA: eastRegion.winner,
            teamB: midwestRegion.winner
          };

          const finalMatchup = {
            teamA: getWinner(semifinal1Matchup.teamA, semifinal1Matchup.teamB),
            teamB: getWinner(semifinal2Matchup.teamA, semifinal2Matchup.teamB)
          };

          return (
            <div className="final-four-section">
              <h2 className="finals-title">FINAL FOUR</h2>

              <div className="semifinals-container">
                <div className="semifinal-box" onClick={() => handleMatchupClick(semifinal1Matchup)}>
                  <p>{semifinal1Matchup.teamA?.name || 'South Winner'}</p>
                  <p>vs</p>
                  <p>{semifinal1Matchup.teamB?.name || 'West Winner'}</p>
                </div>
                <div className="semifinal-box" onClick={() => handleMatchupClick(semifinal2Matchup)}>
                  <p>{semifinal2Matchup.teamA?.name || 'East Winner'}</p>
                  <p>vs</p>
                  <p>{semifinal2Matchup.teamB?.name || 'Midwest Winner'}</p>
                </div>
              </div>

              <div className="championship-container">
                <h2 className="finals-title">NATIONAL CHAMPIONSHIP</h2>
                <div className="championship-box" onClick={() => handleMatchupClick(finalMatchup)}>
                  <p>{finalMatchup.teamA?.name || 'Semifinal #1 Winner'}</p>
                  <p>vs</p>
                  <p>{finalMatchup.teamB?.name || 'Semifinal #2 Winner'}</p>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
    return (
       
      <div className="bracket-container">
        {/* View selection buttons */}
        <div className="bracket-view">
          <button onClick={() => setActive('WestEast')} className={active === 'WestEast' ? 'active' : ''}>
            West & East Regions
          </button>
          <button onClick={() => setActive('SouthMidwest')} className={active === 'SouthMidwest' ? 'active' : ''}>
            South & Midwest Regions
          </button>
          <button onClick={() => setActive('FinalFour')} className={active === 'FinalFour' ? 'active' : ''}>
            Final Four & Championship
          </button>
        </div>

        {/* Betting odds popup */}
        {selectedMatchup && (
          <div className="matchup-popup">
            <div className="close-button" onClick={() => setSelectedMatchup(null)}>×</div>
            <div className="popup-content">
              <div className="popup-header">
                <div className="header-teams">TEAMS</div>
                <div className="header-spread">SPREAD</div>
                <div className="header-total">TOTAL</div>
                <div className="header-ml">ML</div>
              </div>

              {/* Team A Row */}
              <div className="team-stats-row">
                <div className="team-name-cell">
                  <div className="team-name-display">{selectedMatchup.teamA?.name}</div>
                </div>
                <div className="spread-cell">
                  <button
                    className={`bet-button ${isBetSelected('spread', 'A', selectedMatchup.teamA?.spread) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('spread', 'A', selectedMatchup.teamA?.spread)}
                    onClick={() => handleBetClick('spread', 'A', selectedMatchup.teamA?.spread)}
                  >
                    <div className="stat-value">{selectedMatchup.teamA?.spread}</div>
                    <div className="stat-odds">{selectedMatchup.teamA?.odds}</div>
                  </button>
                </div>
                <div className="total-cell">
                  <button
                    className={`bet-button ${isBetSelected('total', 'A', 'O') ? 'selected' : ''}`}
                    disabled={shouldDisableBet('total', 'A', 'O')}
                    onClick={() => handleBetClick('total', 'A', 'O')}
                  >
                    <div className="stat-value">O {selectedMatchup.teamA?.overUnder}</div>
                    <div className="stat-odds">-108</div>
                  </button>
                </div>
                <div className="moneyline-cell">
                  <button
                    className={`bet-button ${isBetSelected('moneyline', 'A', selectedMatchup.teamA?.moneyline) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('moneyline', 'A', selectedMatchup.teamA?.moneyline)}
                    onClick={() => handleBetClick('moneyline', 'A', selectedMatchup.teamA?.moneyline)}
                  >
                    <div className="moneyline-value">
                      {selectedMatchup.teamA?.moneyline > 0 ? '+' : ''}{selectedMatchup.teamA?.moneyline}
                    </div>
                  </button>
                </div>
              </div>

              {/* Team B Row */}
              <div className="team-stats-row">
                <div className="team-name-cell">
                  <div className="team-name-display">{selectedMatchup.teamB?.name}</div>
                </div>
                <div className="spread-cell">
                  <button
                    className={`bet-button ${isBetSelected('spread', 'B', selectedMatchup.teamB?.spread) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('spread', 'B', selectedMatchup.teamB?.spread)}
                    onClick={() => handleBetClick('spread', 'B', selectedMatchup.teamB?.spread)}
                  >
                    <div className="stat-value">{Math.abs(selectedMatchup.teamB?.spread)}</div>
                    <div className="stat-odds">{selectedMatchup.teamB?.odds}</div>
                  </button>
                </div>
                <div className="total-cell">
                  <button
                    className={`bet-button ${isBetSelected('total', 'B', 'U') ? 'selected' : ''}`}
                    disabled={shouldDisableBet('total', 'B', 'U')}
                    onClick={() => handleBetClick('total', 'B', 'U')}
                  >
                    <div className="stat-value">U {selectedMatchup.teamB?.overUnder}</div>
                    <div className="stat-odds">-112</div>
                  </button>
                </div>
                <div className="moneyline-cell">
                  <button
                    className={`bet-button ${isBetSelected('moneyline', 'B', selectedMatchup.teamB?.moneyline) ? 'selected' : ''}`}
                    disabled={shouldDisableBet('moneyline', 'B', selectedMatchup.teamB?.moneyline)}
                    onClick={() => handleBetClick('moneyline', 'B', selectedMatchup.teamB?.moneyline)}
                  >
                    <div className="moneyline-value">
                      {selectedMatchup.teamB?.moneyline > 0 ? '+' : ''}{selectedMatchup.teamB?.moneyline}
                    </div>
                  </button>
                </div>
              </div>

              {/* Checkout button */}
              <div className="checkout-section">
                <Link to="/checkout">
                  <button className="checkout-button" disabled={!selectedBet}>
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Bracket Layout */}
        <div className="bracket-layout">
          {renderActive()}
        </div>
      </div>
    );
  };

  return <BracketView />;
};

export default MarchMadnessBracket;