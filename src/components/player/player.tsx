import cn from 'classnames';
import s from './player.module.scss';
import { useAppSelector } from '../../store/hooks';
import { getPlayerState } from '../../store/ducks/player';
import {
  getGameState,
  getGuessedCollectionsSelector,
} from '../../store/ducks/game';
import { declOfNum } from '../../utils/helpers';

const Player = () => {
  const { attemptsCount, score } = useAppSelector(getPlayerState);
  const {
    settings: { numberRange, collectionCount },
    isGameOver,
  } = useAppSelector(getGameState);
  const collections = useAppSelector(getGuessedCollectionsSelector);

  return (
    <div className={s.container}>
      <h2>Игрок</h2>
      <ul className={s.statisticsList}>
        <li>Максимальные очки за попытку: {numberRange * collectionCount}</li>
        <li>Попытки: {attemptsCount}</li>
        <li className={cn({ [s.totalScore]: isGameOver })}>
          {isGameOver
            ? `Вы набрали ${score} ${declOfNum(score, [
                'очко',
                'очка',
                'очков',
              ])}`
            : `Очки: ${score}`}
        </li>
        <li>
          Угаданные коллекции:{' '}
          {collections.length
            ? collections.map((collection) => `${collection} `)
            : 0}
        </li>
      </ul>
    </div>
  );
};

export default Player;
