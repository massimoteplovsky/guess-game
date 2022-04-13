import React from 'react';
import s from './game.module.scss';

// Components
import GameMenu from '../game-menu/game-menu';
import Dashboard from '../dashboard/dashboard';

const Game = () => {
  return (
    <div className={s.container}>
      <GameMenu />
      <Dashboard />
    </div>
  );
};

export default Game;
