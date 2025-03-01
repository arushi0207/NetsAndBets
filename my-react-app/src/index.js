import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Wrap entire application within BrowserRouter to enable client-side routing
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
