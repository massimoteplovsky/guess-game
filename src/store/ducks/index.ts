import gameSlice from './game';
import playerSlice from './player';

const rootReducer = {
  game: gameSlice,
  player: playerSlice,
};

export default rootReducer;
