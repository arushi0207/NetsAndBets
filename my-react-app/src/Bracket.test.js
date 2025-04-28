import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MarchMadnessBracket from './Bracket';

global.fetch = jest.fn();

describe('MarchMadnessBracket', () => {
  const mockTeams = [
    { id: 1, name: 'Gonzaga', seed: 1, region: 'West', winsPerRound: '4,2,1,0' },
    { id: 2, name: 'Baylor', seed: 2, region: 'West', winsPerRound: '3,2,0,0' },
    { id: 3, name: 'Michigan', seed: 1, region: 'East', winsPerRound: '4,3,2,0' },
    { id: 4, name: 'Duke', seed: 2, region: 'East', winsPerRound: '3,1,0,0' },
    { id: 5, name: 'Alabama', seed: 1, region: 'South', winsPerRound: '4,3,1,0' },
    { id: 6, name: 'Houston', seed: 2, region: 'South', winsPerRound: '3,2,0,0' },
    { id: 7, name: 'Illinois', seed: 1, region: 'Midwest', winsPerRound: '3,2,1,0' },
    { id: 8, name: 'Iowa', seed: 2, region: 'Midwest', winsPerRound: '2,1,0,0' }
  ];

  beforeEach(() => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTeams
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the bracket component', async () => {
    render(<MarchMadnessBracket />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    
    expect(document.querySelector('.round.round-1')).toBeInTheDocument();
    expect(document.querySelector('.round.round-2')).toBeInTheDocument();
    expect(document.querySelector('.round.sweet-16')).toBeInTheDocument();
    expect(document.querySelector('.round.elite-8')).toBeInTheDocument();
  });

  test('processes team data correctly', async () => {
    render(<MarchMadnessBracket />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(document.querySelector('.bracket-box')).toBeInTheDocument();
    });
  });

  test('bracket has appropriate navigation sections', async () => {
    const { container } = render(<MarchMadnessBracket />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    
    const navigationButtons = container.querySelectorAll('button');
    expect(navigationButtons.length).toBeGreaterThan(0);
  });
});