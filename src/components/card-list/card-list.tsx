import { useEffect } from 'react';
import s from './card-list.module.scss';
import { getGameState, deleteCards } from '../../store/ducks/game';
import {
  incrementAttempts,
  resetAttempts,
  setScore,
} from '../../store/ducks/player';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TCard } from '../../utils/prop-types';

// Components
import Card from '../card/card';

const CardList = () => {
  const dispatch = useAppDispatch();
  const { cardsList, activeCardsList, isMatched, settings } =
    useAppSelector(getGameState);

  useEffect(() => {
    if (isMatched) {
      dispatch(deleteCards());
      dispatch(
        setScore({
          collectionCount: settings.collectionCount,
          numberRange: settings.numberRange,
        })
      );
      dispatch(resetAttempts());
    }
  }, [dispatch, isMatched, settings]);

  useEffect(() => {
    if (activeCardsList.length === 1) {
      dispatch(incrementAttempts());
    }
  }, [dispatch, activeCardsList]);

  const checkActiveCard = (card: TCard): boolean =>
    activeCardsList.some((activeCard) => activeCard.id === card.id);

  return (
    <section className={s.container}>
      {cardsList.map((card) => (
        <Card
          key={card.id}
          card={card}
          isActive={checkActiveCard(card)}
          isHelpEnable={settings.isHelpEnable}
        />
      ))}
    </section>
  );
};

export default CardList;
