import React, { useState } from 'react';

const MarchMadnessBracket = () => {
  // Tournament Data with all four regions
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

  // State for tracking which matchup is selected
  const [selectedMatchup, setSelectedMatchup] = useState(null);

  // Function to create matchup groups (first round: 1-16, 8-9, etc.)
  const createFirstRoundMatchups = (teams) => {
    const matchups = [];
    for (let i = 0; i < teams.length; i += 2) {
      matchups.push({
        id: `${teams[i].seed}-${teams[i+1].seed}`,
        teamA: teams[i],
        teamB: teams[i+1]
      });
    }
    return matchups;
  };

  // Handle clicking on a matchup
  const handleMatchupClick = (matchup) => {
    setSelectedMatchup(matchup);
  };

  // Create first round matchups for each region
  const regions = tournamentData.regions.map(region => ({
    ...region,
    firstRound: createFirstRoundMatchups(region.teams)
  }));

  // Simplified component for displaying a single matchup
  const MatchupBox = ({ teamA, teamB, onClick }) => (
    <div 
      className="matchup-box"
      onClick={onClick}
      style={{ 
        border: '2px solid black', //new change
        borderRadius: '2px',
        marginBottom: '2px',
        cursor: 'pointer',
        //backgroundColor: 'black',
        width: '200px'
      }}
    >
      <div style={{ 
        borderBottom: '3px solid brown', 
        padding: '3px 8px',
        display: 'flex',
        height: '22px',
        
        alignItems: 'center'
      }}>
        <span style={{ 
          minWidth: '20px', 
          fontWeight: 'bold',
          marginRight: '4px',
          fontSize: '14px'
        }}>{teamA.seed}</span>
        <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {teamA.name}
        </span>
      </div>
      <div style={{ 
        padding: '3px 8px',
        display: 'flex',
        height: '22px',
        alignItems: 'center'
      }}>
        <span style={{ 
          minWidth: '20px', 
          fontWeight: 'bold',
          marginRight: '4px',
          fontSize: '14px'
        }}>{teamB.seed}</span>
        <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {teamB.name}
        </span>
      </div>
    </div>
  );

  // Main component for the entire bracket view
  const BracketView = () => {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1600px',
        backgroundColor: '#c8e6c9', // new change
        paddingRight: '15px', 
        paddingLeft: '10px', 
        marginTop: '250px',    // Change this line to add more white space 


      }}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>NCAA March Madness Bracket 2025</h1>
        
     {/* Display Selected Matchup Odds */}
{selectedMatchup && (
  <div style={{ 
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '950px',
    width: '90%',
    backgroundColor: '#1c1c1c',
    color: 'white',
    border: '1px solid #333',
    borderRadius: '4px',
    overflow: 'hidden',
    zIndex: 100,
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
  }}>
    {/* Close Button */}
    <div 
      onClick={() => setSelectedMatchup(null)}
      style={{
        position: 'absolute',
        top: '00px',
        right: '00px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#ff5252',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        
      }}
    >
      ×
    </div>
    
    <div style={{ padding: '0' }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '35% 20% 20% 25%',
        borderBottom: '1px solid #333',
        fontSize: '14px'
      }}>
        <div style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>
          TEAMS
        </div>
        <div style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', borderLeft: '1px solid #333' }}>
          SPREAD
        </div>
        <div style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', borderLeft: '1px solid #333' }}>
          TOTAL
        </div>
        <div style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold', borderLeft: '1px solid #333' }}>
          ML
        </div>
      </div>
      
      {/* Team A Row */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '35% 20% 20% 25%',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ 
          padding: '20px 15px', 
          display: 'flex', 
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
            {selectedMatchup.teamA.name}
          </div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>+{Math.abs(selectedMatchup.teamA.spread)}</div>
          <div style={{ color: '#4caf50', marginTop: '6px', fontSize: '14px' }}>-112</div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>O {selectedMatchup.teamA.overUnder}</div>
          <div style={{ color: '#4caf50', marginTop: '6px', fontSize: '14px' }}>-108</div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ 
            color: '#4caf50', 
            fontSize: '17px', 
            fontWeight: 'bold' 
          }}>
            {selectedMatchup.teamA.moneyline > 0 ? '+' : ''}{selectedMatchup.teamA.moneyline}
          </div>
        </div>
      </div>
      
      {/* Team B Row */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '35% 20% 20% 25%'
      }}>
        <div style={{ 
          padding: '20px 15px', 
          display: 'flex', 
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
            {selectedMatchup.teamB.name}
          </div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>-{Math.abs(selectedMatchup.teamB.spread)}</div>
          <div style={{ color: '#4caf50', marginTop: '6px', fontSize: '14px' }}>-108</div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ fontSize: '17px', fontWeight: 'bold' }}>U {selectedMatchup.teamB.overUnder}</div>
          <div style={{ color: '#4caf50', marginTop: '6px', fontSize: '14px' }}>-112</div>
        </div>
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #333'
        }}>
          <div style={{ 
            color: '#4caf50', 
            fontSize: '17px', 
            fontWeight: 'bold' 
          }}>
            {selectedMatchup.teamB.moneyline > 0 ? '+' : ''}{selectedMatchup.teamB.moneyline}
          </div>
        </div>
      </div>
      
      {/* Added padding section */}
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          style={{
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onClick={() => console.log("Checkout clicked")}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  </div>
)}
        
        {/* Main Bracket Layout - Using horizontal arrangement */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Section - West & East */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            {/* West Region */}
            <div style={{ width: '45%' }}>
              <h3 style={{ textAlign: 'center' }}>{regions[0].name} Region</h3>
              <BracketRegion 
                region={regions[0]} 
                onMatchupClick={handleMatchupClick} 
              />
            </div>
            
            {/* East Region */}
            <div style={{ width: '45%' }}>
              <h3 style={{ textAlign: 'center' }}>{regions[1].name} Region</h3>
              <BracketRegion 
                region={regions[1]} 
                onMatchupClick={handleMatchupClick}
                reversed={true}
              />
            </div>
          </div>
          
          {/* Center Section - Final Four & Championship */}
          <div style={{ 
            width: '100%', 
            textAlign: 'center',
            margin: '5px 0'
          }}>
            <h2>FINAL FOUR</h2>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-around',
              margin: '5px 0'
            }}>
              <div style={{ 
                border: '2px solid black',
                padding: '8px',
                width: '250px'
              }}>
                <p>{regions[0].name} Winner</p>
                <p>vs</p>
                <p>{regions[3].name} Winner</p>
              </div>
              <div style={{ 
                border: '2px solid black',
                padding: '8px',
                width: '250px'
              }}>
                <p>{regions[1].name} Winner</p>
                <p>vs</p>
                <p>{regions[2].name} Winner</p>
              </div>
            </div>
            <div style={{ margin: '10px 0' }}>
              <h2>NATIONAL CHAMPIONSHIP</h2>
              
              <div style={{ 
                border: '2px solid black',
                padding: '8px',
                width: '300px',
                margin: '0 auto'
              }}>
                <p>Semifinal #1 Winner</p>
                <p>vs</p>
                <p>Semifinal #2 Winner</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Section - South & Midwest */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}>
            {/* South Region */}
            <div style={{ width: '45%' }}>
              <h3 style={{ textAlign: 'center' }}>{regions[2].name} Region</h3>
              <BracketRegion 
                region={regions[2]} 
                onMatchupClick={handleMatchupClick} 
              />
            </div>
            
            {/* Midwest Region */}
            <div style={{ width: '45%' }}>
              <h3 style={{ textAlign: 'center' }}>{regions[3].name} Region</h3>
              <BracketRegion 
                region={regions[3]} 
                onMatchupClick={handleMatchupClick}
                reversed={true}
              />
            </div>
          </div>
        </div>
        
        {!selectedMatchup && (
          <div style={{ 
            textAlign: 'center',
            margin: '20px 0',
            color: '#666'
          }}>
            Click on any first round matchup to view betting odds
          </div>
        )}
      </div>
    );
  };


