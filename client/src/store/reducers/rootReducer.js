// @flow
import userReducer from './userReducer';
import problemReducer from './problemReducer';
import eventReducer from './eventReducer';
import mapReducer from './mapReducer';

import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  problem: problemReducer,
  event: eventReducer,
  map: mapReducer
});
