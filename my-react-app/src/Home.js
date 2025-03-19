import React from "react";
import { Link } from 'react-router-dom';
import { CircleDollarSign, Calendar, Trophy } from "lucide-react";
import MarchMadnessBracket from './Bracket'; 

// This removes default padding and margins from the HTML and body elements
const globalStyles = `
  html, body {
    margin: 0;
    width: 100%;
    overflow-x: hidden;
  }
`;

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
      }}>
        
        {/* NavBar */}
        <nav style={{ 
          top: 0, 
          zIndex: 55, 
          width: "100%", 
          backgroundColor: "#363636", 
          borderBottom: "1px solid rgba(236, 231, 231, 0.12)"
        }}>
          <div style={{ 
            margin: "0 auto", 
            padding: "1rem 1rem", 
            display: "flex", 
            justifyContent: "space-between" 
          }}>
            {/* Logo */}
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
              <CircleDollarSign style={{ height: "1.8rem", width: "1.8rem", color: "#ED7014" }} />
              <span style={{ fontWeight: "bold", fontFamily: "Arial", fontSize: "1.5rem", color: "white" }}>Nets and Bets</span>
            </div>

            {/* Nav Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link to="/signup">
                <button style={{ 
                  backgroundColor: "#f97316", 
                  color: "white", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "0.3rem",
                  border: "none",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#BE5504"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#ED7014"}>
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button style={{ 
                  backgroundColor: "#ED7014",
                  color: "white", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "0.3rem",
                  border: "none",
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#BE5504"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#ED7014"}
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */} 
        <section style={{
          position: "relative",
          minHeight: "93vh",
          width: "100%",
          margin: 0,
          display: "flex",
          alignItems: "center",
          backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070')",
          backgroundSize: "cover"
        }}>

          {/* Background dark Overlay */}
          <div style={{ 
            inset: 0, 
            position: "absolute", 
            backgroundColor: "rgba(0, 0, 0, 0.7)" 
          }}/>

          {/* Content */}
          <div style={{ 
            width: "100%", 
            position: "relative", 
            textAlign: "center",
          }}>
            <h1 style={{ 
              fontSize: "2.5rem", 
              fontFamily: "Arial",
              fontWeight: 800, 
              color: "white", 
              marginBottom: "1rem" 
            }}>
              Experience the <span style={{ color: "#f97316", fontStyle: 'italic' }}>Madness</span>
            </h1>
            <p style={{ 
              fontSize: "1.5rem", 
              fontFamily: "Arial",
              color: "white", 
              maxWidth: "40rem", 
              margin: "0 auto", 
            }}>
              Join the ultimate college basketball tournament experience. Sign up or Log in to compete
              with fans nationwide.
            </p>
          </div>
        </section>

        {/* Tournament Information*/}
        <section style={{ 
          background: "linear-gradient(to bottom,rgba(249, 116, 22, 0.97),rgba(234, 90, 12, 0.92))", 
          padding: "3rem 0",
          width: "100%",
          margin: 0
        }}>
          {/* Content */}
          <div style={{ width: "100%"}}>
            <h2 style={{ 
              fontSize: "2.5rem", 
              fontFamily: "Arial",
              fontWeight: "bold", 
              color: "white", 
              textAlign: "center", 
              margin: "0 0 6rem 0"
            }}>Tournament Highlights</h2>

            <div style={{ 
              display: "grid", 
              gap: "2rem", 
              maxWidth: "50%", 
              margin: "0 auto",
            }}>

              {/* Cards */}

              {/* Key Dates */}
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.06)", 
                borderRadius: "0.7rem", 
                padding: "1rem", 
                color: "white" 
              }}>

                {/* Icon */}
                <div style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.15)", 
                  borderRadius: "10px", 
                  width: "3.5rem", 
                  height: "3.5rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                }}>
                  <Calendar style={{ height: "2rem", width: "2rem", color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "Arial",fontWeight: "bold", fontStyle: "italic", marginBottom: "0.75rem" }}>Key Dates</h3>
                <ul style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "0.8rem",
                  padding: 0,
                  listStyle: "none"
                }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>Selection Sunday:</span> March 12, 2025
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>First Four:</span> March 14-15, 2025
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>First Round:</span> March 16-17, 2025
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>Final Four:</span> April 1, 2025
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>Championship:</span> April 3, 2025
                  </li>
                </ul>
              </div>

              {/* Prizes */}
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.06)", 
                borderRadius: "0.7rem", 
                padding: "1rem", 
                color: "white" 
              }}>
                {/* Icon */}
                <div style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.15)", 
                  borderRadius: "10px", 
                  width: "3.5rem", 
                  height: "3.5rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                }}>
                  <Trophy style={{ height: "2rem", width: "2rem", color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "Arial",fontWeight: "bold", fontStyle: "italic", marginBottom: "0.75rem" }}>Prizes</h3>
                <ul style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "0.5rem",
                  padding: 0,
                  listStyle: "none"
                }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>1st Place:</span> $1,000 Gift Card
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>2nd Place:</span> $500 Gift Card
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>3rd Place:</span> $250 Gift Card
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Arial" }}>
                    <span style={{ fontWeight: "600" }}>Perfect Bracket:</span> $10,000 Grand Prize
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bracket */}
        <section style={{ 
          backgroundColor: "#001440", 
          width: "100%",
        }}>
          <div style={{ width: "100%", minHeight:"95vh" }}>
            <h2 style={{ 
              fontSize: "2rem",
              fontFamily: "Arial", 
              fontWeight: "bold", 
              color: "white", 
              textAlign: "center", 
            }}>Teams</h2>
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "Arial", fontSize: "1rem", margin: "0 0 2rem 0" }}> 
              Click on any match block and place your bets!
            </p>
            <MarchMadnessBracket />
          </div>
        </section>

        {/* Website Footer */}
        <footer style={{ 
          backgroundColor: "black", 
          fontFamily: "Arial",
          color: "white", 
          padding: "1.5rem 0",
          width: "100%",
        }}>
          <div style={{ width: "100%"}}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              alignItems: "center" 
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                marginBottom: "1rem" 
              }}>
                <CircleDollarSign style={{ height: "1.5rem", width: "1.5rem", color: "#ED7014" }} />
                <span style={{ fontWeight: "bold" }}>Nets and Bets</span>
              </div>
              <div style={{ color: "white", fontSize: "0.875rem" }}>
                2025 March Madness. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}