// Component for a single region's bracket
const BracketRegion = ({ region, onMatchupClick, reversed = false }) => {
    // Groups of matchups
    const round1MatchupsTop = region.firstRound.slice(0, 4);
    const round1MatchupsBottom = region.firstRound.slice(4, 8);
    
    // Layout direction
    const direction = reversed ? 'row-reverse' : 'row';
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Round titles */}
        <div style={{ 
          display: 'flex',
          flexDirection: direction,
          marginBottom: '5px'
        }}>
          <div style={{ width: '200px' }}></div>
          <div style={{ 
            width: '170px', 
            textAlign: 'center', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Round 2
          </div>
          <div style={{ 
            width: '170px', 
            textAlign: 'center', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Sweet 16
          </div>
          <div style={{ 
            width: '150px', 
            textAlign: 'center', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Elite 8
          </div>
        </div>

        {/* Top Half of Region */}
        <div style={{ 
          display: 'flex',
          flexDirection: direction,
          marginBottom: '10px'
        }}>
          {/* First Round */}
          <div style={{ 
            width: '200px',
            flexShrink: 0
          }}>
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
          <div style={{ 
            position: 'relative',
            height: '200px',
            width: '170px'
          }}>
            {/* Round 2 box BETWEEN 1/16 and 8/9 matchups */}
            <div style={{ 
              position: 'absolute',
              top: '35px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>

            </div>
            
            {/* Round 2 box BETWEEN 5/12 and 4/13 matchups */}
            <div style={{ 
              position: 'absolute',
              top: '155px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
          </div>
          
          {/* Sweet 16 */}
          <div style={{ 
            position: 'relative',
            height: '200px',
            width: '170px'
          }}>
            {/* Sweet 16 box - centered between the two Round 2 boxes */}
            <div style={{ 
              position: 'absolute',
              top: '95px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
          </div>
          
          {/* Elite 8 */}
          <div style={{ 
            position: 'relative',
            height: '200px',
            width: '150px'
          }}>
            {/* Elite 8 box - at same position as Sweet 16 box */}
            <div style={{ 
              position: 'absolute',
              top: '200px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Half of Region */}
        <div style={{ 
          display: 'flex',
          flexDirection: direction
        }}>
          {/* First Round */}
          <div style={{ 
            width: '200px',
            flexShrink: 0
          }}>
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
          <div style={{ 
            position: 'relative',
            height: '200px',
            width: '150px'
          }}>
            {/* First Round 2 box - Between 6/11 and 3/14 matchups */}
            <div style={{ 
              position: 'absolute',
              top: '35px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
            
            {/* Second Round 2 box - Between 7/10 and 2/15 matchups */}
            <div style={{ 
              position: 'absolute',
              top: '155px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
          </div>
          
          {/* Sweet 16 */}
          <div style={{ 
            position: 'relative',
            height: '200px',
            width: '150px'
          }}>
            {/* Sweet 16 box - centered between the two Round 2 boxes */}
            <div style={{ 
              position: 'absolute',
              top: '95px',
              left: 0,
              height: '40px',
              width: '100%',
              border: '2px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '2px', backgroundColor: 'black', position: 'absolute', left: 0 }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <BracketView />;
};

export default MarchMadnessBracket;
