import s from './dashboard.module.scss';
import { useAppSelector } from '../../store/hooks';
import { getCardsListCountSelector } from '../../store/ducks/game';

// Components
import CardList from '../card-list/card-list';
import Player from '../player/player';

const Dashboard = () => {
  const cardsListCount = useAppSelector(getCardsListCountSelector);

  if (!cardsListCount) {
    return (
      <div className={s.emptyContainer}>
        <h1>Начните игру</h1>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Player />
      <CardList />
    </div>
  );
};

export default Dashboard;
