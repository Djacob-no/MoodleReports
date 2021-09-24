import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.$chartColors = {
  "lines": "rgb(44, 46, 56)",
  "text": "rgb(44, 46, 56)",
  "green": "#1cc88a",
  "hoverGreen": "rgb(44, 111, 56)",
  "red": "#e74a3b",
  "hoverRed": "rgb(222, 111, 56)",
  "blue": "#4e73df",
  "transblue": "#4e73df38",
  "orange": "#f6c23e",
  "info": "#4ee0f5",
  "primary": "#4ee0f5"
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

