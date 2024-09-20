import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import wordsReducer from './wordsReducer';
import settingsReducer from './settingsReducer';
import handlingReducer from './handlingReducer';
import authReducer from './authReducer';
import infoReducer from './infoReducer';
import gameReducer from './gameReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  api: apiReducer,
  words: wordsReducer,
  settings: settingsReducer,
  handling: handlingReducer,
  auth: authReducer,
  info: infoReducer,
  game: gameReducer,
  payment: paymentReducer,
});

export default rootReducer;
