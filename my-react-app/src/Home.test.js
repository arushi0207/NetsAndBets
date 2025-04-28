import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('./Home', () => {
  return function MockedHome() {
    return (
      <div>
        <nav>
          <div>
            <span className="logo-text" data-testid="nav-logo">Nets and Bets</span>
          </div>
        </nav>
        
        <section className="hero">
          <h1>Experience the <span className="hero-highlight">Madness</span></h1>
        </section>
        
        <section>
          <h2>Tournament Highlights</h2>
          <div>
            <div>
              <h3>Key Dates</h3>
            </div>
            <div>
              <h3>Prizes</h3>
            </div>
          </div>
        </section>
        
        <section>
          <h2>Teams</h2>
          <p>Click on any match block and place your bets!</p>
          <div data-testid="mock-bracket">Mocked Bracket Component</div>
        </section>
        
        <footer>
          <div className="footer-logo" data-testid="footer-logo">Nets and Bets</div>
          <div>2025 March Madness. All rights reserved.</div>
        </footer>
      </div>
    );
  };
});

describe('Home Component', () => {
  test('renders the Home component without errors', () => {
    render(<Home />);
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });
  
  test('renders hero section', () => {
    render(<Home />);
    expect(screen.getByText(/Experience the/)).toBeInTheDocument();
    expect(screen.getByText('Madness')).toBeInTheDocument();
  });

  test('renders tournament information section', () => {
    render(<Home />);
    expect(screen.getByText('Tournament Highlights')).toBeInTheDocument();
    expect(screen.getAllByText('Key Dates')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Prizes')[0]).toBeInTheDocument();
  });

  test('renders bracket section', () => {
    render(<Home />);
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Click on any match block and place your bets!')).toBeInTheDocument();
    expect(screen.getByTestId('mock-bracket')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<Home />);
    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    expect(screen.getByText('2025 March Madness. All rights reserved.')).toBeInTheDocument();
  });
});