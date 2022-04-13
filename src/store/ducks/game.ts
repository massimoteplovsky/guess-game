import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TCard } from '../../utils/prop-types';
import { generateCards } from '../../utils/helpers';

interface IGameState {
  cardsList: TCard[];
  activeCardsList: TCard[];
  settings: {
    collectionCount: number;
    numberRange: number;
    isHelpEnable: boolean;
  };
  isMatched: boolean;
  isGameRun: boolean;
  isGameOver: boolean;
}

const initialState: IGameState = {
  cardsList: [],
  activeCardsList: [],
  settings: {
    collectionCount: 0,
    numberRange: 0,
    isHelpEnable: false,
  },
  isMatched: false,
  isGameRun: false,
  isGameOver: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame(state) {
      state.cardsList = generateCards(
        state.settings.numberRange,
        state.settings.collectionCount
      );
      state.isGameRun = true;
    },
    setSettings(state, { payload: settings }) {
      state.settings = settings;
    },
    setActiveCardsList(state, { payload: card }) {
      const newActiveCardsList = [...state.activeCardsList, card];
      const checkCards = newActiveCardsList.every(
        (activeCard) => activeCard.value === card.value
      );

      if (!checkCards) {
        state.activeCardsList = [];
        return;
      }
      if (
        checkCards &&
        newActiveCardsList.length === state.settings.collectionCount
      ) {
        state.activeCardsList = newActiveCardsList;
        state.isMatched = true;
        return;
      }

      state.activeCardsList = newActiveCardsList;
    },
    deleteCards(state) {
      const [currentCard] = state.activeCardsList;
      const newCardsList = state.cardsList.map((cardItem) => {
        if (cardItem.value === currentCard.value) {
          cardItem.isFound = true;
        }
        return cardItem;
      });

      state.cardsList = newCardsList;
      state.isMatched = false;
      state.isGameOver = newCardsList.every((card) => card.isFound);
      state.activeCardsList = [];
    },
    resetGame() {
      return initialState;
    },
  },
});

export const getGameState = ({ game }: RootState): IGameState => game;
export const getCardsList = ({ game }: RootState): TCard[] => game.cardsList;
export const getActiveCards = ({ game }: RootState): TCard[] =>
  game.activeCardsList;

export const getCardsListCountSelector = createSelector(
  [getCardsList],
  (cardsList) => cardsList.length
);

export const getGuessedCollectionsSelector = createSelector(
  [getCardsList],
  (cardsList) => {
    const guessedCollections = cardsList.reduce((acc, card) => {
      if (card.isFound) {
        acc.push(card.value);
      }
      return acc;
    }, []);

    return [...new Set<number>(guessedCollections)];
  }
);

export const {
  setGame,
  setSettings,
  setActiveCardsList,
  deleteCards,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
