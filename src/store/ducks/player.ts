import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IPlayerState {
  attemptsCount: number;
  score: number;
}

const initialState: IPlayerState = {
  attemptsCount: 0,
  score: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    incrementAttempts(state) {
      state.attemptsCount += 1;
    },
    resetAttempts(state) {
      state.attemptsCount = 0;
    },
    setScore(state, { payload: { collectionCount, numberRange } }) {
      const maxScore = collectionCount * numberRange;
      const currentScore = Math.ceil(maxScore / state.attemptsCount);
      state.score += currentScore;
    },
    resetPlayer() {
      return initialState;
    },
  },
});

export const getPlayerState = ({ player }: RootState): IPlayerState => player;

export const { incrementAttempts, resetAttempts, setScore, resetPlayer } =
  playerSlice.actions;
export default playerSlice.reducer;
