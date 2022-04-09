import React, { FC } from 'react';
import s from './App.module.css';
import Test from './Test';

const App: FC = () => {
  return (
    <div className={s.test}>
      My App <img src="./images/house3.jpg" alt="image" />
      <Test />
    </div>
  );
};

export default App;
