import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(<App />);

module.hot.accept();
