import React, { FC, memo, useEffect, useState } from 'react';
import cn from 'classnames';
import s from './card.module.scss';
import { TCard } from '../../utils/prop-types';
import { useAppDispatch } from '../../store/hooks';
import { setActiveCardsList } from '../../store/ducks/game';

type TComponentProps = {
  card: TCard;
  isActive: boolean;
  isHelpEnable: boolean;
};

const Card: FC<TComponentProps> = ({ card, isActive, isHelpEnable }) => {
  const dispatch = useAppDispatch();
  const [isHelpMode, setHelpMode] = useState(isHelpEnable);
  const handleSetActive = () => {
    dispatch(setActiveCardsList(card));
  };

  useEffect(() => {
    setTimeout(() => {
      setHelpMode(false);
    }, 3000);
  }, [isHelpMode]);

  return (
    <div
      className={cn(s.card, {
        [s.cardActive]: isActive || isHelpMode,
        [s.cardMatched]: card.isFound,
      })}
      {...(!isActive && !card.isFound && { onClick: handleSetActive })}
    >
      {isActive || card.isFound || isHelpMode ? card.value : null}
    </div>
  );
};

export default memo(Card);
