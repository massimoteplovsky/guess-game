import { useRef } from 'react';
import s from './game-menu.module.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  getGameState,
  setSettings,
  resetGame,
  setGame,
} from '../../store/ducks/game';
import { resetPlayer } from '../../store/ducks/player';

const GameMenu = () => {
  const dispatch = useAppDispatch();
  const { isGameRun, isGameOver } = useAppSelector(getGameState);
  const collectionCountRef = useRef<HTMLSelectElement>();
  const numberRangeRef = useRef<HTMLSelectElement>();
  const helpRef = useRef<HTMLInputElement>();

  const handleResetGame = () => {
    dispatch(resetGame());
    dispatch(resetPlayer());
  };

  const handleInitGame = () => {
    dispatch(
      setSettings({
        collectionCount: parseInt(collectionCountRef.current.value, 10),
        numberRange: parseInt(numberRangeRef.current.value, 10),
        isHelpEnable: helpRef.current.checked,
      })
    );
    dispatch(setGame());
  };

  if (isGameRun) {
    return (
      <div className={s.container}>
        <button onClick={handleResetGame}>
          {isGameOver ? 'Начать заново' : 'Остановить игру'}
        </button>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h2>Параметры</h2>
      <div className={s.settingsContainer}>
        <div className={s.settingsBlock}>
          <label htmlFor="number-range">
            Числовой диапазон (от 1 до{' '}
            <select id="number-range" ref={numberRangeRef}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            ?)
          </label>
        </div>
        <div className={s.settingsBlock}>
          <label htmlFor="collection-count">
            Коллекция из{' '}
            <select id="collection-count" ref={collectionCountRef}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>{' '}
            чисел
          </label>
        </div>
        <div className={s.settingsBlock}>
          <label htmlFor="help">
            Помощь <input id="help" type="checkbox" ref={helpRef} />
          </label>
        </div>
        <button onClick={handleInitGame}>Поехали</button>
      </div>
    </div>
  );
};

export default GameMenu;
