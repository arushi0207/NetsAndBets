import logo from './logo.svg';
import React from 'react';
import './App.css';
import MessageComponent from './components/MessageComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>March Madness</p>
        <MessageComponent />
      </header>
    </div>
  );
}

export default App;
