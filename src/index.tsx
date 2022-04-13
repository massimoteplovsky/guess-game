import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './style.scss';

// Components
import Game from './components/game/game';

const root = ReactDOM.createRoot(
  document.getElementById('main') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>
);

module.hot.accept();
